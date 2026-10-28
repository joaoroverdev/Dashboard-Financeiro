# DASHFIN — Dashboard Financeiro (API)

API REST para controle financeiro pessoal: cadastro de transações (receitas e despesas) e um endpoint de dashboard com o resumo dos valores. O front-end estático (pasta `public/`) é servido pela própria API.

## Stack

- Node.js + Express
- MySQL / MariaDB (driver `mysql2`)
- dotenv (variáveis de ambiente)
- Front-end estático em HTML, CSS e JavaScript

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- MySQL ou MariaDB em execução (local)
- Git

## Como instalar e rodar

```bash
git clone https://github.com/joaoroverdev/Dashboard-Financeiro.git
cd Dashboard-Financeiro
npm install
cp .env.example .env      # no Windows: copy .env.example .env
# edite o .env com as credenciais do seu banco
npm run dev               # desenvolvimento
# ou
npm start                 # execução normal
```

Depois de subir, acesse o endereço indicado no terminal (porta definida em `PORT`).

## Variáveis de ambiente

Os nomes estão em `.env.example`. O arquivo `.env` **nunca** deve ser versionado.

## Como rodar os testes

A suíte de testes automatizados ainda será criada (marco do PGC, seção 11). Quando existir:

```bash
npm test
```

## Estrutura do repositório

```
src/
  app.js            Inicialização do Express
  server.js         Inicialização do servidor HTTP
  config/           Pool de conexão MySQL
  controllers/      Camada de controller
  services/         Regras de negócio e validação
  models/           Acesso a dados das transações
  routes/           Definição das rotas da API
public/             Front-end estático (index.html, script.js, style.css)
.github/            Templates de PR/Issue e CODEOWNERS
```

## Fluxo de contribuição

O projeto segue o Plano de Gerenciamento de Configuração (PGC):

- A `main` é protegida: toda mudança entra por Pull Request aprovado por outra pessoa.
- Branches: `feature/<descricao-curta>`, `fix/<descricao-curta>`, `hotfix/<descricao>`.
- Commits e título do PR seguem *Conventional Commits* (`feat`, `fix`, `chore`, `docs`, `refactor`...).
- Merge somente por *squash*; o título do PR vira a mensagem do commit na `main`.
- Versionamento semântico (`vMAJOR.MINOR.PATCH`).
