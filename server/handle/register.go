package handle

import (
	"wishlify/auth"
	"wishlify/db"
	"wishlify/types"
	"wishlify/validation"

	"github.com/gofiber/fiber/v2"
)

func RegisterUser(c *fiber.Ctx) error {
	var body validation.RegisterUserBody

	if err := c.BodyParser(&body); err != nil {
		return types.MakeApiErrorResponse(c, 500, "Error parsing request body")
	}

	errs := validation.ValidateRegisterBody(body)
	if len(errs) > 0 {
		return types.MakeApiFormErrorResponse(c, errs)
	}

	hashedPassword, err := auth.HashPassword(body.Password)
	if err != nil {
		return types.MakeApiErrorResponse(c, 500, "Error hashing password")
	}

	user := db.User{
		Email:    body.Email,
		Username: body.Username,
		Password: hashedPassword,
	}

	tx := db.Db.Create(&user)
	if tx.Error != nil {
		return types.MakeApiErrorResponse(c, 500, "Error creating new user")
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
