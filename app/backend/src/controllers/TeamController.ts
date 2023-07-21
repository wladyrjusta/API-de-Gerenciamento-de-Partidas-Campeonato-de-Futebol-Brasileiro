import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import HomeLeaderBoard from '../utils/HomeLeaderBoard';
import AwayLeaderBoard from '../utils/AwayLeaderBoard';

export default class TeamController {
  private homeLeaderBoardUtil = new HomeLeaderBoard();
  private awayLeaderBoardUtil = new AwayLeaderBoard();
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAllTeams();
    return res.status(200).json(serviceResponse.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const serviceResponse = await this.teamService.getTeamById(id);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async leaderBoardHome(_req: Request, res: Response) {
    const serviceResponseHome = await this.teamService.leaderBoardHome();
    if (serviceResponseHome.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponseHome.status)).json(serviceResponseHome.data);
    }
    const allTeamsMatches = serviceResponseHome.data;
    const data = allTeamsMatches.map(this.homeLeaderBoardUtil.generateLeaderBoard);
    const sortedLeaderBoard = this.homeLeaderBoardUtil.sortLeaderBoard(data);
    return res.status(200).json(sortedLeaderBoard);
  }

  public async leaderBoardAway(_req: Request, res: Response) {
    const serviceResponseAway = await this.teamService.leaderBoardAway();
    if (serviceResponseAway.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponseAway.status)).json(serviceResponseAway.data);
    }
    const allTeamsMatches = serviceResponseAway.data;
    const data = allTeamsMatches.map(this.awayLeaderBoardUtil.generateLeaderBoard);
    const sortedLeaderBoard = this.awayLeaderBoardUtil.sortLeaderBoard(data);
    return res.status(200).json(sortedLeaderBoard);
  }
}
