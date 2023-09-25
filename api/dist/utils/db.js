"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const config_1 = __importDefault(require("./config"));
const pool = promise_1.default.createPool({
    host: config_1.default.dbHost,
    user: config_1.default.dbUser,
    password: config_1.default.dbPassword,
    database: config_1.default.dbName,
    port: config_1.default.dbPort,
    waitForConnections: config_1.default.dbWaitForConnections,
    connectionLimit: config_1.default.dbConnectionLimit,
    queueLimit: config_1.default.dbQueueLimit,
    multipleStatements: true,
});
pool
    .getConnection()
    .then((conn) => {
})
    .catch((err) => {
    console.log(err, "mysqlbdd");
});
exports.default = pool;
