const { getModel } = require('../db').getInstance();
const { user_token } = require('../db/association');

module.exports = {
    createTokenPair: (tokenPair) => {
        const authModel = getModel('O_Auth');

        authModel.create(tokenPair);
    },
    findTokenWithUser: (token) => {
        const authModel = getModel('O_Auth');

        return authModel.findAll({
            where: token,
            include: {
                association: user_token
            }
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

        authModel.destroy({
            where: id,
        });
    },
};
