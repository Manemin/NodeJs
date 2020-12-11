const { BAD_REQUEST, FORBIDDEN, NO_CONTENT } = require('./error-codes');

module.exports = {
    NOT_VALID_ID: {
        message: 'User ID must be grater than 0',
        code: BAD_REQUEST
    },

    NOT_VALID_BODY: {
        message: 'Request is not valid',
        code: FORBIDDEN
    },

    USER_NOT_FOUND: {
        message: 'User not exist',
        code: NO_CONTENT
    }
};
