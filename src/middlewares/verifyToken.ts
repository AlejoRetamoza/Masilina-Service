import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface payload {
    _id: string;
    role: string;
    iat: number;
    exp: number;
}

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            error: 'Access denied'
        });
    }
    
    const payload = jwt.verify(token, process.env.TOKEN_SECRET) as payload;
    req.userId = payload._id;
    next();
}

export const validateAdmin = (req: Request, res: Response, next: NextFunction) => {
    validateType(req, res, next, 'admin');
}

export const validateSpecialist = (req: Request, res: Response, next: NextFunction) => {
    validateType(req, res, next, 'specialist');
}

export const validateCustomer = (req: Request, res: Response, next: NextFunction) => {
    validateType(req, res, next, 'customer');
}

export const validateBoth = (req: Request, res: Response, next: NextFunction) => {
    validateType(req, res, next, 'both');
}

const validateType = (req: Request, res: Response, next: NextFunction, type: string) => {
    const data = jwt.decode(req.headers.authorization);
    const token_info = (data as any);

    if (token_info.role === type) {
        next();
    }
    else {
        return res.status(401).json({
            error: 'User does not have permission'
        });
    }
}