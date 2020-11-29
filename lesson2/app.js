const path = require('path');
const express = require('express');
const expHbs = require('express-handlebars');
const fs = require('fs');

const app = express();
const pathToViews = path.join(process.cwd(), 'public');
const db = path.join(process.cwd(), './db/users.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(pathToViews));

app.set('view engine', '.hbs');
app.engine('.hbs', expHbs({
    defaultLayout: false
}));
app.set('views', pathToViews);

let isUserAuth = false;

function verify(login, users) {
    return users.find((user) => user.email === login.email && user.password === login.password);
}

// function errMessage(key) {
//     switch (key) {
//         case 'login':
//             return 'not found';
//         case 'sign':
//             return 'already exist';
//
//     }
// }

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/auth', (req, res) => {
    if (isUserAuth) {
        fs.readFile(db, 'utf8', (err, data) => {
            if (err) throw err;
            const users = JSON.parse(data);
            res.render('login', { users });
        });
    } else {
        res.render('error', { msg: 'not authorized' });
    }
});

app.post('/auth', (req, res) => {
    fs.readFile(db, 'utf8', (err, data) => {
        if (err) throw err;
        const usersDb = JSON.parse(data);
        const user = verify(req.body, usersDb);
        if (user) {
            isUserAuth = true;
            res.render('login', { users: usersDb });
        } else {
            res.render('error', { login: req.body, msg: 'not found' });
        }
    });
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    fs.readFile(db, 'utf8', (err, data) => {
        if (err) throw err;
        const usersDb = JSON.parse(data);
        const user = verify(req.body, usersDb);
        if (!user) {
            usersDb.push(req.body);
            fs.writeFile(db, JSON.stringify(usersDb), (err1) => {
                if (err1) throw err1;
            });
            res.redirect('/');
        } else {
            res.render('error', { login: req.body, msg: 'already exist' });
        }
    });
});

app.post('/logout', (req, res) => {
    isUserAuth = false;
    res.redirect('/');
});

app.listen(5000, () => {
    console.log('port listen 5000');
});
