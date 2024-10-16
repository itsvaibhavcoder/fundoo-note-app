import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import UserService from '../services/user.service';
import HttpStatus from "http-status-codes";
class UserController{
  public UserService = new UserService();

  public signUp = async(req: Request, res:Response, next: NextFunction): Promise<any>=>{
    try{
      const data = await this.UserService.signUp(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'User created successfully'
      });
    }
    catch(error){
      next(error);
    }
  }
  public userLogin = async(req: Request, res: Response, next: NextFunction) =>{
   try{
     const data = await this.UserService.userLogin(req.body);
     if(data){
         res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: 'User logged in Successfully'
         });
     }
     else{
      res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials'
      });
     }
   }
   catch(error){
     next(error);
   }
  }
};

export default UserController;
