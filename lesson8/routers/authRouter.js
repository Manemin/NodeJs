const { Router } = require('express');

const { authControllers: { userLogin } } = require('../controllers');
const {
    userMiddleWare: {
        isLoginValid,
        checkLogin
    },
    authMiddleWare: { refreshAccessToken },
} = require('../middlewares');

const authRouter = Router();

authRouter.post('/', isLoginValid, checkLogin, userLogin);
authRouter.get('/refresh', refreshAccessToken, userLogin);

module.exports = authRouter;
