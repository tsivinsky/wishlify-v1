package types

import "github.com/gofiber/fiber/v2"

type ApiError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func (e *ApiError) Error() string {
	return e.Message
}

type ApiFormError struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

type ApiFormErrorResponse struct {
	Errors []ApiFormError `json:"errors"`
}

func MakeApiError(code int, message string) *ApiError {
	return &ApiError{
		Code:    code,
		Message: message,
	}
}

func MakeApiFormError(field, message string) *ApiFormError {
	return &ApiFormError{
		Field:   field,
		Message: message,
	}
}

func MakeApiErrorResponse(c *fiber.Ctx, code int, message string) error {
	return c.Status(code).JSON(fiber.Map{
		"message": message,
	})
}

func MakeApiFormErrorResponse(c *fiber.Ctx, errs []*ApiFormError) error {
	return c.Status(400).JSON(fiber.Map{
		"errors": errs,
	})
}

func ErrorHandler(c *fiber.Ctx, err error) error {
	if e, ok := err.(*ApiError); ok {
		return MakeApiErrorResponse(c, e.Code, e.Message)
	}

	return c.Status(500).JSON(fiber.Map{
		"message": err.Error(),
	})
}
