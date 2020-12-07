const { Router } = require('express');

const userControl = require('../controllers/user.control');
const userMiddleware = require('../middlewares/usermiddleware');

const userRouter = Router();

userRouter.get('/', userControl.showUsers);
userRouter.get('/', userMiddleware.isQueryParamValid, userControl.findByParam);
userRouter.delete('/:id', userMiddleware.isIdValid, userMiddleware.isUserValid, userControl.deleteUser);
userRouter.patch('/:id', userMiddleware.isIdValid, userControl.updateUser);
userRouter.put('/', userMiddleware.isUserValid, userControl.createUser);

module.exports = { userRouter };
