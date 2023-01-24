package handle

import "github.com/gofiber/fiber/v2"

func IndexRoute(c *fiber.Ctx) error {
	return c.SendString("Welcome to Wishlify")
}
