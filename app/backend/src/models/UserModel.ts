import SequelizeUser from '../database/models/SequelizeUser';
import { IUser } from '../Interfaces/IUser';
import { IUserModel } from '../Interfaces/IUserModel';

export default class TeamModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const dbData = await this.model.findOne({
      where: { email },
    });
    if (!dbData) return null;

    return dbData;
  }
}
