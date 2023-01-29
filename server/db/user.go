package db

import (
	"time"
)

type User struct {
	Model

	Email       string     `json:"email" gorm:"unique"`
	Username    string     `json:"username" gorm:"unique"`
	Password    string     `json:"password"`
	ConfirmedAt *time.Time `json:"confirmedAt"`
}
