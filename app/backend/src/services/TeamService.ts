import {
  SequelizeTeamWithMatchesAway,
  SequelizeTeamWithMatchesHome,
} from '../Interfaces/ISequelizeTeamWithMatches';
import { ITeam } from '../Interfaces/ITeam';
import { ITeamModel } from '../Interfaces/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();

    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);

    if (!team) {
      return { status: 'notFound', data: { message: `Team id ${id} not found` } };
    }

    return { status: 'SUCCESSFUL', data: team };
  }

  async leaderBoardHome(): Promise<ServiceResponse<SequelizeTeamWithMatchesHome[]>> {
    const allLeaderTeamsHome = await this.teamModel.homeLeaderBoard();
    if (allLeaderTeamsHome.length === 0) {
      return { status: 'notFound', data: { message: 'Teams not found' } };
    }

    return { status: 'SUCCESSFUL', data: allLeaderTeamsHome as SequelizeTeamWithMatchesHome[] };
  }

  async leaderBoardAway(): Promise<ServiceResponse<SequelizeTeamWithMatchesAway[]>> {
    const allLeaderTeamsAway = await this.teamModel.awayLeaderBoard();
    if (allLeaderTeamsAway.length === 0) {
      return { status: 'notFound', data: { message: 'Teams not found' } };
    }

    return { status: 'SUCCESSFUL', data: allLeaderTeamsAway as SequelizeTeamWithMatchesAway[] };
  }
}
