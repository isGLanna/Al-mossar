package models

import "time"

type Employee struct {
	ID              uint       `gorm:"primaryKey" json:"id"`
	Name            string     `gorm:"not null" json:"name"`
	Surname         string     `json:"surname"`
	Email           string     `gorm:"unique;not null" json:"email"`
	Password        string     `json:"password"`
	Role            string     `json:"role"`
	StartOfContract time.Time  `json:"start_of_contract"`
	EndOfContract   *time.Time `json:"end_of_contract"`
	Telefone        string     `json:"telefone"`
	Address         string     `json:"endereco"`
	Token           string     `json:"token"`
	IdEnterprise    uint       `gorm:"column:id_enterprise; not null" json:"enterprise_id"`
	Enterprise      Enterprise `gorm:"foreignKey:IdEnterprise;references:ID;" json:"enterprise"`
}

func (Employee) TableName() string {
	return "employee"
}

// =================== SALARY ===================

type Salary struct {
	ID            uint      `gorm:"primaryKey" json:"id"`
	EmployeeID    uint      `gorm:"not null" json:"employee_id"`
	Employee      Employee  `gorm:"foreignKey:EmployeeID;constraint:OnUpdate:CASCADE;" json:"employee"`
	Amount        float64   `gorm:"type:numeric(10,2);not null" json:"amount"`
	EffectiveDate time.Time `gorm:"autoCreateTime" json:"effective_date"`
	UpdatedAt     time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}

func (Salary) TableName() string {
	return "salary"
}
