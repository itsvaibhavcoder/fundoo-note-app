import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';
// import { userAuth } from '../middlewares/auth.middleware';
import hashingFunction from '../hashing';

class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  private UserValidator = new userValidator();
  private Hashing = new hashingFunction();

  constructor() {
    this.routes();
  }

  private routes = () => {
    //route to create a new user
    this.router.post(
      '/signup',
      this.UserValidator.signUpValidate,
      this.Hashing.getEncryptMiddleware(),
      this.UserController.signUp
    );

    this.router.post(
      '/login', 
      this.UserValidator.loginValidate,
      this.UserController.login,
    )
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
