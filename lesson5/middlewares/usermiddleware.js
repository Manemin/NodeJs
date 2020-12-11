const { ErrorHandler, errors, errorCode } = require('../error');

const re = /\S+@\S+\.\S+/;

module.exports = {
    isIdValid: (req, res, next) => {
        try {
            const { id } = req.params;

            if (!parseInt(id, 10) || id < 1) throw new ErrorHandler(errors.BAD_REQUEST, errorCode.BAD_REQUEST);

            next();
        } catch (e) {
            next(e);
        }
    },
    isQueryParamValid: (req, res, next) => {
        try {
            const [key] = Object.keys(req.query);
            const [val] = Object.values(req.query);
            switch (key) {
                case 'name':
                    if (!val) throw new Error('name is not valid');
                    break;
                case 'id':
                    if (!parseInt(val, 10) || val < 1) throw new ErrorHandler(errors.BAD_REQUEST, errorCode.BAD_REQUEST);
                    break;
                case 'email':
                    if (!re.test(val)) throw new ErrorHandler(errors.BAD_REQUEST, errorCode.BAD_REQUEST);
                    break;
                default:
                    throw new ErrorHandler(errors.BAD_REQUEST, errorCode.BAD_REQUEST);
            }

            req.validQuery = { key, val };
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserValid: (req, res, next) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !re.test(email) || !password) throw new ErrorHandler(errors.BAD_REQUEST, errorCode.BAD_REQUEST);

            next();
        } catch (e) {
            next(e);
        }
    },
};
