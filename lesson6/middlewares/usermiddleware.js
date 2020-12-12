const db = require('../db').getInstance();

const {
    ErrorHandler,
    errorCode: {
        BAD_REQUEST,
    },
    errors: {
        USER_AlREADY_EXIST,
        USER_NOT_FOUND,
    }
} = require('../error');
const {
    newUserValidator,
    paramsValidator,
    idValidator,
} = require('../validators');

module.exports = {
    isDataValid: (req, res, next) => {
        try {
            const { error } = paramsValidator.validate(req.body);

            if (error) throw new ErrorHandler(error.details[0].message, BAD_REQUEST);

            next();
        } catch (e) {
            next(e);
        }
    },
    isNewUserValid: (req, res, next) => {
        try {
            const { error } = newUserValidator.validate(req.body);

            if (error) throw new ErrorHandler(error.details[0].message, BAD_REQUEST);

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserPresent: async (req, res, next) => {
        try {
            const user = db.getModel('User');
            const { email } = req.body;

            const isPresent = await user.findOne({ where: { email } });

            if (isPresent) throw new ErrorHandler(USER_AlREADY_EXIST.message, USER_AlREADY_EXIST.code);

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
    findById: async (req, res, next) => {
        try {
            const { id } = req.body;

            const user = db.getModel('User');
            const result = await user.findByPk(id);

            if (!result) throw new ErrorHandler(USER_NOT_FOUND.message, USER_NOT_FOUND.code);

            next();
        } catch (e) {
            next(e);
        }
    }
};
