package router

import (
	"wishlify/handle"
	"wishlify/middleware"

	"github.com/gofiber/fiber/v2"
)

func Start(app *fiber.App) {
	r := app.Group("/")

	r.Get("/", handle.IndexRoute)

	r.Post("/api/auth/register", handle.RegisterUser)
	r.Post("/api/auth/login", handle.LoginUser)
	r.Post("/api/auth/refresh-tokens", handle.RefreshTokens)

	r.Get("/api/user", middleware.ValidateAuth, handle.GetUser)
}
