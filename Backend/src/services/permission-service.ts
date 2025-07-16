import { sequelize } from '../repositories/'
import { QueryTypes } from 'sequelize'

export async function checkPermission(role: string): Promise<string[]> {
  try {
    const permissions = await sequelize.query(
      `SELECT p.name FROM permissions p
       JOIN role_permissions rp ON p.id = rp.permission_id
       WHERE rp.role_name = :role`,
      {
        replacements: { role },
        type: QueryTypes.SELECT,
        raw: true
      }
    );

    return permissions.map((perm: { name: string }) => perm.name);
  } catch (error) {
    console.error('Erro ao obter permissões:', error);
    throw new Error('Falha ao obter permissões');
  }
}