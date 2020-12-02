const userServices = require('../services/user.services');

module.exports = {
    isNewUser: (req, res, next) => {
        userServices.readDb().then((data) => {
            try {
                const user = req.body;
                const finded = data.find((userDb) => userDb.email === user.email);

                if (finded) {
                    throw Error('User already exsists');
                }

                next();
            } catch (e) {
                res.status(400).json(e.message);
            }
        });
    },
    checkValidity: (req, res, next) => {
        try {
            const user = req.body;

            if (!user.email && !user.password && !user.name) {
                throw new Error('Name(email, pwd) is not valid');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
}