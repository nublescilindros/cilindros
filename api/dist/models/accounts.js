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
exports.deleteAccounts = exports.updateAccounts = exports.insertAccounts = exports.validateUser = exports.getAllAccounts = void 0;
const db_1 = __importDefault(require("../utils/db"));
const accounts_1 = require("../queries/accounts");
const getAllAccounts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query(accounts_1._getAllAccounts);
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
exports.getAllAccounts = getAllAccounts;
const insertAccounts = (name, rut, user, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows0] = yield db_1.default.query(accounts_1._insertAccounts, [name, rut, user, password]);
        const [rows1] = yield db_1.default.query(accounts_1._getAllAccounts);
        return {
            rows: rows1,
            error: false,
        };
    }
    catch (error) {
        return {
            error: true,
        };
    }
});
exports.insertAccounts = insertAccounts;
const updateAccounts = (name, rut, user, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows0] = yield db_1.default.query(accounts_1._updateAccounts, [name, user, password, rut]);
        const [rows1] = yield db_1.default.query(accounts_1._getAllAccounts);
        return {
            rows: rows1,
            error: false,
        };
    }
    catch (error) {
        return {
            error: true,
        };
    }
});
exports.updateAccounts = updateAccounts;
const deleteAccounts = (rut) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows0] = yield db_1.default.query(accounts_1._deleteAccounts, [rut]);
        const [rows1] = yield db_1.default.query(accounts_1._getAllAccounts);
        return {
            rows: rows1,
            error: false,
        };
    }
    catch (error) {
        return {
            error: true,
        };
    }
});
exports.deleteAccounts = deleteAccounts;
const validateUser = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query(accounts_1._validateUser, [id, password]);
        return {
            data: rows,
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
exports.validateUser = validateUser;
//# sourceMappingURL=accounts.js.map