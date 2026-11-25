const transacaoModel = require('../models/transacaoModel');
const validarTransacao = require('../utils/validarTransacao');

const transacaoService = {
    validarTransacao,
    async listar() {
        return transacaoModel.listarTransacoes();
    },
    async buscar(id) {
        const transacao = await transacaoModel.buscarPorId(id);
        if (!transacao) {
            const err = new Error('Transação não encontrada');
            err.status = 404;
            throw err;
        }
        return transacao;
    },
    async criar(dados) {
        const erros = validarTransacao(dados);
        if (erros.length) {
            const err = new Error(erros.join(' '));
            err.status = 400;
            throw err;
        }
        return transacaoModel.criarTransacao(dados);
    },
    async atualizar(id, dados) {
        await this.buscar(id);
        const erros = validarTransacao(dados);
        if (erros.length) {
            const err = new Error(erros.join(' '));
            err.status = 400;
            throw err;
        }
        return transacaoModel.atualizarTransacao(id, dados);
    },
    async deletar(id) {
        await this.buscar(id);
        return transacaoModel.deletarTransacao(id);
    },
    async dashboard() {
        const [resumo, categorias] = await Promise.all([
            transacaoModel.resumoTransacoes(),
            transacaoModel.porCategoria()
        ]);
        return { ...resumo, por_categoria: categorias };
    }
};

module.exports = transacaoService;