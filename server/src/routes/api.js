"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var cors = require("cors");
var users_1 = require("./api/users");
var products_1 = require("./api/products");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors());
router.use('/users', users_1.default);
router.use('/products', products_1.default);
router.get('/', function (req, res) {
    res.send({ message: 'Hello World!' });
});
router.use(function (req, res, next) {
    res.send({ message: '404: PAGE NOT FOUND' });
    next();
});
exports.default = router;
