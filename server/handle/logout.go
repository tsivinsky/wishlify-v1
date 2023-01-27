package handle

import (
	"wishlify/lib"

	"github.com/gofiber/fiber/v2"
)

func LogoutUser(c *fiber.Ctx) error {
	lib.DeleteTokenCookies(c)

	return c.JSON(fiber.Map{
		"message": "cookies cleared",
	})
}
