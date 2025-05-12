package main

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

var db *pgxpool.Pool

func InitDB() {
	dsn := "postgres://usuario:senha@localhost:5432/seubanco"
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var err error
	db, err = pgxpool.New(ctx, dsn)
	if err != nil {
		log.Fatalf("Erro ao conectar no banco: %v", err)
		os.Exit(1)
	}
}
