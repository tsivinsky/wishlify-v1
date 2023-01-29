package db

import "database/sql"

type User struct {
	Model

	Email       string       `json:"email" gorm:"unique"`
	Username    string       `json:"username" gorm:"unique"`
	Password    string       `json:"password"`
	ConfirmedAt sql.NullTime `json:"confirmedAt"`
}
