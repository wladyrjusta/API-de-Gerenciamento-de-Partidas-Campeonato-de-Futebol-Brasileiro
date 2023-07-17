import MatchModel from '../models/MatchModel';
import SequelizeMatch from '../database/models/SequelizeMtach';
import { IMacthModel } from '../Interfaces/IMatchModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch, IMatchAttributesToUpdate } from '../Interfaces/IMatch';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  private teamsModel = new TeamModel();
  constructor(
    private matchModel: IMacthModel = new MatchModel(),
  ) { }

  public async getAllMtachesWithTeams(): Promise<ServiceResponse<SequelizeMatch[]>> {
    const allMatchesWithTeams = await this.matchModel.findAllWithTeams();

    return { status: 'SUCCESSFUL', data: allMatchesWithTeams };
  }

  public async getByProgressWithTeams(q: string): Promise<ServiceResponse<SequelizeMatch[]>> {
    const query = q === 'true';
    console.log(q);
    const allMatchesByProgressWithTeams = await this.matchModel.findByProgressWithTeams(query);

    return { status: 'SUCCESSFUL', data: allMatchesByProgressWithTeams };
  }

  public async finishMatchById(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const affectedCount = await this.matchModel.finishMatchById(id);
    if (affectedCount === 0) {
      return { status: 'conflict', data: { message: 'Match already finished or not found' } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatchesInProgress(
    id: number,
    fieldsToUpdate: IMatchAttributesToUpdate,
  ): Promise<ServiceResponse<ServiceMessage>> {
    const dbData = await this.matchModel.updateMatchesInProgress(id, fieldsToUpdate);
    if (dbData === 0) {
      return { status: 'notFound', data: { message: 'This Match wasnt in progress or found' } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Match scores updated' } };
  }

  public async createMatchInProgress(match: SequelizeMatch): Promise<ServiceResponse<IMatch>> {
    if (match.homeTeamId === match.awayTeamId) {
      return { status: 'invalidPostData',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const allTeams = await this.teamsModel.findAll();
    const allTeamsIds = allTeams.map((team) => team.id);
    if (!allTeamsIds.includes(match.homeTeamId) || !allTeamsIds.includes(match.awayTeamId)) {
      return { status: 'notFound', data: { message: 'There is no team with such id!' } };
    }
    const newMatch = await this.matchModel.createMatchInProgress(match);
    return { status: 'SUCCESSFUL', data: newMatch };
  }
}
