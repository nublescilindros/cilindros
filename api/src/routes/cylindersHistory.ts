import { Router } from "express";
import {
    getAllCompanyCylindersCountHistory,
    getAllCompanyCylindersByDate,
    generateExcelCylinderCompany

} from "../controllers/cylindersHistory";
import { checkAuth } from "../utils/jwt";

const cylindersHistoryRouter = Router();

cylindersHistoryRouter.get("/getAllCompanyCylindersCountHistory", checkAuth,
    getAllCompanyCylindersCountHistory);

cylindersHistoryRouter.get("/getAllCompanyCylindersByDate/:rutBusiness/:deliveredDate/:receivedDate", checkAuth,
    getAllCompanyCylindersByDate);

cylindersHistoryRouter.post("/generateExcelCylinderCompany", generateExcelCylinderCompany);

export default cylindersHistoryRouter;