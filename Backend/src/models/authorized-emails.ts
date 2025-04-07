import { DataTypes, Model } from 'sequelize';
import sequelize from '.'
import { Enterprise } from './enterprise'

export class AuthorizedEmail  extends Model {
  public id!: number
  public email!: string
  public id_enterprise!: Enterprise
}

AuthorizedEmail.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  id_enterprise: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
  {
    sequelize,
    modelName: 'AuthorizedEmail',
    tableName: 'authorized_emails',
    timestamps: false,
  })

AuthorizedEmail.belongsTo(Enterprise, {
  foreignKey: 'id_enterprise',
  as: 'enterprise',
})