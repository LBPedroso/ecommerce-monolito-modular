# C4 — Componentes

Visão alvo: cada módulo contém as camadas `api → app → domain → infra`. A seta domain → infra representa a associação com implementações dos contratos de domínio, não uma dependência de importação: `infra` depende de `domain`. Comunicações entre módulos devem usar somente contratos/casos de uso públicos de `app`. Os fluxos de negócio ainda não estão implementados.

```mermaid
C4Component
    title Componentes da API monolítica
    Container_Boundary(api, "API/Backend Monolítico") {
        Component(catalogo, "Catálogo", "Módulo", "API, app, domínio e infraestrutura de produtos")
        Component(carrinho, "Carrinho", "Módulo", "API, app, domínio e infraestrutura de carrinhos")
        Component(pedidos, "Pedidos", "Módulo", "API, app, domínio e infraestrutura de checkout")
        Component(pagamento, "Pagamento", "Módulo", "API, app, domínio e infraestrutura de pagamento")
        Component(usuarios, "Usuários", "Módulo", "API, app, domínio e infraestrutura de identidade")
    }
    Rel(pedidos, carrinho, "Consulta por contrato app")
    Rel(pedidos, catalogo, "Consulta por contrato app")
    Rel(pagamento, pedidos, "Consulta por contrato app")
    Rel(carrinho, usuarios, "Associa por contrato app")
```

Detalhamento de camadas, aplicável a cada um dos cinco módulos:

```mermaid
flowchart LR
    api["api: rotas e controllers"] --> app["app: casos de uso"]
    app --> domain["domain: entidades e contratos"]
    domain -. "contratos implementados por" .-> infra["infra: repositórios / gateways"]
    infra -- "depende de" --> domain
```
