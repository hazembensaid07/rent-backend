console.clear();
// import express
const express = require("express");
const connectDB = require("./config/connectDB");
// instance app
const app = express();
require("dotenv").config();

connectDB();
const carRouter = require("./router/Car");
// router
// user
app.use(express.json());
app.use("/api/user", require("./router/user"));
app.use("/car", carRouter);
// PORT
const PORT = process.env.PORT;

// create server
app.listen(PORT, (err) =>
  err ? console.error(err) : console.log(`server is running on PORT ${PORT}`)
);
