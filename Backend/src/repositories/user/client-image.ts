// src/models/ClientImage.ts
import { DataTypes } from 'sequelize'
import sequelize from '..'
import { Client } from './client'

export const ClientImage = sequelize.define('ClientImage', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'clients', key: 'id' }
  },
  image: { type: DataTypes.BLOB('long'), allowNull: false }
}, {
  tableName: 'client_image',
  timestamps: false
})


Client.hasOne(ClientImage, {
  foreignKey: 'clientId',
  as: 'image'
})

ClientImage.belongsTo(Client, {
  foreignKey: 'clientId',
  as: 'client'
})