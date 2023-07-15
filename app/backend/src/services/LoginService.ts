import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import { IUserModel } from '../Interfaces/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILoginCredentials } from '../Interfaces/ILoginCredentials';
import { IToken } from '../Interfaces/IToken';
import { IUser } from '../Interfaces/IUser';
import JwtUtil from '../utils/JwtUtil';

export default class LoginService {
  private jwt = new JwtUtil();
  private emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private invalidEmailPasswordData = { message: 'Invalid email or password' };
  private noEmailPassword = { message: 'All fields must be filled' };

  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async verifyLogin(loginCredentials: ILoginCredentials): Promise<ServiceResponse<IToken>> {
    if (!loginCredentials.email || !loginCredentials.password) {
      return { status: 'invalidData', data: this.noEmailPassword };
    }
    if (!this.validateEmail(loginCredentials.email) || loginCredentials.password.length < 6) {
      return { status: 'unauthorized', data: this.invalidEmailPasswordData };
    }
    const token = await this.userEmailPasswordDBValidation(loginCredentials);
    if (!token) {
      return { status: 'unauthorized', data: this.invalidEmailPasswordData };
    }
    return { status: 'SUCCESSFUL', data: { token } };
  }

  private validateEmail(email: string): boolean {
    return this.emailRegex.test(email);
  }

  private async userEmailPasswordDBValidation(
    loginCredentials: ILoginCredentials,
  ): Promise<string | null> {
    const dbUser = await this.userModel.findByEmail(loginCredentials.email);
    if (
      !dbUser || !bcrypt.compareSync(loginCredentials.password, dbUser.password)
    ) return null;
    const { email, role } = dbUser as IUser;
    const token = this.jwt.signToken({ email, role });
    return token;
  }
}
