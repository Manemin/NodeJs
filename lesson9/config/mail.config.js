require('dotenv').config();

module.exports = {
    MAIL_USER: process.env.MAIL_USER || 'alex@gmail.com',
    MAIL_PASS: process.env.MAIL_PASS || '1234',
    MAIL_SERVICE: process.env.MAIL_SERVICE || 'gmail',
};
