
import { Router } from "express";
import {
    getAllContent,
    getAllCylinders,
    getAllCapacity,
    insertCylinders,
    updateCylinders,
    deleteCylinders
} from "../controllers/cylinders";
import { checkAuth } from "../utils/jwt";
import { checkRoleAuth } from "../utils/checkRoleAuth";

const cylindersRouter = Router();

cylindersRouter.get("/getAllContent", checkAuth, checkRoleAuth(['admin']), getAllContent);
cylindersRouter.get("/getAllCapacity", checkAuth, getAllCapacity);
cylindersRouter.get("/getAllCylinders", checkAuth, getAllCylinders);
cylindersRouter.post("/insertCylinders", checkAuth, checkRoleAuth(['admin']), insertCylinders);
cylindersRouter.put("/updateCylinders", checkAuth, checkRoleAuth(['admin']), updateCylinders);
cylindersRouter.delete("/deleteCylinders/:code", checkAuth, deleteCylinders);
export default cylindersRouter;