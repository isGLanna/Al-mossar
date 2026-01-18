package models

import (
	"time"
)

type PasswordRecoveryCodes struct {
	Email     string    `gorm:"size:100;not null" json:"email"`
	Code      string    `gorm:"size:5;not null" json:"code"`
	ExpiresAt time.Time `gorm:"not null" json:"expires_at"`
	Id        uint      `gorm:"primaryKey;autoIncrement" json:"id"`
}
