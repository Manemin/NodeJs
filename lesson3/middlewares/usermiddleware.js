const userServices = require('../services/user.services');

const found = (db, user, key = 'register') => {
    const result = db.find((userDb) => userDb.email === user.email);

    if (key === 'login' && result) {
        return (result.password === user.password) ? result : false;
    }
    return result;
};

module.exports = {
    isNewUser: (req, res, next) => {
        userServices.readDb().then((data) => {
            try {
                if (found(data, req.body)) throw new Error('User already exists');

                next();
            } catch (e) {
                res.render('error', { msg: e.message });
            }
        }).catch((e) => {
            console.log(e);
            res.status(400).json(e.message);
        });
    },
    checkValidity: (req, res, next) => {
        try {
            const user = req.body;

            if (!user.email || !user.password) {
                throw new Error('Name (email, pwd) is not valid');
            }
            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },
    checkUser: (req, res, next) => {
        userServices.readDb()
            .then((data) => {
                try {
                    const check = found(data, req.body, 'login');
                    if (!check) {
                        throw new Error('name or password is not valid');
                    }
                    req.isActive = true;
                    req.user = check;
                    next();
                } catch (e) {
                    res.render('error', { msg: e.message });
                }
            })
            .catch((e) => {
                console.log(e);
                res.status(400).json(e.message);
            });
    },
    findUser: (req, res, next) => {
        userServices.readDb()
            .then((data) => {
                try {
                    const { option } = req.body;
                    let str = null;

                    switch (option) {
                        case 'name':
                            str = req.body.name;
                            break;
                        case 'email':
                            str = req.body.email;
                    }

                    const founded = data.filter((userDb) => userDb[option] === str);

                    if (founded.length < 1) throw new Error(`${option} not found`);

                    req.founded = founded;
                    next();
                } catch (e) {
                    res.render('error', { msg: e.message });
                }
            })
            .catch((e) => {
                res.status(400).json(e.message);
            });
    }

};
