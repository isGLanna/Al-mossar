package controllers

/*
import (
	"BackendGL/src/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type InflationController struct {
	Service *services.InflationService
}

func NewInflationController(s *services.InflationService) *InflationController {
	return &InflationController{Service: s}
}

func (ctrl *InflationController) CheckFoodInflation(c *gin.Context) {
	err := ctrl.Service.CheckFoodInflation()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "erro", "message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "sucesso", "message": "Consulta realizada com sucesso"})
}

*/
