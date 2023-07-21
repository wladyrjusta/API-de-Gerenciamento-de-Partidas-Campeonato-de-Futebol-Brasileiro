import AwayLeaderBoardUtil from './AwayLeaderBoardUtil';
import {
  SequelizeTeamWithMatchesAway,
} from '../Interfaces/ISequelizeTeamWithMatches';
import { ILeaderBoard } from '../Interfaces/ITeam';

export default class AwayLeaderBoard extends AwayLeaderBoardUtil {
  public generateLeaderBoard = (
    { teamName, awayMatches }: SequelizeTeamWithMatchesAway,
  ): ILeaderBoard => ({
    name: teamName,
    totalPoints: awayMatches
      .map(this.calculateTotalPoints).reduce((acc, curr) => acc + curr, 0),
    totalGames: awayMatches.length,
    totalVictories: awayMatches.map(this.calculateVictories).reduce((acc, curr) => acc + curr, 0),
    totalDraws: awayMatches.map(this.calculateDraws).reduce((acc, curr) => acc + curr, 0),
    totalLosses: awayMatches.map(this.calculateLosses).reduce((acc, curr) => acc + curr, 0),
    goalsFavor: awayMatches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0),
    goalsOwn: awayMatches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0),
    goalsBalance: awayMatches
      .reduce((acc, curr) => acc + curr.awayTeamGoals, 0) - awayMatches
      .reduce((acc, curr) => acc + curr.homeTeamGoals, 0),
    efficiency: ((awayMatches
      .map(this.calculateTotalPoints)
      .reduce((acc, curr) => acc + curr, 0) / (awayMatches.length * 3)) * 100).toFixed(2),
  });

  public sortLeaderBoard = (leaderBoard: ILeaderBoard[]): ILeaderBoard[] => {
    const sortedLeaderBoard = leaderBoard.sort((teamA, teamB) => {
      if (teamA.totalPoints !== teamB.totalPoints) {
        return teamB.totalPoints - teamA.totalPoints;
      }
      if (teamA.totalVictories !== teamB.totalVictories) {
        return teamB.totalVictories - teamA.totalVictories;
      }
      if (teamA.goalsBalance !== teamB.goalsBalance) {
        return teamB.goalsBalance - teamA.goalsBalance;
      }

      return teamB.goalsFavor - teamA.goalsFavor;
    });
    return sortedLeaderBoard;
  };
}
