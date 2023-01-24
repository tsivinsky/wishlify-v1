package auth

import "golang.org/x/crypto/bcrypt"

const (
	PasswordSalt = 10
)

func HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), PasswordSalt)

	return string(hash), err
}
