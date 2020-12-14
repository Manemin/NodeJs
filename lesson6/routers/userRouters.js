const { Router } = require('express');

const {
    userControllers: {
        addNewUser,
        findByParam,
        deleteUser,
        updateUser,
        userLogin,
    }
} = require('../controllers');
const {
    userMiddleWare: {
        isNewUserValid,
        isUserPresent,
        isDataValid,
        isValidId,
        findById,
        isLoginValid,
        checkLogin,
    }
} = require('../middlewares');

const userRouter = Router();

userRouter.get('/', isDataValid, findByParam);
userRouter.post('/', isNewUserValid, isUserPresent, addNewUser);
userRouter.post('/auth', isLoginValid, checkLogin, userLogin);
userRouter.delete('/:id', isValidId, findById, deleteUser);
userRouter.patch('/:id', isValidId, isDataValid, findById, updateUser);

module.exports = { userRouter };
