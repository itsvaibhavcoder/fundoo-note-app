import { Request, Response, NextFunction } from 'express';
import { NotesService } from '../services/notes.service';

class NotesController {
    private notesService: NotesService;

    constructor() {
        this.notesService = new NotesService();
    }

    public createNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const note = await this.notesService.createNote(req.body);
            res.status(201).json(note);
        } 
        catch (error) {
            next(error);
        }
    };

    public getNoteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const note = await this.notesService.getNoteById(req.params.id);
            if (!note) {
                res.status(404).json({ message: 'Note not found' });
                return;
            }
            res.status(200).json(note);
        } catch (error) {
            next(error);
        }
    };

    public updateNoteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const note = await this.notesService.updateNoteById(req.params.id, req.body);
            if (!note) {
                res.status(404).json({ message: 'Note not found' });
                return;
            }
            res.status(200).json(note);
        } catch (error) {
            next(error);
        }
    };

    public deleteNoteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const note = await this.notesService.deleteNoteById(req.params.id);
            if (!note) {
                res.status(404).json({ message: 'Note not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}

export default NotesController;