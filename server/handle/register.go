package handle

import (
	"database/sql"
	"wishlify/auth"
	"wishlify/db"
	"wishlify/lib"
	"wishlify/types"
	"wishlify/validation"

	"github.com/gofiber/fiber/v2"
)

func RegisterUser(c *fiber.Ctx) error {
	var body validation.RegisterUserBody

	if err := c.BodyParser(&body); err != nil {
		return lib.ErrParsingRequest
	}

	errs := validation.ValidateRegisterBody(body)
	if len(errs) > 0 {
		return types.MakeApiFormErrorResponse(c, errs)
	}

	hashedPassword, err := auth.HashPassword(body.Password)
	if err != nil {
		return lib.ErrHashingPassword
	}

	user := db.User{
		Email:       body.Email,
		Username:    body.Username,
		Password:    hashedPassword,
		ConfirmedAt: sql.NullTime{Valid: false},
	}

	tx := db.Db.Create(&user)
	if tx.Error != nil {
		return lib.ErrCreatingUser
	}

	confirmToken, err := auth.GenerateConfirmToken(user.ID)
	if err != nil {
		return lib.ErrGeneratingConfirmToken
	}

	err = lib.SendConfirmationEmail(user.Email, confirmToken)
	if err != nil {
		return lib.ErrSendingConfirmEmail
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
