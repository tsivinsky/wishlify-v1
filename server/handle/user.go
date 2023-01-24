package handle

import (
	"wishlify/db"
	"wishlify/types"

	"github.com/gofiber/fiber/v2"
)

func GetUser(c *fiber.Ctx) error {
	userId := c.Locals("userId")

	var user db.User
	tx := db.Db.Where("id = ?", userId).First(&user)
	if tx.Error != nil {
		return types.MakeApiErrorResponse(c, 401, tx.Error.Error())
	}

	return c.JSON(user)
}
