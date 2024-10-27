import Note from '../models/note.model';
import { INote } from '../interfaces/note.interface';

class NoteService {
  //create new Note
  public createNote = async (body: INote): Promise<Object> => {
    const data = await Note.create(body);
    return data;
  };

  //Get single note
  public getSingleNote = async (id: String): Promise<INote | null> => {
    const note = await Note.findById(id).exec();
    return note;
  };

  //Get all notes
  public getAll = async (UserID: String): Promise<INote[]> => {
    try {
      console.log('UserID --->', UserID);
      return await Note.find({ UserID }).exec();
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  };

  //Update note by Id
  public UpdateById = async (
    id: string,
    updateData: Object
  ): Promise<Object | null> => {
    const updated_Note = await Note.findByIdAndUpdate(id, updateData, {
      new: true,
      useFindAndModify: false
    });
    return updated_Note;
  };

  //delete by Id
  public deleteById = async (id: string): Promise<boolean> => {
    const delete_Count = (await Note.deleteOne({ _id: id })).deletedCount;
    return delete_Count > 0;
  };

  public toggleArchiveStatus = async (id: string): Promise<INote | null> => {
    const note = await Note.findById(id).exec();
    console.log("Note ---> ", note);
    if (note) {
      if (note.isTrash) {
        throw new Error("Cannot archive a note that is in the trash.");
      }
      note.isArchived = !note.isArchived;
      await note.save();
    }
    return note;
  };

  public toggleTrashStatus = async (id: string): Promise<INote | null> => {
    const note = await Note.findById(id).exec();
    if (note) {
      note.isTrash = !note.isTrash;
      await note.save();
    }
    return note;
  };
}

export default NoteService;
