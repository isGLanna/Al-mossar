package models

import "github.com/google/uuid"

type Client struct {
	ID           uuid.UUID  `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Email        string     `gorm:"unique;not null" json:"email"`
	CPF          string     `gorm:"size:11;unique;not null" json:"cpf"`
	Name         string     `gorm:"size:25" json:"name"`
	Surname      string     `gorm:"size:75" json:"surname"`
	Balance      float64    `gorm:"type:numeric(10,2)" json:"balance"`
	Token        *string    `json:"token"`
	IdEnterprise uint       `gorm:"not null" json:"id_enterprise"`
	Enterprise   Enterprise `gorm:"foreignKey:IdEnterprise; references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"enterprise"`
}

type ClientImage struct {
	IdClient uuid.UUID `gorm:"type:uuid;primaryKey;not null" json:"client_id"`
	Client   Client    `gorm:"foreignKey:IdClient;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"client"`
	Image    []byte    `gorm:"type:bytea" json:"image"`
}

type UserResponse struct {
	Email   string `json:"email"`
	Name    string `json:"name"`
	Surname string `json:"surname,omitempty"`
	Role    string `json:"role"`
}

func (Client) TableName() string {
	return "client"
}

func (ClientImage) TableName() string {
	return "client_image"
}
