"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./utils/config"));
const app_1 = __importDefault(require("./app"));
const { apiPort } = config_1.default;
app_1.default.listen(apiPort);
console.log('port ' + apiPort + " ....");
/* app.listen(3000, "0.0.0.0", function () {
    
});  */
