package validation

import (
	"wishlify/auth"
	"wishlify/db"
	"wishlify/types"

	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

type LoginUserBody struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

func ValidateLoginBody(body LoginUserBody) []*types.ApiFormError {
	var errs []*types.ApiFormError

	err := Valid.Struct(body)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			e := types.MakeApiFormError(err.Field(), err.ActualTag())

			errs = append(errs, e)
		}
	}

	if len(errs) == 0 {
		var user db.User
		tx := db.Db.Where("email = ?", body.Email).First(&user)
		if tx.Error == gorm.ErrRecordNotFound {
			errs = append(errs, types.MakeApiFormError("email", "Неверный адрес почты"))
		}

		matched := auth.ComparePasswordAndHash(body.Password, user.Password)
		if !matched {
			errs = append(errs, types.MakeApiFormError("password", "Неверный пароль"))
		}
	}

	return errs
}
