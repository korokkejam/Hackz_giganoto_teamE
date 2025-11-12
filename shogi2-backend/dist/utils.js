"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalIpAddress = getLocalIpAddress;
const os_1 = __importDefault(require("os"));
function getLocalIpAddress(localhost) {
    if (localhost) {
        return "localhost";
    }
    else {
        const interfaces = os_1.default.networkInterfaces();
        for (const interfaceName in interfaces) {
            const networkInterface = interfaces[interfaceName];
            if (!networkInterface)
                continue;
            for (const iface of networkInterface) {
                if (iface.family === 'IPv4' && !iface.internal) {
                    return iface.address;
                }
            }
        }
        return null;
    }
}
