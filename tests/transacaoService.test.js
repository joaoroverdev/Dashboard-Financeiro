const { test } = require('node:test');
const assert = require('node:assert/strict');
const validarTransacao = require('../src/utils/validarTransacao');

const transacaoValida = {
    descricao: 'Salário',
    valor: 1500,
    tipo: 'receita',
    categoria: 'Trabalho',
    data: '2026-11-25'
};

test('aceita transação com valor positivo', () => {
    assert.deepEqual(validarTransacao(transacaoValida), []);
});

test('rejeita transação com valor zero', () => {
    const erros = validarTransacao({ ...transacaoValida, valor: 0 });
    assert.ok(erros.includes('Valor deve ser um número maior que zero.'));
});

test('rejeita transação com valor negativo', () => {
    const erros = validarTransacao({ ...transacaoValida, valor: -10 });
    assert.ok(erros.includes('Valor deve ser um número maior que zero.'));
});