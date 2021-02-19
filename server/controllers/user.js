const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')
        const result = await db.user.find_user_by_username([username])
        const existingUser = result[0]
        if (existingUser) {
            return res.status(409).send('Username is not available')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const registeredUser = await db.user.create_user([username, hash])
        const user = registeredUser[0]
        req.session.user = {username: user.username, id: user.id}
        return res.status(201).send(req.session.user)
    },

    login: async (req, res) => {
        const {username, password} = req.body;
        const foundUser = await req.app.get('db').user.find_user_by_username([username]);
        const user = foundUser[0];
        if (!user) {
          return res.status(401).send('Username or password incorrect');
        }
        const isAuthenticated = bcrypt.compareSync(password, user.hash);
        if (!isAuthenticated) {
          return res.status(403).send('Username or password incorrect');
        }
        req.session.user = {id: user.id, username: user.username};
        return res.send(req.session.user);
    },

    logout: async (req, res) => {
        req.session.destroy(err => {
            if(err){
                console.log(err)
            }else{
                res.status(200).send('Logged out successfully')
            }
        })
    },

    getUser: async (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
        }else{
            res.status(404).send('No user found. Please log in')
        }
    }
}
