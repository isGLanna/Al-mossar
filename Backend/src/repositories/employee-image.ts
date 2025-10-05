import { DataTypes, Model } from 'sequelize'
import sequelize from '.'

class EmployeeImage extends Model{
  public id !: number;
  public employee_id!: number;
  public image !: Buffer;
}

EmployeeImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'EmployeeImage',
    tableName: 'employee_image',
    timestamps: false,
  }
)

export {EmployeeImage}
