import sequelize  from '../repositories'
import { QueryTypes } from 'sequelize'

export async function checkPermission(token: string): Promise<string[]> {
  try {

    // Consulta o cargo do usuário com base no token
    const role = await sequelize.query<{ role: string }>(
      `SELECT role 
      FROM users 
      WHERE token = :token`,
      {
        replacements: { token },
        type: QueryTypes.SELECT,
        raw: true
      }
    )

    if (!role || role.length === 0) {
      throw new Error('Role not found for the provided token');
    }

    // Consulta permissões associadas ao cargo
    const permissions = await sequelize.query<{ description: string }>(
      `SELECT p.name 
       FROM permissions as  p
       JOIN role_permissions rp ON p.id = rp.id
       WHERE rp.role = :role`,
      {
        replacements: { role },
        type: QueryTypes.SELECT,
        raw: true
      }
    );

    return permissions.map((perm) => perm.description);
  } catch (error) {
    console.error('Erro ao obter permissões:', error);
    throw new Error('Falha ao obter permissões');
  }
}