import { Router, Request, Response } from 'express';
import TeamController from '../controllers/TeamController';

const leaderBoardRouter = Router();
const teamController = new TeamController();

leaderBoardRouter.get(
  '/home',
  (req: Request, res: Response) => teamController.leaderBoardHome(req, res),
);

leaderBoardRouter.get(
  '/away',
  (req: Request, res: Response) => teamController.leaderBoardAway(req, res),
);

leaderBoardRouter.get(
  '/',
  (req: Request, res: Response) => teamController.leaderBoard(req, res),
);

export default leaderBoardRouter;
