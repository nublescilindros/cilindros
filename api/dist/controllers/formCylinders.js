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
exports.updateCylinderRequestAndReception = exports.updateCylinderState = exports.getAllCylindersCompanyByRut = exports.getAllCompanyCylindersCount = void 0;
const formCylinders = __importStar(require("../models/formCylinders"));
/*
0 vacio
1 disponible
2 solicitado
3 entregado
4 retirando
 */
const getAllCompanyCylindersCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield formCylinders.getAllCompanyCylindersCount();
        res.status(200).json(Object.assign({}, result));
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            error: true
        });
    }
});
exports.getAllCompanyCylindersCount = getAllCompanyCylindersCount;
const getAllCylindersCompanyByRut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rutBusiness } = req.params;
        const result = yield formCylinders.getAllCylindersCompanyByRut(rutBusiness);
        res.status(200).json(Object.assign({}, result));
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            error: true
        });
    }
});
exports.getAllCylindersCompanyByRut = getAllCylindersCompanyByRut;
const updateCylinderState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, state } = req.body;
        const result = yield formCylinders.updateCylinderState(code, state);
        res.status(200).json(Object.assign({}, result));
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            error: true
        });
    }
});
exports.updateCylinderState = updateCylinderState;
const updateCylinderRequestAndReception = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rutBusiness, codeCylinders, rutAccounts, stateCylinders } = req.body;
        const result = yield formCylinders.updateCylinderRequestAndReception(rutBusiness, codeCylinders, rutAccounts, stateCylinders);
        res.status(200).json(Object.assign({}, result));
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            error: true
        });
    }
});
exports.updateCylinderRequestAndReception = updateCylinderRequestAndReception;
//# sourceMappingURL=formCylinders.js.map