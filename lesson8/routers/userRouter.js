const { Router } = require('express');

const {
    userControllers: {
        addNewUser,
        findByParam,
        deleteUser,
        updateUser,
    }
} = require('../controllers');
const {
    userMiddleWare: {
        isNewUserValid,
        isUserPresent,
        isDataValid,
        isValidId,
        findById,
    },
    authMiddleWare: { checkAccessToken },
} = require('../middlewares');

const userRouter = Router();

userRouter.get('/', isDataValid, findByParam);
userRouter.post('/', isNewUserValid, isUserPresent, addNewUser);
userRouter.delete('/:userId', checkAccessToken, isValidId, findById, deleteUser);
userRouter.patch('/:userId', checkAccessToken, isValidId, isDataValid, findById, updateUser);

module.exports = userRouter;
