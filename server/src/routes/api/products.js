"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var productControler = require("./../../controllers/productController");
var middleware_1 = require("../middleware");
var router = express.Router();
router.get('/', function (req, res) {
    var data = productControler.getAllProducts();
    res.status(200).send({ data: data });
});
router.post('/', middleware_1.auth, function (req, res) {
    if (!(req.body.name && req.body.description)) {
        return res.status(422).send({
            message: "Product creation requires 'name' and 'description' fields"
        });
    }
    var data = productControler.createProduct({ name: req.body.name, description: req.body.description });
    if (data) {
        res.status(200).send({ data: data });
    }
    else {
        return res.status(422).send({
            message: "Product already exists"
        });
    }
});
router.delete('/:productid', middleware_1.auth, function (req, res) {
    var p_id = req.params.productid;
    productControler.deleteProductById(p_id);
    res.status(200).send({ message: "success" });
});
router.put('/:productid', middleware_1.auth, function (req, res) {
    if (!(req.body.name && req.body.description)) {
        return res.status(422).send({
            message: "Product requires 'name' and 'description' fields"
        });
    }
    var p_id = req.params.productid;
    var data = productControler.editProductById(p_id, { name: req.body.name, description: req.body.description });
    res.status(200).send({ data: data });
});
router.get('/:productid', function (req, res) {
    var p_id = req.params.productid;
    var data = productControler.getProductById(p_id);
    if (data) {
        return res.status(200).send({ data: data });
    }
    else {
        res.status(404).send({ message: "Product not found" });
    }
});
exports.default = router;
