package routes

import (
	"BackendGL/src/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterEnterpriseRoutes(api *gin.RouterGroup) {
	enterprise := api.Group("/enterprise")
	{
		enterprise.POST("/:id/theme", controllers.CreateOrUpdateEnterpriseTheme)
		enterprise.GET("/:id/theme", controllers.GetEnterpriseTheme)
	}

}
