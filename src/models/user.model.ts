import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
//import { required } from '@hapi/joi';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // sparse: true
      //changes above
    },

    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model<IUser>('User', userSchema);
