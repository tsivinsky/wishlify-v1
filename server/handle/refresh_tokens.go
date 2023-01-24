package handle

import (
	"wishlify/auth"
	"wishlify/db"
	"wishlify/lib"
	"wishlify/types"
	"wishlify/validation"

	"github.com/gofiber/fiber/v2"
)

func RefreshTokens(c *fiber.Ctx) error {
	var body validation.RefreshTokensBody

	if err := c.BodyParser(&body); err != nil {
		return lib.ErrParsingRequest
	}

	errs := validation.ValidateRefreshTokensBody(body)
	if len(errs) > 0 {
		return types.MakeApiFormErrorResponse(c, errs)
	}

	userId, err := auth.ValidateRefreshToken(body.RefreshToken)
	if err != nil {
		return lib.ErrValidatingRefreshToken
	}

	var user db.User
	db.Db.Where("id = ?", userId).First(&user)

	accessToken, refreshToken, err := auth.GenerateBothTokens(user.ID)
	if err != nil {
		return lib.ErrGeneratingTokens
	}

	return c.JSON(types.AuthResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	})
}
