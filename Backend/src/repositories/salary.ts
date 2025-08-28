import {DataTypes, Model} from "sequelize";
import sequelize from '.';
import { Employee } from './employee'

export class Salary extends Model {
  public id!: number;
  public employee_id!: string;
  public amount!: number;
  public effective_date!: Date;
  public updated_at!: Date;
}

Salary.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Employee',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    effective_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at:{
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Salary',
    tableName: 'salary',
    timestamps: false,
  }
)

Salary.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee' });
Employee.hasOne(Salary, { foreignKey: 'employee_id', as: 'salary', onDelete: 'CASCADE' });