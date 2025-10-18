package main

import (
	"BackendGL/src/app"
	"BackendGL/src/db"
	"BackendGL/src/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {
	db.InitDB()

	r := gin.Default()
	r.Use(middlewares.CORSMiddleware())

	r = app.SetupApp()
	r.Run(":4001")
}
