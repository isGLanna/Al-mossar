package models

type Role struct {
	ID          uint             `gorm:"primaryKey" json:"id"`
	Name        string           `gorm:"unique;not null" json:"name"`
	Permissions []RolePermission `gorm:"foreignKey:RoleID" json:"permissions"`
}

type RolePermission struct {
	ID         uint   `gorm:"primaryKey" json:"id"`
	RoleID     uint   `gorm:"not null" json:"role_id"`
	Permission string `gorm:"not null" json:"permission"`
}
