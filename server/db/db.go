package db

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Db *gorm.DB

func Start() error {
	var err error

	host := os.Getenv("DATABASE_HOST")
	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	name := os.Getenv("POSTGRES_DB")
	port := "5432"

	uri := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Europe/Moscow", host, user, password, name, port)

	Db, err = gorm.Open(postgres.Open(uri))
	if err != nil {
		return err
	}

	err = Db.AutoMigrate(&User{})

	return err
}
