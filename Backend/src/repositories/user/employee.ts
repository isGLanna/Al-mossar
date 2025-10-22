import { DataTypes } from 'sequelize'
import { Enterprise } from '../enterprise'
import { Permission } from '../permission/permissions'
import sequelize from '..'

export interface EmployeeAttributes {
  id: number
  email: string
  password?: string
  name?: string
  surname: string
  id_enterprise?: number
  start_of_contract?: Date
  end_of_contract?: Date
  role: string
  telefone?: string
  endereco?: string
  token?: string
}

export const Employee = sequelize.define('Employee',
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
        telefone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        endereco: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        token: {
          type: DataTypes.STRING,
          allowNull: true,
        }
    },
    {
        tableName: 'employee',
        timestamps: false,
    }
)

Employee.belongsTo(Enterprise, {foreignKey: 'id_enterprise', as: 'enterprise'})
Enterprise.hasMany(Employee, { foreignKey: 'id_enterprise', as: 'employees' });