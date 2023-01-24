package auth

import (
	"errors"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func GetAccessTokenFromHeader(c *fiber.Ctx) (string, error) {
	authHeader := c.Get("Authorization")

	if authHeader == "" {
		return "", errors.New("No Authorization header in request")
	}

	accessToken := strings.Split(authHeader, " ")[1]

	return accessToken, nil
}
