# convert A.I - Proposta Comercial Imersiva 2026

## Visao Geral

Proposta comercial interativa e imersiva para vender servicos de automacao com IA (agentes de atendimento, CRM, dashboards). A proposta eh uma demonstracao do produto — se vendemos tecnologia de ponta, a proposta deve parecer tecnologia de ponta.

---

## VERSOES OBRIGATORIAS (CRITICO)

**ATENCAO:** Todas as versoes sao EXATAS (sem `^`). NAO alterar.

| Pacote | Versao | Motivo |
|--------|--------|--------|
| **react** | `19.2.3` | OBRIGATORIO - outras versoes tem instabilidades e vulnerabilidades |
| **react-dom** | `19.2.3` | Deve ser identico ao react |
| **@types/react** | `19.2.3` | Deve ser identico ao react |
| **@types/react-dom** | `19.2.3` | Deve ser identico ao react-dom |

### package.json - Dependencias Exatas

```json
{
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

---

## Configuracao Tailwind v4 + HeroUI

O Tailwind v4 NAO usa `tailwind.config.ts`. Toda configuracao eh feita no CSS.

### postcss.config.mjs
```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
```

**NOTA:** NAO usar `autoprefixer` - o Tailwind v4 ja inclui prefixing automatico.

### app/hero.mjs (Plugin HeroUI)
```typescript
import { heroui } from "@heroui/react";
export default heroui();
```

### app/globals.css
```css
@import "tailwindcss";
@plugin './hero.mjs';
@source '../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}';
@custom-variant dark (&:is(.dark *));

@theme {
  /* Colors - convert A.I Brand */
  --color-brand-primary: #013117;
  --color-brand-primary-light: #486D4E;
  --color-brand-primary-soft: #8EAA85;
  --color-brand-primary-bg: #D5E8BC;
  --color-brand-surface: #E5E5DA;
  --color-brand-surface-light: #F6F6F3;
  --color-brand-background: #FFFFFF;
  --color-brand-text: #000000;
  --color-brand-text-secondary: #616262;
  --color-brand-muted: #929393;

  /* Fonts */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Redonda', 'Inter', system-ui, sans-serif;
}
```

---

## Arquitetura

```
app/
├── globals.css         # Design System + Tailwind v4 + HeroUI
├── hero.mjs            # Plugin HeroUI para Tailwind
├── providers.tsx       # HeroUIProvider wrapper
├── layout.tsx          # Root layout com providers
└── page.tsx            # Pagina principal

components/
├── canvas/             # Componentes 3D (R3F)
│   ├── Scene.tsx       # Canvas principal + post-processing
│   ├── HeroSphere.tsx  # Esfera interativa
│   ├── Particles.tsx   # Sistema de particulas
│   └── Lights.tsx      # Iluminacao dinamica
├── dom/                # Secoes HTML da proposta
│   ├── Preloader.tsx
│   ├── HeroSection.tsx
│   ├── ProblemSection.tsx
│   ├── SolutionSection.tsx
│   ├── InteractiveDemo.tsx
│   ├── ROICalculator.tsx
│   ├── PricingSection.tsx
│   └── FinalCall.tsx
├── ui/                 # Componentes reutilizaveis customizados
│   ├── Button.tsx      # Botao magnetico
│   ├── Card.tsx        # Card com tilt 3D
│   ├── AnimatedText.tsx
│   └── Slider.tsx
└── layout/
    ├── SmoothScrollWrapper.tsx
    ├── Navbar.tsx
    └── Footer.tsx

hooks/
├── useStore.ts         # Zustand store global
├── useScroll.ts        # Hook para Lenis
└── useMouse.ts         # Tracking do mouse

lib/
└── utils.ts            # cn(), formatCurrency(), lerp()

public/
├── Logo Principal-07.png   # Logo completa com icone
├── Logo 2-07.png           # Logo em retangulo
└── Logo 3-11.png           # Logo apenas texto
```

---

## Abordagem Hibrida de Componentes

| Elemento | Usar |
|----------|------|
| CTAs principais | Button customizado (magnetico) |
| Cards de pricing/features | Card customizado (tilt 3D) |
| Campos de formulario | HeroUI Input |
| Dropdowns/Selects | HeroUI Select |
| Modais | HeroUI Modal |

---

## Comandos

```bash
npm install        # Instalar dependencias
npm run dev        # Dev server com Turbopack (localhost:3000)
npm run build      # Build de producao
npm run start      # Iniciar producao
npm run lint       # Verificar codigo
```

---

## Convencoes de Codigo

- Usar `'use client'` em componentes interativos
- Importar utilitarios de `@/lib/utils`
- Usar `cn()` para classes condicionais
- Componentes 3D sao lazy-loaded com `dynamic()`
- Classes Tailwind v4: `bg-brand-primary`, `text-brand-text`, `font-display`

---

## Design System - convert A.I

### Identidade Visual

**Nome:** convert A.I
**Tagline:** atendimento personalizado
**Estilo:** Profissional, tecnologico, humanizado

### Cores (Paleta Verde + Nude)

| Funcao | Cor | HEX |
|--------|-----|-----|
| **Primary** (CTAs, headlines) | Verde Escuro | `#013117` |
| **Primary Light** (hover, secundario) | Verde Medio | `#486D4E` |
| **Primary Soft** (destaques suaves) | Verde Claro | `#8EAA85` |
| **Primary BG** (backgrounds de destaque) | Verde Suave | `#D5E8BC` |
| **Surface** (cards, elementos) | Nude | `#E5E5DA` |
| **Surface Light** (secoes alternadas) | Off-white | `#F6F6F3` |
| **Background** (fundo principal) | Branco | `#FFFFFF` |
| **Text** (texto principal) | Preto | `#000000` |
| **Text Secondary** (texto secundario) | Cinza Escuro | `#616262` |
| **Muted** (texto terciario) | Cinza | `#929393` |

### Tipografia

| Uso | Fonte | Fallback |
|-----|-------|----------|
| **Headings** | Redonda (Plau Design) | Inter, system-ui |
| **Body** | Inter | system-ui, sans-serif |

### Principios de Design

1. **Sem gradientes** - Usar cores solidas
2. **Sem efeitos neon/glow** - Sombras suaves e naturais
3. **Tema claro** - Background branco com acentos verdes
4. **Cards elevados** - Bordas sutis + sombras leves
5. **Espacamento generoso** - Layout respirado e profissional

### Logos Disponiveis

- `Logo Principal-07.png` - Logo completa (icone + nome + tagline)
- `Logo 2-07.png` - Logo em formato retangulo
- `Logo 3-11.png` - Logo apenas texto (versao escura)

---

## Referencias Visuais

- **Locomotive** - smooth scroll
- **KPRVERSE** - storytelling imersivo
- **Lusion** - WebGL/3D
- **Obys** - tipografia
