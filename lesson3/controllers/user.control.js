const userService = require('../services/user.services');

const msgErr = 'oops, something wrong, please w8, we fix it';
let isActive = false;

module.exports = {
    showReg: (req, res) => {
        res.render('signup');
    },
    createUser: (req, res) => {
        userService.readDb()
            .then((db) => {
                db.push(req.body);
                userService.writeDb(db);
                res.redirect('/');
            })
            .catch((e) => {
                console.log(e);
                res.render('error', { msgErr });
            });
    },
    showUsers: (req, res) => {
        try {
            isActive = req.isActive;
            if (!isActive) throw new Error('You are not authorized');
            userService.readDb()
                .then((data) => {
                    res.render('login', { users: data, user: req.user });
                })
                .catch((e) => {
                    console.log(e);
                    res.render('error', { msgErr });
                });
        } catch (e) {
            res.render('error', { msg: e.message });
        }
    },
    deleteUser: (req, res) => {
        userService.readDb()
            .then((data) => {
                const { email } = req.body;
                const filtered = data.filter((userDb) => userDb.email !== email);
                userService.writeDb(filtered);
                res.render('error', { msg: 'user deleted' });
            })
            .catch((e) => {
                console.log(e);
                res.status(400).json(e.message);
            });
    },
    showFind: (req, res) => {
        res.render('find');
    },
    showFound: (req, res) => {
        res.send(req.founded);
    },
    logout: (req, res) => {
        isActive = false;
        res.redirect('/');
    }
};
