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
exports.updateCylinderDeliveryAndReception = exports.getAllCompanyCylindersAccounts = exports.getAllCompanyCylindersCountAccounts = void 0;
const db_1 = __importDefault(require("../utils/db"));
const deliveryAndReception_1 = require("../queries/deliveryAndReception");
const getAllCompanyCylindersCountAccounts = (rutAccounts, state) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query(deliveryAndReception_1._getAllCompanyCylindersCountAccounts, [rutAccounts, state]);
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
exports.getAllCompanyCylindersCountAccounts = getAllCompanyCylindersCountAccounts;
const getAllCompanyCylindersAccounts = (rutBusiness, rutAccounts) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query(deliveryAndReception_1._getAllCompanyCylindersAccounts, [rutBusiness, rutAccounts]);
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
exports.getAllCompanyCylindersAccounts = getAllCompanyCylindersAccounts;
const updateCylinderDeliveryAndReception = (code, stateCylinders, rutBusiness, rutAccounts, stateCompany) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let rutBusinessQuery = rutBusiness;
        let rutAccountsQuery = rutAccounts;
        let dateQuery = deliveryAndReception_1._insertCylinderDeliveryDate;
        if (stateCylinders === 0) {
            rutBusinessQuery = "";
            rutAccountsQuery = "";
            dateQuery = deliveryAndReception_1._updateCylinderReceptionDate;
        }
        const [rows0] = yield db_1.default.query(deliveryAndReception_1._updateCylinderDeliveryAndReception, [
            stateCylinders,
            rutBusinessQuery,
            rutAccountsQuery,
            code
        ]);
        const [rows1] = yield db_1.default.query(deliveryAndReception_1._getAllCompanyCylindersCountAccounts, [rutAccounts, stateCompany]);
        const [rows2] = yield db_1.default.query(deliveryAndReception_1._getAllCompanyCylindersAccounts, [rutBusiness, rutAccounts]);
        const [rows3] = yield db_1.default.query(dateQuery, [code, rutBusiness]);
        return {
            rows: [rows1, rows2],
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
exports.updateCylinderDeliveryAndReception = updateCylinderDeliveryAndReception;
//# sourceMappingURL=deliveryAndReception.js.map