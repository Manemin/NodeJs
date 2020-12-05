/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const expHbs = require('express-handlebars');

const app = express();
const pathToViews = path.join(process.cwd(), 'public');
const { loginRouter, signRouter, findRouter } = require('./routers/userRouters');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(pathToViews));

app.set('views', pathToViews);
app.set('view engine', '.hbs');
app.engine('.hbs', expHbs({
    defaultLayout: false
}));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/signup', signRouter);
app.use('/auth', loginRouter);
app.use('/find', findRouter);
app.use('/auth/delete', loginRouter);
app.listen(5000, () => {
    console.log('port listen 5000');
});
