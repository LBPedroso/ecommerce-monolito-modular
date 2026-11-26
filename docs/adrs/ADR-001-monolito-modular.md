# ADR-001: Monólito modular

**Status:** aceito.

## Contexto
Uma equipe iniciando um e-commerce precisa entregar funcionalidades relacionadas sem o custo operacional de múltiplos serviços.

## Decisão
Adotar monólito modular: um processo e deploy atômico, módulos coesos e fronteiras explícitas. Outros módulos acessam apenas contratos ou casos de uso públicos de `app`, nunca seus detalhes internos de `domain` ou `infra`.

## Consequências
Desenvolvimento, testes locais e operação são simplificados; falhas e escalabilidade compartilham o mesmo processo. O crescimento pode gerar um Big Ball of Mud: mitigar por revisão de dependências, contratos públicos e testes de fronteira. Extrações futuras devem ser guiadas por necessidade real.
