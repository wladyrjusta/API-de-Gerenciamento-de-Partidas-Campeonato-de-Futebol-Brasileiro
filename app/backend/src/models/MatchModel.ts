import SequelizeMatch from '../database/models/SequelizeMtach';
import { IMacthModel } from '../Interfaces/IMatchModel';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatch, IMatchAttributesToUpdate } from '../Interfaces/IMatch';

export default class MatchModel implements IMacthModel {
  private model = SequelizeMatch;
  private teamModel = SequelizeTeam;

  async findAllWithTeams(): Promise<SequelizeMatch[]> {
    const allMatchesTeamsDb = await this.model.findAll({
      include: [
        {
          model: this.teamModel,
          as: 'homeTeam',
          foreignKey: 'home_team_id',
          attributes: { exclude: ['id'] },
        },
        { model: this.teamModel,
          as: 'awayTeam',
          foreignKey: 'away_team_id',
          attributes: { exclude: ['id'] },
        },
      ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });

    return allMatchesTeamsDb;
  }

  async findByProgressWithTeams(q: boolean): Promise<SequelizeMatch[]> {
    const allMatchesTeamsDb = await this.model.findAll({
      where: { inProgress: q },
      include: [
        {
          model: this.teamModel,
          as: 'homeTeam',
          foreignKey: 'home_team_id',
          attributes: { exclude: ['id'] },
        },
        { model: this.teamModel,
          as: 'awayTeam',
          foreignKey: 'away_team_id',
          attributes: { exclude: ['id'] },
        },
      ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });

    return allMatchesTeamsDb;
  }

  async finishMatchById(id: number): Promise<number> {
    const [affectedCount] = await this.model.update({ inProgress: false }, { where: { id } });

    return affectedCount;
  }

  async updateMatchesInProgress(
    id: number,
    fieldsToUpdate: IMatchAttributesToUpdate,
  ): Promise<number> {
    const matchToUpdate = await this.model.findByPk(id);
    const [affectedCount] = await this.model.update({
      homeTeamGoals: fieldsToUpdate.homeTeamGoals,
      awayTeamGoals: fieldsToUpdate.awayTeamGoals,
    }, {
      where: { id },
    });
    if (matchToUpdate?.inProgress === false || affectedCount === 0) return 0;

    return affectedCount;
  }

  async createMatchInProgress(match: SequelizeMatch): Promise<IMatch> {
    const newMatch = await this.model.create({ ...match, inProgress: true });

    return newMatch;
  }
}
