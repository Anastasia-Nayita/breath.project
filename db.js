const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/network"
);

module.exports.addUserData = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, password) 
        VALUES($1, $2, $3, $4)
        RETURNING id
        `,
        [first, last, email, password]
    );
};

module.exports.getUserData = (email) => {
    return db.query(
        `SELECT * FROM users 
        WHERE email = ($1)`,
        [email]
    );
};

module.exports.getUserDataById = (id) => {
    return db.query(
        `SELECT * FROM users 
        WHERE id = ($1)`,
        [id]
    );
};

module.exports.addProfilePic = (image_url, id) => {
    return db.query(
        `UPDATE users
        SET image_url = ($1)
        WHERE id = ($2)
        RETURNING *`,
        [image_url, id]
    );
};
