const jwt = require('jsonwebtoken');

const { tokenConfig: { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } } = require('../config');

module.exports = () => {
    const access_token = jwt.sign({}, ACCESS_TOKEN_KEY, { expiresIn: '10m' });
    const refresh_token = jwt.sign({}, REFRESH_TOKEN_KEY, { expiresIn: '5h' });

    return {
        access_token,
        refresh_token
    };
};
