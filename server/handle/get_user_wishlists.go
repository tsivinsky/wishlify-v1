package handle

import (
	"wishlify/db"
	"wishlify/types"

	"github.com/gofiber/fiber/v2"
)

func GetUserWishlists(c *fiber.Ctx) error {
	userId := c.Locals("userId")

	var wishlists []db.Wishlist
	tx := db.Db.Where("user_id = ?", userId).Preload("User").Preload("Products").Find(&wishlists)
	if tx.Error != nil {
		return types.MakeApiError(500, tx.Error.Error())
	}

	return c.JSON(wishlists)
}
