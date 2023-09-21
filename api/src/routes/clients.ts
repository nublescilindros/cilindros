
import { Router } from "express";
import {
    getAllClients,
    insertClients,
    updateClients,
    deleteClients,
} from "../controllers/clients";
import { checkAuth } from "../utils/jwt";

const clientsRouter = Router();

clientsRouter.get("/getAllClients", checkAuth, getAllClients);
clientsRouter.post("/insertClients", checkAuth, insertClients);
clientsRouter.put("/updateClients", checkAuth, updateClients);
clientsRouter.delete("/deleteClients/:rutBusiness", checkAuth, deleteClients);

export default clientsRouter;