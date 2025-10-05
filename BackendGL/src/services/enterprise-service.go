package services

import (
	"BackendGL/src/db"
	"BackendGL/src/models"
	"errors"

	"gorm.io/gorm"
)

// ==================== CREATE ====================

func CreateEnterpriseTheme(token string, theme models.ThemeColor) error {
	enterpriseID, err := QueryEnterpriseID(token)
	if err != nil {
		return errors.New("not found credential enterprise")
	}

	// Define o ID da empresa no tema
	theme.EnterpriseID = enterpriseID

	if err := db.DB.Create(&theme).Error; err != nil {
		return err
	}

	return nil
}

// ==================== READ ====================

func GetEnterpriseTheme(token string) (*models.ThemeColor, error) {
	enterpriseID, err := QueryEnterpriseID(token)
	if err != nil {
		return nil, err
	}

	var theme models.ThemeColor
	if err := db.DB.Where("enterprise_id = ?", enterpriseID).First(&theme).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("theme not found for the enterprise")
		}
		return nil, err
	}

	return &theme, nil
}

// ==================== UPDATE ====================

func UpdateEnterpriseTheme(token string, newTheme models.ThemeColor) error {
	enterpriseID, err := QueryEnterpriseID(token)
	if err != nil {
		return err
	}

	// Atualiza os campos do tema
	if err := db.DB.Model(&models.ThemeColor{}).
		Where("enterprise_id = ?", enterpriseID).
		Updates(newTheme).Error; err != nil {
		return err
	}

	return nil
}

// Retorna o ID da empresa associado ao token do funcionário
func QueryEnterpriseID(token string) (uint, error) {
	var employee models.Employee

	if err := db.DB.Raw(
		`SELECT e.id_enterprise
		FROM employee as e
		WHERE e.token = ?`, token).Scan(&employee).Error; err != nil {
		return 0, errors.New("enterprise ID not found")
	}

	return employee.IdEnterprise, nil
}
