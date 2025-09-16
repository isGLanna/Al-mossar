package main

import (
	"BackendGL/src/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	routes.RegisterRoutes(r)

	r.Run(":4001")
}
