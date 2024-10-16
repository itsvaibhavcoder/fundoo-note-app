import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

class hashingFunction {
    private encrypt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const saltrounds = 10;
            const hash = await bcrypt.hash(req.body.password, saltrounds);
            req.body.password = hash;
            next(); 
        } catch (error) {
            next(error);
        }
    };

    public getEncryptMiddleware() {
        return this.encrypt;
    }
}

export default hashingFunction;
