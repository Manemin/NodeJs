const { Router } = require('express');

const userControl = require('../controllers/user.control');
const userMiddleware = require('../middlewares/usermiddleware');

const signRouter = Router();
const loginRouter = Router();
const findRouter = Router();

signRouter.post('/', userMiddleware.checkValidity, userMiddleware.isNewUser, userControl.createUser);
signRouter.get('/', userControl.showReg);

loginRouter.get('/', userControl.showUsers);
loginRouter.get('/logout', userControl.logout);
loginRouter.post('/delete', userControl.deleteUser);
loginRouter.post('/', userMiddleware.checkValidity, userMiddleware.checkUser, userControl.showUsers);

findRouter.get('/', userControl.showFind);
findRouter.post('/', userMiddleware.findUser, userControl.showFound);

module.exports = { signRouter, loginRouter, findRouter };
