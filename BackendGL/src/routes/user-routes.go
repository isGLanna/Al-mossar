package routes

import (
	"BackendGL/src/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterRoleRoutes(api *gin.RouterGroup) {
	api.GET("/user-info", controllers.GetUserInfo)
	role := api.Group("/role")
	{
		role.GET("/:role/permissions", controllers.GetRolePermissionsByName)
	}
}
