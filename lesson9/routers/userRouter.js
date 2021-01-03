const { Router } = require('express');

const {
    userControllers: {
        addNewUser,
        deleteUser,
        findByParam,
        updateUser,
    },
    // uploadControllers: { changeAvatar },
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
    fileUploadMiddleware: { checkUpload, checkAvatar },
} = require('../middlewares');

const userRouter = Router();

userRouter.get('/', isDataValid, findByParam);
userRouter.post('/', isNewUserValid, isUserPresent, checkUpload, checkAvatar, addNewUser);
userRouter.delete('/:userId', checkAccessToken, isValidId, findById, deleteUser);
userRouter.patch('/:userId', checkAccessToken, isValidId, isDataValid, findById, updateUser);
// userRouter.patch('/:userId/avatar', checkAccessToken, isValidId, checkUpload, checkAvatar, findById, changeAvatar);

module.exports = userRouter;
