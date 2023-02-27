"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var userControler = require("./../../controllers/userController");
var jwt = require("jwt-simple");
var middleware_1 = require("../middleware");
var router = express.Router();
router.get('/', function (req, res) {
    var data = userControler.getAllUsers();
    res.status(200).send({ data: data });
});
router.post('/register', function (req, res) {
    if (!(req.body.name && req.body.password)) {
        return res.status(422).send({
            message: "User requires 'name' and 'password' fields"
        });
    }
    var user = userControler.createUser({ name: req.body.name, password: req.body.password });
    if (user) {
        var token = jwt.encode({ _id: req.body.name, name: user.name, exp: Date.now() / 1000 + +process.env.TOKEN_LIFE_SECONDS }, process.env.TOKEN_SECRET);
        return res.status(200).send({ token: token, username: req.body.name });
    }
    else {
        return res.status(422).send({
            message: "User already exists"
        });
    }
});
router.post('/login', function (req, res) {
    if (!(req.body.name && req.body.password)) {
        return res.status(422).send({
            message: "User requires 'name' and 'password' fields"
        });
    }
    var user = userControler.login(req.body.name, req.body.password);
    if (user) {
        var token = jwt.encode({ _id: req.body.name, name: user.name, exp: Date.now() / 1000 + +process.env.TOKEN_LIFE_SECONDS }, process.env.TOKEN_SECRET);
        return res.status(200).send({ token: token, username: req.body.name });
    }
    res.status(404).send({ message: "Failed to login" });
});
// for testing purposes
router.post('/auth', middleware_1.auth, function (req, res) {
    return res.status(200).send({ message: "Successful Authorization" });
});
router.delete('/:userid', middleware_1.auth, function (req, res) {
    if (req.token._id !== req.params.userid) {
        return res.status(422).send({
            message: "Need to be logged in to the user to delete it"
        });
    }
    var u_id = req.params.userid;
    userControler.deleteUserById(u_id);
    res.status(200).send({ message: "success" });
});
router.put('/:userid', middleware_1.auth, function (req, res) {
    if (req.token._id !== req.params.userid) {
        return res.status(422).send({
            message: "Need to be logged in to the user to make changes"
        });
    }
    if (!(req.body.name && req.body.password)) {
        return res.status(422).send({
            message: "User requires 'name' and 'password' fields"
        });
    }
    var u_id = req.params.userid;
    var data = userControler.editUserById(u_id, { name: req.body.name, password: req.body.password });
    res.status(200).send({ data: data });
});
router.get('/:userid', function (req, res) {
    var u_id = req.params.userid;
    var data = userControler.getUserById(u_id);
    if (data) {
        return res.status(200).send({ data: data });
    }
    else {
        res.status(404).send({ message: "User not found" });
    }
});
exports.default = router;
