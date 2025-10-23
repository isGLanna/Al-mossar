package models

type Dish struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Name        string `gorm:"size:255; not null" json:"name"`
	Description string `gorm:"not null" json:"description"`
	MealType    string `gorm:"varchar(20);not null; check:meal_type IN ('cafe_manha', 'almoco', 'cafe_tarde', 'janta')" json:"meal_type"`
	Calories    uint   `json:"calories"`
}

type MenuDish struct {
	ID     uint `gorm:"primaryKey"`
	MenuID uint
	Menu   Menu `gorm:"foreignKey:MenuID;constraint: OnUpdate:CASCADE, OnDelete:CASCADE" json:"menu_dish"`
	DishID uint
	Dish   Dish `gorm:"foreignKey:DishID;constraint: OnUpdate:CASCADE, OnDelete:CASCADE" json:"dish"`
}

type Menu struct {
	ID           uint   `gorm:"primaryKey"`
	Day          string `gorm:"type:date; not null"`
	EnterpriseID uint
	Enterprise   Enterprise `gorm:"foreignKey:EnterpriseID;constraint: OnUpdate:CASCADE, OnDelete:CASCADE" json:"enterprise"`
	Dishes       []Dish     `gorm:"many2many:menu_dish; constraint: OnUpdate:CASCADE, OnDelete:CASCADE" json:"dish"`
}
