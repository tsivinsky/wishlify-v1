package handle

import (
	"wishlify/auth"
	"wishlify/db"
	"wishlify/types"
	"wishlify/validation"

	"github.com/gofiber/fiber/v2"
)

func LoginUser(c *fiber.Ctx) error {
	var body validation.LoginUserBody

	if err := c.BodyParser(&body); err != nil {
		return types.MakeApiErrorResponse(c, 500, "Error parsing request body")
	}

	errs := validation.ValidateLoginBody(body)
	if len(errs) > 0 {
		return types.MakeApiFormErrorResponse(c, errs)
	}

	var user db.User
	tx := db.Db.Where("email = ?", body.Email).First(&user)
	if tx.Error != nil {
		return types.MakeApiErrorResponse(c, 500, tx.Error.Error())
	}

	accessToken, refreshToken, err := auth.GenerateBothTokens(user.ID)
	if err != nil {
		return types.MakeApiErrorResponse(c, 500, "Error generating tokens")
	}

	return c.JSON(types.AuthResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	})
}
