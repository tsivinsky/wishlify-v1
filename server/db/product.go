package db

type Product struct {
	Model

	Name       string `json:"name"`
	WishlistId uint   `json:"wishlistId"`
}
