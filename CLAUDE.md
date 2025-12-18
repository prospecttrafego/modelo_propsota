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
Ver arquivo `app/globals.css` para o design system completo.
Inclui: cores, fontes, animacoes, glass effects, HeroUI overrides.

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

## Design System - convert A.I (Dark Mode)

### Identidade Visual

**Nome:** convert A.I
**Tagline:** atendimento personalizado
**Estilo:** Profissional, tecnologico, imersivo
**Tema:** Dark mode fixo (maximiza impacto visual WebGL/3D)

### Cores

Ver `app/globals.css` para todas as variaveis CSS.

**Principais:**
- Background: `#0A0F0C` (verde-preto)
- Primary: `#8EAA85` (verde claro - CTAs, acentos)
- Text: `#E5E5DA` (nude/creme)

### Tipografia

- **Headings:** Redonda
- **Body:** Inter

### Logos

| Arquivo | Uso | Tamanho CSS |
|---------|-----|-------------|
| `Logo Principal-07.png` | Navbar | `h-16` |
| `Logo Principal-07.png` | Footer | `h-24` |
| `Logo Principal-07.png` | Preloader | `h-32` |

**NOTA:** Logos tem ~50% de espacamento interno - usar tamanhos maiores.

### Efeitos 3D (WebGL)

Cores definidas em `hooks/useStore.ts`:
- Primary 3D: `#8EAA85`
- Secondary 3D: `#D5E8BC`
- Bloom: 1.5 | Emissive: 0.4

---

## Referencias Visuais

- **Locomotive** - smooth scroll
- **KPRVERSE** - storytelling imersivo
- **Lusion** - WebGL/3D
- **Obys** - tipografia
