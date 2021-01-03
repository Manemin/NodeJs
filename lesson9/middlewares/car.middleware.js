const {
    ErrorHandler,
    errorCode: { BAD_REQUEST },
    errors: { CAR_NOT_FOUND },
} = require('../error');
const { carParamValidator, idValidator, newCarValidator } = require('../validators');
const { carService } = require('../services');

module.exports = {
    isDataValid: (req, res, next) => {
        try {
            const { error } = carParamValidator.validate(req.body);

            if (error) throw new ErrorHandler(error.details[0].message, BAD_REQUEST);

            next();
        } catch (e) {
            next(e);
        }
    },
    isNewCarValid: (req, res, next) => {
        try {
            const { error } = newCarValidator.validate(req.body);

            if (error) throw new ErrorHandler(error.details[0].message, BAD_REQUEST);

            next();
        } catch (e) {
            next(e);
        }
    },
    isValidId: (req, res, next) => {
        try {
            const { error } = idValidator.validate(req.params);

            if (error) throw new ErrorHandler(error.details[0].message, BAD_REQUEST);

            next();
        } catch (e) {
            next(e);
        }
    },
    isCarPresent: async (req, res, next) => {
        try {
            const result = await carService.findCarById(req.body.id);

            if (!result) throw new ErrorHandler(CAR_NOT_FOUND.message, CAR_NOT_FOUND.code);

            next();
        } catch (e) {
            next(e);
        }
    },
};
