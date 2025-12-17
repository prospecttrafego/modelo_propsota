# ALMA - Proposta Comercial Imersiva 2026

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

### app/hero.ts (Plugin HeroUI)
```typescript
import { heroui } from "@heroui/react";
export default heroui();
```

### app/globals.css
```css
@import "tailwindcss";
@plugin './hero.ts';
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
```

---

## Arquitetura

```
app/
├── globals.css         # Design System + Tailwind v4 + HeroUI
├── hero.ts             # Plugin HeroUI para Tailwind
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

## Design System

### Cores (Cyberpunk Corporate)
- **Background:** `#050505` (--color-brand-dark)
- **Surface:** `#111111` (--color-brand-surface)
- **Primary:** `#00E5FF` (--color-brand-primary) - Cyan Neon
- **Secondary:** `#7000FF` (--color-brand-secondary) - Deep Purple
- **Text:** `#EDEDED` (--color-brand-text)

### Tipografia
- **Headings:** Space Grotesk (--font-display)
- **Body:** Inter (--font-sans)

---

## Referencias Visuais

- **Locomotive** - smooth scroll
- **KPRVERSE** - storytelling imersivo
- **Lusion** - WebGL/3D
- **Obys** - tipografia
