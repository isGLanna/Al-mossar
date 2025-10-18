package routes

import (
	"BackendGL/src/clients"
	"BackendGL/src/controllers"
	"BackendGL/src/services"

	"github.com/gin-gonic/gin"
)

func RegisterInflationRoutes(r *gin.Engine) {
	// Inicializa o cliente e o serviço
	sidraClient := clients.NewSidraClient()
	inflationService := services.NewInflationService(sidraClient)
	inflationController := controllers.NewInflationController(inflationService)

	// Rota de teste
	r.GET("/check-food-inflation", inflationController.CheckFoodInflation)
}
