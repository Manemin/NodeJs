const { Router } = require('express');

const {
    uploadControllers: { changeAvatar },
    userControllers: {
        addNewUser,
        deleteUser,
        findByParam,
        updateUser,
    },
} = require('../controllers');
const {
    authMiddleWare: { checkAccessToken },
    fileUploadMiddleware: { checkUpload, checkAvatar },
    userMiddleWare: {
        isNewUserValid,
        isUserPresent,
        isDataValid,
        isValidId,
        findById,
    },
} = require('../middlewares');

const userRouter = Router();

userRouter.get('/', isDataValid, findByParam);
userRouter.post('/', isNewUserValid, isUserPresent, checkUpload, checkAvatar, addNewUser);
userRouter.delete('/:userId', checkAccessToken, isValidId, findById, deleteUser);
userRouter.patch('/:userId', checkAccessToken, isValidId, isDataValid, findById, updateUser);
userRouter.patch('/:userId/avatar', checkAccessToken, isValidId, checkUpload, checkAvatar, findById, changeAvatar);

module.exports = userRouter;
