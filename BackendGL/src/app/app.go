package app

import (
	"log"
	"os"

	"BackendGL/src/routes"
	"BackendGL/src/utils"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func SetupApp(r *gin.Engine) {

	if err := godotenv.Load(); err != nil {
		log.Println("Não deu conta de abrir o .env")
	}

	mailer := utils.NewMailer(
		os.Getenv("MAIL_HOST"),
		os.Getenv("MAIL_PORT"),
		os.Getenv("MAIL_USER"),
		os.Getenv("MAIL_PASS"),
		os.Getenv("MAIL_FROM"),
	)

	routes.RegisterRoutes(r, mailer)
}
