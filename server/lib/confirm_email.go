package lib

import (
	"fmt"
	"os"
)

func SendConfirmationEmail(to string, token string) error {
	appUrl := os.Getenv("APP_URL")

	msg := fmt.Sprintf(`<a href="%s/confirm-email?token=%s">Перейдите по этой ссылке</a>`, appUrl, token)

	err := SendEmail(to, "Подтвердите свой аккаунт", msg, true)
	if err != nil {
		return err
	}

	return nil
}
