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
exports.getToken = exports.checkAuth = exports.verifyToken = exports.tokeSign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
/* const generateToken = (payload: any) => {
  const token = jwt.sign(payload, config.secret);
  return token;
}; */
const getToken = (token) => {
    const tokenRegex = /Bearer "(.*?)"/;
    const match = token.match(tokenRegex);
    return token = match && match[1];
};
exports.getToken = getToken;
const tokeSign = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        admin: user.admin,
        password: user.password
    }, config_1.default.secret, {
        expiresIn: "2h"
    });
});
exports.tokeSign = tokeSign;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return jsonwebtoken_1.default.verify(token, config_1.default.secret);
    }
    catch (error) {
        return { error: true, message: "token no valido" };
    }
});
exports.verifyToken = verifyToken;
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.headers.authorization;
        if (token) {
            const tokenData = yield verifyToken(getToken(token));
            if (tokenData.id) {
                console.log('token valido');
                next();
            }
            else {
                console.log("token no valido");
                res.send({ errorToken: true });
            }
        }
    }
    catch (error) {
    }
});
exports.checkAuth = checkAuth;
