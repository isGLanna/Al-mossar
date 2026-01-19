package services

import (
	"BackendGL/src/db"
	"BackendGL/src/models"
	"BackendGL/src/utils"
	"crypto/rand"
	"fmt"
	"math/big"
	"strconv"
	"time"
)

type PasswordRecoveryService struct {
	Mailer *utils.Mailer
}

func NewPasswordRecoveryService(mailer *utils.Mailer) *PasswordRecoveryService {
	return &PasswordRecoveryService{Mailer: mailer}
}

func generateCode() string {
	value, _ := rand.Int(rand.Reader, big.NewInt(90000))

	code := 10000 + value.Int64()
	return strconv.FormatInt(code, 10)
}

func (s *PasswordRecoveryService) SendRecoveryEmail(email string, account_type string) error {
	code := generateCode()
	expiration := time.Now().Add(5 * time.Minute)

	// Salvar o código no banco de dados
	recovery := models.PasswordRecoveryCodes{
		Email:     email,
		Code:      code,
		ExpiresAt: expiration,
	}

	var name string
	var query string

	if account_type == "employee" {
		query = "SELECT name || ' ' || surname FROM employee WHERE email = $1"
	} else {
		query = "SELECT name || ' ' || surname FROM client WHERE email = $1"
	}

	if err := db.DB.Raw(query, email).Scan(&name).Error; err != nil {
		return err
	}

	if err := db.DB.Create(&recovery).Error; err != nil {
		return err
	}

	// Formatação do e-mail
	subject := "Código de recuperação de senha"
	body := fmt.Sprintf(`
		<html>
		<body style="font-size: 14px; font-family: Arial, sans-serif; padding: 20px;">
				<p>Seu código de recuperação de senha está abaixo. Ele tem duração de 3 minutos até expirar, caso não envie a tempo, solicite o reenvio de um novo código:</p>

				<div style="text-align: center; margin: 30px 0;">
						<div style="
								display: inline-block;
								background: #F09D05;
								color: white;
								font-size: 26px;
								font-weight: bold;
								padding: 10px 20px;
								border-radius: 2cap;">
								%s
						</div>
				</div>

				<p>Se não foi você quem solicitou a recuperação de senha, por favor ignore este e-mail.</p>
				<p>Favor não responder este e-mail.</p>
		</body>
		</html>
	`, code)

	return s.Mailer.SendMail(email, subject, body)
}

func (s *PasswordRecoveryService) CheckCodeRecovery(email string, code string) (bool, error) {
	var valid bool
	var recovery models.PasswordRecoveryCodes

	if err := db.DB.Raw("SELECT expires_at FROM password_recovery_codes WHERE email = $1", email).Scan(&recovery).Error; err != nil {
		return false, err
	}

	if time.Now().UTC().After(recovery.ExpiresAt) {
		return false, fmt.Errorf("Código expirou.")
	}

	if err := db.DB.Raw(
		"SELECT exists(select 1 from password_recovery_codes where email = $1)", email).Scan(&valid).Error; err != nil {
		return false, err
	}

	return valid, nil
}

// Lógica para redefinir senha, verificando todas as variáveis da chamada de recuperação
func (s *PasswordRecoveryService) ResetPassword(email string, code string, account_type string, password string) error {
	var recovery models.PasswordRecoveryCodes
	if err := db.DB.Where("email = ? AND code = ?", email, code).First(&recovery).Error; err != nil {
		return fmt.Errorf("Código Inválido.")
	}

	resetDeadline := recovery.ExpiresAt.Add(25 * time.Minute)

	if time.Now().UTC().After(resetDeadline) {
		return fmt.Errorf("O código expirou. Tente novamente.")
	}

	hashedPassword, _ := utils.HashPassword(password)

	var update string

	if account_type == "employee" {
		update = `UPDATE employee SET password = $1 WHERE email = $2`
	} else {
		update = `UPDATE client SET password = $1 WHERE email = $2`
	}

	if err := db.DB.Exec(update, hashedPassword, email).Error; err != nil {
		return err
	}

	db.DB.Delete(&recovery)

	return nil
}
