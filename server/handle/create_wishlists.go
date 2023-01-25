package handle

import (
	"wishlify/db"
	"wishlify/lib"
	"wishlify/types"
	"wishlify/validation"

	"github.com/gofiber/fiber/v2"
)

func CreateWishlists(c *fiber.Ctx) error {
	var body validation.CreateWishlistsBody

	if err := c.BodyParser(&body); err != nil {
		return lib.ErrParsingRequest
	}

	errs := validation.ValidateCreateWishlistsBody(body)
	if len(errs) > 0 {
		return types.MakeApiFormErrorResponse(c, errs)
	}

	userId := c.Locals("userId")
	var user db.User
	tx := db.Db.Where("id = ?", userId).First(&user)
	if tx.Error != nil {
		return types.MakeApiError(500, tx.Error.Error())
	}

	displayName := lib.CreateWishlistDisplayName(body.Name)

	wishlist := db.Wishlist{
		Name:        body.Name,
		DisplayName: displayName,
		Products:    []db.Product{},
		User:        user,
		UserId:      user.ID,
	}
	tx = db.Db.Create(&wishlist)
	if tx.Error != nil {
		return types.MakeApiError(500, tx.Error.Error())
	}

	return c.JSON(wishlist)
}
