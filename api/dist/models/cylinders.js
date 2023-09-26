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
exports.deleteCylinders = exports.updateCylinders = exports.insertCylinders = exports.getAllCylinders = exports.getAllCapacity = exports.getAllContent = void 0;
const db_1 = __importDefault(require("../utils/db"));
const cylinders_1 = require("../queries/cylinders");
const getAllContent = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query(cylinders_1._getAllContent);
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
exports.getAllContent = getAllContent;
const getAllCapacity = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query(cylinders_1._getAllCapacity);
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
exports.getAllCapacity = getAllCapacity;
const getAllCylinders = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query(cylinders_1._getAllCylinders);
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
exports.getAllCylinders = getAllCylinders;
const insertCylinders = (code, capacity, content, own) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows0] = yield db_1.default.query(cylinders_1._insertCylinders, [code, capacity, content, own]);
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
exports.insertCylinders = insertCylinders;
const updateCylinders = (code, capacity, content, own) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows0] = yield db_1.default.query(cylinders_1._updateCylinders, [content, capacity, own, code]);
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
exports.updateCylinders = updateCylinders;
const deleteCylinders = (code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(code);
        const [rows0] = yield db_1.default.query(cylinders_1._deleteCylinders, [code]);
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
exports.deleteCylinders = deleteCylinders;
