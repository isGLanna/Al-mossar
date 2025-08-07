import { RolePermission } from "./role-permission"
import { Permission } from './permissions'

export async function getPermissionsByRole(role: string): Promise<string[]> {
  const rolePermissions = await RolePermission.findAll({
    where: { role },
    include: [{
      model: Permission,
      attributes: ['description'],
    }]
  })
  
  return rolePermissions
  .map(rp => rp.Permission?.description)
  .filter((desc): desc is string => Boolean(desc));
}
