"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductById = exports.editProductById = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
var utils_1 = require("./utils");
var db = (0, utils_1.readDB)();
// get all products
function getAllProducts() {
    return db['products'];
}
exports.getAllProducts = getAllProducts;
// get product by id
function getProductById(id) {
    return db['products'][id];
}
exports.getProductById = getProductById;
// create new product
function createProduct(newProduct) {
    if (db['products'][newProduct.name]) {
        return null;
    }
    db['products'][newProduct.name] = newProduct;
    (0, utils_1.writeDB)(db);
    return newProduct;
}
exports.createProduct = createProduct;
// edit product by id
function editProductById(id, newProduct) {
    db['products'][id] = newProduct;
    (0, utils_1.writeDB)(db);
    return newProduct;
}
exports.editProductById = editProductById;
// delete product by id
function deleteProductById(id) {
    delete db['products'][id];
    (0, utils_1.writeDB)(db);
}
exports.deleteProductById = deleteProductById;
