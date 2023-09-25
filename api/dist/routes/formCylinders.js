"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formCylinders_1 = require("../controllers/formCylinders");
const jwt_1 = require("../utils/jwt");
const formCylindersRouter = (0, express_1.Router)();
formCylindersRouter.get("/getAllCompanyCylindersCount", jwt_1.checkAuth, formCylinders_1.getAllCompanyCylindersCount);
formCylindersRouter.get("/getAllCylindersCompanyByRut/:rutBusiness", jwt_1.checkAuth, formCylinders_1.getAllCylindersCompanyByRut);
formCylindersRouter.put("/updateCylinderState", jwt_1.checkAuth, formCylinders_1.updateCylinderState);
formCylindersRouter.put("/updateCylinderRequestAndReception", jwt_1.checkAuth, formCylinders_1.updateCylinderRequestAndReception);
exports.default = formCylindersRouter;
//# sourceMappingURL=formCylinders.js.map