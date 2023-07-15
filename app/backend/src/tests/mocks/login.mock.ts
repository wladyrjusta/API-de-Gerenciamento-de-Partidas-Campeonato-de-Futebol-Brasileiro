import { IUser } from "../../Interfaces/IUser";

const token = 'valid-token';

const tokenResponse = { token: token };

const noEmailPasswordError = { status: 'invalidData', data: { message: 'All fields must be filled' }, };

const invalidEmailPasswordError = { status: 'unauthorized', data: { message: 'Invalid email or password' },
};

const userReturn: IUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const validLoginUser = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const invalidPassword = {
  email: 'user@admin.com',
  password: '123',
};

const invalidLoginUser = {
  email: 'user@admin.com',
  password: 'secret_admin',
};

const noCredentialsLoginUser = {
  email: '',
  password: 'secret_admin',
};

export default {
  token,
  invalidEmailPasswordError,
  noEmailPasswordError,
  validLoginUser,
  userReturn,
  tokenResponse,
  invalidLoginUser,
  noCredentialsLoginUser,
  invalidPassword,
}
