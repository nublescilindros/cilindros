import { Router } from "express";
import {
    getAllCompanyCylindersCountHistory,
    getAllCompanyCylindersByDate,
    generateExcelCylinderCompany
} from "../controllers/cylindersHistory";
import { checkAuth } from "../utils/jwt";
import { checkRoleAuth } from "../utils/checkRoleAuth";

const cylindersHistoryRouter = Router();

cylindersHistoryRouter.get("/getAllCompanyCylindersCountHistory", checkAuth, checkRoleAuth(['admin']),
    getAllCompanyCylindersCountHistory);

cylindersHistoryRouter.get("/getAllCompanyCylindersByDate/:rutBusiness/:deliveredDate/:receivedDate", checkRoleAuth(['admin']), checkAuth,
    getAllCompanyCylindersByDate);

cylindersHistoryRouter.post("/generateExcelCylinderCompany", checkRoleAuth(['admin']), generateExcelCylinderCompany);

export default cylindersHistoryRouter;