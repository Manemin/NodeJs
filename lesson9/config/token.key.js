require('dotenv').config();

module.exports = {
    ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY || 'super key',
    REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY || 'super puper key',
};
