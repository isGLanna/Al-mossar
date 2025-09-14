package routes

import (
	"github.com/gin-gonic/gin"
	"src/controllers"
	"src/middlewares"
)

func ReigsterRoleRoutes(api *gin.RouterGroup) {
	role := api.Group("/role")
	{
		role.GET("/", controllers.ListRoles)
		role.GET("/:id", controllers.GetRolePermissions)
	}
}