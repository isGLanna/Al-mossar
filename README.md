# 📌 Instalação das Dependências do Projeto

Este guia detalha a instalação de todas as dependências necessárias para rodar o projeto corretamente. As dependências estão separadas em **Frontend**, **Backend** e **Outras Ferramentas**.

## 

---

## 🛠️ **1. Instalação Global**
Antes de tudo, é necessário instalar algumas ferramentas externas que não fazem parte diretamente do projeto, mas são fundamentais para seu funcionamento.

### 📌 **Node.js**
O Node.js é a plataforma necessária para rodar o backend e gerenciar pacotes no frontend.

```sh
# Baixe e instale o Node.js pelo site oficial:
https://nodejs.org/
```

### 📌 **Git**
O Git é essencial para o versionamento do código e colaboração entre desenvolvedores.

```sh
# Baixe e instale o Git pelo site oficial:
https://git-scm.com/
```

Após a instalação, verifique se o Git está funcionando:
```sh
git --version
```

---

## 🎨 **2. Instalação do Frontend**
O frontend do projeto foi criado utilizando **Vite**, **React** e **TypeScript**. Para gerenciar dependências, usamos o **Yarn**.

### 📌 **Gerenciador de Pacotes - Yarn**
Optamos pelo Yarn por ser mais rápido e intuitivo.
```sh
npm install -g yarn  # Instala o Yarn globalmente
```

### 📌 **Vite + React + TypeScript**
O Vite foi utilizado para criar o ambiente do React com TypeScript.
```sh
yarn create vite frontend --template react-ts  # Cria o projeto com Vite
```

### 📌 **SASS/SCSS**
O SASS/SCSS foi escolhido para estilização, permitindo um CSS mais limpo e organizado, além de permitir algumas possibilidades de heranças.
```sh
yarn add sass  # Instala a biblioteca de estilos
```

### 📌 **TanStack Router**
Usamos o **TanStack Router** para gerenciar as rotas do frontend.
```sh
yarn add @tanstack/react-router  # Instala o roteador principal
yarn add @tanstack/react-router-devtools  # Ferramenta para desenvolvimento de rotas
```

### 📌 **Axios**
Utilizamos **Axios** para fazer requisições HTTP no frontend.
```sh
yarn add axios
```

---

## 🖥️ **3. Instalação do Backend**
O backend foi desenvolvido com **Node.js** e **Express**, utilizando **Sequelize** para consultas no banco de dados.

### 📌 **Express**
O Express é o framework utilizado para criar o servidor.
```sh
yarn add express
```

### 📌 **CORS**
O CORS é uma configuração de segurança para permitir requisições entre domínios diferentes de maneira segura.
```sh
yarn add cors  # Middleware para lidar com CORS no Express
```

### 📌 **Sequelize (ORM para banco de dados)**
Usamos o **Sequelize** para gerenciar consultas ao banco de dados.
```sh
yarn add sequelize
```
Além disso, precisamos instalar o driver do banco de dados que será utilizado. Exemplo para PostgreSQL:
```sh
yarn add pg pg-hstore
```

### 📌 **Axios (Para requisições HTTP no backend)**
O Axios também é usado no backend para consumir APIs externas.
```sh
yarn add axios
```

---

## 🛠️ **4. Outras Ferramentas Úteis**

### 📌 **TypeScript**
O projeto utiliza TypeScript para tipagem estática.
```sh
yarn add -D typescript @types/node
```

### 📌 **TS-Node e Nodemon (Ambiente de Desenvolvimento)**
Instalamos o `ts-node` para rodar TypeScript diretamente no Node.js e o `nodemon` para reiniciar o servidor automaticamente a cada alteração.
```sh
yarn add -D ts-node nodemon
```

### 📌 **TSX Watch**
O `tsx` foi instalado para facilitar a execução e transcrição de arquivos TypeScript para JavaScript em tempo real.
```sh
yarn add -D tsx
```

---

## 🚀 **5. Como Rodar o Projeto**
Após instalar todas as dependências, siga os passos abaixo para rodar o projeto.

### 📌 **Rodar o Backend**
```sh
cd backend  # Acesse a pasta do backend
yarn dev  # Inicia o servidor com nodemon
```

### 📌 **Rodar o Frontend**
```sh
cd frontend  # Acesse a pasta do frontend
yarn dev  # Inicia o Vite
```

### 📌 **Sequelize e PostgreSQL**
Utilizamos o **Sequelize** como ORM para interagir com o banco de dados **PostgreSQL**.

```sh
  yarn add sequelize pg pg-hstore  # Instala o Sequelize e o driver do PostgreSQL


Agora, o frontend e o backend estarão rodando e prontos para desenvolvimento.
