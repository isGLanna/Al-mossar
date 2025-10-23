package services

import (
	"BackendGL/src/db"
	"BackendGL/src/models"

	"gorm.io/gorm"
)

type DishService struct {
	db *gorm.DB
}

func NewDishService() *DishService {
	return &DishService{db: db.DB}
}

func NewDish(name string, description string, mealType string, calories uint) *models.Dish {
	if mealType == "" {
		mealType = "almoco"
	}

	return &models.Dish{
		Name:        name,
		Description: description,
		MealType:    mealType,
		Calories:    calories,
	}
}

func CreateDish(token string, dish *models.Dish) error {
	db := db.DB

	switch dish.MealType {
	case "cafe_manha", "almoco", "cafe_tarde", "janta":
	}
	return db.Create(dish).Error
}

func (s *DishService) UpdateDish(token string, name string, description string, day string, mealType string, calories uint) error {
	enterprise := NewEnterpriseService()

	enterpriseID, err := enterprise.QueryEnterpriseID(token)

	if err != nil {
		return err
	}

	var dish models.Dish
	if err := s.db.Where("enterprise_id = ? and day = ?", enterpriseID, day).First(&dish).Error; err != nil {
		return err
	}

	return nil
}
