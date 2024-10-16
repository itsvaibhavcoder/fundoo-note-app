import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class UserValidator {
  public signUpValidate = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      firstName: Joi.string().min(4).pattern(/^[A-Za-z]+$/).required(),
      lastName: Joi.string().min(4).pattern(/^[A-Za-z]+$/)
      .required(),
      email: Joi.string().email().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
      password: Joi.string().min(8).pattern(/^\S+$/)
        .required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };

  public loginValidate = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      email: Joi.string().email().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
      password: Joi.string().min(8).pattern(/^\S+$/).required()
    });
    const {error} = schema.validate(req.body);
    if (error){
      next(error);
    }
    next();
  }
}

export default UserValidator;
