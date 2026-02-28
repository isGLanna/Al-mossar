import { DataTypes, Model, Association } from 'sequelize'
import { Dish } from './dish'
import sequelize from '../index'

class Menu extends Model {
  public id!: number;
  public day!: string;
  public enterprise_id!: number;
  public setDishes!: (dishes: Dish[] | number[], options?: any) => Promise<void>;
  public removeDish!: (dish: Dish | number) => Promise<void>;
  public dishes?: Dish[];
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
    enterprise_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Enterprise',
        key: 'id',
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