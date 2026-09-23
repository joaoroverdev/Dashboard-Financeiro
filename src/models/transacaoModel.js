const database = require('../config/database'); 

const transacaoModel = {
    async listarTransacoes() {
        const [rows] = 
            await database.query(`SELECT * FROM transacoes ORDER BY data DESC`);
        return rows;
    },

    async buscarPorId(id){
        const [rows] = 
            await database.query(`SELECT * FROM transacoes WHERE id = ?`, [id]);
        return rows[0];
    },

    async criarTransacao({ descricao, valor, tipo, categoria, data}) {
        const [resultado] = await database.query(`INSERT INTO transacoes (descricao, valor, tipo, categoria, data) VALUES (?, ?, ?, ?, ?)` ,
            [descricao, valor, tipo, categoria, data] );
        return { id: resultado.insertId, descricao, valor, tipo, categoria, data };
    },

    async atualizarTransacao(id, { descricao, valor, tipo, categoria, data }) {
        await database.query(`UPDATE transacoes SET descricao = ?, valor = ?, tipo = ?, categoria = ?, data = ? WHERE id = ?`, [descricao, valor, tipo, categoria, data, id]);
        return this.buscarPorId(id);
    },

    async deletarTransacao(id) {
        const [resultado] = await database.query('DELETE FROM transacoes WHERE id = ?', [id]);
        return resultado.affectedRows > 0;
    },

    async resumoTransacoes() {
        const [rows] = await database.query(
            `SELECT 
            SUM( CASE WHEN tipo = 'receita' THEN valor ELSE 0 END) AS total_receitas, 
            SUM( CASE WHEN tipo = 'despesa' THEN valor ELSE 0 END) AS total_despesas 
            FROM transacoes`);
        const totalReceitas = Number(rows[0].total_receitas) || 0;
        const totalDespesas = Number(rows[0].total_despesas) || 0;
        return {
            total_receitas: totalReceitas,
            total_despesas: totalDespesas,
            saldo: totalReceitas - totalDespesas
        };
    },

    async porCategoria() {
        const [rows] = await database.query(`SELECT categoria, tipo, SUM(valor) AS total FROM transacoes GROUP BY categoria, tipo ORDER BY total DESC`);
        return rows;
    }
};

module.exports = transacaoModel;