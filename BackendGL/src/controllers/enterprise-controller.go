package controllers

import (
	"BackendGL/src/models"
	"BackendGL/src/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

// ==================== CREATE ====================

func CreateEnterpriseTheme(c *gin.Context) {
	token := c.Param("token")

	if token == "" {
		c.JSON(401, gin.H{"error": "Authorization token is required"})
		return
	}

	var theme models.ThemeColor
	if err := c.BindJSON(&theme); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	if err := services.CreateEnterpriseTheme(token, theme); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Theme created successfully"})
}

// ==================== READ ====================

func GetEnterpriseTheme(c *gin.Context) {
	token := c.Param("token")

	if token == "" {
		c.JSON(401, gin.H{"error": "Authorization token is required"})
		return
	}

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

	if err := services.UpdateEnterpriseTheme(token, newTheme); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Theme update successfully"})
}
