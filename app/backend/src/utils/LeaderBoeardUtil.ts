import { ILeaderBoard } from '../Interfaces/ITeam';

export default class LeaderBoardUtil {
  public generateLeaderBoard = (
    homeMatches: ILeaderBoard[],
    awayMatches: ILeaderBoard[],
  ): ILeaderBoard[] => {
    const leaderBoard = homeMatches.map((matches, index) => ({
      name: matches.name,
      totalPoints: matches.totalPoints + awayMatches[index].totalPoints,
      totalGames: matches.totalGames + awayMatches[index].totalGames,
      totalVictories: matches.totalVictories + awayMatches[index].totalVictories,
      totalDraws: matches.totalDraws + awayMatches[index].totalDraws,
      totalLosses: matches.totalLosses + awayMatches[index].totalLosses,
      goalsFavor: matches.goalsFavor + awayMatches[index].goalsFavor,
      goalsOwn: matches.goalsOwn + awayMatches[index].goalsOwn,
      goalsBalance: matches.goalsBalance + awayMatches[index].goalsBalance,
      efficiency: (((matches.totalPoints + awayMatches[index].totalPoints) / ((matches
        .totalGames + awayMatches[index]
        .totalGames) * 3)) * 100).toFixed(2),
    }));
    return leaderBoard;
  };

  public compareByName = (teamA: ILeaderBoard, teamB: ILeaderBoard): number => {
    const nameTeamA = teamA.name;
    const nameTeamB = teamB.name;
    if (nameTeamA < nameTeamB) return -1;
    if (nameTeamA > nameTeamB) return 1;
    return 0;
  };
}
