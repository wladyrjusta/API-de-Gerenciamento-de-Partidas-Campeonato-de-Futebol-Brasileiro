import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/SequelizeMtach';
import { ITeam } from '../Interfaces/ITeam';
import { ITeamModel } from '../Interfaces/ITeamModel';
import {
  SequelizeTeamWithMatchesAway,
  SequelizeTeamWithMatchesHome,
} from '../Interfaces/ISequelizeTeamWithMatches';

export default class TeamModel implements ITeamModel {
  private matchModel = SequelizeMatch;
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();

    return dbData;
  }

  async findById(id: number): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;

    return dbData;
  }

  async homeLeaderBoard(): Promise<SequelizeTeamWithMatchesHome[]> {
    const leaderBoardHome = await this.model.findAll({
      include: [{
        model: this.matchModel,
        as: 'homeMatches',
        foreignKey: 'home_team_id',
        where: { inProgress: false },
      }],
    });

    return leaderBoardHome as SequelizeTeamWithMatchesHome[];
  }

  async awayLeaderBoard(): Promise<SequelizeTeamWithMatchesAway[]> {
    const leaderBoardAway = await this.model.findAll({
      include: [{
        model: this.matchModel,
        as: 'awayMatches',
        foreignKey: 'away_team_id',
        where: { inProgress: false },
      }],
    });

    return leaderBoardAway as SequelizeTeamWithMatchesAway[];
  }
}
