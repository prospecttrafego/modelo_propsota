# PROPOSTA COMERCIAL IMERSIVA 2026: DOCUMENTACAO TECNICA (MASTERFILE)

**STATUS:** APROVADO PARA DESENVOLVIMENTO
**DATA:** DEZEMBRO 2025
**TIPO:** PROPOSTA INTERATIVA B2B (HIGH-END)

---

## INDICE

1. [Visao Geral do Projeto](#1-visao-geral-do-projeto)
2. [Stack Tecnologica](#2-stack-tecnologica)
3. [Setup Inicial](#3-setup-inicial)
4. [Arquitetura do Projeto](#4-arquitetura-do-projeto)
5. [Design System](#5-design-system)
6. [Componentes Base](#6-componentes-base)
7. [Secoes da Proposta](#7-secoes-da-proposta)
8. [Animacoes e Interacoes](#8-animacoes-e-interacoes)
9. [Experiencias 3D](#9-experiencias-3d)
10. [Performance e Otimizacao](#10-performance-e-otimizacao)
11. [Checklist de Implementacao](#11-checklist-de-implementacao)

---

## 1. VISAO GERAL DO PROJETO

### 1.1 O que estamos construindo

Uma proposta comercial interativa e imersiva para vender servicos de automacao com IA (agentes de atendimento, CRM, dashboards). A proposta deve ser uma demonstracao do produto — se vendemos tecnologia de ponta, a proposta deve parecer tecnologia de ponta.

### 1.2 Conceito Central

> "A proposta eh uma jornada interativa onde o cliente experimenta a inovacao antes mesmo de contratar. Cada scroll revela uma nova camada da solucao."

### 1.3 Publico-Alvo

- Empresas (B2B)
- Tomadores de decisao (C-level, gerentes)
- Pessoas que recebem muitas propostas genericas e buscam inovacao

### 1.4 Objetivos da Experiencia

| Objetivo | Como atingir |
|----------|--------------|
| **Impressionar** | Hero 3D imersivo, animacoes cinematograficas, pos-processamento visual |
| **Engajar** | Scroll storytelling, elementos interativos que reagem ao cursor |
| **Converter** | CTAs claros, calculadora de ROI em tempo real, pricing transparente |
| **Memorizar** | Experiencia unica "tipo Awwwards" que o cliente vai compartilhar |

### 1.5 Referencias Visuais

- **Locomotive:** (agency of the year) - Referencia para smooth scroll
- **KPRVERSE:** (storytelling imersivo) - Referencia para narrativa visual
- **Lusion:** (WebGL/3D) - Referencia para iluminacao e shaders
- **Obys:** (coragem artistica) - Referencia para tipografia

---

## 2. STACK TECNOLOGICA

### 2.1 VERSOES EXATAS - OBRIGATORIO (DEC 2025)

**ATENCAO CRITICA:** Todas as versoes sao EXATAS (sem `^`). NAO alterar sob nenhuma circunstancia.

| Pacote | Versao Exata | Motivo |
|--------|--------------|--------|
| **react** | `19.2.3` | OBRIGATORIO - outras versoes tem instabilidades e vulnerabilidades de seguranca |
| **react-dom** | `19.2.3` | Deve ser identico ao react |
| **@types/react** | `19.2.3` | Deve ser identico ao react |
| **@types/react-dom** | `19.2.3` | Deve ser identico ao react-dom |

### 2.2 package.json Completo (Versoes Exatas - Sem ^)

```json
{
  "name": "proposta-imersiva-2026",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "16.0.4",
    "react": "19.2.3",
    "react-dom": "19.2.3",

    "@heroui/react": "2.8.6",
    "@heroui/theme": "2.4.24",

    "framer-motion": "12.0.0",
    "gsap": "3.13.2",
    "@gsap/react": "2.1.2",
    "lenis": "1.3.1",

    "@react-three/fiber": "9.4.2",
    "@react-three/drei": "10.7.7",
    "@react-three/postprocessing": "3.0.4",
    "three": "0.182.0",

    "zustand": "5.0.0",

    "lucide-react": "0.585.0",
    "tailwind-variants": "0.4.0",
    "clsx": "2.2.0",
    "tailwind-merge": "3.0.0"
  },
  "devDependencies": {
    "typescript": "5.9.2",
    "@types/react": "19.2.3",
    "@types/react-dom": "19.2.3",
    "@types/node": "22.12.0",

    "tailwindcss": "4.0.0",
    "@tailwindcss/postcss": "4.0.0",
    "postcss": "8.5.1",

    "@types/three": "0.182.0",
    "r3f-perf": "7.3.0",
    "glslify": "7.1.1",

    "eslint": "9.18.0",
    "eslint-config-next": "16.0.0"
  }
}
```

### 2.3 Por que cada biblioteca

| Biblioteca | Proposito Estrategico |
|------------|----------------------|
| **Next.js 16** | Server Actions para formularios e Partial Prerendering (PPR) para loading instantaneo |
| **React 19.2.3** | Versao estavel obrigatoria - NAO usar outras versoes |
| **HeroUI 2.8.6** | Componentes base modernos (Input, Select, Modal) para agilizar o desenvolvimento |
| **Framer Motion 12** | Animacoes de interface (UI), transicoes de entrada e Shared Layout Animations |
| **GSAP 3.13** | Indispensavel para ScrollTrigger. Controla a linha do tempo e "pina" elementos 3D |
| **Lenis 1.3** | Smooth Scroll moderno. Permite controlar o "peso" do scroll para sensacao premium |
| **R3F 9.4 + Drei 10.7** | Renderizacao 3D declarativa compativel com React 19 |
| **Postprocessing 3** | Vital para o visual. Adiciona Bloom (neon), Noise (filme) e Depth of Field |
| **Zustand 5** | Gerenciamento de Estado. Conecta Scroll <-> 3D <-> UI sem re-renders pesados |
| **Tailwind v4** | Nova engine de estilizacao com compilacao instantanea |

---

## 3. SETUP INICIAL

### 3.1 Inicializacao

```bash
npx create-next-app@latest proposta-2026 --typescript --tailwind --eslint
# Selecionar: App Router, No src/ directory (opcional), Import alias @/*
```

### 3.2 Instalacao das Dependencias

```bash
# 3D Core
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing

# Animation & State
npm install gsap @gsap/react framer-motion lenis zustand

# UI & Utils
npm install @heroui/react @heroui/theme lucide-react clsx tailwind-merge tailwind-variants

# Dev Dependencies
npm install -D @types/three r3f-perf glslify
```

### 3.3 Configuracao Tailwind v4

**IMPORTANTE:** Tailwind v4 NAO usa `tailwind.config.ts`. Toda configuracao eh feita no CSS.

#### postcss.config.mjs

```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
```

**NOTA:** NAO usar `autoprefixer` - o Tailwind v4 ja inclui prefixing automatico.

#### app/hero.mjs (Plugin HeroUI)

```typescript
import { heroui } from "@heroui/react";
export default heroui();
```

#### app/globals.css (Sintaxe v4)

```css
@import "tailwindcss";
@plugin './hero.mjs';
@source '../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}';
@custom-variant dark (&:is(.dark *));

@theme {
  --color-brand-primary: #00E5FF;
  --color-brand-secondary: #7000FF;
  --color-brand-dark: #050505;
  --color-brand-surface: #111111;
  --color-brand-text: #EDEDED;
  --color-brand-muted: #888888;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Space Grotesk', system-ui, sans-serif;
}

/* Configuracao Lenis */
html.lenis, html.lenis body {
  height: auto;
}
```

---

## 4. ARQUITETURA DO PROJETO

Estrutura de pastas focada em separacao de responsabilidades (3D vs DOM):

```
app/
├── globals.css         # Design System + Tailwind v4 + HeroUI
├── hero.mjs            # Plugin HeroUI para Tailwind
├── providers.tsx       # HeroUIProvider wrapper
├── layout.tsx          # Root layout com providers
└── page.tsx            # Composicao principal (Z-Index management)

components/
├── canvas/             # O MUNDO 3D (Cenas, Modelos, Luzes, Shaders)
│   ├── Scene.tsx
│   ├── HeroSphere.tsx
│   ├── Particles.tsx
│   └── Lights.tsx
├── dom/                # O MUNDO HTML (Overlay de texto, Pricing, HeroUI)
│   ├── Preloader.tsx
│   ├── HeroSection.tsx
│   ├── ProblemSection.tsx
│   ├── SolutionSection.tsx
│   ├── InteractiveDemo.tsx
│   ├── ROICalculator.tsx
│   ├── PricingSection.tsx
│   └── FinalCall.tsx
├── ui/                 # Primitivos customizados (Botoes, Cards)
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── AnimatedText.tsx
│   └── Slider.tsx
└── layout/             # SmoothScrollWrapper, Navbar, PageTransition
    ├── SmoothScrollWrapper.tsx
    ├── Navbar.tsx
    └── Footer.tsx

hooks/
├── useStore.ts         # ZUSTAND: Estado unico da verdade
├── useScroll.ts        # Hook para normalizar dados do Lenis/GSAP
└── useMouse.ts         # Tracking do mouse

lib/
└── utils.ts            # cn(), formatCurrency(), lerp()
```

---

## 5. DESIGN SYSTEM

### 5.1 Paleta de Cores (Cyberpunk Corporate)

| Variavel | Cor | Uso |
|----------|-----|-----|
| `--color-brand-dark` | `#050505` | Background (Almost Black) |
| `--color-brand-surface` | `#111111` | Cards com backdrop-blur |
| `--color-brand-primary` | `#00E5FF` | Cyan Neon - Sensacao de IA/Tech |
| `--color-brand-secondary` | `#7000FF` | Deep Purple - Profundidade |
| `--color-brand-text` | `#EDEDED` | Off-white para leitura |
| `--color-brand-muted` | `#888888` | Texto secundario |

### 5.2 Tipografia

- **Headings:** Space Grotesk (`--font-display`) - Geometrica, futurista
- **Body:** Inter (`--font-sans`) - Alta legibilidade para dados tecnicos

---

## 6. COMPONENTES BASE

### 6.1 Abordagem Hibrida

| Elemento | Usar | Motivo |
|----------|------|--------|
| CTAs principais | Button customizado | Efeito magnetico que segue cursor |
| Cards de pricing | Card customizado | Efeito tilt 3D + glow no hover |
| Campos de formulario | HeroUI Input | Praticidade |
| Dropdowns/Selects | HeroUI Select | Praticidade |
| Modais | HeroUI Modal | Praticidade |

### 6.2 Wrapper de Smooth Scroll

O Lenis deve envolver toda a aplicacao no `layout.tsx`.
Configuracao: `orientation: vertical`, `gestureOrientation: vertical`, `smoothWheel: true`.

### 6.3 O Canvas Global

Para maxima performance, teremos **UM** componente `<Canvas>` fixo no fundo da tela (`position: fixed`, `z-index: 0`) e a UI rolando por cima (`z-index: 10`).

Tecnica: Usar o componente `<View>` do Drei para injetar cenas 3D em locais especificos do DOM se necessario.

---

## 7. SECOES DA PROPOSTA

A proposta eh um "One Page" longo com transicoes fluidas:

1. **Intro (Loading):** Preloader cinematografico. Logo da empresa se forma a partir de particulas.
2. **Hero:** Headline "O Futuro da Sua Operacao". Modelo 3D Hero (esfera de dados) interativo ao mouse.
3. **A Dor (The Problem):** O ambiente escurece. Elementos 3D representam caos/desconexao. Texto: "Sua equipe esta afogada em processos?"
4. **A Solucao (The Reveal):** Explosao de luz (Bloom). O caos se organiza em uma grade perfeita. Apresentacao dos Agentes de IA.
5. **Interactive Demo:** Um mini-dashboard funcional (HTML sobreposto) onde o usuario clica e o 3D reage em tempo real.
6. **ROI Calculator:** Sliders funcionais. O resultado financeiro brilha conforme o valor aumenta.
7. **Pricing & Timeline:** Cards estilo vidro (Glassmorphism) com efeito tilt 3D ao passar o mouse.
8. **Final Call:** Botao magnetico gigante "Iniciar Transformacao".

---

## 8. ANIMACOES E INTERACOES

### 8.1 ScrollTrigger Workflow

- **Pinning:** As secoes de texto rolam, mas o Canvas 3D fica "preso", mudando apenas o angulo da camera ou a iluminacao.
- **Scrub:** A animacao 3D esta atrelada ao progresso do scroll (`scrub: 1` ou `0.5` para suavidade).

### 8.2 Micro-interacoes

- **Mouse Move:** Leve paralaxe nos elementos 2D e rotacao da camera 3D ("LookAt").
- **Hover:** Textos importantes com efeito "Scramble" (decodificacao de caracteres) ao passar o mouse.

---

## 9. EXPERIENCIAS 3D (R3F)

### 9.1 Exemplo de Cena (`Scene.tsx`)

```tsx
<Canvas dpr={[1, 2]}> {/* Otimizacao automatica de DPI */}
  <PerformanceMonitor /> {/* Degrada qualidade visual se FPS cair < 30 */}
  <Suspense fallback={null}>
    <Environment preset="city" />
    <MainModel />
    <Particles />
    {/* O Pos-processamento eh o segredo do visual High-End */}
    <EffectComposer disableNormalPass>
      <Bloom intensity={1.5} luminanceThreshold={0.9} mipmapBlur />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  </Suspense>
</Canvas>
```

### 9.2 Shaders & Materiais

- Evitar `MeshStandardMaterial` puro
- Usar `MeshTransmissionMaterial` para vidro/cristal
- Usar Custom Shaders (glsl) para materiais que parecem energia ou holograma

---

## 10. PERFORMANCE E OTIMIZACAO

1. **Draco Compression:** Obrigatorio. Reduzir modelos GLB drasticamente.
2. **Texture Resizing:** Texturas devem ser `.ktx2` ou `.webp`. Max 2048px.
3. **Instancing:** Usar `InstancedMesh` para qualquer objeto repetido (particulas, grids).
4. **Descarte:** Usar a ferramenta `r3f-perf` durante o dev para garantir Draw Calls < 100.
5. **Lazy Loading:** Carregar texturas pesadas apenas quando a secao estiver proxima de aparecer (Intersection Observer).

---

## 11. CHECKLIST DE IMPLEMENTACAO

- [x] **Setup:** Repositorio criado, Next.js 16 + Tailwind v4 + Zustand configurados
- [ ] **Assets:** Modelos 3D adquiridos/criados e convertidos para GLB+Draco
- [x] **Core:** Configuracao do Lenis (Scroll) e Canvas (R3F) funcionando juntos
- [ ] **Scene 1 (Hero):** Implementar modelo principal com interacao de mouse
- [ ] **Scroll Logic:** Implementar GSAP ScrollTrigger conectando secoes HTML ao Zustand
- [x] **UI Components:** Criar botoes, cards e inputs usando HeroUI com tema customizado
- [ ] **Interactivity:** Conectar UI ao 3D (Ex: Slider de ROI altera a cor da cena)
- [ ] **Polish:** Adicionar Post-processing (Bloom, Noise) e ajustar iluminacao
- [ ] **Optimization:** Rodar build de producao e testar performance (Lighthouse/FPS)
- [ ] **Deploy:** Publicar na Vercel com variaveis de ambiente configuradas
