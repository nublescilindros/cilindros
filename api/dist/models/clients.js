"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClients = exports.updateClients = exports.insertClients = exports.getAllClients = void 0;
const db_1 = __importDefault(require("../utils/db"));
const clients_1 = require("../queries/clients");
const getAllClients = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query(clients_1._getAllClients);
        return {
            rows: rows,
            error: false,
        };
    }
    catch (error) {
        console.log(error);
        return {
            error: true,
        };
    }
});
exports.getAllClients = getAllClients;
const insertClients = (rutBusiness, nameBusiness, nameManager, addressBusiness) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows0] = yield db_1.default.query(clients_1._insertClients, [
            rutBusiness,
            nameBusiness,
            nameManager,
            addressBusiness
        ]);
        const [rows1] = yield db_1.default.query(clients_1._getAllClients);
        return {
            rows: rows1,
            error: false,
        };
    }
    catch (error) {
        console.log(error);
        return {
            error: true,
        };
    }
});
exports.insertClients = insertClients;
const updateClients = (rutBusiness, nameBusiness, nameManager, addressBusiness) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows0] = yield db_1.default.query(clients_1._updateClients, [
            nameBusiness,
            nameManager,
            addressBusiness,
            rutBusiness
        ]);
        const [rows1] = yield db_1.default.query(clients_1._getAllClients);
        return {
            rows: rows1,
            error: false,
        };
    }
    catch (error) {
        console.log(error);
        return {
            error: true,
        };
    }
});
exports.updateClients = updateClients;
const deleteClients = (rutBusiness) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows0] = yield db_1.default.query(clients_1._deleteClients, [rutBusiness]);
        const [rows1] = yield db_1.default.query(clients_1._getAllClients);
        return {
            rows: rows1,
            error: false,
        };
    }
    catch (error) {
        console.log(error);
        return {
            error: true,
        };
    }
});
exports.deleteClients = deleteClients;
