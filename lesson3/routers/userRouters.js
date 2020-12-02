const { Router } = require('express');
const userControl = require('../controllers/user.control');

const userRouter = Router();

userRouter.get('/'); // login;

module.exports = userRouter;

userRouter.post('/', userControl.createUser);


