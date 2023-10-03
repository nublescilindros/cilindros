
import { Router } from "express";
import {
    getAllClients,
    insertClients,
    updateClients,
    deleteClients,
} from "../controllers/clients";
import { checkAuth } from "../utils/jwt";
import { checkRoleAuth } from "../utils/checkRoleAuth";

const clientsRouter = Router();

clientsRouter.get("/getAllClients", checkAuth, checkRoleAuth(['admin']), getAllClients);
clientsRouter.post("/insertClients", checkAuth, checkRoleAuth(['admin']), insertClients);
clientsRouter.put("/updateClients", checkAuth, checkRoleAuth(['admin']), updateClients);
clientsRouter.delete("/deleteClients/:rutBusiness", checkAuth, checkRoleAuth(['admin']), deleteClients);

export default clientsRouter;