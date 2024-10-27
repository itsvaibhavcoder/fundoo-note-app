import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import {generateResetToken, verifyResetToken} from '../utils/tokenUtils';
import sendEmail from '../utils/sendEmail';

class UserService {

  // Create a new user
  public signUp = async (body: IUser): Promise<IUser> => {
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const data = await User.create(body);
    return data;
  };
  
  // Log in the user
  public login = async (email: string, password: string): Promise<any> => {
    const user = await User.findOne({ email }).exec();
    if (user) {
      const validate = await bcrypt.compare(password, user.password);
      if (validate) {
        return user;
      }
      return false;
    }
    return false;
  };

  // Handle forget password
  public forgetPassword = async (email: string): Promise<string> => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Email does not exist');
    }

    const resetToken = generateResetToken(user.email);
    const link = `UserId - ${user.id} & token - ${resetToken}`;
    console.log("--> link", link);
    await sendEmail(user.email, link);
    return resetToken;
  };

  // Reset password
  public resetPassword = async (token: string, newPassword: string): Promise<void> => {
    try {
      const decoded = verifyResetToken(token) as { email: string };
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        throw new Error('Invalid token or user does not exist');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
    } 
    catch (error) {
      throw new Error('Invalid or expired token');
    }
  };
}

export default UserService;
