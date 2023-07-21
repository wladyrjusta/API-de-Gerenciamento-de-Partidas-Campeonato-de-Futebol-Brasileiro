import HomeLeaderBoardUtil from './HomeLeaderBoardUtil';
import { SequelizeTeamWithMatchesHome } from '../Interfaces/ISequelizeTeamWithMatches';
import { ILeaderBoard } from '../Interfaces/ITeam';

export default class HomeLeaderBoard extends HomeLeaderBoardUtil {
  public generateLeaderBoard = ({ teamName, homeMatches }: SequelizeTeamWithMatchesHome) => ({
    name: teamName,
    totalPoints: homeMatches
      .map(this.calculateTotalPoints).reduce((acc, curr) => acc + curr, 0),
    totalGames: homeMatches.length,
    totalVictories: homeMatches.map(this.calculateVictories).reduce((acc, curr) => acc + curr, 0),
    totalDraws: homeMatches.map(this.calculateDraws).reduce((acc, curr) => acc + curr, 0),
    totalLosses: homeMatches.map(this.calculateLosses).reduce((acc, curr) => acc + curr, 0),
    goalsFavor: homeMatches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0),
    goalsOwn: homeMatches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0),
    goalsBalance: homeMatches
      .reduce((acc, curr) => acc + curr.homeTeamGoals, 0) - homeMatches
      .reduce((acc, curr) => acc + curr.awayTeamGoals, 0),
    efficiency: ((homeMatches
      .map(this.calculateTotalPoints)
      .reduce((acc, curr) => acc + curr, 0) / (homeMatches.length * 3)) * 100).toFixed(2),
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
