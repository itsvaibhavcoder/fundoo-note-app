import express, { IRouter } from 'express';
import NoteController from '../controllers/notes.controller';
import NoteValidator from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

class NoteRoutes {
  private NoteController = new NoteController();
  private router = express.Router();
  private NoteValidator = new NoteValidator();
  
  constructor() {
    this.routes();
  }

  private routes = () => {

    //Creating new note
    this.router.post(
      '/create',
      userAuth,
      this.NoteValidator.createNote,
      this.NoteController.createNote
    );[]

    // Route to get a note by ID
    this.router.get(
      '/get/:id',
      userAuth,
      this.NoteValidator.getNoteById,
      this.NoteController.getNoteById
    );

    // Route to update a note by ID
    this.router.put(
      '/update/:id',
      userAuth,
      this.NoteValidator.updateNote,
      this.NoteController.updateNoteById
    );

    // Route to delete a note by ID
    this.router.delete(
      '/delete/:id',
      userAuth,
      this.NoteValidator.deleteNote,
      this.NoteController.deleteNoteById
    );
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default NoteRoutes;

