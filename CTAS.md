# CTAs, Links e Botões (Auditoria)

Este documento lista todos os botões, links e CTAs que hoje **não possuem destino final definido** (ou usam placeholders), para que possamos decidir e implementar os fluxos corretos depois — sem remover UI por enquanto.

## Navegação (âncoras internas)

- `components/layout/Navbar.tsx` navega por âncoras (`#hero`, `#solution`, `#demo`, `#roi`, `#pricing`).
- O scroll suave é feito pelo **Lenis** via `anchors` em `components/layout/SmoothScrollWrapper.tsx`.

## CTAs sem destino (placeholder / sem ação)

- `components/layout/Navbar.tsx`: botão **"Falar com Consultor"** (desktop e mobile) — sem `href`/ação definida.
- `components/dom/HeroSection.tsx`: botões **"Ver Proposta Completa"** e **"Agendar Demonstração"** — sem `href`/ação definida.
- `components/dom/PricingSection.tsx`: CTAs dos planos (**"Começar Agora"**, **"Escolher Business"**, **"Falar com Vendas"**) — sem `href`/ação definida.
- `components/dom/PricingSection.tsx`: botão **"Falar com especialista"** — sem `href`/ação definida.
- `components/dom/FinalCall.tsx`: botão **"Iniciar Transformação"** — sem `href`/ação definida.

## Links com placeholder `href=\"#\"`

- `components/layout/Footer.tsx`: links de **LinkedIn** e **Instagram** usam `href=\"#\"`.
- `components/layout/Footer.tsx`: lista de **Soluções** usa `href=\"#\"`.
- `components/layout/Footer.tsx`: **Termos de Uso** e **Privacidade** usam `href=\"#\"`.

## Links já definidos

- `components/layout/Footer.tsx`: email `mailto:contato@convertai.com.br`.

## Decisões necessárias (para implementar)

- CTA principal deve abrir: WhatsApp, Calendly, formulário (HeroUI Modal) ou redirecionar para uma página externa?
- “Planos” devem ser: link para checkout, formulário de qualificação, ou apenas seção de preços?
- Termos/Privacidade: páginas internas (`/termos`, `/privacidade`) ou links externos?
- Links sociais: URLs oficiais da Convert.AI.

