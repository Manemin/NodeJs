module.exports = {
    createUser: (req, res) => {
        fs.readFile(db, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.render('error', { msg: 'technical work in progress' });
                return;
            }

            const usersDb = JSON.parse(data);
            const user = verify(req.body, usersDb);

            if (!user) {
                usersDb.push(req.body);
                fs.writeFile(db, JSON.stringify(usersDb), (err1) => {
                    if (err1) {
                        console.log(err1);
                        res.render('error', { msg: 'technical work in progress' });
                    }
                });
                res.redirect('/');
            } else {
                res.render('error', { login: req.body, msg: 'already exist' });
            }
        });
    }
};
