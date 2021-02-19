import axios from 'axios'

const initialState = {
    username: '',
    profile_pic: ''
}

const UPDATE_USER = "UPDATE_USER"
const LOGOUT = "LOGOUT"

export const updateUser = (user) => {
    const {username, profile_pic} = user
    let data = axios.post('/api/auth/register', {
        username,
        profile_pic
    }).then(res => res.data)
    return {
        type: UPDATE_USER,
        payload: data
    }
}

export const logout = () => {
    const data = {username: '', password: ''}
    return {
        type: LOGOUT,
        payload: data
    }
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case UPDATE_USER:
            return {...state, username: action.payload.username, profile_pic: action.payload.profile_pic}
        case LOGOUT:
            return {...state, ...action.payload}
        default:
            return state
    }
}