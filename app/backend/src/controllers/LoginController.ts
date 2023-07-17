import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LoginController {
  private role = '';
  constructor(
    private loginService = new LoginService(),
  ) { }

  public async verifyLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const serviceResponse = await this.loginService.verifyLogin({ email, password });

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public userLoginRole(_req: Request, res: Response) {
    this.role = res.locals.role;
    return res.status(200).json({ role: this.role });
  }
}
