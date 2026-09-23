const transacaoModel = require('../models/transacaoModel');

function validarTransacao({ descricao, valor, tipo, categoria, data }) {
    const erros = [];

    if (!descricao || descricao.trim().length < 2) {
        erros.push('Descrição é obrigatória (mín. 2 caracteres).');
    }
    if (!['receita', 'despesa'].includes(tipo)) {
        erros.push('Tipo deve ser "receita" ou "despesa".');
    }
    if (!categoria) {
        erros.push('Categoria é obrigatória.');
    }
    if (typeof valor !== 'number' || valor <= 0) {
        erros.push('Valor deve ser um número maior que zero.');
    }
    if (!data) {
        erros.push('Data da transação é obrigatória.');
    }
    return erros;
}

const transacaoService = {
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
        await this.buscar(id); // corrigido: era this.buscarPorId (não existe)
        const erros = validarTransacao(dados);
        if (erros.length) {
            const err = new Error(erros.join(' '));
            err.status = 400;
            throw err;
        }
        return transacaoModel.atualizarTransacao(id, dados);
    },

    async deletar(id) {
        await this.buscar(id); // corrigido: era this.buscarPorId (não existe)
        return transacaoModel.deletarTransacao(id);
    },

    async dashboard() {
        const [resumo, categorias] = await Promise.all([
            transacaoModel.resumoTransacoes(),
            transacaoModel.porCategoria()
        ]);
        return { ...resumo, por_categoria: categorias }; // corrigido: era porCategoria
    }
};

module.exports = transacaoService;