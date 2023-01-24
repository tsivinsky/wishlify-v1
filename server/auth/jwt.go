package auth

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

const (
	AccessTokenLifeTime  = time.Hour * 24      // 24 hours
	RefreshTokenLifeTime = time.Hour * 24 * 30 // 30 days
)

var (
	JWTSecret = os.Getenv("JWT_SECRET")
)

type AccessTokenClaims struct {
	jwt.RegisteredClaims

	UserId uint `json:"userId"`
}

func GenerateAccessToken(userId uint) (string, error) {
	claims := AccessTokenClaims{
		UserId: userId,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(AccessTokenLifeTime)),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	ss, err := token.SignedString([]byte(JWTSecret))

	return ss, err
}

func GenerateRefreshToken() (string, error) {
	claims := jwt.RegisteredClaims{
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(RefreshTokenLifeTime)),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	ss, err := token.SignedString([]byte(JWTSecret))

	return ss, err
}

func GenerateBothTokens(userId uint) (string, string, error) {
	accessToken, err := GenerateAccessToken(userId)
	if err != nil {
		return "", "", err
	}

	refreshToken, err := GenerateRefreshToken()
	if err != nil {
		return "", "", err
	}

	return accessToken, refreshToken, nil
}
