
import { Router } from "express";
import {
    getAllAccounts,
    validateUser,
    verifyUser,
    insertAccounts,
    updateAccounts,
    deleteAccounts
} from "../controllers/accounts";
import { checkAuth } from "../utils/jwt";

const accountsRouter = Router();

accountsRouter.post("/validateUser", validateUser);
accountsRouter.get("/verifyUser", checkAuth, verifyUser);
accountsRouter.get("/getAllAccounts", checkAuth, getAllAccounts);
accountsRouter.post("/insertAccounts", checkAuth, insertAccounts);
accountsRouter.put("/updateAccounts", checkAuth, updateAccounts);
accountsRouter.delete("/deleteAccounts/:rut", checkAuth, deleteAccounts);
export default accountsRouter;
