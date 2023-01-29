package lib

import (
	"crypto/tls"
	"fmt"
	"net/smtp"
	"os"
)

func SendEmail(to string, subject string, msg string, useHTML bool) error {
	from := os.Getenv("EMAIL_USER")
	password := os.Getenv("EMAIL_PASSWORD")
	host := os.Getenv("EMAIL_HOST")
	port := os.Getenv("EMAIL_PORT")

	addr := fmt.Sprintf("%s:%s", host, port)

	contentType := "text/plain"

	if useHTML {
		contentType = "text/html"
	}

	message := fmt.Sprintf(`From: Wishlify<%s>
To: %s
Subject: %s
Content-Type: %s

%s`, from, to, subject, contentType, msg)

	auth := smtp.PlainAuth("Wishlify", from, password, host)

	conn, err := tls.Dial("tcp", addr, &tls.Config{ServerName: host})
	if err != nil {
		return err
	}

	client, err := smtp.NewClient(conn, host)
	if err != nil {
		return err
	}

	err = client.Auth(auth)
	if err != nil {
		return err
	}

	err = client.Mail(from)
	if err != nil {
		return err
	}

	err = client.Rcpt(to)
	if err != nil {
		return err
	}

	w, err := client.Data()
	if err != nil {
		return err
	}

	_, err = w.Write([]byte(message))
	if err != nil {
		return err
	}

	err = w.Close()
	if err != nil {
		return err
	}

	err = client.Quit()
	if err != nil {
		return err
	}

	return nil
}
