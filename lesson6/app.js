/* eslint-disable no-console */
const express = require('express');

const app = express();
const { userRouter } = require('./routers/userRouters');
const db = require('./db').getInstance();

db.setModels();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', userRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res.json({
        message: err.message,
        code: err.code,
        ok: false
    });
});

app.listen(5000, () => {
    console.log('port listen 5000');
});
