"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalIpAddress = getLocalIpAddress;
exports.cmp_pos = cmp_pos;
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
function cmp_pos(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}
