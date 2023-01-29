package lib

import "wishlify/types"

var (
	ErrParsingRequest = types.MakeApiError(500, "Error parsing request body")
)

var (
	ErrHashingPassword        = types.MakeApiError(500, "Error hashing password")
	ErrGeneratingTokens       = types.MakeApiError(500, "Error generating auth tokens")
	ErrValidatingAccessToken  = types.MakeApiError(401, "Error validating access token")
	ErrValidatingRefreshToken = types.MakeApiError(401, "Error validating refresh token")
	ErrGeneratingConfirmToken = types.MakeApiError(500, "Error generating confirm token")
	ErrSendingConfirmEmail    = types.MakeApiError(500, "Error sending confirm email")
)

var (
	ErrCreatingUser = types.MakeApiError(500, "Error creating user")
)
