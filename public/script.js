const API = 'http://localhost:3000/api';

const fmt = (n) => Number(n).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const fmtData = (d) => {
  if (!d) return '—';

  if (d instanceof Date) {
    return isNaN(d) ? '—' : d.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  }

  const soAData = String(d).split('T')[0];
  const data = new Date(soAData + 'T00:00:00');
  return isNaN(data) ? '—' : data.toLocaleDateString('pt-BR');
};

document.getElementById('hoje').textContent = new Date().toLocaleDateString('pt-BR', {
  weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
});
document.getElementById('data').valueAsDate = new Date();

async function carregarDashboard() {
  const res = await fetch(`${API}/transacoes/dashboard`);
  const dados = await res.json();

  document.getElementById('totalReceitas').textContent = fmt(dados.total_receitas);
  document.getElementById('totalDespesas').textContent = fmt(dados.total_despesas);
  document.getElementById('saldo').textContent = fmt(dados.saldo);
  document.getElementById('saldo').style.color = dados.saldo >= 0 ? '#80EF80' : '#c63637';

  renderCategorias(dados.por_categoria);
}

function renderCategorias(categorias) {
  const container = document.getElementById('lista-categorias');
  if (!categorias.length) {
    container.innerHTML = '<p id="vazio">Nenhum lançamento por categoria ainda.</p>';
    return;
  }
  const maior = Math.max(...categorias.map(c => Number(c.total)));
  container.innerHTML = categorias.map(c => `
    <div class="cat-row">
      <div class="cat-head">
        <span class="nome">${c.categoria}</span>
        <span style="color:${c.tipo === 'receita' ? '#80EF80' : '#c63637'}">${fmt(c.total)}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill ${c.tipo}" style="width:${(Number(c.total) / maior) * 100}%"></div>
      </div>
    </div>
  `).join('');
}

async function carregarTransacoes() {
  const res = await fetch(`${API}/transacoes`);
  const transacoes = await res.json();

  document.getElementById('contagem').textContent = `${transacoes.length} registro(s)`;
  const container = document.getElementById('lista-transacoes');

  if (!transacoes.length) {
    container.innerHTML = '<p id="vazio">Nenhum lançamento ainda. Adicione o primeiro acima.</p>';
    return;
  }

  container.innerHTML = transacoes.map(t => `
    <div class="transacao-card">
      <div class="info">
        <div class="desc">${t.descricao}</div>
        <div class="meta">${fmtData(t.data)} · ${t.categoria}</div>
      </div>
      <div class="valor" style="color:${t.tipo === 'receita' ? '#80EF80' : '#c63637'}">
        ${t.tipo === 'receita' ? '+' : '−'} ${fmt(t.valor)}
      </div>
      <button class="del-btn" data-id="${t.id}" title="Excluir lançamento" aria-label="Excluir ${t.descricao}">×</button>
    </div>
  `).join('');

  container.querySelectorAll('.del-btn').forEach(btn => {
    btn.addEventListener('click', () => excluirTransacao(btn.dataset.id));
  });
}

async function excluirTransacao(id) {
  await fetch(`${API}/transacoes/${id}`, { method: 'DELETE' });
  await Promise.all([carregarTransacoes(), carregarDashboard()]);
}

document.getElementById('form-transacao').addEventListener('submit', async (e) => {
  e.preventDefault();
  const erroBox = document.getElementById('erro-form');
  erroBox.style.display = 'none';

  const payload = {
    descricao: document.getElementById('descricao').value.trim(),
    tipo: document.getElementById('tipo').value,
    categoria: document.getElementById('categoria').value.trim(),
    valor: parseFloat(document.getElementById('valor').value),
    data: document.getElementById('data').value
  };

  try {
    const res = await fetch(`${API}/transacoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const dados = await res.json();

    if (!res.ok) throw new Error(dados.erro || 'Erro ao lançar transação.');

    e.target.reset();
    document.getElementById('data').valueAsDate = new Date();
    await Promise.all([carregarTransacoes(), carregarDashboard()]);
  } catch (err) {
    erroBox.textContent = err.message;
    erroBox.style.display = 'block';
  }
});

carregarDashboard();
carregarTransacoes();