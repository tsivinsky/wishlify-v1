package lib

import (
	"regexp"
	"strings"
)

var re = regexp.MustCompile(`[^A-z|0-9|А-я]`)

func CreateWishlistDisplayName(name string) string {
	lowerCased := strings.ToLower(name)

	displayName := re.ReplaceAll([]byte(lowerCased), []byte("_"))

	return string(displayName)
}
