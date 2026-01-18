package utils

func HashPassword(password string) (string, error) {
	bytes, err := bycript.GenerateFromPassword(password, bycript.DefaultCost)

	return bytes
}
