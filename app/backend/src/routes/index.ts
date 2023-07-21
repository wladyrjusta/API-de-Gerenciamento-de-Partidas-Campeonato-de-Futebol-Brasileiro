import { Router } from 'express';
import teamsRouter from './teams.routes';
import loginRouter from './login.routes';
import matchesRouter from './matches.routes';
import leaderBoardRouter from './leaderBoard.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
