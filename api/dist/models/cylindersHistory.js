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
exports.getAllCompanyCylindersByDate = exports.getAllCompanyCylindersCountHistory = void 0;
const db_1 = __importDefault(require("../utils/db"));
const cylindersHistory_1 = require("../queries/cylindersHistory");
const getAllCompanyCylindersCountHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query(cylindersHistory_1._getAllCompanyCylindersCountHistory);
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
exports.getAllCompanyCylindersCountHistory = getAllCompanyCylindersCountHistory;
const getAllCompanyCylindersByDate = (rutBusiness, deliveredDate, receivedDate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query(cylindersHistory_1._getAllCompanyCylindersByDate, [
            rutBusiness,
            deliveredDate,
            receivedDate
        ]);
        console.log(rows);
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
exports.getAllCompanyCylindersByDate = getAllCompanyCylindersByDate;
//# sourceMappingURL=cylindersHistory.js.map