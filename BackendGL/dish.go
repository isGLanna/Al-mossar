package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Dish struct {
	Name         string `json:"name"`
	Description  string `json:"description"`
	EnterpriseID int    `json:"id_enterprise"`
}

func createDish(c *gin.Context) {
	var dish Dish

	if err := c.ShouldBindJSON(&dish); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"erro": "JSON inválido"})
		return
	}

	query := `INSERT INTO dish (name, description, id_enterprise) VALUES ($1, $2, $3)`
	_, err := db.Exec(c, query, dish.Name, dish.Description, dish.EnterpriseID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": "Erro ao criar prato"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"mensagem": "Prato criado com sucesso"})
}

func deleteDish(c *gin.Context) {
	id := c.Param("id")

	query := `DELETE FROM dish WHERE id = $1`
	_, err := db.Exec(c, query, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": "Erro ao deletar prato"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"mensagem": "Prato deletado com sucesso"})
}
