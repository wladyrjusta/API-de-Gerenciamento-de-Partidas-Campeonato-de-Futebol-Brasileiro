import { Request, Response, Router, NextFunction } from 'express';
import LoginController from '../controllers/LoginController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const authMiddleware = new AuthMiddleware();
const loginController = new LoginController();

const loginRouter = Router();

loginRouter.post(
  '/',
  (req: Request, res: Response) => loginController.verifyLogin(req, res),
);
loginRouter.get(
  '/role',
  (req: Request, res: Response, next: NextFunction) => authMiddleware.authMiddleare(req, res, next),
  (req: Request, res: Response) => loginController.userLoginRole(req, res),
);

export default loginRouter;
