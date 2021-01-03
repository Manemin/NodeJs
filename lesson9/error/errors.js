const {
    BAD_REQUEST,
    NOT_FOUND,
    UNAUTHORIZED,
    FORBIDDEN,
} = require('./error-codes');

module.exports = {
    CAR_NOT_FOUND: {
        message: 'Car not found',
        code: NOT_FOUND
    },
    USER_NOT_FOUND: {
        message: 'User not found',
        code: NOT_FOUND
    },
    CAR_AlREADY_EXIST: {
        message: 'Car already exist',
        code: BAD_REQUEST
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
    },
    TO_BIG_FILE: {
        message: 'To big file size',
        code: BAD_REQUEST
    },
    WRONG_FILE_EXTENSION: {
        message: 'Wrong file extension',
        code: BAD_REQUEST
    },
    JUST_ONE_PHOTO: {
        message: 'You can upload just one photo as avatar',
        code: BAD_REQUEST
    },

};
