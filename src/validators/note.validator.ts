import { Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';

class NoteValidator {
  // Joi schema for note validation
  private createNoteSchema = Joi.object({
    title: Joi.string().required().messages({
      'string.base': 'Title must be a string',
      'any.required': 'Title is required',
    }),
    description: Joi.string().required().messages({
      'string.base': 'Description must be a string',
      'any.required': 'Description is required',
    }),
    color: Joi.string().optional().messages({
      'string.base': 'Color must be a string',
    }),
    isArchived: Joi.boolean().optional().messages({
      'boolean.base': 'isArchived must be a boolean',
    }),
    isDeleted: Joi.boolean().optional().messages({
      'boolean.base': 'isDeleted must be a boolean',
    }),
    userId: Joi.string().required().messages({
      'string.base': 'User ID must be a string',
      'any.required': 'User ID is required',
    }),
  });

  // Joi schema for note ID parameter validation
  private noteIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
      'string.base': 'ID must be a string',
      'string.length': 'ID must be a 24 character long hex string',
      'any.required': 'ID is required',
    }),
  });

  // Middleware for creating a note validation
  public createNote = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this.createNoteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };

  // Middleware for getting a note by ID validation
  public getNoteById = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this.noteIdSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };

  // Middleware for updating a note validation
  public updateNote = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this.noteIdSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    const { error: bodyError } = this.createNoteSchema.validate(req.body);
    if (bodyError) {
      return res.status(400).json({ error: bodyError.details[0].message });
    }

    next();
  };

  // Middleware for deleting a note validation
  public deleteNote = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this.noteIdSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
}

export default NoteValidator;
