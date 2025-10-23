package services

import (
	"BackendGL/src/db"
	"BackendGL/src/models"
	"errors"

	"gorm.io/gorm"
)

type EnterpriseService struct {
	db *gorm.DB
}

func NewEnterpriseService() *EnterpriseService {
	return &EnterpriseService{db: db.DB}
}

func (s *EnterpriseService) CreateEnterpriseTheme(token string) error {
	var enterpriseID uint

	if err := s.db.Raw(
		`SELECT id_enterprise
		FROM employee
		WHERE token = ? AND role IN ['administrador', 'gerente']`, token).Scan(&enterpriseID).Error; err != nil {
		return errors.New("invalid token or employee not found")
	}

	var theme models.ThemeColor
	if err := s.db.Where("enterprise_id = ?", enterpriseID).First(&theme).Error; err != nil {
		// Caso não encontre, cria um novo tema
		if errors.Is(err, gorm.ErrRecordNotFound) {
			theme = models.ThemeColor{
				EnterpriseID: enterpriseID,
			}
			if err := s.db.Create(&theme).Error; err != nil {
				return err
			}
			return nil
		}
		return err
	}

	return nil
}

// ==================== READ ====================

func (s *EnterpriseService) GetEnterpriseTheme(token string) (*models.ThemeColor, error) {
	enterpriseID, err := s.QueryEnterpriseID(token)
	if err != nil {
		return nil, err
	}

	var theme models.ThemeColor
	if err := s.db.Where("enterprise_id = ?", enterpriseID).First(&theme).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("theme not found for the enterprise")
		}
		return nil, err
	}

	return &theme, nil
}

// ==================== UPDATE ====================

func (s *EnterpriseService) UpdateEnterpriseTheme(token string, newTheme models.ThemeColor) error {
	enterpriseID, err := s.QueryEnterpriseID(token)
	if err != nil {
		return err
	}

	// Atualiza os campos do tema
	if err := s.db.Model(&models.ThemeColor{}).
		Where("enterprise_id = ?", enterpriseID).
		Updates(newTheme).Error; err != nil {
		return err
	}

	return nil
}

// Retorna o ID da empresa associado ao token do funcionário
func (s *EnterpriseService) QueryEnterpriseID(token string) (uint, error) {
	var employee models.Employee

	if err := s.db.Raw(
		`SELECT e.id_enterprise
		FROM employee as e
		WHERE e.token = ?`, token).Scan(&employee).Error; err != nil {
		return 0, errors.New("enterprise ID not found")
	}

	return employee.IdEnterprise, nil
}
