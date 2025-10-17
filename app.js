const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./src/routes/user.routes');
const tempUserRouter = require('./src/routes/user.router');
const { ERROR } = require('./src/utils/responseStatus');
dotenv.config();
const categoryRouter = require("./src/routes/category.router");
const questionRouter = require("./src/routes/question.router");
const examRouter = require("./src/routes/exam.router");
const AppError = require('./src/utils/AppError');
const { FAIL } = require('./src/utils/responseStatus');
const { swaggerUi, swaggerSpec } = require("./swagger"); // import swagger config


const app = express();
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        explorer: true,
        swaggerOptions: {
            url: "/api-docs/swagger.json", // serve spec separately
        },
    })
);

// Serve raw swagger.json (important for Vercel)
app.get("/api-docs/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet()); // Set security HTTP headers

const allowedOrigins = ['http://localhost:4200', 'https://quiz-app-api-lac.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    next();
});


if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan');
    app.use(morgan('dev'))
}

app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
})

app.get("/api", (req, res) => {
    res.json({ msg: "Welcome to Quiz APP API" })
})
app.use("/api/categories", categoryRouter);
app.use("/api/questions", questionRouter);
app.use('/api/auth/', userRouter);
app.use('/api/user/', tempUserRouter);
app.use('/api/exams/', examRouter);

app.use('*x', (req, res, next) => {
    const error = new AppError(FAIL, 404, 'No Such route at our server');
    return next(error);
})

app.use((err, req, res, next) => {
    const msg = err.message || 'Something went wrong';
    const statusCode = err.statusCode || 500;
    const status = err.status || ERROR;
    return res.status(statusCode).json({
        status,
        msg,
        err
    });
});



module.exports = app;