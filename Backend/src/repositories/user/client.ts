import sequelize from '..'
import { DataTypes } from 'sequelize'

export const Client = sequelize.define('Client', 
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    surname: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING
    },
    id_enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'enterprises', 
        key: 'id'
      }
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
  },
  {
    tableName: 'client',
    timestamps: false 
  }
)