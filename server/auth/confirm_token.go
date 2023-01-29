package auth

import (
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type ConfirmTokenClaims struct {
	jwt.RegisteredClaims

	UserId uint `json:"userId"`
}

const (
	ConfirmTokenLifeTime = time.Hour * 5 // 5 hours
)

func GenerateConfirmToken(userId uint) (string, error) {
	claims := ConfirmTokenClaims{
		UserId: userId,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(ConfirmTokenLifeTime)),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	ss, err := token.SignedString([]byte(JWTSecret))

	return ss, err
}
