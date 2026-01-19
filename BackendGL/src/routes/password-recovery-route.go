package routes

import (
	"BackendGL/src/controllers"
	"BackendGL/src/services"
	"BackendGL/src/utils"

	"github.com/gin-gonic/gin"
)

func RegisterPasswordRecoveryRoutes(r *gin.RouterGroup, mailer *utils.Mailer) {
	service := services.NewPasswordRecoveryService(mailer)
	controller := controllers.NewPasswordController(service)

	r.POST("/password-recovery", controller.SendRecoveryEmail)
	r.POST("/check-code-recovery", controller.CheckCodeRecoveryController)
	r.POST("/password-reset", controller.ResetPasswordController)
}
