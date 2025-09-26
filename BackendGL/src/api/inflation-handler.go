package api

import (
	"BackendGL/src/services"
	"net/http"
)

type InflationHandler struct {
	service *services.InflationService
}

func NewInflationService(s *services.InflationService) *InflationHandler {
	return &InflationHandler{service: s}
}

func (h *InflationHandler) GetInflation(w http.ResponseWriter, r *http.Request)
