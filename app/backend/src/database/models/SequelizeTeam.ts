import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import db from '.';

import SequelizeMatche from './SequelizeMtache';

class SequelizeTeam extends Model<InferAttributes<SequelizeTeam>,
InferCreationAttributes<SequelizeTeam>> {
  declare id: CreationOptional<number>;

  declare teamName: string;
}

SequelizeTeam.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'teams',
  timestamps: false,
});

SequelizeMatche.belongsTo(SequelizeTeam, {
  foreignKey: 'home_team_id', as: 'homeTeam',
});
SequelizeMatche.belongsTo(SequelizeTeam, {
  foreignKey: 'away_team_id', as: 'awayTeam',
});
SequelizeTeam.hasMany(SequelizeMatche, {
  foreignKey: 'home_team_id', as: 'homeMatches',
});
SequelizeTeam.hasMany(SequelizeMatche, {
  foreignKey: 'away_team_id', as: 'awayMatches',
});

export default SequelizeTeam;
