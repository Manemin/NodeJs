const { getModel } = require('../db').getInstance();

module.exports = {
    createTokenPair: (tokenPair) => {
        const authModel = getModel('O_Auth');

        return authModel.create(tokenPair);
    },
    findToken: (token) => {
        const authModel = getModel('O_Auth');

        return authModel.findAll({
            where: token,
        });
    },
    findRefreshToken: (token) => {
        const authModel = getModel('O_Auth');

        return authModel.findAll({
            where: token
        });
    },
    delRefreshToken: (id) => {
        const authModel = getModel('O_Auth');

        return authModel.destroy({
            where: id,
        });
    },
};
