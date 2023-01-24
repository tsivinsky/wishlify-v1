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
)

var (
	ErrCreatingUser = types.MakeApiError(500, "Error creating user")
)
