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
exports.deleteCylinders = exports.updateCylinders = exports.insertCylinders = exports.getAllCylinders = exports.getAllCapacity = exports.getAllContent = void 0;
const cylinders = __importStar(require("../models/cylinders"));
const getAllCapacity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cylinders.getAllCapacity();
        res.status(200).json(Object.assign({}, result));
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            error: true
        });
    }
});
exports.getAllCapacity = getAllCapacity;
const getAllContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cylinders.getAllContent();
        res.status(200).json(Object.assign({}, result));
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            error: true
        });
    }
});
exports.getAllContent = getAllContent;
const getAllCylinders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cylinders.getAllCylinders();
        res.status(200).json(Object.assign({}, result));
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            error: true
        });
    }
});
exports.getAllCylinders = getAllCylinders;
const insertCylinders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, capacity, content, own } = req.body;
        const result = yield cylinders.insertCylinders(code, capacity, content, own);
        res.status(200).json(Object.assign({}, result));
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            error: true
        });
    }
});
exports.insertCylinders = insertCylinders;
const updateCylinders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, capacity, content, own } = req.body;
        const result = yield cylinders.updateCylinders(code, capacity, content, own);
        res.status(200).json(Object.assign({}, result));
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            error: true
        });
    }
});
exports.updateCylinders = updateCylinders;
const deleteCylinders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.params;
        const result = yield cylinders.deleteCylinders(code);
        res.status(200).json(Object.assign({}, result));
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            error: true
        });
    }
});
exports.deleteCylinders = deleteCylinders;
