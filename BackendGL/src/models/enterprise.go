package models

import "time"

type Enterprise struct {
	ID   uint   `gorm:"primaryKey" json:"id"`
	Name string `gorm:"not null" json:"name"`
}

func (Enterprise) TableName() string {
	return "enterprise"
}

// =================== THEME COLORS ===================

type ThemeColor struct {
	ID              uint       `gorm:"primaryKey" json:"id"`
	EnterpriseID    uint       `gorm:"not null" json:"enterprise_id"`
	Enterprise      Enterprise `gorm:"foreignKey:EnterpriseID;references:ID;constraint:OnUpdate:CASCADE" json:"enterprise"`
	Branding500     string     `gorm:"size:7" json:"branding_500"`
	Second500       string     `gorm:"size:7" json:"second_500"`
	Second500A      string     `gorm:"size:9" json:"second_500_a"`
	BackgroundColor string     `gorm:"size:7" json:"background_color"`
	TextColor       string     `gorm:"size:7" json:"text_color"`
	MenuContainers  string     `gorm:"size:7" json:"menu_containers"`
}

func (ThemeColor) TableName() string {
	return "theme_colors"
}

// =================== FOOD EXPENSE ===================

type FoodExpense struct {
	ID           uint       `gorm:"primaryKey" json:"id"`
	EnterpriseID uint       `gorm:"not null" json:"enterprise_id"`
	Enterprise   Enterprise `gorm:"foreingnKey:EnterpriseID;references:ID;constraint:OnUpdate:CASCADE" json:"enterprise"`
	Amoung       float64    `gorm:"type:numeric(10,2); not null" json:"amount"`
	ExpenseDate  time.Time  `gorm:"not null; default:CURRENT_DATE" json:"expense_date"`
	CreatedAt    time.Time  `gorm:"autoCreateTime" json:"created_at"`
}

func (FoodExpense) TableName() string {
	return "food_expense"
}

// =================== TOTAL EXPENSE ===================

type TotalExpense struct {
	ID           uint       `gorm:"primaryKey" json:"id"`
	EnterpriseID uint       `gorm:"not null" json:"enterprise_id"`
	Enterprise   Enterprise `gorm:"foreignKey:EnterpriseID;references:ID;constraint:OnUpdate:CASCADE" json:"enterprise"`
	Category     string     `gorm:"size:50; not null; check:category IN ('aluguel','luz','agua','gas')" json:"category"`
	Amount       float64    `gorm:"type:numeric(10,2); not null" json:"amount"`
	ExpenseData  time.Time  `gorm:"not null; default:CURRENT_DATE" json:"expense_date"`
	CreatedAt    time.Time  `gorm:"autoCreateTime" json:"created_at"`
}

func (TotalExpense) TableName() string {
	return "total_expense"
}
