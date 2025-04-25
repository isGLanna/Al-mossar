import { DataTypes, Model, Association } from 'sequelize'
import { Dish } from './dish'
import sequelize from '../index'

class Menu extends Model {
  public id!: number;
  public day!: string;
  public description?: string;
  public id_enterprise!: number;

  public setDishes!: (dishes: Dish[] | number[], options?: any) => Promise<void>;
  public static associations: {
    dishes: Association<Menu, Dish>;
  };
}

Menu.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Enterprise',
        key: 'id_enterprise',
      },
    },
  },
  {
    sequelize,
    modelName: 'Menu',
    tableName: 'menu',
    timestamps: false,
  }
)

export { Menu }