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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccounts = exports.updateAccounts = exports.insertAccounts = exports.verifyUser = exports.validateUser = exports.getAllAccounts = void 0;
const Accounts = __importStar(require("../models/accounts"));
const jwt_1 = require("../utils/jwt");
const getAllAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Accounts.getAllAccounts();
        res.status(200).json(Object.assign({}, result));
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            error: true
        });
    }
});
exports.getAllAccounts = getAllAccounts;
const insertAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, rut, user, password } = req.body;
        const result = yield Accounts.insertAccounts(name, rut, user, password);
        res.status(200).json(Object.assign({}, result));
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            error: true
        });
    }
});
exports.insertAccounts = insertAccounts;
const updateAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, rut, user, password } = req.body;
        const result = yield Accounts.updateAccounts(name, rut, user, password);
        res.status(200).json(Object.assign({}, result));
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            error: true
        });
    }
});
exports.updateAccounts = updateAccounts;
const deleteAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rut } = req.params;
        const result = yield Accounts.deleteAccounts(rut);
        res.status(200).json(Object.assign({}, result));
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            error: true
        });
    }
});
exports.deleteAccounts = deleteAccounts;
const validateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, password } = req.body;
        const result = yield Accounts.validateUser(id, password);
        if (result.data.length > 0) {
            const tokenSession = yield (0, jwt_1.tokeSign)(result.data[0]);
            res.status(200).json({
                id: result.data[0].id,
                admin: result.data[0].admin,
                token: tokenSession,
                error: false,
            });
            return;
        }
        res.status(200).json({ error: true });
    }
    catch (error) {
        console.log(error);
        res.status(200).json({ error: true });
    }
});
exports.validateUser = validateUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    const tokenData = yield (0, jwt_1.verifyToken)((0, jwt_1.getToken)(token));
    const result = yield Accounts.validateUser(tokenData.id, tokenData.password);
    if (result.data.length > 0) {
        res.send({ id: tokenData.id, admin: tokenData.admin, rut: result.data[0].rut });
        return;
    }
    res.send({ errorToken: true });
});
exports.verifyUser = verifyUser;
