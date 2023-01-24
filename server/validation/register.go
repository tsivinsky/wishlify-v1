package validation

import (
	"wishlify/db"
	"wishlify/types"

	"github.com/go-playground/validator/v10"
)

type RegisterUserBody struct {
	Email    string `json:"email" validate:"required,email"`
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required,min=6"`
}

func ValidateRegisterBody(body RegisterUserBody) []*types.ApiFormError {
	var errs []*types.ApiFormError

	err := Valid.Struct(body)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			e := types.MakeApiFormError(err.Field(), err.ActualTag())

			errs = append(errs, e)
		}
	}

	if body.Email != "" {
		c := db.Db.Where(&db.User{Email: body.Email}).First(&db.User{}).RowsAffected
		if c > 0 {
			errs = append(errs, types.MakeApiFormError("email", "Email уже зарегистрирован"))
		}
	}

	if body.Username != "" {
		c := db.Db.Where(&db.User{Username: body.Username}).First(&db.User{}).RowsAffected
		if c > 0 {
			errs = append(errs, types.MakeApiFormError("username", "Этот никнейм уже занят"))
		}
	}

	return errs
}
