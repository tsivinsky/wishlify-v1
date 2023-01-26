package validation

import (
	"wishlify/types"

	"github.com/go-playground/validator/v10"
)

type CreateWishlistBody struct {
	Name string `json:"name" validate:"required"`
}

func ValidateCreateWishlistBody(body CreateWishlistBody) []*types.ApiFormError {
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
