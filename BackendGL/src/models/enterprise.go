package models

import "time"

type Enterprise struct {
	ID   uint   `gorm:"primaryKey" json:"id"`
	Name string `gorm:"not null" json:"name"`
}

func (Enterprise) TableName() string {
	return "enterprise"
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
