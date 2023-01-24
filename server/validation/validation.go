package validation

import (
	"reflect"
	"strings"

	"github.com/go-playground/validator/v10"
)

var Valid *validator.Validate

func CreateValidator() {
	Valid = validator.New()

	Valid.RegisterTagNameFunc(func(fld reflect.StructField) string {
		name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]

		if name == "-" {
			return ""
		}

		return name
	})
}
