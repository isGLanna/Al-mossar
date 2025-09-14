package routes

import (
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	api := r.Group("/api")

	{
		registerRoleRoutes(api)
	}

	r.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"error": "Endpoint not found"})
	})
}