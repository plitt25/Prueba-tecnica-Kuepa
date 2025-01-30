import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']
    if (token != undefined && token.startsWith('Bearer')) {
        try {
            const tokeDef = token.slice(7)
            jwt.verify(tokeDef, process.env.SECRET_KEY || 'clave_secreta_para_jwt')
            next()
        } catch (error) {
            res.status(401).json({
                message: 'Token incorrecto'
            })
        }
    } else {
        res.status(401).json({
            message: 'Acceso restringido'
        })
    }

}
export default validateToken