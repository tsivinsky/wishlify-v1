package handle

import (
	"wishlify/auth"
	"wishlify/db"
	"wishlify/lib"
	"wishlify/types"
	"wishlify/validation"

	"github.com/gofiber/fiber/v2"
)

func LoginUser(c *fiber.Ctx) error {
	var body validation.LoginUserBody

	if err := c.BodyParser(&body); err != nil {
		return lib.ErrParsingRequest
	}

	errs := validation.ValidateLoginBody(body)
	if len(errs) > 0 {
		return types.MakeApiFormErrorResponse(c, errs)
	}

	var user db.User
	tx := db.Db.Where("email = ?", body.Email).First(&user)
	if tx.Error != nil {
		return types.MakeApiError(500, tx.Error.Error())
	}

	accessToken, refreshToken, err := auth.GenerateBothTokens(user.ID)
	if err != nil {
		return lib.ErrGeneratingTokens
	}

	lib.SaveTokensInCookies(c, accessToken, refreshToken)

	return c.JSON(types.AuthResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	})
}
