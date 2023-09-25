"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("custom-env").env(process.env.NODE_ENV);
const config = {
    env: process.env.ENV,
    apiPort: parseInt(process.env.API_PORT || "0"),
    secret: process.env.SECRET,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PWD,
    dbPort: parseInt(process.env.DB_PORT || "0"),
    dbName: process.env.DB_NAME,
    dbWaitForConnections: true,
    dbConnectionLimit: 100,
    dbQueueLimit: 0,
};
exports.default = config;
//# sourceMappingURL=config.js.map