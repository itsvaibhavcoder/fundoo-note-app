import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';

export const hashPasswordMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error hashing the password' });
    }
};