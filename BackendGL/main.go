package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	InitDB()

	api := r.Group("/api")
	{
		api.POST("/dishes", createDish)
		api.DELETE("/dishes/:id", deleteDish)
	}

	r.Run(":3001") // mesmo número da sua versão Node.js
}
