package controllers

import (
	"BackendGL/src/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

//========== Constructor ==========

type PasswordRecoveryController struct {
	Service *services.PasswordRecoveryService
}

func NewPasswordController(service *services.PasswordRecoveryService) *PasswordRecoveryController {
	return &PasswordRecoveryController{Service: service}
}

// ==============================

func (ctrl *PasswordRecoveryController) SendRecoveryEmail(c *gin.Context) {
	var r struct {
		Email        string `json:"email" binding:"required,email"`
		Account_type string `json:"account_type" binding:"required,oneof=client employee"`
	}

	if err := c.ShouldBindJSON(&r); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := ctrl.Service.SendRecoveryEmail(r.Email, r.Account_type)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Recovery email sent"})
}
