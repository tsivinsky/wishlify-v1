package handle

import (
	"wishlify/db"
	"wishlify/lib"
	"wishlify/types"
	"wishlify/validation"

	"github.com/gofiber/fiber/v2"
)

func CreateWishlist(c *fiber.Ctx) error {
	var body validation.CreateWishlistBody

	if err := c.BodyParser(&body); err != nil {
		return lib.ErrParsingRequest
	}

	errs := validation.ValidateCreateWishlistBody(body)
	if len(errs) > 0 {
		return types.MakeApiFormErrorResponse(c, errs)
	}

	userId := c.Locals("userId").(uint)
	var user db.User
	tx := db.Db.Where("id = ?", userId).First(&user)
	if tx.Error != nil {
		return types.MakeApiError(500, tx.Error.Error())
	}

	displayName := lib.CreateWishlistDisplayName(body.Name)

	count := db.Db.Where("user_id = ? AND display_name = ?", userId, displayName).First(&db.Wishlist{}).RowsAffected
	if count > 0 {
		_errs := []*types.ApiFormError{types.MakeApiFormError("name", "У вас уже есть вишлист с похожим названием")}
		return types.MakeApiFormErrorResponse(c, _errs)
	}

	wishlist := db.Wishlist{
		Name:        body.Name,
		DisplayName: displayName,
		Private:     body.Private,
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
