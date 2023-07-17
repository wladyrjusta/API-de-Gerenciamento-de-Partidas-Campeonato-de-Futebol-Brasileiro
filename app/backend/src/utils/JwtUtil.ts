import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export type TokenPayload = {
  email: string;
  role: string;
};

interface ITokenUtil {
  signToken(payload: TokenPayload): string;

  verifyToken(token: string): TokenPayload;
}

export default class JwtUtil implements ITokenUtil {
  private jwtUtil = jwt;
  public signToken(payload: TokenPayload): string {
    const token = this.jwtUtil.sign(payload, secret);
    return token;
  }

  public verifyToken(token: string): TokenPayload {
    const decoded = this.jwtUtil.verify(token, secret) as TokenPayload;

    return decoded;
  }
}
