"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.deleteUserById = exports.editUserById = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
var utils_1 = require("./utils");
var db = (0, utils_1.readDB)();
// get all users
function getAllUsers() {
    return db['users'];
}
exports.getAllUsers = getAllUsers;
// get user by id
function getUserById(id) {
    return db['users'][id];
}
exports.getUserById = getUserById;
// create new user
function createUser(newUser) {
    if (db['users'][newUser.name]) {
        return null;
    }
    db['users'][newUser.name] = newUser;
    (0, utils_1.writeDB)(db);
    return newUser;
}
exports.createUser = createUser;
// edit user by id
function editUserById(id, newUser) {
    db['users'][id] = newUser;
    (0, utils_1.writeDB)(db);
    return newUser;
}
exports.editUserById = editUserById;
// delete user by id
function deleteUserById(id) {
    delete db['users'][id];
    (0, utils_1.writeDB)(db);
}
exports.deleteUserById = deleteUserById;
function login(username, password) {
    if (db['users'][username] && db['users'][username].password === password) {
        return db['users'][username];
    }
    return null;
}
exports.login = login;
