import { DataTypes } from 'sequelize'
import sequelize from '..'
import { Employee } from './employee'

export const EmployeeImage = sequelize.define('EmployeeImage',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: 'employee_id',
    },
    image: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
  },
  {
    tableName: 'employee_image',
    timestamps: false,
  }
)

Employee.hasOne(EmployeeImage, {
  foreignKey: 'employeeId',
  as: 'image'
})

EmployeeImage.belongsTo(Employee, {
  foreignKey: 'employeeId',
  as: 'employee'
})
