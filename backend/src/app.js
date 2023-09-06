const express = require("express");
const adminLoginRouter = require("./routes/admin/adminLoginRoutes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", adminLoginRouter);


module.exports = app;
