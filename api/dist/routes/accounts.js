"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accounts_1 = require("../controllers/accounts");
const jwt_1 = require("../utils/jwt");
const accountsRouter = (0, express_1.Router)();
accountsRouter.post("/validateUser", accounts_1.validateUser);
accountsRouter.get("/verifyUser", jwt_1.checkAuth, accounts_1.verifyUser);
accountsRouter.get("/getAllAccounts", jwt_1.checkAuth, accounts_1.getAllAccounts);
accountsRouter.post("/insertAccounts", jwt_1.checkAuth, accounts_1.insertAccounts);
accountsRouter.put("/updateAccounts", jwt_1.checkAuth, accounts_1.updateAccounts);
accountsRouter.delete("/deleteAccounts/:rut", jwt_1.checkAuth, accounts_1.deleteAccounts);
exports.default = accountsRouter;
//# sourceMappingURL=accounts.js.map