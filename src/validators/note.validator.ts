import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
class NoteValidator {
  public validate_note = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const schema = Joi.object({
      Title: Joi.string().min(4),
      Description: Joi.string().min(8),
      color: Joi.string().min(2),
      isArchived: Joi.boolean(),
      isDeleted: Joi.boolean(),
      UserID: Joi.string().min(4)
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw Error('Error' + error.message);
    }
    next();
  };

  //Middleware to validate the id
  public validateIdMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const schema = Joi.object({
      id: Joi.string().custom((value, helpers) => {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
          }
          return value;
        })
        .required()
    });

    const { error } = schema.validate({ id: req.params.id });

    if (error) {
      return res.status(400).send({ error: error.details[0].message }); 
    }
    next(); 
  };
}

export default NoteValidator;
