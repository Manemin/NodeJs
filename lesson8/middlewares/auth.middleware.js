const jwt = require('jsonwebtoken');

const { ErrorHandler, errors: { NOT_VALID_TOKEN, PERMISSION_DENIED } } = require('../error');
const { token_key: { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } } = require('../config');
const { authService: { findTokenWithUser, findRefreshToken, delRefreshToken } } = require('../services');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get('Authorization');

            if (!access_token) throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);

            await jwt.verify(access_token, ACCESS_TOKEN_KEY, (err) => {
                if (err) throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            });

            const userWithToken = await findTokenWithUser({ access_token });

            if (!userWithToken.length) throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);

            const [{ current_user }] = userWithToken;

            if (current_user.id !== +req.params.userId) {
                res.json(PERMISSION_DENIED.message);
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    refreshAccessToken: async (req, res, next) => {
        try {
            const refresh_token = req.get('Authorization');

            if (!refresh_token) throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);

            await jwt.verify(refresh_token, REFRESH_TOKEN_KEY, (err) => {
                if (err) throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            });

            const current = await findRefreshToken({ refresh_token });

            if (!current.length) throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);

            const [{ id, user_id }] = current;

            await delRefreshToken({ id });

            req.body.id = user_id;
            next();
        } catch (e) {
            next(e);
        }
    },
};
