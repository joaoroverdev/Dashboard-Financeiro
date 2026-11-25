# Processo de desenvolvimento — Lean Software Development

## Processo escolhido
Lean Software Development. O Dashboard Financeiro é um projeto pequeno, com equipe reduzida, que entrega funcionalidades de forma incremental. Lean ajuda a priorizar valor para o usuário, reduzir desperdício e manter ciclos curtos de validação.

## Baseline e cadência
A baseline de código é a branch `main`, atualizada somente por Pull Request aprovado e com CI verde. Cada funcionalidade ou correção pequena gera uma branch e um PR. Uma versão estável é identificada por tag SemVer (`vMAJOR.MINOR.PATCH`) e publicada como Release após validação.

## Autorização de mudanças
O autor propõe a mudança por Issue e PR. Outro integrante revisa e aprova; mudanças em workflows, dependências, segurança ou configuração de produção exigem revisão do responsável pelo repositório. Não é necessário CCB formal para toda alteração de baixo risco; para mudanças de alto risco, a decisão deve ser registrada na Issue/PR e aprovada antes do merge.

## Configurações aplicadas/propostas no repositório
1. **CODEOWNERS:** direciona mudanças em `.github/`, scripts e `package.json` ao responsável, aumentando o controle sobre itens sensíveis.
2. **Templates de Issue:** padronizam relato de defeitos e solicitação de funcionalidades, registrando contexto, passos para reproduzir e resultado esperado.
3. **CI em Pull Requests:** executar testes automatizados antes de integrar alterações; o workflow deve bloquear a integração quando os testes falharem. A proteção obrigatória da branch `main` deve ser ativada nas configurações do GitHub pelo administrador.

## Adequação ao Dashboard Financeiro
- **Estabilidade dos requisitos:** funcionalidades como cadastro de receitas/despesas e resumo mensal podem evoluir em pequenos incrementos, então ciclos curtos são adequados.
- **Criticidade:** dados financeiros exigem cuidado com integridade e acesso. Por isso, validações, testes e revisão são necessários antes de integrar mudanças.
- **Equipe e frequência:** por ser um projeto de equipe pequena, um processo leve evita reuniões e aprovações burocráticas em mudanças simples.
- **Retrabalho:** alterações que afetam cálculos, persistência ou autenticação devem receber testes e revisão, pois erros podem comprometer os valores exibidos.

## Regra de controle
Toda mudança deve estar ligada a uma Issue, passar por Pull Request e CI. Releases devem usar tags SemVer. Mudanças de alto risco precisam de aprovação explícita do responsável antes da integração.
