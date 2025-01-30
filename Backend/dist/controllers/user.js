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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, usuario, contraseña, tipo } = req.body;
        const userUni = yield user_1.User.findOne({ where: { usuario } });
        if (userUni) {
            res.status(400).json({ message: "Usuario ya existente" });
            return;
        }
        const newUser = yield user_1.User.create({
            nombre,
            usuario,
            contraseña: bcrypt_1.default.hashSync(contraseña, 10),
            tipo,
        });
        res.status(201).json({
            message: "Usuario registrado con éxito",
            user: {
                id: newUser.id,
                nombre: newUser.nombre,
                usuario: newUser.usuario,
                tipo: newUser.tipo,
            },
        });
    }
    catch (error) {
        console.error("Error en register:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario, contraseña } = req.body;
        const userValid = yield user_1.User.findOne({ where: { usuario } });
        if (!userValid) {
            res.status(400).json({ message: "Usuario incorrecto" });
            return;
        }
        const passwordMatch = bcrypt_1.default.compareSync(contraseña, userValid.contraseña);
        if (!passwordMatch) {
            res.status(400).json({ message: "Contraseña incorrecta" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ usuario: userValid.usuario }, process.env.SECRET_KEY || 'clave_secreta_para_jwt', { expiresIn: "1h" });
        res.status(200).json({
            message: "Inicio de sesión exitoso",
            user: {
                id: userValid.id,
                nombre: userValid.nombre,
                usuario: userValid.usuario,
                tipo: userValid.tipo,
                token: token
            },
        });
    }
    catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});
exports.login = login;
