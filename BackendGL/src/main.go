package main

import (
	"github.com/gin-gonic/gin"
	"src/db"
	"src/routes"
)


func main() {
	r := gin.Default()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	db.Init()

	routes.RegisterRoutes(r)

	api := r.Group("/api")
	{
		api.POST("/dishes", createDish)
		api.DELETE("/dishes/:id", deleteDish)
	}

	r.Run(":4001")
}
