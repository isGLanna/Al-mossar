package services

import (
	"BackendGL/src/db"
	"BackendGL/src/models"
)

// Consulta as permissões associadas ao cargo do usuário
func GetRolePermissionsByName(roleName string) ([]models.RolePermission, error) {
	var role models.Role

	if err := db.DB.Where("name = ?", roleName).First(&role).Error; err != nil {
		return nil, err
	}

	var permissions []models.RolePermission

	if err := db.DB.Where("role_id = ?", role.ID).Find(&permissions).Error; err != nil {
		return nil, err
	}

	return permissions, nil
}
