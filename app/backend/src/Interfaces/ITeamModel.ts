import { ITeam } from './ITeam';
import {
  SequelizeTeamWithMatchesAway,
  SequelizeTeamWithMatchesHome,
} from './ISequelizeTeamWithMatches';

export interface ITeamModel {
  findAll(): Promise<ITeam[]>;
  findById(id: ITeam['id']): Promise<ITeam | null>;
  homeLeaderBoard(): Promise<SequelizeTeamWithMatchesHome[]>;
  awayLeaderBoard(): Promise<SequelizeTeamWithMatchesAway[]>;
}
