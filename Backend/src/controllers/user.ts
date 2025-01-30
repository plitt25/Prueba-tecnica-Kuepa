import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import jwt from 'jsonwebtoken'

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, usuario, contraseña, tipo } = req.body;


        const userUni = await User.findOne({ where: { usuario } }) as User | null;
        if (userUni) {
            res.status(400).json({ message: "Usuario ya existente" });
            return;
        }

        const newUser = await User.create({
            nombre,
            usuario,
            contraseña: bcrypt.hashSync(contraseña, 10),
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

    } catch (error) {
        console.error("Error en register:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};


export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { usuario, contraseña } = req.body;

        const userValid = await User.findOne({ where: { usuario } }) as User | null;
        if (!userValid) {
            res.status(400).json({ message: "Usuario incorrecto" });
            return;
        }

        const passwordMatch = bcrypt.compareSync(contraseña, userValid.contraseña);
        if (!passwordMatch) {
            res.status(400).json({ message: "Contraseña incorrecta" });
            return;
        }
        const token = jwt.sign({ usuario: userValid.usuario }, process.env.SECRET_KEY || 'clave_secreta_para_jwt', { expiresIn: "1h" });
        res.status(200).json({
            message: "Inicio de sesión exitoso",
            user: {
                id: userValid.id,
                nombre: userValid.nombre,
                usuario: userValid.usuario,
                tipo: userValid.tipo,
                token:token
            },
        });
        
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }



};

