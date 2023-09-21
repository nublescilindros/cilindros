
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

const cylindersRouter = Router();

cylindersRouter.get("/getAllContent", checkAuth, getAllContent);
cylindersRouter.get("/getAllCapacity", checkAuth, getAllCapacity);
cylindersRouter.get("/getAllCylinders", checkAuth, getAllCylinders);
cylindersRouter.post("/insertCylinders", checkAuth, insertCylinders);
cylindersRouter.put("/updateCylinders", checkAuth, updateCylinders);
cylindersRouter.delete("/deleteCylinders/:code", checkAuth, deleteCylinders);
export default cylindersRouter;