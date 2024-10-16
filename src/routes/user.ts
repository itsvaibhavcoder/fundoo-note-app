import express, { IRouter } from 'express';
import UserController from '../controllers/UserController';
import UserValidator from '../validators/user.validator';

class UserRoutes {
  private UserController = new UserController();
  private router = express.Router();
  private UserValidator = new UserValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.post('/signup', this.UserValidator.signUp, this.UserController.signUp);
    this.router.post('/login', this.UserValidator.emailValidate, this.UserController.userLogin);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;

// const router = Router();

// router.post(
//   '/register',
//   [
//     body('firstName').not().isEmpty().withMessage('First name is required'),
//     body('lastName').not().isEmpty().withMessage('Last name is required'),
//     body('email').isEmail().withMessage('Please include a valid email'),
//     body('password').isLength({ min: 6 }).withMessage('Password must be 6 or more characters'),
//   ],
//   UserController.register
// );

// router.post(
//   '/login',
//   [
//     body('email').isEmail().withMessage('Please include a valid email'),
//     body('password').exists().withMessage('Password is required'),
//   ],
//   UserController.login
// );

// export default router;
