import { Router } from "express";
import {
    getAllCompanyCylindersCount,
    getAllCylindersCompanyByRut,
    updateCylinderState,
    updateCylinderRequestAndReception,
    generatePdfCylinderCompany
} from "../controllers/formCylinders";
import { checkAuth } from "../utils/jwt";
import { checkRoleAuth } from "../utils/checkRoleAuth";

const formCylindersRouter = Router();

formCylindersRouter.get("/getAllCompanyCylindersCount", checkAuth, getAllCompanyCylindersCount);
formCylindersRouter.get("/getAllCylindersCompanyByRut/:rutBusiness", checkAuth, getAllCylindersCompanyByRut);
formCylindersRouter.put("/updateCylinderState", checkAuth, updateCylinderState);
formCylindersRouter.put("/updateCylinderRequestAndReception", checkAuth, updateCylinderRequestAndReception);
formCylindersRouter.post("/generatePdfCylinderCompany", checkRoleAuth(['admin']), generatePdfCylinderCompany);


export default formCylindersRouter;