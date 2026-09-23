const express = require('express'); // Importa o express
const cors = require('cors');
const transacaoRoutes = require('./routes/transacaoRoutes');

const app = express(); 

app.use(cors());
app.use(express.json()); 
app.use(express.static('public'));


app.get('/', (req,res) => {
    res.json({ status: 'API do Dashboard Financeiro no ar'});
});

app.use('/api', transacaoRoutes);

app.use((req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada'});
});

module.exports = app; 