import HttpStatus from 'http-status-codes';
import UserService from '../services/user.service';
import { generateToken} from '../utils/tokenUtils';
import { Request, Response, NextFunction } from 'express';
import redisClient from '../config/redisClient';
class UserController {
  private userService = new UserService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.userService.signUp(req.body);
      const { password, ...rest_data } = user.toObject();
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: rest_data,
        message: 'User Registered'
      });
    } 
    catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: "",
        message: error.message
      });
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.userService.login(req.body.email, req.body.password);
      if (user) {
        const generatedToken = generateToken({
          UserID: user._id.toString(),
          email: user.email
        });
        const { firstName, email, ...rest_data } = user.toObject();

        //Cache the user data in redis
        await redisClient.set(email, JSON.stringify({firstName, email, generatedToken}), {EX: 60*60})
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: {
            firstName,
            email,
            generatedToken
          },
          message: 'User logged In'
        });
      } 
      else {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          data: "",
          message: 'Invalid Email or Password.'
        });
      }
    }
    catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: "",
        message: 'Invalid Email or Password.'
      });
    }
  };

  public forgetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const resetToken = await this.userService.forgetPassword(req.body.email);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'reset password link sent sucessfully',
      });
    } 
    catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: "",
        message: error.message,
      });
    }
  };

  public resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { token, newPassword } = req.body;
      await this.userService.resetPassword(token, newPassword);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: "",
        message: 'Password reset successful',
      });
    } 
    catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: "",
        message: error.message,
      });
    }
  };
}

export default UserController;
