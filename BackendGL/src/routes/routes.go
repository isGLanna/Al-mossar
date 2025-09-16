package routes

import (
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	api := r.Group("/api")

	{
		RegisterRoleRoutes(api)
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
