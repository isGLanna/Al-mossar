package routes

import (
	"BackendGL/src/utils"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine, mailer *utils.Mailer) {
	api := r.Group("/api")

	{
		RegisterPasswordRecoveryRoutes(api, mailer)
		RegisterRoleRoutes(api)
		RegisterHealthRoutes(api)
	}

	r.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"error": "Endpoint not found"})
	})
}

func RegisterHealthRoutes(api *gin.RouterGroup) {
	api.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "pong"})
	})
}
