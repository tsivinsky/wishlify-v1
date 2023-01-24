package router

import (
	"wishlify/handle"

	"github.com/gofiber/fiber/v2"
)

func Start(app *fiber.App) {
	r := app.Group("/")

	r.Get("/", handle.IndexRoute)

	r.Post("/api/auth/register", handle.RegisterUser)
}
