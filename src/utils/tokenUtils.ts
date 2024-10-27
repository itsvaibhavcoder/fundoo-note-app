import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (payload: { UserID: string, email: string }): string => {
    const secretKey = process.env.JWT_SECRET_KEY as string;
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export const generateResetToken = (email: string): string => {
    const secretKeyForResetPassword = process.env.JWT_SECRET_KEY_FOR_RESET_PASSWORD as string;
    return jwt.sign({ email }, secretKeyForResetPassword, { expiresIn: '1h' });
};

export const verifyResetToken = (token: string): any => {
    const secretKeyForverify = process.env.JWT_SECRET_KEY_FOR_RESET_PASSWORD as string;
    return jwt.verify(token, secretKeyForverify);
};
