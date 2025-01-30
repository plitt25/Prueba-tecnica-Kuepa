import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/connection";

// Definir los atributos de la tabla como interfaz
interface UserAttributes {
    id: number;
    nombre: string;
    usuario: string;
    contraseña: string;
    tipo: string;
}

// Definir atributos opcionales (cuando se crea un usuario, `id` se genera automáticamente)
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Extender `Model` con los atributos definidos
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public nombre!: string;
    public usuario!: string;
    public contraseña!: string;
    public tipo!: string;
}

// Inicializar el modelo en Sequelize
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usuario: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'estudiante',
            validate: {
                isIn: [['estudiante', 'moderador']],
            },
        },
    },
    {
        sequelize,
        tableName: "users",
    }
);
