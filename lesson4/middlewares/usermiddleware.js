const re = /\S+@\S+\.\S+/;

module.exports = {
    isValidId: (req, res, next) => {
        try {
            const { id } = req.params;

            if (!parseInt(id, 10) || id < 1) throw new Error('id is not valid');

            next();
        } catch (e) {
            res.status(400).json(e.message);
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
                    if (!parseInt(val, 10) || val < 1) throw new Error('id is not valid');
                    break;
                case 'email':
                    if (!re.test(val)) throw new Error('email is not valid');
                    break;
                default:
                    throw new Error('query is not valid');
            }

            req.validQuery = { key, val };
            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

};
