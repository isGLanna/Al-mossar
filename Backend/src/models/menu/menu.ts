import { DataTypes, Model } from 'sequelize'
import { Enterprise } from '../enterprise'
import sequelize from '../index'

class Menu extends Model {
  public id!: number;
  public day!: Date;
  public description?: string;
  public id_enterprise!: number
}

Menu.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    day: {
      type: DataTypes.INTEGER,
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
    timestamps: false,
  }
)

export { Menu }