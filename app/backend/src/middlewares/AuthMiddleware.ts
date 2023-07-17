import { Request, Response, NextFunction } from 'express';
import JwtUtil, { TokenPayload } from '../utils/JwtUtil';

export default class AuthMiddleware {
  private jwt = new JwtUtil();

  public async authMiddleare(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const decoded = await this.isTokenValid(authorization);
      if (decoded.length === 0) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }
      res.locals.role = decoded[0].role;
      next();
    } catch (e) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }

  public async isTokenValid(authorization: string): Promise<TokenPayload[]> {
    try {
      const tokenData = authorization.split(' ');
      const [bearer, token] = tokenData;
      const decoded = this.jwt.verifyToken(token);
      if (bearer !== 'Bearer' || !decoded.role) {
        return [decoded];
      }
      return [decoded];
    } catch (e) {
      return [];
    }
  }
}
