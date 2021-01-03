const jwt = require('jsonwebtoken');

const { authService: { findToken, findRefreshToken, delRefreshToken } } = require('../services');
const { constants: { AUTHORIZATION } } = require('../constants');
const { ErrorHandler, errors: { NOT_VALID_TOKEN, PERMISSION_DENIED } } = require('../error');
const { tokenConfig: { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } } = require('../config');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);

            await jwt.verify(access_token, ACCESS_TOKEN_KEY, (err) => {
                if (err) throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            });

            const dbToken = await findToken({ access_token });

            if (!dbToken.length) throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);

            const [{ user_id }] = dbToken;

            if (user_id !== +req.params.userId) {
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
            const refresh_token = req.get(AUTHORIZATION);

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
