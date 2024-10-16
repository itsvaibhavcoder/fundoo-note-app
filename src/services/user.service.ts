import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
class UserService {

  //create new user
  public signUp = async (body: IUser): Promise<IUser> => {
    //changes here
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const data = await User.create(body);
    return data;
  };

  public Match_Email_Password = async (email: string, password: string): Promise<any> => {
    const user = (await User.findOne({email}).exec());
    if(user){
      const validate = await bcrypt.compare(password, user.password);
      if (validate){
        return user;
      }
      return false;
    }
    return false;
  };

  public generateToken = async(body: Object): Promise<String> => {
    const payload = body;
    const secretKey = process.env.JWT_SECRET_KEY
    const token = jwt.sign(payload, secretKey, {expiresIn: '1h'});
    return token 
  }
};

export default UserService;
