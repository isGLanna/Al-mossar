package models

type Client struct {
	ID           uint       `gorm:"primaryKey" json:"id"`
	CPF          string     `gorm:"size:11;unique;not null" json:"cpf"`
	Name         string     `gorm:"size:50" json:"name"`
	Balance      float64    `gorm:"type:numeric(10,2)" json:"balance"`
	Token        *string    `json:"token"` // ponteiro permite null
	IdEnterprise uint       `gorm:"not null" json:"id_enterprise"`
	Enterprise   Enterprise `gorm:"foreignKey:IdEnterprise;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"enterprise"`
}
