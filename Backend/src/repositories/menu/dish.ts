import { DataTypes, Model } from 'sequelize'
import sequelize from '../index'

class Dish extends Model {
  public id!: number;
  public name!: string;
  public description?: string;
  public meal_type!: 'cafe_manha' | 'almoco' | 'cafe_tarde' | 'janta'
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
    meal_type: {
      type: DataTypes.ENUM('cafe_manha', 'almoco', 'cafe_tarde', 'janta'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Dish',
    tableName: 'dish',
    timestamps: false,
  }
)

export { Dish }