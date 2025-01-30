"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token != undefined && token.startsWith('Bearer')) {
        try {
            const tokeDef = token.slice(7);
            jsonwebtoken_1.default.verify(tokeDef, process.env.SECRET_KEY || 'clave_secreta_para_jwt');
            next();
        }
        catch (error) {
            res.status(401).json({
                message: 'Token incorrecto'
            });
        }
    }
    else {
        res.status(401).json({
            message: 'Acceso restringido'
        });
    }
};
exports.default = validateToken;
