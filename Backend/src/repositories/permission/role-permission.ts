import { DataTypes, Model } from 'sequelize'
import sequelize from '../index'
import { Permission } from './permissions'

export class RolePermission extends Model {
  declare id: number
  declare role: string
  declare Permission: Permission
}

RolePermission.init({
  role: DataTypes.STRING,
  permission_id: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'RolePermission',
  tableName: 'role_permissions',
  timestamps: false,
})

Permission.hasMany(RolePermission, { foreignKey: 'id' })
RolePermission.belongsTo(Permission, { foreignKey: 'id' })