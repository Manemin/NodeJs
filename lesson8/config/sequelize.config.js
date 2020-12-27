require('dotenv').config();

const path = process.env;

module.exports = {
    development: {
        username: path.DB_USER || 'root',
        password: path.DB_PWD || 'root',
        database: path.DB_NAME || 'auto_shop',
        host: path.DB_HOST || 'localhost',
        dialect: path.DB_DIALECT || 'mysql',
    }
};
