package main

import (
	"log"
	"wishlify/db"
	"wishlify/router"

	"github.com/gofiber/fiber/v2"
)

func main() {
	err := db.Start()
	if err != nil {
		log.Fatal(err)
	}

	app := fiber.New()

	router.Start(app)

	log.Fatal(app.Listen(":5000"))
}
