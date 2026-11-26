# ADR-002: PostgreSQL

**Status:** aceito.

## Contexto
Pedidos, itens, pagamentos e estoque possuem relacionamentos e operações que precisam de consistência.

## Decisão
Usar PostgreSQL por sua maturidade, integridade relacional e transações ACID, com Prisma e migrations versionadas. Operações futuras de pedido e estoque deverão ser delimitadas por transações adequadas.

## Consequências
Ganha-se integridade e suporte transacional, ao custo de operar banco, backups e evolução de schema. Transações locais não tornam uma chamada externa de pagamento atômica: será necessário definir idempotência e recuperação de falhas na implementação.
