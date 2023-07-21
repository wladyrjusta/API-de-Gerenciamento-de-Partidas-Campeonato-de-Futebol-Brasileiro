import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import SequelizeTeam from './SequelizeTeam';
import db from '.';

class SequelizeMatch extends Model<InferAttributes<SequelizeMatch>,
InferCreationAttributes<SequelizeMatch>> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

SequelizeMatch.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'matches',
  timestamps: false,
});

SequelizeMatch.belongsTo(SequelizeTeam, {
  foreignKey: 'home_team_id', as: 'homeTeam',
});
SequelizeMatch.belongsTo(SequelizeTeam, {
  foreignKey: 'away_team_id', as: 'awayTeam',
});
SequelizeTeam.hasMany(SequelizeMatch, {
  foreignKey: 'home_team_id', as: 'homeMatches',
});
SequelizeTeam.hasMany(SequelizeMatch, {
  foreignKey: 'away_team_id', as: 'awayMatches',
});

export default SequelizeMatch;
