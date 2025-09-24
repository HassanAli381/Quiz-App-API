const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./src/routes/user.routes');
const { ERROR } = require('./src/utils/responseStatus');
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet()); // Set security HTTP headers

app.use(cors({
    origin: '*',
    credentials: true
}));

if(process.env.NODE_ENV === 'development') {
    const morgan = require('morgan');
    app.use(morgan('dev'))
}

app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
})

app.use('/api/auth/', userRouter);

// app.use((err, req, res, next) => {
//     const msg = err.msg || 'Something went wrong';
//     const statusCode = err.statusCode || 500;
//     const status = err.status || ERROR;
//     return res.status(statusCode).json({
//         status,
//         msg
//     });
// });

module.exports = app;