import path from 'path';
import express from "express";
import cors from "cors";
import * as routes from "./routes";

const createAppServer = () => {
    const server = express();

    const middlewares = () => {
        server.use(express.json());
        server.use(cors({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        }));
        server.use(express.urlencoded({ extended: false }));
    };

    const routesConfig = () => {
        server.use("/files/excel", express.static(path.join(__dirname, "./../", "output")));
        server.use("/api/accounts", routes.accountsRouter);
        server.use("/api/cylinders", routes.cylindersRouter);
        server.use("/api/clients", routes.clientsRouter);
        server.use("/api/formCylinders", routes.formCylindersRouter);
        server.use("/api/deliveryAndReception", routes.deliveryAndReceptionRouter);
        server.use("/api/cylindersHistory", routes.cylindersHistoryRouter);

    };

    middlewares();
    routesConfig();

    return server;
};

export default createAppServer();