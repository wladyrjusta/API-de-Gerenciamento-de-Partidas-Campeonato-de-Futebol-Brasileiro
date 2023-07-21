import SequelizeMatch from '../database/models/SequelizeMtach';

export default class AwayLeaderBoardUtil {
  public calculateTotalPoints = ({ homeTeamGoals, awayTeamGoals }: SequelizeMatch): number => {
    if (awayTeamGoals > homeTeamGoals) return 3;
    if (awayTeamGoals < homeTeamGoals) return 0;
    if (awayTeamGoals === homeTeamGoals) return 1;
    return 0;
  };

  public calculateVictories = ({ homeTeamGoals, awayTeamGoals }: SequelizeMatch): number => {
    if (awayTeamGoals > homeTeamGoals) return 1;
    return 0;
  };

  public calculateDraws = ({ homeTeamGoals, awayTeamGoals }: SequelizeMatch): number => {
    if (awayTeamGoals === homeTeamGoals) return 1;
    return 0;
  };

  public calculateLosses = ({ homeTeamGoals, awayTeamGoals }: SequelizeMatch): number => {
    if (awayTeamGoals < homeTeamGoals) return 1;
    return 0;
  };
}
