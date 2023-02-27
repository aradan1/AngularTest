"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDB = exports.readDB = void 0;
var _a = require('fs'), readFileSync = _a.readFileSync, writeFileSync = _a.writeFileSync;
var path = process.env.DB_PATH;
function readDB() {
    var data = readFileSync(path);
    return JSON.parse(data);
}
exports.readDB = readDB;
function writeDB(content) {
    try {
        writeFileSync(path, JSON.stringify(content, null, 2), 'utf8');
    }
    catch (error) {
        console.log('An error has occurred ', error);
    }
}
exports.writeDB = writeDB;
