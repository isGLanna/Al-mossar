package controllers

import (
	"BackendGL/src/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateOrUpdateEnterpriseTheme(c *gin.Context) {
	token := c.Param("token")

	if token == "" {
		c.JSON(401, gin.H{"error": "Authorization token is required"})
	}

	err := services.CreateOrUpdateEnterpriseTheme(token, c)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
}

func GetEnterpriseTheme(c *gin.Context) {
	token := c.Param("token")

	if token == "" {
		c.JSON(401, gin.H{"error": "Authorization token is required"})
	}

	theme, err := services.GetEnterpriseTheme(token)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{"theme": theme})
}
