package services

import (
	"BackendGL/src/db"
	"BackendGL/src/models"
	"errors"
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

func GetUserInfo(token string) (*models.UserResponse, error) {
	db := db.DB

	var employee models.Employee
	if err := db.Raw(
		`SELECT email, name, surname, role
		FROM employee
		WHERE token = ?`, token).Scan(&employee).Error; err == nil {
		return &models.UserResponse{
			Email:   employee.Email,
			Name:    employee.Name,
			Surname: employee.Surname,
			Role:    employee.Role,
		}, nil
	}

	var client models.Client
	if err := db.Where("token = ?", token).First(&client).Error; err == nil {
		return &models.UserResponse{
			Email:   client.Email,
			Name:    client.Name,
			Surname: client.Surname,
			Role:    "client",
		}, nil
	}

	return nil, errors.New("not find user with provided token")
}
