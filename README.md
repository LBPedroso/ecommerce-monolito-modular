# E-commerce: monólito modular

Esqueleto didático de API Node.js/TypeScript com cinco módulos, PostgreSQL e documentação arquitetural em [docs](docs/01-visao-produto.md). **Não é uma loja funcional nem está pronto para produção:** todas as sete operações de negócio, os repositórios e o gateway retornam `501 NOT_IMPLEMENTED`; ainda não há autenticação, autorização ou processamento de pagamentos. O seed é demonstrativo e não cria usuários.

## Pré-requisitos

- Node.js >= 20.19 e npm.
- Docker com Docker Compose v2 e daemon iniciado; porta local 5432 disponível.

## Iniciar (PowerShell)

```powershell
Copy-Item .env.example .env
npm install
npm run setup
npm run dev
```

`setup` aguarda o Postgres ficar saudável, aplica as migrations existentes e executa o seed idempotente. O banco persiste no volume Docker; `npm run docker:down` para os containers sem apagar os dados. As credenciais do exemplo são apenas para desenvolvimento local. Atualize `.env` se alterar a porta ou credenciais do Compose. A API fica em `http://localhost:3000` por padrão.

Em outros shells, copie `.env.example` para `.env` antes de executar os comandos. Para nova migration durante desenvolvimento use `npx prisma migrate dev --name descricao`; `npm run prisma:migrate` aplica migrations já versionadas, sem criar novas. Após alterar o schema, execute `npx prisma generate`.

Na versão travada do Prisma 6, `npm audit` pode apontar vulnerabilidades altas em dependências transitivas da CLI. Consulte os avisos antes de usar em outro ambiente; a atualização para Prisma 7 exige migração e validação próprias, e não deve ser aplicada automaticamente com `npm audit fix --force`.

## Comandos

| Comando | Finalidade |
|---|---|
| `npm run docker:up` / `npm run docker:down` | Inicia / para o Postgres |
| `npm run prisma:migrate` | Aplica migrations com `migrate deploy` |
| `npm run prisma:seed` | Insere produto de exemplo sem duplicá-lo |
| `npm run setup` | Banco, migrations e seed |
| `npm run dev` | API com recarga |
| `npm run build` / `npm start` | Gera cliente Prisma e compila / executa |
| `npm test` | Testes de contrato dos stubs e observabilidade com banco simulado |

`GET /health` testa a conexão com Postgres e retorna 200 ou 503; `GET /metrics` fornece métricas Prometheus. Toda resposta possui `x-request-id`: o valor recebido é propagado se contiver somente letras, números, ponto, hífen ou sublinhado (até 128 caracteres); caso contrário, gera-se um UUID. Erros de negócio possuem `{ "error": { "code": "...", "message": "..." }, "requestId": "..." }`. Não envie credenciais ou dados sensíveis nos IDs ou URLs.

## Documentação

- [Visão](docs/01-visao-produto.md) · [Requisitos](docs/02-requisitos.md)
- C4: [Contexto](docs/03-c4-contexto.md), [Containers](docs/04-c4-container.md), [Componentes](docs/05-c4-componentes.md)
- [Modelo de dados](docs/06-modelo-dados.md) · [OpenAPI](docs/07-contratos-api.yaml)
- ADRs: [Monólito modular](docs/adrs/ADR-001-monolito-modular.md), [Postgres](docs/adrs/ADR-002-banco-postgres.md)

Cada módulo possui `api`, `app`, `domain`, `infra` e `tests`. A comunicação futura entre módulos deve ocorrer apenas por contratos/casos de uso públicos em `app`, sem importar `domain` ou `infra` alheios. As dependências de infraestrutura devem implementar contratos do próprio módulo. Os diagramas descrevem a arquitetura alvo, não funcionalidades já implementadas.

Para versionar, execute `git init`, `git add .` e crie seu commit; configure um repositório remoto antes de fazer push. Nunca versione `.env` nem credenciais reais.
