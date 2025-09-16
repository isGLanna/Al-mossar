package controllers

import (
	"BackendGL/src/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetRolePermissionsByName(c *gin.Context) {
	roleName := c.Param("role")

	permissions, err := services.GetRolePermissionsByName(roleName)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"permissions": permissions})
}
