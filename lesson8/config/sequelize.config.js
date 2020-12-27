require('dotenv').config();

const path = process.env;

module.exports = {
    development: {
        username: path.DB_USER,
        password: path.DB_PWD,
        database: path.DB_NAME,
        host: path.DB_HOST,
        dialect: path.DB_DIALECT,
    }
};
