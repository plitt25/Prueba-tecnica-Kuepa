"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
// Extender `Model` con los atributos definidos
class User extends sequelize_1.Model {
}
exports.User = User;
// Inicializar el modelo en Sequelize
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    usuario: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    contraseña: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'estudiante',
        validate: {
            isIn: [['estudiante', 'moderador']],
        },
    },
}, {
    sequelize: connection_1.default,
    tableName: "users",
});
