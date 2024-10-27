import { Document } from 'mongoose';

export interface INote extends Document {
  Title: string;
  Description: string;
  color: string;
  isArchive: boolean;
  isTrash: boolean;
  UserID: String
}