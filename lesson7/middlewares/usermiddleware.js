const db = require('../db').getInstance();

const {
    ErrorHandler,
    errorCode: {
        BAD_REQUEST,
    },
    errors: {
        USER_AlREADY_EXIST,
        USER_NOT_FOUND,
        AUTH_NOT_VALID,
    }
} = require('../error');
const {
    newUserValidator,
    paramsValidator,
    idValidator,
    authValidator,
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
            const { id } = req.params;

            const user = db.getModel('User');
            const result = await user.findByPk(id);

            if (!result) throw new ErrorHandler(USER_NOT_FOUND.message, USER_NOT_FOUND.code);

            next();
        } catch (e) {
            next(e);
        }
    },
    isLoginValid: (req, res, next) => {
        try {
            const { error } = authValidator.validate(req.body);

            if (error) throw new ErrorHandler(AUTH_NOT_VALID.message, AUTH_NOT_VALID.code);

            next();
        } catch (e) {
            next(e);
        }
    },
    checkLogin: async (req, res, next) => {
        try {
            const user = db.getModel('User');
            const { email } = req.body;

            const result = await user.findOne({ where: { email } });

            if (!result) throw new ErrorHandler(AUTH_NOT_VALID.message, AUTH_NOT_VALID.code);

            req.body.dbPwd = result.password;
            next();
        } catch (e) {
            next(e);
        }
    },
};
