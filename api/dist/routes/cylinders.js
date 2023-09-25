"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cylinders_1 = require("../controllers/cylinders");
const jwt_1 = require("../utils/jwt");
const cylindersRouter = (0, express_1.Router)();
cylindersRouter.get("/getAllContent", jwt_1.checkAuth, cylinders_1.getAllContent);
cylindersRouter.get("/getAllCapacity", jwt_1.checkAuth, cylinders_1.getAllCapacity);
cylindersRouter.get("/getAllCylinders", jwt_1.checkAuth, cylinders_1.getAllCylinders);
cylindersRouter.post("/insertCylinders", jwt_1.checkAuth, cylinders_1.insertCylinders);
cylindersRouter.put("/updateCylinders", jwt_1.checkAuth, cylinders_1.updateCylinders);
cylindersRouter.delete("/deleteCylinders/:code", jwt_1.checkAuth, cylinders_1.deleteCylinders);
exports.default = cylindersRouter;
//# sourceMappingURL=cylinders.js.map