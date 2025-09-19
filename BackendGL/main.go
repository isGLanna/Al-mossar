package main

import (
	"BackendGL/src/middlewares"
	"BackendGL/src/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(middlewares.CORSMiddleware())

	routes.RegisterRoutes(r)

	r.Run(":4001")
}
