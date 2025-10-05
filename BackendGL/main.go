package main

import (
	"BackendGL/src/db"
	"BackendGL/src/middlewares"
	"BackendGL/src/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	db.InitDB()

	r := gin.Default()
	r.Use(middlewares.CORSMiddleware())

	routes.RegisterRoutes(r)

	r.Run("0.0.0.0:4001")
}
