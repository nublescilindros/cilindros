import { Router } from "express";
import {
    getAllCompanyCylindersCountAccounts,
    getAllCompanyCylindersAccounts,
    updateCylinderDeliveryAndReception
} from "../controllers/deliveryAndReception";
import { checkAuth } from "../utils/jwt";

const deliveryAndReceptionRouter = Router();

deliveryAndReceptionRouter.get("/getAllCompanyCylindersCountAccounts/:rutAccounts/:state", checkAuth,
    getAllCompanyCylindersCountAccounts);
deliveryAndReceptionRouter.get("/getAllCompanyCylindersAccounts/:rutBusiness/:rutAccounts", checkAuth,
    getAllCompanyCylindersAccounts);
deliveryAndReceptionRouter.put("/updateCylinderDeliveryAndReception", checkAuth,
    updateCylinderDeliveryAndReception);




export default deliveryAndReceptionRouter;