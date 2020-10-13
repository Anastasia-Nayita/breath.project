const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/final"
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

module.exports.addPhysChoice = (userId, physically) => {
    console.log("staff from db: ", userId, physically);
    return db.query(
        `INSERT INTO checkup
        (userId, physically)
       VALUES ($1, $2)
       RETURNING *`,
        [userId, physically]
    );
};

module.exports.addMentChoice = (userId, mentally) => {
    console.log("staff from db: ", userId, mentally);
    return db.query(
        `INSERT INTO checkup
        (userId, mentally)
       VALUES ($1, $2)
       RETURNING *`,
        [userId, mentally]
    );
};
