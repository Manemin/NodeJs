const bcrypt = require('bcrypt');

const { ErrorHandler, errors: { AUTH_NOT_VALID } } = require('../error');

module.exports = {
    hash: (pwd, saltRound = 10) => bcrypt.hash(pwd, saltRound),
    compare: async (pwd, hash) => {
        const isPwdEquals = await bcrypt.compare(pwd, hash);

        if (!isPwdEquals) throw new ErrorHandler(AUTH_NOT_VALID.message, AUTH_NOT_VALID.code);
    }
};
