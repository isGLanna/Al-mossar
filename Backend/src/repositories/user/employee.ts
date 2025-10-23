import { DataTypes, Model } from 'sequelize'
import { Enterprise } from '../enterprise'
import sequelize from '..'


export class Employee extends Model{
  declare id: number
  declare email: string
  declare password?: string
  declare name?: string
  declare surname?: string
  declare id_enterprise?: number
  declare start_of_contract?: string
  declare end_of_contract?: string
  declare role?: string
  declare telephone?: string
  declare address?: string
  declare token?: string
}

Employee.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_enterprise: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Enterprise,
            key: 'id',
        },
    },
    start_of_contract: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_of_contract: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'Employee',
    tableName: 'employee',
  }
)

Employee.belongsTo(Enterprise, {foreignKey: 'id_enterprise', as: 'enterprise'})
Enterprise.hasMany(Employee, { foreignKey: 'id_enterprise', as: 'employees' });