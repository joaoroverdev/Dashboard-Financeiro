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

module.exports = validarTransacao;