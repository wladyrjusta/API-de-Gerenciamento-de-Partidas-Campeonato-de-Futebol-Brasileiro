import { Router, Request, Response, NextFunction } from 'express';
import MatchController from '../controllers/MatchController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const authMiddleare = new AuthMiddleware();
const matchController = new MatchController();
const matchesRouter = Router();

matchesRouter.get(
  '/',
  (req: Request, res: Response) => {
    if (req.query.inProgress) {
      matchController.getByProgressWithTeams(req, res);
    } else {
      matchController.getAllMtachesWithTeams(req, res);
    }
  },
);
matchesRouter.patch(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => authMiddleare.authMiddleare(req, res, next),
  (req: Request, res: Response) => matchController
    .updateMatchesInProgress(req, res),
);
matchesRouter.patch(
  '/:id/finish',
  (req: Request, res: Response, next: NextFunction) => authMiddleare.authMiddleare(req, res, next),
  (req: Request, res: Response) => matchController
    .finishMatchById(req, res),
);
matchesRouter.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => authMiddleare.authMiddleare(req, res, next),
  (req: Request, res: Response) => matchController
    .createMatchInProgress(req, res),
);

export default matchesRouter;
