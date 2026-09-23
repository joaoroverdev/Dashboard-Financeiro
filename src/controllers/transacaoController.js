const transacaoService = require('../services/transacaoService');

const transacaoController = {
    async listarTransacoes(req, res) {
        try {
            const transacoes = await transacaoService.listar();
            res.json(transacoes);
        } catch (err) {
            res.status(err.status || 500).json({ erro: err.message });
        }
    },

    async buscarPorId(req, res) {
        try {
            const transacao = await transacaoService.buscar(req.params.id);
            res.json(transacao);
        } catch (err) {
            res.status(err.status || 500).json({ erro: err.message });
        }
    },

    async criarTransacao(req, res) {
        try {
            const nova = await transacaoService.criar(req.body);
            res.status(201).json(nova);
        } catch (err) {
            res.status(err.status || 500).json({ erro: err.message });
        }
    },

    async atualizarTransacao(req, res) {
        try {
            const atualizada = await transacaoService.atualizar(req.params.id, req.body);
            res.json(atualizada);
        } catch (err) {
            res.status(err.status || 500).json({ erro: err.message });
        }
    },

    async deletarTransacao(req, res) {
        try {
            await transacaoService.deletar(req.params.id);
            res.status(204).send();
        } catch (err) {
            res.status(err.status || 500).json({ erro: err.message });
        }
    },

    async dashboard(req, res) {
        try {
            const dados = await transacaoService.dashboard();
            res.json(dados);
        } catch (err) {
            res.status(err.status || 500).json({ erro: err.message });
        }
    }
};

module.exports = transacaoController;