import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const comparePasswordMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        req.user = user; 
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error comparing password' });
    }
    
};
