const {
    BAD_REQUEST,
    NOT_FOUND,
    UNAUTHORIZED,
    FORBIDDEN,
} = require('./error-codes');

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
    },
    NOT_VALID_TOKEN: {
        message: 'Not valid token',
        code: UNAUTHORIZED
    },
    PERMISSION_DENIED: {
        message: 'Permission denied',
        code: FORBIDDEN
    },
    TEMPLATE_NOT_FOUND: {
        message: 'Template not found',
        code: NOT_FOUND
    }
};
