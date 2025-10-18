package services

import (
	"BackendGL/src/db"
	"BackendGL/src/models"
	"errors"

	"gorm.io/gorm"
)

func CreateEnterpriseTheme(token string) error {
	var db = db.DB

	var enterpriseID uint
	if err := db.Raw(
		`SELECT id_enterprise
		FROM employee
		WHERE token = ? AND role IN ['administrador', 'gerente']`, token).Scan(&enterpriseID).Error; err != nil {
		return errors.New("invalid token or employee not found")
	}

	var theme models.ThemeColor
	if err := db.Where("enterprise_id = ?", enterpriseID).First(&theme).Error; err != nil {
		// Caso não encontre, cria um novo tema
		if errors.Is(err, gorm.ErrRecordNotFound) {
			theme = models.ThemeColor{
				EnterpriseID: enterpriseID,
			}
			if err := db.Create(&theme).Error; err != nil {
				return err
			}
			return nil
		}
		return err
	}

	return nil
}

func GetEnterpriseTheme(token string) (*models.ThemeColor, error) {
	var enterpriseID uint
	if err := db.DB.Raw(
		`SELECT id_enterprise
		FROM employee
		WHERE token = ? AND role IN ['administrador', 'gerente']`).Scan(&enterpriseID).Error; err != nil {
		return nil, errors.New("invalid token or employee not found")
	}

	var theme models.ThemeColor
	if err := db.DB.Where("enterprise_id = ?", enterpriseID).First(&theme).Error; err != nil {
		return nil, errors.New("Theme not found for the enterprise")
	}

	return &theme, nil
}

func UpdateEnterpriseTheme(token string, newTheme models.ThemeColor) error {
	enterpriseID, err := QueryEnterpriseID(token)
	if err != nil {
		return err
	}

	// Atualiza os campos necessários
	if err := db.DB.Model(&models.ThemeColor{}).
		Where("id_enterprise = ?", enterpriseID).
		Updates(newTheme).Error; err != nil {
		return err
	}

	return nil
}

func QueryEnterpriseID(token string) (int, error) {
	var employee models.Employee

	if err := db.DB.Raw(
		`SELECT ent.id_enterprise
		FROM employee as e
			JOIN enterprise AS ent ON ent.id = e.id_enterprise
		WHERE e.token = ?`, token).First(&employee).Error; err != nil {
		return 0, errors.New("Enterprise ID not found")
	}

	return int(employee.IdEnterprise), nil
}
