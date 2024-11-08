import { Response, Request, NextFunction } from 'express';
import jwt from "jsonwebtoken";

declare global {
    namespace Express{
        interface Request {
            id: string;
        }
    }
}

export const isAuthenticated = async (req:Request, res:Response, next:NextFunction) => {
try {
    const {token} = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "User not authenticated"
        });
    }
    

    // verify token
    const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
    if (!decode) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        })
    }
    req.id = decode.userId;
    next(); 

} catch (error) {
    
}
}
