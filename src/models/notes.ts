import { Schema, model, Document } from 'mongoose';

// Define an interface representing a document in MongoDB
export interface Note extends Document {
    title: string;
    description: string;
    color?: string;
    isArchived?: boolean;
    isDeleted?: boolean;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

// Create a Schema corresponding to the document interface
const noteSchema = new Schema<Note>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: '#FFFFFF', // Default color if not provided
    },
    isArchived: {
        type: Boolean,
        default: false, // Default to not archived
    },
    isDeleted: {
        type: Boolean,
        default: false, // Default to not deleted
    },
    userId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
});

// Create a model for Note based on the schema
const NoteModel = model<Note>('Note', noteSchema);

export default NoteModel;
