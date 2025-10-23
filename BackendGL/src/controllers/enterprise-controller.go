package controllers

import (
	"BackendGL/src/models"
	"BackendGL/src/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateEnterpriseTheme(c *gin.Context) {
	token := c.Param("token")
	if token == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token is required"})
		return
	}

	services := services.NewEnterpriseService()

	if err := services.CreateEnterpriseTheme(token); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Theme created successfully"})
}

func UpdateEnterpriseTheme(c *gin.Context) {
	token := c.Param("token")
	if token == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token is required"})
		return
	}

	var themeData models.ThemeColor
	if err := c.BindJSON(&themeData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	services := services.NewEnterpriseService()

	if err := services.UpdateEnterpriseTheme(token, themeData); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Theme updated successfully"})
}

func GetEnterpriseTheme(c *gin.Context) {
	token := c.Param("token")
	if token == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token is required"})
		return
	}

	services := services.NewEnterpriseService()

	theme, err := services.GetEnterpriseTheme(token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"theme": theme})
}

// ==================== UPDATE ====================

func UpdateTheme(c *gin.Context) {
	token := c.Param("token")

	if token == "" {
		c.JSON(401, gin.H{"error": "Authorization token is required"})
	}

	var newTheme models.ThemeColor
	if err := c.BindJSON(&newTheme); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
	}

	services := services.NewEnterpriseService()

	if err := services.UpdateEnterpriseTheme(token, newTheme); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Theme update successfully"})
}
