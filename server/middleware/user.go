package middleware

import (
	"wishlify/auth"
	"wishlify/db"
	"wishlify/types"

	"github.com/gofiber/fiber/v2"
)

func ValidateAuth(c *fiber.Ctx) error {
	accessToken, err := auth.GetAccessTokenFromHeader(c)
	if err != nil {
		return types.MakeApiErrorResponse(c, 401, err.Error())
	}

	userId, err := auth.ValidateAccessToken(accessToken)
	if err != nil {
		return types.MakeApiErrorResponse(c, 401, err.Error())
	}

	var user db.User
	tx := db.Db.Where("id = ?", userId).First(&user)
	if tx.Error != nil {
		return types.MakeApiErrorResponse(c, 401, err.Error())
	}

	c.Locals("userId", userId)

	return c.Next()
}
