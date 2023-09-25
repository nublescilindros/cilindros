"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deliveryAndReception_1 = require("../controllers/deliveryAndReception");
const jwt_1 = require("../utils/jwt");
const deliveryAndReceptionRouter = (0, express_1.Router)();
deliveryAndReceptionRouter.get("/getAllCompanyCylindersCountAccounts/:rutAccounts/:state", jwt_1.checkAuth, deliveryAndReception_1.getAllCompanyCylindersCountAccounts);
deliveryAndReceptionRouter.get("/getAllCompanyCylindersAccounts/:rutBusiness/:rutAccounts", jwt_1.checkAuth, deliveryAndReception_1.getAllCompanyCylindersAccounts);
deliveryAndReceptionRouter.put("/updateCylinderDeliveryAndReception", jwt_1.checkAuth, deliveryAndReception_1.updateCylinderDeliveryAndReception);
exports.default = deliveryAndReceptionRouter;
//# sourceMappingURL=deliveryAndReception.js.map