import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

class Enterprise extends Model {
    public id!: number;
    public name!: string;
}

Enterprise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Enterprise',
    tableName: 'enterprise',
    timestamps: false
  },
)

export { Enterprise }