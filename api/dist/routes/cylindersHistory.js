"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cylindersHistory_1 = require("../controllers/cylindersHistory");
const jwt_1 = require("../utils/jwt");
const cylindersHistoryRouter = (0, express_1.Router)();
cylindersHistoryRouter.get("/getAllCompanyCylindersCountHistory", jwt_1.checkAuth, cylindersHistory_1.getAllCompanyCylindersCountHistory);
cylindersHistoryRouter.get("/getAllCompanyCylindersByDate/:rutBusiness/:deliveredDate/:receivedDate", jwt_1.checkAuth, cylindersHistory_1.getAllCompanyCylindersByDate);
cylindersHistoryRouter.post("/generateExcelCylinderCompany", cylindersHistory_1.generateExcelCylinderCompany);
cylindersHistoryRouter.post("/test", cylindersHistory_1.test);
exports.default = cylindersHistoryRouter;
//# sourceMappingURL=cylindersHistory.js.map