"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var dotenv = require("dotenv");
dotenv.config();
var api_1 = require("./routes/api");
var app = express();
var port = +process.env.PORT;
app.use('/api', api_1.default);
app.listen(port, function () {
    console.log("Server listening on port ".concat(port));
});
