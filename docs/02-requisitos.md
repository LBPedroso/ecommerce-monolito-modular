# Requisitos

## Funcionais
- Consultar produtos; adicionar e remover itens do carrinho.
- Cadastrar e autenticar usuários; gerar pedido por checkout e processar pagamento simulado.
- Estas funcionalidades são planejadas: as rotas atuais retornam 501.

## Não funcionais
- Node.js 20.19+, TypeScript estrito e API Express com deploy único.
- Persistência relacional em PostgreSQL 16; operações de checkout e estoque deverão ser transacionais.
- Módulos com contratos explícitos; migrations versionadas e seed reproduzível.

## Segurança
- Implementar hash de senha resistente (Argon2 ou bcrypt), autenticação e autorização por usuário/papel antes de liberar os fluxos.
- Validar entradas, proteger segredos, usar TLS em produção e evitar dados sensíveis em logs e respostas; limitar tentativas de login.
- Esses controles de negócio são requisitos futuros, não recursos já implementados.

## Observabilidade
- `x-request-id` propagado ou gerado para correlacionar respostas e logs Pino.
- `/health` verifica a API e a conexão com o banco; `/metrics` expõe métricas Prometheus de processo, contagem e duração HTTP.
- Proteger endpoints operacionais adequadamente em ambientes expostos.
