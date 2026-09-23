require('dotenv').config(); // Importa as variáveis de ambiente do arquivo .env
const mysql = require('mysql2/promise'); // Importa o módulo mysql2/promise para usar Promises com MySQL

// Cria uma conexão com o banco de dados usando as variáveis de ambiente
// createPool permite múltiplas conexões simultâneas ao banco de dados
const connection = mysql.createPool({ 
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// TESTE para a conexão
connection.getConnection()
  .then((conn) => {
    console.log('Conectado ao MySQL com sucesso');
    conn.release();
  })
  .catch((err) => {
    console.error('Erro ao conectar com MySQL', err.message);
  });

module.exports = connection;