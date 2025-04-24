import { DataTypes, Model } from 'sequelize'
import sequelize from '../index'

class Dish extends Model {
  public id!: number;
  public name!: string;
  public description?: string;
  public id_enterprise!: number;
}

Dish.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false}
  },
  {
    sequelize,
    modelName: 'Dish',
    tableName: 'dish',
    timestamps: false,
  }
)

export { Dish }