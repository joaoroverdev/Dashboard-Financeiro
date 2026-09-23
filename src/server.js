const db = require('./config/database'); // Importa a conexão do banco de dados
const app = require('./app'); // Importa a instância do express do arquivo app.js

const PORT = process.env.PORT || 3000; // Porta do servidor, usando a variável de ambiente ou 3000 

async function startServer() {
  try { 
    const connection = await db.getConnection(); // Obtém uma conexão do pool
    connection.release(); // Libera a conexão de volta para o pool
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    }); 
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
}

startServer(); // Inicia o servidor