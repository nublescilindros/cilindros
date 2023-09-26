"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cylindersHistoryRouter = exports.deliveryAndReceptionRouter = exports.formCylindersRouter = exports.clientsRouter = exports.cylindersRouter = exports.accountsRouter = void 0;
const accounts_1 = __importDefault(require("./routes/accounts"));
exports.accountsRouter = accounts_1.default;
const cylinders_1 = __importDefault(require("./routes/cylinders"));
exports.cylindersRouter = cylinders_1.default;
const clients_1 = __importDefault(require("./routes/clients"));
exports.clientsRouter = clients_1.default;
const formCylinders_1 = __importDefault(require("./routes/formCylinders"));
exports.formCylindersRouter = formCylinders_1.default;
const deliveryAndReception_1 = __importDefault(require("./routes/deliveryAndReception"));
exports.deliveryAndReceptionRouter = deliveryAndReception_1.default;
const cylindersHistory_1 = __importDefault(require("./routes/cylindersHistory"));
exports.cylindersHistoryRouter = cylindersHistory_1.default;
