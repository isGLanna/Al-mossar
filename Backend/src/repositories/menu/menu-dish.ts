import { DataTypes, Model} from "sequelize";
import sequelize from "../index"

class MenuDish extends Model {}

MenuDish.init(
  {
    id_menu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'menu', key: 'id' },
    },
    id_dish: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'dish', key: 'id' },
    },
  },
  {
    sequelize,
    modelName: 'MenuDish',
    tableName: 'menu_dish',
    timestamps: false,
  }
)

export { MenuDish }