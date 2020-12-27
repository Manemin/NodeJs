/* eslint-disable no-console */
const express = require('express');

const app = express();
const { userRouter, authRouter } = require('./routers');
const db = require('./db').getInstance();

db.setModels();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', userRouter);
app.use('/auth', authRouter);
// app.use('/cars', userRouter);

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
