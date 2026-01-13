package utils

import (
	"fmt"
	"net/smtp"
)

type Mailer struct {
	Host     string
	Port     string
	Username string
	Password string
	From     string
}

func NewMailer(host string, port string, username, password, from string) *Mailer {
	return &Mailer{
		Host:     host,
		Port:     port,
		Username: username,
		Password: password,
		From:     from,
	}
}

func (m *Mailer) SendMail(to, subject, body string) error {
	headers := fmt.Sprintf(
		"From: %s\r\n"+
			"To: %s\r\n"+
			"Subject: %s\r\n"+
			"MIME-Version: 1.0;\r\n"+
			"Content-Type: text/html; charset=\"UTF-8\";\r\n\r\n",
		m.From, to, subject,
	)

	msg := []byte(headers + body)

	addr := fmt.Sprintf("%s:%s", m.Host, m.Port)
	auth := smtp.PlainAuth("", m.Username, m.Password, m.Host)


	// Enviar o e-mail
	if err := smtp.SendMail(addr, auth, m.From, []string{to}, msg); err != nil {
		fmt.Println("Erro no envio:", err)
		return err
	}

	return nil
}
