const { Router } = require('express');
const userControl = require('../controllers/user.control');
const usermiddleware = require('../middlewares/usermiddleware');

const userRouter = Router();

userRouter.get('/'); // login;

module.exports = userRouter;

userRouter.post('/', usermiddleware.checkValidity, usermiddleware.isNewUser, userControl.createUser);
