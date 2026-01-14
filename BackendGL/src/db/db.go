package db

import (
	"BackendGL/src/models"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {

	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Configura a string de conexão (DNS) para o Postgre
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		getEnv("DB_HOST", "localhost"),
		getEnv("DB_USER", "postgres"),
		getEnv("DB_PASSWORD", ""),
		getEnv("DB_DATABASE", "almossar"),
		getEnv("DB_PORT", "5432"),
	)

	conn, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Migrar tabelas
	if err := conn.AutoMigrate(
		&models.Role{},
		&models.RolePermission{},
		&models.Enterprise{},
		&models.Dish{},
		&models.MenuDish{},
		&models.Menu{},
		&models.ThemeColor{},
		&models.FoodExpense{},
		&models.TotalExpense{},
		&models.Employee{},
		&models.EmployeeImage{},
		&models.Client{},
		&models.ClientImage{},
		&models.PasswordRecoveryCodes{},
		&models.Salary{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	DB = conn
	log.Println("Database connection established")
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
