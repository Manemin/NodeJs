const userService = require('../services/user.services');

const msgErr = 'oops, something wrong, please w8, we fix it';

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
        userService.readDb()
            .then((data) => {
                res.render('login', { users: data });
            })
            .catch((e) => {
                console.log(e);
                res.render('error', { msgErr });
            });
    },
    deleteUser: (req, res) => {
        res.send(req.body);
    },
    showFind: (req, res) => {
        res.render('find');
    },
    showFounded: (req, res) => {
        res.send(req.founded);
    }
};
