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
exports.updateCylinderRequestAndReception = exports.updateCylinderState = exports.getAllCylindersCompanyByRut = exports.getAllCompanyCylindersCount = void 0;
const db_1 = __importDefault(require("../utils/db"));
const formCylinders_1 = require("../queries/formCylinders");
const cylinders_1 = require("../queries/cylinders");
const getAllCompanyCylindersCount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query(formCylinders_1._getAllCompanyCylindersCount);
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
exports.getAllCompanyCylindersCount = getAllCompanyCylindersCount;
const getAllCylindersCompanyByRut = (rutBusiness) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query(formCylinders_1._getAllCylindersCompanyByRut, [rutBusiness]);
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
exports.getAllCylindersCompanyByRut = getAllCylindersCompanyByRut;
const updateCylinderState = (code, state) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows0] = yield db_1.default.query(formCylinders_1._updateCylinderState, [state, code]);
        const [rows1] = yield db_1.default.query(cylinders_1._getAllCylinders);
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
exports.updateCylinderState = updateCylinderState;
const updateCylinderRequestAndReception = (rutBusiness, codeCylinders, rutAccounts, stateCylinders) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows0] = yield db_1.default.query(formCylinders_1._updateCylinderRequestAndReception, [
            stateCylinders,
            rutBusiness,
            rutAccounts,
            codeCylinders
        ]);
        const [rows1] = yield db_1.default.query(cylinders_1._getAllCylinders);
        const [rows2] = yield db_1.default.query(formCylinders_1._getAllCompanyCylindersCount);
        const [rows3] = yield db_1.default.query(formCylinders_1._getAllCylindersCompanyByRut, [rutBusiness]);
        return {
            rows: [rows1, rows2, rows3],
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
exports.updateCylinderRequestAndReception = updateCylinderRequestAndReception;
