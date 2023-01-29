package handle

import (
	"os"
	"time"
	"wishlify/auth"
	"wishlify/db"
	"wishlify/types"

	"github.com/gofiber/fiber/v2"
)

func ConfirmUserEmail(c *fiber.Ctx) error {
	token := c.Query("token")

	userId, err := auth.ValidateConfirmToken(token)
	if err != nil {
		return types.MakeApiError(400, err.Error())
	}

	var user db.User
	tx := db.Db.Where("id = ?", userId).First(&user)
	if tx.Error != nil {
		return types.MakeApiError(500, tx.Error.Error())
	}

	tx = db.Db.Model(&user).Update("confirmed_at", time.Now())
	if tx.Error != nil {
		return types.MakeApiError(500, tx.Error.Error())
	}

	webAppUrl := os.Getenv("WEB_URL")

	return c.Redirect(webAppUrl)
}
