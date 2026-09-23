const express = require('express');
const router = express.Router();
const transacaoController = require('../controllers/transacaoController');
 
// Precisa vir ANTES de '/transacoes/:id', senão "dashboard" seria
// interpretado como um :id e cairia na rota errada.
router.get('/transacoes/dashboard', transacaoController.dashboard);
 
router.get('/transacoes', transacaoController.listarTransacoes);
router.get('/transacoes/:id', transacaoController.buscarPorId);
 
router.post('/transacoes', transacaoController.criarTransacao);
 
router.put('/transacoes/:id', transacaoController.atualizarTransacao);
 
router.delete('/transacoes/:id', transacaoController.deletarTransacao);
 
module.exports = router;
 