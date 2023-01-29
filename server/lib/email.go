package lib

import (
	"crypto/tls"
	"fmt"
	"os"
	"strconv"
	"time"

	mail "github.com/xhit/go-simple-mail/v2"
)

func SendEmail(to string, subject string, msg string, useHTML bool) error {
	from := os.Getenv("EMAIL_USER")
	password := os.Getenv("EMAIL_PASSWORD")
	host := os.Getenv("EMAIL_HOST")
	portStr := os.Getenv("EMAIL_PORT")

	port, err := strconv.Atoi(portStr)
	if err != nil {
		return err
	}

	server := mail.NewSMTPClient()

	server.Host = host
	server.Port = port
	server.Username = from
	server.Password = password
	server.Encryption = mail.EncryptionSSLTLS
	server.KeepAlive = false
	server.SendTimeout = 10 * time.Second
	server.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	client, err := server.Connect()
	if err != nil {
		return err
	}

	email := mail.NewMSG()

	contentType := mail.TextPlain
	if useHTML {
		contentType = mail.TextHTML
	}

	email.SetFrom(fmt.Sprintf("Wishlify <%s>", from)).AddTo(to).SetSubject(subject).SetBody(contentType, msg)

	if email.Error != nil {
		return err
	}

	err = email.Send(client)
	if err != nil {
		return err
	}

	return nil
}
