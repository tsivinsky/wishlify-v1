package db

type Wishlist struct {
	Model

	Name        string    `json:"name"`
	DisplayName string    `json:"displayName"`
	Products    []Product `json:"products"`
	User        User      `json:"user"`
	UserId      uint      `json:"userId"`
}
