CREATE TABLE helo_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(2500) NOT NULL,
    profile_pic TEXT
);

CREATE TABLE helo_posts (
    title VARCHAR(45) NOT NULL,
    content TEXT,
    img TEXT,
    author_id INTEGER REFERENCES helo_users(id),
    date_created TIMESTAMP
);