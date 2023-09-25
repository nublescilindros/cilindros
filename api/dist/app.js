"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes = __importStar(require("./routes"));
const createAppServer = () => {
    const server = (0, express_1.default)();
    const middlewares = () => {
        server.use(express_1.default.json());
        server.use((0, cors_1.default)());
        server.use('*', (0, cors_1.default)());
        server.use(express_1.default.urlencoded({ extended: false }));
    };
    const routesConfig = () => {
        server.use("/", (req, res) => {
            res.send("<h1>Api ñubles</h1>");
        });
        server.use("/files/excel", express_1.default.static(path_1.default.join(__dirname, "./../", "output")));
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
exports.default = createAppServer();
