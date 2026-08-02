# Harmonia 🎵

> Plataforma musical interativa com dashboard analítico, player personalizado e simulação de transferência entre plataformas de streaming.

[![Deploy](https://img.shields.io/badge/deploy-vercel-black?style=flat&logo=vercel)](https://harmonia-ivory.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://typescriptlang.org)

![Dashboard do Harmonia](https://i.imgur.com/M26hdLP.png)

**[→ Ver projeto ao vivo](https://harmonia-ivory.vercel.app)**

---

## Sobre o projeto

O Harmonia é uma plataforma front-end de gerenciamento musical desenvolvida para demonstrar domínio avançado de React, Next.js e TypeScript. Toda a aplicação funciona com dados mockados — o foco está na qualidade da interface, arquitetura do código e experiência do usuário.

O projeto simula o que seria uma plataforma real como Soundiiz ou Last.fm, com módulos de dashboard analítico, player de música, gerenciamento de playlists, insights musicais e transferência entre plataformas.

---

## Funcionalidades

- **Dashboard** — estatísticas semanais, top artistas, top músicas e gráfico de área interativo com dados por dia
- **Player** — play/pause, fila, shuffle, repeat, barra de progresso simulada e persistência de volume entre sessões
- **Biblioteca** — busca com debounce, filtros por gênero, alternância lista/grade e tabs por categoria
- **Playlists** — CRUD completo com validação de formulário, modais de confirmação e estado vazio
- **Insights** — cards visuais com gradiente, gráfico donut de gêneros e resumo semanal
- **Transferência** — wizard de 6 etapas com progresso simulado, análise de correspondência e relatório final
- **Tema claro/escuro** — tokens CSS com troca em tempo real e persistência no localStorage
- **Responsivo** — sidebar mobile com overlay, player adaptado e layout fluido

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS + CSS custom properties |
| Estado global | Zustand com middleware persist |
| Formulários | React Hook Form + Zod |
| Gráficos | Recharts |
| Animações | Framer Motion (page transitions) |
| Testes | Vitest + React Testing Library |
| Deploy | Vercel |

---

## Decisões técnicas

### Por que Zustand e não Context API?
O estado do player muda múltiplas vezes por segundo (progresso simulado via `setInterval`). Context API causaria re-render em toda a árvore de componentes a cada tick. O Zustand atualiza apenas os componentes que assinam seletores específicos, evitando renders desnecessários.

### Por que CSS custom properties para o design system?
Com variáveis CSS nativas (`--color-brand-500`, `--color-surface-800`, etc.), o tema claro/escuro funciona trocando apenas o atributo `data-theme` no `<html>`. Nenhum componente precisa saber qual tema está ativo — todos consomem as mesmas variáveis, que mudam automaticamente.

### Por que `style` inline ao invés de classes Tailwind?
O projeto usa Next.js 16 com Turbopack e Tailwind CSS v4. Durante o desenvolvimento, identificamos que classes responsivas e de espaçamento do Tailwind v4 (como `ml-60`, `md:hidden`, `gap-6`) não eram geradas corretamente com o Turbopack. A solução adotada foi usar `style` inline para valores críticos de layout e CSS puro com `@media` queries para responsividade, garantindo comportamento consistente em desenvolvimento e produção.

### Por que `client-only render` na página de detalhe de playlist?
A store de playlists usa Zustand com `persist` (localStorage). O servidor não tem acesso ao localStorage, então o HTML gerado no servidor difere do conteúdo real do cliente, causando hydration mismatch. O padrão `mounted` resolve isso: renderiza `null` no servidor e aguarda o cliente montar antes de exibir os dados reais.

### Camada de serviços com contrato TypeScript
Os serviços de dados implementam interfaces TypeScript (`PlaylistService`, etc.). Os mocks respeitam essas interfaces. Para conectar uma API real no futuro, basta criar uma nova implementação da mesma interface — zero mudança nos componentes.

---

## Estrutura do projeto

```
src/
├── app/                    # Rotas Next.js (App Router)
│   └── (app)/              # Grupo de rotas com layout principal
├── components/
│   ├── ui/                 # Design system: Button, Card, Badge, Skeleton, Modal
│   └── layout/             # Sidebar, Header, ThemeProvider
├── features/               # Módulos por domínio
│   ├── player/             # Store Zustand + PlayerBar + hooks
│   ├── dashboard/          # StatCard, TopArtists, TopTracks, ListeningChart
│   ├── playlists/          # CRUD, PlaylistCard, PlaylistForm
│   ├── library/            # Busca, filtros, tabs
│   ├── insights/           # InsightCard, GenreChart
│   └── transfer/           # Wizard 6 etapas, simulação de progresso
├── hooks/                  # useDebounce, useLocalStorage, useMediaQuery
├── stores/                 # preferencesStore (tema, preferências)
├── mocks/                  # Dados mockados (tracks, artistas, playlists, stats)
├── types/                  # Tipos TypeScript globais
├── schemas/                # Schemas Zod para validação
└── utils/                  # format, cn, array
```

---

## Como rodar localmente

```bash
# clonar o repositório
git clone https://github.com/nathan-lucca/harmonia.git
cd harmonia

# instalar dependências
npm install

# rodar em desenvolvimento
npm run dev

# rodar testes
npm test

# build de produção
npm run build
```

Abre [http://localhost:3000](http://localhost:3000) no browser.

---

## Testes

```bash
npm test              # unitários e componentes (Vitest + RTL)
npm run test:coverage # relatório de cobertura
```

Cobertura nos componentes críticos:
- `Button` — variantes, estados, acessibilidade
- `useCalculator` — lógica de operações
- `playerStore` — play, next, previous, shuffle, repeat

---

## Roadmap

- [ ] Integração real com Spotify API (OAuth + endpoints de playlist)
- [ ] Integração com Deezer API (matching por ISRC)
- [ ] Drag and drop nas playlists (dnd-kit)
- [ ] Modo expandido do player com visualizador
- [ ] Storybook com documentação dos componentes
- [ ] Testes E2E com Playwright (fluxo de transferência)
- [ ] PWA com suporte offline

---

## Aprendizados

- **Tailwind CSS v4 com Turbopack** tem incompatibilidades com classes responsivas — solução: CSS puro com media queries
- **Hydration mismatch** com stores persistidas no localStorage requer `client-only render` ou `suppressHydrationWarning`
- **Zustand `persist`** não deve persistir estado de reprodução (faixa atual, fila) — apenas preferências do usuário
- **`TooltipProps` do Recharts** mudou de tipo entre versões — interfaces próprias são mais robustas que os tipos exportados pela biblioteca

---

Desenvolvido por **[Nathan Lucca](https://github.com/nathan-lucca)** · 2026