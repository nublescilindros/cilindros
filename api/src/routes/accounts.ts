
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
import { checkRoleAuth } from "../utils/checkRoleAuth";

const accountsRouter = Router();

accountsRouter.post("/validateUser", validateUser);
accountsRouter.get("/verifyUser", checkAuth, verifyUser);
accountsRouter.get("/getAllAccounts", checkAuth, checkRoleAuth(['admin']), getAllAccounts);
accountsRouter.post("/insertAccounts", checkAuth,checkRoleAuth(['admin']), insertAccounts);
accountsRouter.put("/updateAccounts", checkAuth,checkRoleAuth(['admin']), updateAccounts);
accountsRouter.delete("/deleteAccounts/:rut",checkRoleAuth(['admin']), checkAuth, deleteAccounts);
export default accountsRouter;
