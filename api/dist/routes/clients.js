"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clients_1 = require("../controllers/clients");
const jwt_1 = require("../utils/jwt");
const clientsRouter = (0, express_1.Router)();
clientsRouter.get("/getAllClients", jwt_1.checkAuth, clients_1.getAllClients);
clientsRouter.post("/insertClients", jwt_1.checkAuth, clients_1.insertClients);
clientsRouter.put("/updateClients", jwt_1.checkAuth, clients_1.updateClients);
clientsRouter.delete("/deleteClients/:rutBusiness", jwt_1.checkAuth, clients_1.deleteClients);
exports.default = clientsRouter;
//# sourceMappingURL=clients.js.map