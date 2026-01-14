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
	expiration := time.Now().Add(2 * time.Minute)

	// Salvar o código no banco de dados
	recovery := models.PasswordRecoveryCode{
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

func (s *PasswordRecoveryService) checkCodeRecovery(email string, code int) (bool, error) {
	var exists bool

	if err := db.DB.Raw(
		"SELECT exists(select 1 from password_recovery where email = $1)", email).Scan(&exists).Error; err != nil {
		return false, err
	}

	return exists, nil
}

// Lógica para redefinir senha, verificando todas as variáveis da chamada de recuperação
func (s *PasswordRecoveryService) newPassword(email string, code int, password string, passwordConfirmation string) error {

	if password != passwordConfirmation {
		return fmt.Errorf("Digite senhas iguais")
	}

	var recovery models.PasswordRecoveryCode
	if err := db.DB.Where("email = ? AND code = ?", email, code).First(&recovery).Error; err != nil {
		return fmt.Errorf("Código inválido")
	}

	return nil
}
