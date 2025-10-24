package controllers

import (
	"BackendGL/src/services"
	"fmt"
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

// Consulta informações do usuário para criar objeto Employee
func GetUserInfo(c *gin.Context) {
	token := c.GetHeader("Authorization")
	token = token[len("Bearer "):]
	fmt.Printf("Passou aqui")

	if token == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token is required"})
		return
	}

	user, err := services.GetUserInfo(token)
	fmt.Printf("Passou aqui")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": user})
}
