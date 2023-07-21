import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/SequelizeMtach';

export interface SequelizeTeamWithMatchesHome extends SequelizeTeam {
  homeMatches: SequelizeMatch[];
}

export interface SequelizeTeamWithMatchesAway extends SequelizeTeam {
  awayMatches: SequelizeMatch[];
}
