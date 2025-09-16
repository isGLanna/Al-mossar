package models

import "time"

type Enterprise struct {
	ID   uint   `gorm:"primaryKey" json:"id"`
	Name string `gorm:"not null" json:"name"`
}

// =================== TOTAL EXPENSE ===================

type TotalExpense struct {
	ID           uint       `gorm:"primaryKey" json:"id"`
	EnterpriseID uint       `gorm:"not null" json:"enterprise_id"`
	Enterprise   Enterprise `gorm:"foreignKey:EnterpriseID; constraint:OnUpdate:CASCADE" json:"enterprise"`
	Category     string     `gorm:"size:50; not null; check:category IN ('aluguel','luz','água','gás')" json:"category"`
	Amount       float64    `gorm:"type:numeric(10,2); not null" json:"amount"`
	ExpenseData  time.Time  `gorm:"not null; default:CURRENT_DATE" json:"expense_date"`
	CreatedAt    time.Time  `gorm:"autoCreateTime" json:"created_at"`
}
