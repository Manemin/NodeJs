const { Router } = require('express');

const userControl = require('../controllers/user.control');
const userMiddleware = require('../middlewares/usermiddleware');

const userRouter = Router();
const userCreateRouter = Router();
const delUserRouter = Router();
const updUserRouter = Router();

userRouter.get('/', userControl.showUsers);
userRouter.post('/:id', userMiddleware.isIdValid, userControl.findById);
userRouter.post('/:?', userMiddleware.isQueryParamValid, userControl.findByParam);

userCreateRouter.post('/', userMiddleware.isUserValid, userControl.createUser);

updUserRouter.post('/:id', userMiddleware.isIdValid, userControl.updateUser);

delUserRouter.post('/:id', userMiddleware.isIdValid, userMiddleware.isUserValid, userControl.deleteUser);

module.exports = {
    userRouter,
    userCreateRouter,
    delUserRouter,
    updUserRouter
};
