const { BAD_REQUEST, NOT_FOUND } = require('./error-codes');

module.exports = {
    USER_NOT_FOUND: {
        message: 'User not found',
        code: NOT_FOUND
    },

    USER_AlREADY_EXIST: {
        message: 'User already exist',
        code: BAD_REQUEST
    },
    AUTH_NOT_VALID: {
        message: 'password or email not valid',
        code: BAD_REQUEST
    }
};
