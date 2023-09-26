import { Router } from "express";
import {
    getAllCompanyCylindersCount,
    getAllCylindersCompanyByRut,
    updateCylinderState,
    updateCylinderRequestAndReception,
} from "../controllers/formCylinders";
import { checkAuth } from "../utils/jwt";

const formCylindersRouter = Router();

formCylindersRouter.get("/getAllCompanyCylindersCount", checkAuth, getAllCompanyCylindersCount);
formCylindersRouter.get("/getAllCylindersCompanyByRut/:rutBusiness", checkAuth, getAllCylindersCompanyByRut);
formCylindersRouter.put("/updateCylinderState", checkAuth, updateCylinderState);
formCylindersRouter.put("/updateCylinderRequestAndReception", checkAuth, updateCylinderRequestAndReception);



export default formCylindersRouter;