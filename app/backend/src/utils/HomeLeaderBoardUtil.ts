import SequelizeMatch from '../database/models/SequelizeMtach';

export default class HomeLeaderBoardUtil {
  public calculateTotalPoints = ({ homeTeamGoals, awayTeamGoals }: SequelizeMatch): number => {
    if (homeTeamGoals > awayTeamGoals) return 3;
    if (homeTeamGoals < awayTeamGoals) return 0;
    if (homeTeamGoals === awayTeamGoals) return 1;
    return 0;
  };

  public calculateVictories = ({ homeTeamGoals, awayTeamGoals }: SequelizeMatch): number => {
    if (homeTeamGoals > awayTeamGoals) return 1;
    return 0;
  };

  public calculateDraws = ({ homeTeamGoals, awayTeamGoals }: SequelizeMatch): number => {
    if (homeTeamGoals === awayTeamGoals) return 1;
    return 0;
  };

  public calculateLosses = ({ homeTeamGoals, awayTeamGoals }: SequelizeMatch): number => {
    if (homeTeamGoals < awayTeamGoals) return 1;
    return 0;
  };
}
