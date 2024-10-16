import NoteModel, { Note } from '../models/notes';

export class NotesService {
    public async createNote(data: Partial<Note>): Promise<Note> {
        const note = new NoteModel(data);
        return await note.save();
    }

    public async getNoteById(id: string): Promise<Note | null> {
        return await NoteModel.findById(id).exec();
    }

    public async updateNoteById(id: string, data: Partial<Note>): Promise<Note | null> {
        return await NoteModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    public async deleteNoteById(id: string): Promise<Note | null> {
        return await NoteModel.findByIdAndDelete(id).exec();
    }
}
