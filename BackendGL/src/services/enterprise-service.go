package services

import (
	"BackendGL/src/db"
	"BackendGL/src/models"
	"errors"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateOrUpdateEnterpriseTheme(token string, c *gin.Context) error {
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
		return nil, errors.New("theme not found for the enterprise")
	}

	return &theme, nil
}
