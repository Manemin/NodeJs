const { Router } = require('express');

const carRouter = Router();

const {
    carControllers: {
        findByParam,
        addNewCar,
        deleteCar,
        updateCar
    }
} = require('../controllers');
const {
    authMiddleWare: { checkAccessToken },
    carMiddleWare: { isDataValid, isNewCarValid, isCarPresent },
    userMiddleWare: { isValidId },
} = require('../middlewares');

carRouter.get('/', isDataValid, findByParam);
carRouter.post('/:userId', checkAccessToken, isValidId, isNewCarValid, addNewCar);
carRouter.delete('/:userId', checkAccessToken, isValidId, isDataValid, deleteCar);
carRouter.patch('/:userId', checkAccessToken, isValidId, isDataValid, isCarPresent, updateCar);
carRouter.patch('/:userId/photo', checkAccessToken, isValidId, isDataValid, isCarPresent, updateCar);

module.exports = carRouter;
