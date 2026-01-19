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

// ==========================	METHODS ============================

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

func (ctrl *PasswordRecoveryController) CheckCodeRecoveryController(c *gin.Context) {
	var req struct {
		Email string `json:"email" binding:"required,email"`
		Code  string `json:"code" binding:"required,len=5"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	valid, err := ctrl.Service.CheckCodeRecovery(req.Email, req.Code)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if !valid {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid or expired code"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Code is valid"})
}

func (ctrl *PasswordRecoveryController) ResetPasswordController(c *gin.Context) {
	var req struct {
		Email                string `json:"email" binding:"required,email"`
		Code                 string `json:"code" binding:"required,len=5"`
		AccountType          string `json:"account_type" binding:"required,oneof=employee client"`
		Password             string `json:"password" binding:"required,min=4,max=16"`
		PasswordConfirmation string `json:"confirmPassword" binding:"required,min=4,max=16,eqfield=Password"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := ctrl.Service.ResetPassword(req.Email, req.Code, req.AccountType, req.Password)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Password reset successfully"})
}
