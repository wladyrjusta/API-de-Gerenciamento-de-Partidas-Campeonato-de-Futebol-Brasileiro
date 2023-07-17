import SequelizeMatche from '../database/models/SequelizeMtach';
import { IMatch, IMatchAttributesToUpdate } from './IMatch';

export interface IMacthModel {
  findAllWithTeams(): Promise<SequelizeMatche[]>;
  findByProgressWithTeams(q: boolean): Promise<SequelizeMatche[]>;
  finishMatchById(id: number): Promise<number>;
  updateMatchesInProgress(id: number, fieldsToUpdate: IMatchAttributesToUpdate)
  : Promise<number>;
  createMatchInProgress(match: SequelizeMatche): Promise<IMatch>;
}
