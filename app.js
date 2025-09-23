const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const categoryRouter = require("./src/routes/category.router")
const questionRouter = require("./src/routes/question.router")
const app = express();




app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/api", (req, res) => {
    res.json({ msg:"Welcome to Quiz APP API"})
})
app.use("/api/categorys", categoryRouter);
app.use("/api/questions", questionRouter);

app.use("/", (req, res) => {
    res.status(404).json({
        status: "Fail",
        msg:"Not Found!"
    })
})

module.exports = app;