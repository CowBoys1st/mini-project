import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

    type IUserData =  {
        userId: number;
        email: string;
        roleId: number;
    } 

    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) throw 'Token is empty';

        const verifiedToken = verify(token, process.env.JWT_SECRET || 'sangat rahasia') 

        req.user = verifiedToken as IUserData

        next();

    } catch (err) {
        res.status(400).send({
            status: "Error",
            msg: err
        });
    }
}

export const isCostumer = async (req:Request, res:Response, next:NextFunction) => {
    if (req.user?.roleId == 1) {
        next()
    }
    else {
        res.status(200).send({
            status:"error",
            msg:"You are not authorize as costumer"
        })
    }
}
export const isEO = async (req:Request, res:Response, next:NextFunction) => {
    if (req.user?.roleId == 1) {
        next()
    }
    else {
        res.status(200).send({
            status:"error",
            msg:"You are not authorize as costumer"
        })
    }
}