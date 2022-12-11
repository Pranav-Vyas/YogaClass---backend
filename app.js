const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path: './config.env'});
app.use(express.json());

require("./database");

// const path = require("path");
const port = process.env.PORT || 5000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/addUser',require('./api/addUser'));

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})