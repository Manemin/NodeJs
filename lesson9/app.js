/* eslint-disable no-console */
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

const db = require('./db').getInstance();
const { userRouter, authRouter, carRouter } = require('./routers');

db.setModels();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(fileUpload());

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/cars', carRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res.json({
        message: err.message,
        code: err.code || 500,
        ok: false
    });
});

app.listen(5000, () => {
    console.log('port listen 5000');
});
