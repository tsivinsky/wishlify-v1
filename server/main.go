package main

import (
	"log"
	"strings"
	"wishlify/db"
	"wishlify/router"
	"wishlify/types"
	"wishlify/validation"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var (
	CorsAllowedOrigins = []string{"https://wishlify.ru", "http://localhost:3000"}
)

func main() {
	err := db.Start()
	if err != nil {
		log.Fatal(err)
	}

	validation.CreateValidator()

	app := fiber.New(fiber.Config{
		ErrorHandler: types.ErrorHandler,
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins:     strings.Join(CorsAllowedOrigins, ", "),
		AllowCredentials: true,
	}))

	router.Start(app)

	log.Fatal(app.Listen(":5000"))
}
