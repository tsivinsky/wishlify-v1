package validation

import (
	"wishlify/types"

	"github.com/go-playground/validator/v10"
)

type RefreshTokensBody struct {
	RefreshToken string `json:"refreshToken" validate:"required"`
}

func ValidateRefreshTokensBody(body RefreshTokensBody) []*types.ApiFormError {
	var errs []*types.ApiFormError

	err := Valid.Struct(body)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			e := types.MakeApiFormError(err.Field(), err.ActualTag())

			errs = append(errs, e)
		}
	}

	return errs
}
