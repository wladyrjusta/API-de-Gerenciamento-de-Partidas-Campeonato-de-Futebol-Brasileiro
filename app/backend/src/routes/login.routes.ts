import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';

const loginController = new LoginController();

const loginRouter = Router();

loginRouter.post(
  '/',
  (req: Request, res: Response) => loginController.verifyLogin(req, res),
);

export default loginRouter;
