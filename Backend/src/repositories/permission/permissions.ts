import { DataTypes, Model } from 'sequelize';
import sequelize from '../index';

export class Permission extends Model {
  declare id: number;
  declare description: string;
}

Permission.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Permission',
  tableName: 'permissions',
  timestamps: false,
});