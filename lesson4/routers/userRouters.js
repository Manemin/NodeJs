const { Router } = require('express');

const userControl = require('../controllers/user.control');
const userMiddleware = require('../middlewares/usermiddleware');

const userRouter = Router();
const userCreateRouter = Router();
const delUserRouter = Router();

userRouter.get('/', userControl.showUsers);
userRouter.post('/:id', userMiddleware.isIdValid, userControl.findById);
userRouter.post('/:?', userMiddleware.isQueryParamValid, userControl.findByParam);

userCreateRouter.post('/', userControl.createUser);

delUserRouter.post('/:id', userMiddleware.isIdValid, userControl.deleteUser);

module.exports = { userRouter, userCreateRouter, delUserRouter };
