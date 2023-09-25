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
exports.test = exports.generateExcelCylinderCompany = exports.getAllCompanyCylindersByDate = exports.getAllCompanyCylindersCountHistory = void 0;
const cylindersHistory = __importStar(require("../models/cylindersHistory"));
const XLSX = __importStar(require("xlsx"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const getAllCompanyCylindersCountHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cylindersHistory.getAllCompanyCylindersCountHistory();
        res.status(200).json(Object.assign({}, result));
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            error: true
        });
    }
});
exports.getAllCompanyCylindersCountHistory = getAllCompanyCylindersCountHistory;
const getAllCompanyCylindersByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rutBusiness, deliveredDate, receivedDate } = req.params;
        console.log(rutBusiness, deliveredDate, receivedDate);
        const result = yield cylindersHistory.getAllCompanyCylindersByDate(rutBusiness, deliveredDate, receivedDate);
        res.status(200).json(Object.assign({}, result));
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            error: true
        });
    }
});
exports.getAllCompanyCylindersByDate = getAllCompanyCylindersByDate;
const generateExcelCylinderCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body.map((item) => {
        return {
            code: item.code,
            content: item.content,
            capacity: item.capacity,
            deliveredDate: item.deliveredDate,
            receivedDate: item.receivedDate,
            dateDays: item.dateDays
        };
    });
    yield createExcel("Historial", data);
    const success = yield createExcel("Historial", data);
    if (success) {
        console.log("Archivo de Excel creado con éxito.");
        res.status(200).json({ state: true });
    }
    else {
        console.log("Hubo un error al crear el archivo de Excel.");
    }
});
exports.generateExcelCylinderCompany = generateExcelCylinderCompany;
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ state: true });
});
exports.test = test;
const createExcel = (sheetLabel, data) => __awaiter(void 0, void 0, void 0, function* () {
    const fileExtension = "xlsx";
    const sheetName = sheetLabel;
    const fileName = "infoExcel";
    const ws = XLSX.utils.book_new();
    const wb = { Sheets: { [sheetName]: ws }, SheetNames: [sheetName] };
    const wscols = [{ wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 5 }];
    ws["!cols"] = wscols;
    XLSX.utils.sheet_add_aoa(ws, [[
            "Código",
            "Contenido",
            "Capacidad",
            "Fecha entrega",
            "Fecha Recepción",
            "Días"
        ]], {
        origin: "A1",
    });
    XLSX.utils.sheet_add_json(ws, data, {
        origin: "A2",
        skipHeader: true,
    });
    const pdfPath = path.join(__dirname, "./../../", "output");
    const filePath = path.join(pdfPath, `${fileName}.${fileExtension}`);
    try {
        yield fs.promises.writeFile(filePath, XLSX.write(wb, { bookType: fileExtension, type: 'buffer' }));
        return true;
    }
    catch (error) {
        console.error("Error creando el archivo de Excel:", error);
        return false;
    }
});
//# sourceMappingURL=cylindersHistory.js.map