const { authService } = require('../services');
const { tokenizer } = require('../helpers');

module.exports = {
    userLogin: async (req, res) => {
        const tokenPair = tokenizer();
        const user_id = req.body.id;

        await authService.createTokenPair({ user_id, ...tokenPair });
        res.json(tokenPair);
    }
};
