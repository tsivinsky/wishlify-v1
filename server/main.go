package main

import (
	"log"
	"wishlify/router"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	router.Start(app)

	log.Fatal(app.Listen(":5000"))
}
