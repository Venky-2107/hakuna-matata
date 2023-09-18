const express = require("express");
const app = express();
const loginRouter = require('./routes/login.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", loginRouter);


module.exports = app;
