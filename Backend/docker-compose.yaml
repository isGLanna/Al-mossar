version: '3.8'

services:
  postgres:
    image: postgres:17
    container_name: postgres
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
    networks:
      - app-network
