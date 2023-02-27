import { Request, Response, NextFunction } from 'express';

import * as jwt from 'jwt-simple';


export interface CustomRequest extends Request {
    token: any;
}

// Authorization token middleware
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
   
        if (!token) {
            throw new Error("Token not found");
        }
   
        const decoded = jwt.decode(token, (process.env.TOKEN_SECRET as string));
        (req as CustomRequest).token = decoded;
        console.log(decoded)

        next();
    } catch (err) {
        res.status(401).send({message:"Authentication required"});
    }
};