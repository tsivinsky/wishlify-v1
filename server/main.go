package main

import (
	"log"
	"wishlify/db"
	"wishlify/router"
	"wishlify/types"
	"wishlify/validation"

	"github.com/gofiber/fiber/v2"
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

	router.Start(app)

	log.Fatal(app.Listen(":5000"))
}
