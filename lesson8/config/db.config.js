require('dotenv').config();

module.exports = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_NAME: process.env.DB_NAME || 'shop',
    DB_USER: process.env.DB_USER || 'root',
    DB_PWD: process.env.DB_PWD || 'root',
    DB_DIALECT: process.env.DB_DIALECT || 'mysql'
};
