package lib

import (
	"os"
	"time"
	"wishlify/auth"

	"github.com/gofiber/fiber/v2"
)

func SaveTokensInCookies(c *fiber.Ctx, accessToken, refreshToken string) {
	appHost := os.Getenv("APP_HOST")

	c.Cookie(&fiber.Cookie{
		Name:     "accessToken",
		Value:    accessToken,
		Path:     "/",
		Domain:   appHost,
		Secure:   true,
		HTTPOnly: true,
		SameSite: "Lax",
		Expires:  time.Now().Add(auth.AccessTokenLifeTime),
	})

	c.Cookie(&fiber.Cookie{
		Name:     "refreshToken",
		Value:    refreshToken,
		Path:     "/",
		Domain:   appHost,
		Secure:   true,
		HTTPOnly: true,
		SameSite: "Lax",
		Expires:  time.Now().Add(auth.RefreshTokenLifeTime),
	})
}
