const { emailActions } = require('../constants');

module.exports = {
    [emailActions.WELCOME]: {
        subject: 'Welcome to Site',
        templateName: 'welcome'
    },
    [emailActions.USER_UPDATED]: {
        subject: 'User updated',
        templateName: 'user-updated'
    },
    [emailActions.USER_DELETED]: {
        subject: 'User deleted',
        templateName: 'user-deleted'
    }
};
