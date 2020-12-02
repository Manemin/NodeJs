const userService = require('../services/user.services');

// const isNewUser = (user, db) => db.find((dbUser) => user.email === dbUser.email);

module.exports = {
    createUser: (req, res) => {
        userService.readDb()
            .then((db) => {
                // const user = isNewUser(req.body, db);

                // if (user) {
                //     res.render('error', { login: req.body, msg: 'already exists' });
                //     return;
                // }

                db.push(req.body);
                userService.writeDb(db);
                res.redirect('/signup');
            })
            .catch((e) => {
                console.log(e);
                res.render('error', { msg: 'oops, something wrong, please w8, we fix it', serv: true });
            });
    }
};
