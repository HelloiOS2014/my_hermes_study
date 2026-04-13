# Hermes Agent 交互式教程 — Phase 1 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy the core interactive tutorial covering Layer 0 (初见) and Layer 1 (上手), including 3 playground components, 3 CSS animations, 1 Remotion video, and GitHub Pages deployment.

**Architecture:** Single-page React app with a fixed sidebar navigation and scrollable main content area. Content sections lazy-load via IntersectionObserver. Playground components manage local state for interactive editing/preview. Remotion Player embeds pre-rendered video inline. All styles via Tailwind CSS with a GitHub Dark color scheme.

**Tech Stack:** React 19, Vite 6, TypeScript, Tailwind CSS v4, Shiki (code highlighting), @remotion/player, gh-pages

**Spec Reference:** `docs/superpowers/specs/2026-04-13-hermes-agent-tutorial-design.md`

**Scope:** Phase 1 only (Layer 0 + Layer 1). Phase 2 (Layer 2 + 3) and Phase 3 (Recipes + Ops + Appendix) will have separate plans.

**Implementation note:** Use `frontend-design` skill when building UI components to ensure design quality.

---

## File Structure

```
src/
├── main.tsx                          # React entry point
├── App.tsx                           # Root: Header + Sidebar + Main + Footer
├── index.css                         # Tailwind imports + CSS custom properties + animations
│
├── hooks/
│   ├── useInView.ts                  # IntersectionObserver hook for lazy load + animation trigger
│   ├── useReducedMotion.ts           # prefers-reduced-motion media query hook
│   └── useActiveSection.ts           # Scroll spy: tracks which section is visible for nav highlighting
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx                # Logo + title + GitHub star badge + version tag
│   │   ├── Sidebar.tsx               # Fixed nav with layer groups, scroll-to on click, active highlight
│   │   ├── Footer.tsx                # Links row
│   │   └── Section.tsx               # Wrapper: id anchor + IntersectionObserver + fadeInUp animation
│   │
│   └── ui/
│       ├── TypewriterTitle.tsx        # Layer entrance: cursor blink → type title → fade in content
│       ├── Terminal.tsx               # Simulated terminal with line-by-line typing animation
│       ├── CodeBlock.tsx              # Shiki-highlighted code with copy button + language badge
│       ├── TryItBox.tsx              # Green-bordered callout: "打开终端，运行 ..."
│       ├── ExtendedReading.tsx       # "延伸阅读" link list at section end
│       ├── FlipCard.tsx              # Click/hover to flip, front/back content
│       ├── FoldPanel.tsx             # Collapsible panel with title + chevron
│       ├── TabPanel.tsx              # Tab headers + content panels
│       ├── CardGrid.tsx              # Responsive grid of clickable cards with expand
│       ├── CheckList.tsx             # Checkbox-style list (visual only, not form)
│       └── HoverTable.tsx            # Table with row highlight on hover
│
├── playgrounds/
│   ├── PromptAssembler.tsx           # Fill SOUL/MEMORY/USER/AGENTS.md → see assembled prompt + token count
│   ├── ConfigBuilder.tsx             # Toggle options → generate config.yaml → copy
│   └── MemorySandbox.tsx             # Write memory → watch lifecycle flow
│
├── animations/
│   ├── MemoryFlowAnimation.tsx       # CSS: 4-layer memory data flowing into system prompt
│   └── SkillLifecycleAnimation.tsx   # CSS: experience → create → store → retrieve → use → improve
│
├── sections/
│   ├── layer0/
│   │   ├── WhatIsHermes.tsx          # 0.1 — Remotion player + capability matrix
│   │   ├── Comparison.tsx            # 0.2 — FlipCards for framework comparison
│   │   ├── QuickStart.tsx            # 0.3 — Terminal demo + TryItBox
│   │   └── ArchitectureOverview.tsx  # 0.4 — SVG interactive diagram
│   │
│   └── layer1/
│       ├── CLIOverview.tsx           # 1.1 — CardGrid of CLI commands
│       ├── ModelSelection.tsx        # 1.2 — ConfigBuilder playground
│       ├── SoulMd.tsx                # 1.3 — PromptAssembler playground
│       ├── ProjectContext.tsx         # 1.4 — file diff panel
│       ├── MemorySystem.tsx          # 1.5 — MemorySandbox + MemoryFlowAnimation
│       ├── SkillsSystem.tsx          # 1.6 — Skill cards + SkillLifecycleAnimation
│       ├── ToolExplorer.tsx          # 1.7 — FoldPanels by category
│       ├── Security.tsx              # 1.8 — CheckList
│       ├── MessagingPlatforms.tsx    # 1.9 — TabPanel per platform
│       └── TerminalBackends.tsx      # 1.10 — HoverTable comparison
│
├── data/
│   ├── navigation.ts                # Sidebar structure: layers → sections with ids and titles
│   ├── commands.ts                   # CLI command descriptions for 1.1
│   ├── models.ts                     # Provider/model data for 1.2
│   ├── promptLayers.ts              # 10-layer prompt assembly data for 1.3
│   ├── tools.ts                      # Tool categories and descriptions for 1.7
│   ├── skills.ts                     # Skill categories for 1.6
│   ├── platforms.ts                  # Platform config steps for 1.9
│   └── backends.ts                   # Terminal backend comparison for 1.10
│
└── assets/
    ├── hermes-overview.mp4           # Pre-rendered Remotion video (or use @remotion/player inline)
    └── architecture.svg              # Architecture diagram (or inline SVG component)

# Remotion (in separate project /Users/panghu/code/Tool/remotion)
src/
├── HermesOverview.tsx                # New composition: 30s overview video
└── Root.tsx                          # Add HermesOverview composition

# Root project files
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts                # (Tailwind v4 uses CSS-based config, but we keep a TS config for content paths)
├── tsconfig.json
├── tsconfig.app.json
├── .github/workflows/deploy.yml      # GitHub Pages deployment
└── .gitignore
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `index.html`, `.gitignore`, `src/main.tsx`, `src/App.tsx`, `src/index.css`

- [ ] **Step 1: Initialize Vite + React + TypeScript project**

```bash
cd /Users/panghu/code/rsearch/my_hermes_study
npm create vite@latest . -- --template react-ts
```

Select "Ignore files and continue" when prompted about existing files.

- [ ] **Step 2: Install dependencies**

```bash
npm install tailwindcss @tailwindcss/vite shiki @remotion/player @remotion/core react-dom
npm install -D @types/react @types/react-dom
```

- [ ] **Step 3: Configure Vite for GitHub Pages**

Replace `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/my_hermes_study/",
  build: {
    outDir: "dist",
  },
});
```

- [ ] **Step 4: Configure TypeScript**

Replace `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  },
  "include": ["src"]
}
```

- [ ] **Step 5: Set up Tailwind CSS v4 with design tokens**

Replace `src/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-bg-primary: #0d1117;
  --color-bg-secondary: #161b22;
  --color-bg-card: #1c2128;
  --color-bg-elevated: #252b33;
  --color-text-primary: #e6edf3;
  --color-text-secondary: #8b949e;
  --color-text-muted: #656d76;
  --color-accent: #58a6ff;
  --color-success: #3fb950;
  --color-warning: #d29922;
  --color-error: #f85149;
  --color-border: #30363d;

  --font-sans: "Inter", "Space Grotesk", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
}

@layer base {
  html {
    scroll-behavior: smooth;
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
    font-family: var(--font-sans);
    line-height: 1.7;
  }

  code, pre {
    font-family: var(--font-mono);
    line-height: 1.5;
  }

  ::selection {
    background-color: color-mix(in srgb, var(--color-accent) 30%, transparent);
  }
}

/* Animations — all respect prefers-reduced-motion */
@layer utilities {
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @keyframes typewriter-cursor {
    0%, 100% { border-right-color: var(--color-accent); }
    50% { border-right-color: transparent; }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out both;
  }

  .animate-blink {
    animation: blink 1s step-end infinite;
  }

  .animate-cursor {
    animation: typewriter-cursor 0.8s step-end infinite;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 6: Create minimal App shell**

Replace `src/App.tsx`:

```tsx
export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <header className="sticky top-0 z-50 border-b border-border bg-bg-primary/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center px-4">
          <span className="font-mono text-lg font-bold text-accent">
            Hermes Agent
          </span>
          <span className="ml-2 text-sm text-text-secondary">
            交互式教程
          </span>
          <span className="ml-auto rounded-md border border-border px-2 py-0.5 text-xs text-text-muted">
            v0.8.x
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold">Hermes Agent 工作台</h1>
        <p className="mt-4 text-text-secondary">教程内容将在后续任务中添加。</p>
      </main>
    </div>
  );
}
```

- [ ] **Step 7: Update index.html**

Replace `index.html`:

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Hermes Agent 交互式教程 — 从入门到深入的完整指南" />
    <title>Hermes Agent 交互式教程</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 8: Update .gitignore**

Append to `.gitignore`:

```
node_modules/
dist/
.vite/
*.local
```

- [ ] **Step 9: Verify build works**

```bash
npm run dev
```

Expected: Vite dev server starts, browser shows the dark-themed shell with "Hermes Agent 工作台" heading.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: scaffold React + Vite + Tailwind project with design tokens"
```

---

## Task 2: Custom Hooks

**Files:**
- Create: `src/hooks/useInView.ts`, `src/hooks/useReducedMotion.ts`, `src/hooks/useActiveSection.ts`

- [ ] **Step 1: Create useInView hook**

```typescript
// src/hooks/useInView.ts
import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {},
) {
  const { threshold = 0.1, rootMargin = "0px 0px -100px 0px", once = true } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
```

- [ ] **Step 2: Create useReducedMotion hook**

```typescript
// src/hooks/useReducedMotion.ts
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
```

- [ ] **Step 3: Create useActiveSection hook**

```typescript
// src/hooks/useActiveSection.ts
import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/hooks/
git commit -m "feat: add useInView, useReducedMotion, useActiveSection hooks"
```

---

## Task 3: Layout Components

**Files:**
- Create: `src/components/layout/Header.tsx`, `src/components/layout/Sidebar.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/Section.tsx`
- Create: `src/data/navigation.ts`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create navigation data**

```typescript
// src/data/navigation.ts
export interface NavItem {
  id: string;
  label: string;
  depth: number; // 0 = layer header, 1 = section
}

export interface NavGroup {
  label: string;
  emoji: string;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    label: "Layer 0 · 初见",
    emoji: "👀",
    items: [
      { id: "what-is-hermes", label: "What is Hermes Agent?", depth: 1 },
      { id: "comparison", label: "和其他框架有什么不同", depth: 1 },
      { id: "quick-start", label: "安装 + 第一次对话", depth: 1 },
      { id: "architecture", label: "架构鸟瞰", depth: 1 },
    ],
  },
  {
    label: "Layer 1 · 上手",
    emoji: "🛠",
    items: [
      { id: "cli-overview", label: "CLI 全景", depth: 1 },
      { id: "model-selection", label: "选模型 + 成本控制", depth: 1 },
      { id: "soul-md", label: "SOUL.md 人格塑造", depth: 1 },
      { id: "project-context", label: "项目上下文", depth: 1 },
      { id: "memory-system", label: "记忆系统", depth: 1 },
      { id: "skills-system", label: "Skills 系统", depth: 1 },
      { id: "tool-explorer", label: "工具箱导览", depth: 1 },
      { id: "security", label: "安全体系", depth: 1 },
      { id: "messaging-platforms", label: "消息平台", depth: 1 },
      { id: "terminal-backends", label: "终端后端", depth: 1 },
    ],
  },
];

export const allSectionIds = navigation.flatMap((g) =>
  g.items.map((item) => item.id),
);
```

- [ ] **Step 2: Create Header component**

```tsx
// src/components/layout/Header.tsx
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-primary/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-3 px-4">
        <span className="font-mono text-lg font-bold text-accent">⚡ Hermes Agent</span>
        <span className="text-sm text-text-secondary">交互式教程</span>
        <div className="ml-auto flex items-center gap-3">
          <a
            href="https://github.com/NousResearch/hermes-agent"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-border px-3 py-1 text-xs text-text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            GitHub ★
          </a>
          <span className="rounded-md bg-bg-card px-2 py-0.5 text-xs text-text-muted">
            v0.8.x
          </span>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Create Sidebar component**

```tsx
// src/components/layout/Sidebar.tsx
import { navigation, allSectionIds } from "../../data/navigation";
import { useActiveSection } from "../../hooks/useActiveSection";

export function Sidebar() {
  const activeId = useActiveSection(allSectionIds);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-border p-4 lg:block">
      {navigation.map((group) => (
        <div key={group.label} className="mb-6">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
            {group.emoji} {group.label}
          </h3>
          <ul className="space-y-1">
            {group.items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                    activeId === item.id
                      ? "bg-accent/10 text-accent"
                      : "text-text-secondary hover:bg-bg-card hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
```

- [ ] **Step 4: Create Footer component**

```tsx
// src/components/layout/Footer.tsx
export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-8 text-center text-sm text-text-muted">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4">
        <a
          href="https://github.com/NousResearch/hermes-agent"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-accent"
        >
          GitHub
        </a>
        <span className="text-border">·</span>
        <a
          href="https://hermes-agent.nousresearch.com/docs/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-accent"
        >
          官方文档
        </a>
        <span className="text-border">·</span>
        <a
          href="https://github.com/0xNyk/awesome-hermes-agent"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-accent"
        >
          awesome-hermes-agent
        </a>
      </div>
      <p className="mt-4">
        本教程为社区贡献，非 NousResearch 官方出品
      </p>
    </footer>
  );
}
```

- [ ] **Step 5: Create Section wrapper**

```tsx
// src/components/layout/Section.tsx
import type { ReactNode } from "react";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className = "" }: SectionProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.05 });
  const reduced = useReducedMotion();

  return (
    <section
      ref={ref}
      id={id}
      className={`scroll-mt-16 py-16 ${className}`}
      style={{
        opacity: reduced || inView ? 1 : 0,
        transform: reduced || inView ? "none" : "translateY(20px)",
        transition: reduced ? "none" : "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      {children}
    </section>
  );
}
```

- [ ] **Step 6: Wire up App.tsx with layout**

Replace `src/App.tsx`:

```tsx
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { Footer } from "./components/layout/Footer";
import { Section } from "./components/layout/Section";

export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Header />
      <div className="mx-auto flex max-w-[1200px]">
        <Sidebar />
        <main className="min-w-0 flex-1 px-6 lg:px-12">
          <Section id="what-is-hermes">
            <h2 className="text-2xl font-bold">0.1 What is Hermes Agent?</h2>
            <p className="mt-4 text-text-secondary">内容待后续任务填充</p>
          </Section>
          <Section id="comparison">
            <h2 className="text-2xl font-bold">0.2 和其他框架有什么不同</h2>
            <p className="mt-4 text-text-secondary">内容待后续任务填充</p>
          </Section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 7: Verify layout in browser**

Run `npm run dev`, confirm:
- Header sticks to top with backdrop blur
- Sidebar visible on wide screens, hidden on mobile
- Sections fade in on scroll
- Sidebar highlights active section during scroll

- [ ] **Step 8: Commit**

```bash
git add src/components/layout/ src/data/navigation.ts src/App.tsx
git commit -m "feat: add layout components with sidebar navigation and scroll spy"
```

---

## Task 4: Core UI Component Library

**Files:**
- Create: `src/components/ui/TypewriterTitle.tsx`, `src/components/ui/Terminal.tsx`, `src/components/ui/CodeBlock.tsx`, `src/components/ui/TryItBox.tsx`, `src/components/ui/ExtendedReading.tsx`, `src/components/ui/FlipCard.tsx`, `src/components/ui/FoldPanel.tsx`, `src/components/ui/TabPanel.tsx`, `src/components/ui/CardGrid.tsx`, `src/components/ui/CheckList.tsx`, `src/components/ui/HoverTable.tsx`

- [ ] **Step 1: TypewriterTitle — Layer entrance animation**

```tsx
// src/components/ui/TypewriterTitle.tsx
import { useEffect, useState } from "react";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface TypewriterTitleProps {
  text: string;
  subtitle?: string;
  className?: string;
}

export function TypewriterTitle({ text, subtitle, className = "" }: TypewriterTitleProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [displayedChars, setDisplayedChars] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView || reduced) {
      setDisplayedChars(text.length);
      setDone(true);
      return;
    }
    setDisplayedChars(0);
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedChars(i);
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 300);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [inView, text, reduced]);

  return (
    <div ref={ref} className={`mb-8 ${className}`}>
      <h2 className="text-3xl font-bold lg:text-4xl">
        <span>{text.slice(0, displayedChars)}</span>
        {!done && (
          <span className="ml-0.5 inline-block h-8 w-0.5 animate-cursor bg-accent" />
        )}
      </h2>
      {subtitle && done && (
        <p className="mt-2 text-lg text-text-secondary animate-fade-in-up">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Terminal — Simulated terminal with typing**

```tsx
// src/components/ui/Terminal.tsx
import { useEffect, useState } from "react";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface TerminalLine {
  type: "command" | "output" | "comment";
  text: string;
  delay?: number; // ms before this line appears
}

interface TerminalProps {
  title?: string;
  lines: TerminalLine[];
}

export function Terminal({ title = "Terminal", lines }: TerminalProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setVisibleCount(lines.length);
      return;
    }
    setVisibleCount(0);
    let i = 0;
    const showNext = () => {
      if (i >= lines.length) return;
      const delay = lines[i].delay ?? (lines[i].type === "command" ? 800 : 200);
      setTimeout(() => {
        i++;
        setVisibleCount(i);
        showNext();
      }, delay);
    };
    showNext();
  }, [inView, lines, reduced]);

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-border bg-bg-primary">
      <div className="flex items-center gap-2 border-b border-border bg-bg-card px-4 py-2">
        <span className="h-3 w-3 rounded-full bg-error/60" />
        <span className="h-3 w-3 rounded-full bg-warning/60" />
        <span className="h-3 w-3 rounded-full bg-success/60" />
        <span className="ml-2 text-xs text-text-muted">{title}</span>
      </div>
      <div className="p-4 font-mono text-sm leading-relaxed">
        {lines.slice(0, visibleCount).map((line, i) => (
          <div key={i} className="animate-fade-in-up">
            {line.type === "command" && (
              <div>
                <span className="text-success">$</span>{" "}
                <span className="text-text-primary">{line.text}</span>
              </div>
            )}
            {line.type === "output" && (
              <div className="text-text-secondary">{line.text}</div>
            )}
            {line.type === "comment" && (
              <div className="text-text-muted"># {line.text}</div>
            )}
          </div>
        ))}
        {visibleCount < lines.length && visibleCount > 0 && (
          <span className="inline-block h-4 w-2 animate-blink bg-text-primary" />
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: CodeBlock — Shiki-highlighted code with copy**

```tsx
// src/components/ui/CodeBlock.tsx
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  lang: string;
  title?: string;
}

export function CodeBlock({ code, lang, title }: CodeBlockProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    codeToHtml(code.trim(), {
      lang,
      theme: "github-dark-default",
    }).then(setHtml);
  }, [code, lang]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code.trim());
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border">
      {title && (
        <div className="flex items-center justify-between border-b border-border bg-bg-card px-4 py-2">
          <span className="text-xs text-text-muted">{title}</span>
          <span className="rounded bg-bg-elevated px-1.5 py-0.5 text-xs text-text-muted">
            {lang}
          </span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className="absolute right-2 top-2 rounded-md border border-border bg-bg-card px-2 py-1 text-xs text-text-muted opacity-0 transition-opacity hover:text-accent group-hover:opacity-100"
        >
          Copy
        </button>
        {html ? (
          <div
            className="overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="overflow-x-auto bg-bg-primary p-4 text-sm text-text-secondary">
            <code>{code.trim()}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: TryItBox — Green "try it yourself" callout**

```tsx
// src/components/ui/TryItBox.tsx
import type { ReactNode } from "react";

interface TryItBoxProps {
  children: ReactNode;
}

export function TryItBox({ children }: TryItBoxProps) {
  return (
    <div className="my-6 rounded-lg border border-success/30 bg-success/5 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-success">
        <span>▶</span> 动手试试
      </div>
      <div className="text-sm text-text-secondary">{children}</div>
    </div>
  );
}
```

- [ ] **Step 5: ExtendedReading — Links at section end**

```tsx
// src/components/ui/ExtendedReading.tsx
interface ReadingLink {
  title: string;
  url: string;
  source: string;
}

interface ExtendedReadingProps {
  links: ReadingLink[];
}

export function ExtendedReading({ links }: ExtendedReadingProps) {
  return (
    <div className="mt-8 rounded-lg border border-border bg-bg-card p-4">
      <h4 className="mb-3 text-sm font-semibold text-text-muted">📚 延伸阅读</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.url} className="text-sm">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              {link.title}
            </a>
            <span className="ml-2 text-text-muted">— {link.source}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 6: FlipCard — Click to flip between front/back**

```tsx
// src/components/ui/FlipCard.tsx
import { useState, type ReactNode } from "react";

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
}

export function FlipCard({ front, back, className = "" }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`cursor-pointer [perspective:1000px] ${className}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "none" }}
      >
        <div className="rounded-lg border border-border bg-bg-card p-6 [backface-visibility:hidden]">
          {front}
          <p className="mt-3 text-xs text-text-muted">点击翻转 →</p>
        </div>
        <div className="absolute inset-0 rounded-lg border border-accent/30 bg-bg-card p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: FoldPanel — Collapsible panel**

```tsx
// src/components/ui/FoldPanel.tsx
import { useState, type ReactNode } from "react";

interface FoldPanelProps {
  title: string;
  badge?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function FoldPanel({ title, badge, children, defaultOpen = false }: FoldPanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 py-3 text-left transition-colors hover:text-accent"
      >
        <span
          className="text-text-muted transition-transform"
          style={{ transform: open ? "rotate(90deg)" : "none" }}
        >
          ▶
        </span>
        <span className="font-medium">{title}</span>
        {badge && (
          <span className="rounded-full bg-bg-elevated px-2 py-0.5 text-xs text-text-muted">
            {badge}
          </span>
        )}
      </button>
      {open && <div className="pb-4 pl-7">{children}</div>}
    </div>
  );
}
```

- [ ] **Step 8: TabPanel — Tab switcher**

```tsx
// src/components/ui/TabPanel.tsx
import { useState, type ReactNode } from "react";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabPanelProps {
  tabs: Tab[];
}

export function TabPanel({ tabs }: TabPanelProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm transition-colors ${
              active === i
                ? "border-b-2 border-accent text-accent"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-4">{tabs[active].content}</div>
    </div>
  );
}
```

- [ ] **Step 9: CardGrid — Responsive clickable card grid**

```tsx
// src/components/ui/CardGrid.tsx
import { useState, type ReactNode } from "react";

interface Card {
  title: string;
  description: string;
  detail?: ReactNode;
  icon?: string;
}

interface CardGridProps {
  cards: Card[];
  columns?: 2 | 3 | 4;
}

export function CardGrid({ cards, columns = 3 }: CardGridProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const colClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={`grid gap-4 ${colClass}`}>
      {cards.map((card, i) => (
        <div
          key={card.title}
          onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
          className={`cursor-pointer rounded-lg border p-4 transition-all ${
            expandedIndex === i
              ? "border-accent bg-accent/5"
              : "border-border bg-bg-card hover:border-text-muted"
          }`}
        >
          <div className="flex items-start gap-2">
            {card.icon && <span className="text-lg">{card.icon}</span>}
            <div>
              <h4 className="font-medium">{card.title}</h4>
              <p className="mt-1 text-sm text-text-secondary">{card.description}</p>
            </div>
          </div>
          {expandedIndex === i && card.detail && (
            <div className="mt-3 border-t border-border pt-3 text-sm text-text-secondary">
              {card.detail}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 10: CheckList — Visual checklist**

```tsx
// src/components/ui/CheckList.tsx
interface CheckItem {
  label: string;
  description?: string;
}

interface CheckListProps {
  items: CheckItem[];
}

export function CheckList({ items }: CheckListProps) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.label} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-success/50 text-xs text-success">
            ✓
          </span>
          <div>
            <span className="font-medium">{item.label}</span>
            {item.description && (
              <p className="mt-0.5 text-sm text-text-secondary">{item.description}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 11: HoverTable — Table with row highlight**

```tsx
// src/components/ui/HoverTable.tsx
interface HoverTableProps {
  headers: string[];
  rows: string[][];
}

export function HoverTable({ headers, rows }: HoverTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-bg-card">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left font-medium text-text-secondary">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-border transition-colors last:border-0 hover:bg-bg-card"
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 12: Verify all components render**

Create a quick test in the App by importing and rendering each component with sample data. Verify in browser. Then remove the test renders.

- [ ] **Step 13: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add core UI component library (11 components)"
```

---

## Task 5: Layer 0 Content Sections

**Files:**
- Create: `src/sections/layer0/WhatIsHermes.tsx`, `src/sections/layer0/Comparison.tsx`, `src/sections/layer0/QuickStart.tsx`, `src/sections/layer0/ArchitectureOverview.tsx`
- Modify: `src/App.tsx`

**Note:** Use `frontend-design` skill for visual quality. Each section follows the What → How → Why pattern from the spec. Chinese content with English technical terms.

- [ ] **Step 1: Create WhatIsHermes section (0.1)**

```tsx
// src/sections/layer0/WhatIsHermes.tsx
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

export function WhatIsHermes() {
  return (
    <Section id="what-is-hermes">
      <TypewriterTitle
        text="Layer 0 · 初见"
        subtitle="5 分钟建立直觉"
      />

      <h3 className="mt-12 text-2xl font-bold">What is Hermes Agent?</h3>

      <p className="mt-4 text-lg leading-relaxed text-text-secondary">
        Hermes Agent 是 NousResearch 开源的<strong className="text-text-primary">自进化个人 AI Agent 框架</strong>。
        它不只是一个聊天机器人——它能从经验中学习、创建可复用的 Skills、跨 session 记住你的偏好，
        并通过 20+ 消息平台随时待命。
      </p>

      {/* Capability matrix */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { value: "47+", label: "内置工具", desc: "终端/文件/Web/浏览器/视觉/TTS..." },
          { value: "20+", label: "消息平台", desc: "Telegram/Discord/微信/飞书..." },
          { value: "200+", label: "LLM 模型", desc: "通过 OpenRouter 接入" },
          { value: "∞", label: "自我进化", desc: "Skills 自动创建和改进" },
        ].map((item) => (
          <div key={item.label} className="rounded-lg border border-border bg-bg-card p-4 text-center">
            <div className="text-2xl font-bold text-accent">{item.value}</div>
            <div className="mt-1 font-medium">{item.label}</div>
            <div className="mt-1 text-xs text-text-muted">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Balanced community perspective */}
      <div className="mt-8 rounded-lg border border-border bg-bg-card p-6">
        <h4 className="font-medium">社区怎么看？</h4>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <blockquote className="border-l-2 border-success pl-4 text-sm text-text-secondary">
            "The agent that grows with you" — 真正意义上的个人 Agent，会记住你、会学习、会变得更好用。
          </blockquote>
          <blockquote className="border-l-2 border-warning pl-4 text-sm text-text-secondary">
            "Skills 本质上是结构化的 prompt injection with a CRUD layer，不是真正的能力获取。"
            <cite className="mt-1 block text-text-muted">— DEV Community Honest Review</cite>
          </blockquote>
        </div>
      </div>

      {/* Remotion video placeholder — will be replaced with actual player in Task 11 */}
      <div className="mt-8 flex aspect-video items-center justify-center rounded-lg border border-border bg-bg-card">
        <div className="text-center text-text-muted">
          <div className="text-4xl">▶</div>
          <p className="mt-2 text-sm">概览视频 (~30s) — Remotion Player 将在 Task 11 中集成</p>
        </div>
      </div>

      <ExtendedReading
        links={[
          { title: "Hermes Agent GitHub", url: "https://github.com/NousResearch/hermes-agent", source: "NousResearch" },
          { title: "Honest Review", url: "https://dev.to/george_larson_3cc4a57b08b/hermes-agent-honest-review-1557", source: "DEV Community" },
          { title: "官方文档", url: "https://hermes-agent.nousresearch.com/docs/", source: "NousResearch" },
        ]}
      />
    </Section>
  );
}
```

- [ ] **Step 2: Create Comparison section (0.2)**

```tsx
// src/sections/layer0/Comparison.tsx
import { Section } from "../../components/layout/Section";
import { FlipCard } from "../../components/ui/FlipCard";

const frameworks = [
  {
    name: "LangGraph",
    front: "编排框架 — 状态机 + 有向图",
    back: "最适合：需要精确控制多 Agent 状态流转的生产应用。学习曲线最陡，灵活度最高。本质是开发框架，不是开箱即用的 Agent。",
  },
  {
    name: "CrewAI",
    front: "团队协作框架 — 角色分工",
    back: "最适合：业务流程自动化，多角色配合完成任务。入门最简单（82% 任务成功率）。侧重团队编排而非个人助手。",
  },
  {
    name: "AutoGen",
    front: "对话式多 Agent — 辩论决策",
    back: "最适合：需要多模型讨论、交叉验证的场景。微软出品，强调多轮 Agent 间对话。侧重群体智能而非个人定制。",
  },
  {
    name: "Hermes Agent",
    front: "个人持久化 Agent — 自进化",
    back: "最适合：想要一个「懂你的」私人 Agent，跨平台随时可用，会从经验中学习。不是编排框架，是完整的 Agent 应用。",
  },
];

export function Comparison() {
  return (
    <Section id="comparison">
      <h3 className="text-2xl font-bold">和其他框架有什么不同？</h3>
      <p className="mt-4 text-text-secondary">
        Hermes Agent 不是 LangChain 的替代品——它们解决不同的问题。点击卡片了解差异：
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {frameworks.map((fw) => (
          <FlipCard
            key={fw.name}
            front={
              <div>
                <h4 className="text-lg font-bold text-accent">{fw.name}</h4>
                <p className="mt-2 text-sm text-text-secondary">{fw.front}</p>
              </div>
            }
            back={
              <div>
                <h4 className="text-lg font-bold">{fw.name}</h4>
                <p className="mt-2 text-sm text-text-secondary">{fw.back}</p>
              </div>
            }
          />
        ))}
      </div>

      <ExtendedReading
        links={[
          { title: "Hermes Agent — OpenClaw's Rival?", url: "https://www.turingpost.com/p/hermes", source: "TuringPost" },
        ]}
      />
    </Section>
  );
}
```

- [ ] **Step 3: Create QuickStart section (0.3)**

```tsx
// src/sections/layer0/QuickStart.tsx
import { Section } from "../../components/layout/Section";
import { Terminal } from "../../components/ui/Terminal";
import { TryItBox } from "../../components/ui/TryItBox";
import { CodeBlock } from "../../components/ui/CodeBlock";

export function QuickStart() {
  return (
    <Section id="quick-start">
      <h3 className="text-2xl font-bold">安装 + 第一次对话</h3>

      <p className="mt-4 text-text-secondary">
        两种安装方式：一键脚本（推荐）或开发者手动安装。
      </p>

      <h4 className="mt-8 text-lg font-semibold">快速安装</h4>
      <Terminal
        title="安装 Hermes Agent"
        lines={[
          { type: "command", text: "curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash" },
          { type: "output", text: "Installing Hermes Agent v0.8.0..." },
          { type: "output", text: "✓ Python 3.11 detected" },
          { type: "output", text: "✓ Dependencies installed" },
          { type: "output", text: "✓ hermes command available" },
          { type: "command", text: "source ~/.bashrc" },
          { type: "command", text: "hermes setup", delay: 500 },
          { type: "output", text: "Welcome to Hermes Agent! Let's get you set up..." },
        ]}
      />

      <h4 className="mt-8 text-lg font-semibold">开发者安装</h4>
      <CodeBlock
        lang="bash"
        title="从源码安装"
        code={`git clone https://github.com/NousResearch/hermes-agent.git
cd hermes-agent
uv venv venv --python 3.11
source venv/bin/activate
uv pip install -e ".[all,dev]"`}
      />

      <h4 className="mt-8 text-lg font-semibold">第一次对话：让 Agent 帮你搜索并写文件</h4>
      <p className="mt-2 text-text-secondary">
        安装完成后，直接运行 <code className="rounded bg-bg-card px-1.5 py-0.5 text-accent">hermes</code> 进入交互模式。
        试着让 Agent 做一件需要工具调用的事：
      </p>

      <Terminal
        title="第一次对话"
        lines={[
          { type: "command", text: "hermes" },
          { type: "output", text: "🔮 Hermes Agent v0.8.0" },
          { type: "output", text: 'You: 帮我搜索 "什么是 MCP 协议"，把要点总结写入 mcp-notes.md' },
          { type: "output", text: "" },
          { type: "output", text: "⚡ Using tool: web_search" },
          { type: "output", text: '  query: "MCP Model Context Protocol 协议 介绍"' },
          { type: "output", text: "  Found 8 results" },
          { type: "output", text: "" },
          { type: "output", text: "⚡ Using tool: write_file" },
          { type: "output", text: "  path: mcp-notes.md" },
          { type: "output", text: "  Writing 15 lines..." },
          { type: "output", text: "" },
          { type: "output", text: "已完成！我搜索了 MCP 协议的资料，并将要点总结写入了 mcp-notes.md。" },
          { type: "output", text: "主要内容包括：MCP 的定义、核心概念、传输方式、和 Function Calling 的区别..." },
        ]}
      />

      <TryItBox>
        <p>现在打开你的终端，运行：</p>
        <code className="mt-2 block rounded bg-bg-primary px-3 py-2 font-mono text-accent">
          hermes
        </code>
        <p className="mt-2">试着给 Agent 一个需要搜索或文件操作的任务，体验完整的工具调用链。</p>
      </TryItBox>
    </Section>
  );
}
```

- [ ] **Step 4: Create ArchitectureOverview section (0.4)**

```tsx
// src/sections/layer0/ArchitectureOverview.tsx
import { useState } from "react";
import { Section } from "../../components/layout/Section";

const modules = [
  {
    id: "core",
    label: "Agent Core",
    x: 200, y: 80, w: 160, h: 60,
    color: "#58a6ff",
    desc: "AIAgent 类 + Agent Loop — 整个系统的心脏",
    link: "cli-overview",
  },
  {
    id: "tools",
    label: "Tools (47+)",
    x: 60, y: 200, w: 140, h: 50,
    color: "#3fb950",
    desc: "终端/文件/Web/浏览器/视觉/TTS — 一切能力的来源",
    link: "tool-explorer",
  },
  {
    id: "memory",
    label: "Memory",
    x: 240, y: 200, w: 120, h: 50,
    color: "#d29922",
    desc: "MEMORY.md / USER.md / Session Search / Honcho",
    link: "memory-system",
  },
  {
    id: "skills",
    label: "Skills",
    x: 400, y: 200, w: 120, h: 50,
    color: "#f85149",
    desc: "从经验中自动创建的可复用指令",
    link: "skills-system",
  },
  {
    id: "gateway",
    label: "Gateway (20+)",
    x: 200, y: 320, w: 160, h: 50,
    color: "#a371f7",
    desc: "Telegram/Discord/微信/飞书 — 多平台消息网关",
    link: "messaging-platforms",
  },
];

export function ArchitectureOverview() {
  const [hovered, setHovered] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section id="architecture">
      <h3 className="text-2xl font-bold">架构鸟瞰</h3>
      <p className="mt-4 text-text-secondary">
        现在你已经体验了第一次对话。回头看看整体架构——悬停查看模块说明，点击跳转到对应章节：
      </p>

      <div className="mt-8 flex justify-center">
        <svg viewBox="0 0 560 400" className="w-full max-w-2xl">
          {/* Connection lines */}
          <line x1="280" y1="140" x2="130" y2="200" stroke="#30363d" strokeWidth="2" />
          <line x1="280" y1="140" x2="300" y2="200" stroke="#30363d" strokeWidth="2" />
          <line x1="280" y1="140" x2="460" y2="200" stroke="#30363d" strokeWidth="2" />
          <line x1="280" y1="140" x2="280" y2="320" stroke="#30363d" strokeWidth="2" strokeDasharray="6,4" />

          {modules.map((m) => {
            const isHovered = hovered === m.id;
            return (
              <g
                key={m.id}
                onMouseEnter={() => setHovered(m.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => scrollTo(m.link)}
                className="cursor-pointer"
              >
                <rect
                  x={m.x} y={m.y} width={m.w} height={m.h} rx={8}
                  fill={isHovered ? m.color + "30" : "#1c2128"}
                  stroke={m.color}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  className="transition-all"
                />
                <text
                  x={m.x + m.w / 2} y={m.y + m.h / 2 + 5}
                  textAnchor="middle"
                  fill={isHovered ? m.color : "#e6edf3"}
                  fontSize={14}
                  fontWeight={600}
                  className="pointer-events-none"
                >
                  {m.label}
                </text>
              </g>
            );
          })}

          {/* Tooltip */}
          {hovered && (() => {
            const m = modules.find((mod) => mod.id === hovered)!;
            return (
              <foreignObject x={m.x - 20} y={m.y + m.h + 8} width={m.w + 40} height={60}>
                <div className="rounded-md bg-bg-elevated px-3 py-2 text-center text-xs text-text-secondary shadow-lg">
                  {m.desc}
                </div>
              </foreignObject>
            );
          })()}
        </svg>
      </div>
    </Section>
  );
}
```

- [ ] **Step 5: Wire Layer 0 sections into App**

Update `src/App.tsx` to import and render all Layer 0 sections:

```tsx
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { Footer } from "./components/layout/Footer";
import { WhatIsHermes } from "./sections/layer0/WhatIsHermes";
import { Comparison } from "./sections/layer0/Comparison";
import { QuickStart } from "./sections/layer0/QuickStart";
import { ArchitectureOverview } from "./sections/layer0/ArchitectureOverview";

export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Header />
      <div className="mx-auto flex max-w-[1200px]">
        <Sidebar />
        <main className="min-w-0 flex-1 px-6 lg:px-12">
          {/* Layer 0 */}
          <WhatIsHermes />
          <Comparison />
          <QuickStart />
          <ArchitectureOverview />

          {/* Layer 1 placeholder */}
          <div className="py-32 text-center text-text-muted">
            Layer 1 内容将在后续任务中添加
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 6: Verify in browser**

Run `npm run dev`, confirm:
- Layer 0 typewriter title animates on scroll
- Capability matrix cards render
- Flip cards work (click to see framework comparison back)
- Terminal typing animation plays
- SVG architecture diagram highlights on hover, scrolls on click
- TryItBox renders with green border
- Extended reading links render

- [ ] **Step 7: Commit**

```bash
git add src/sections/layer0/ src/App.tsx
git commit -m "feat: add Layer 0 content (What is Hermes, Comparison, QuickStart, Architecture)"
```

---

## Task 6: Data Files for Layer 1

**Files:**
- Create: `src/data/commands.ts`, `src/data/models.ts`, `src/data/promptLayers.ts`, `src/data/tools.ts`, `src/data/skills.ts`, `src/data/platforms.ts`, `src/data/backends.ts`

- [ ] **Step 1: CLI commands data**

```typescript
// src/data/commands.ts
export interface CLICommand {
  name: string;
  command: string;
  description: string;
  detail: string;
  icon: string;
}

export const commands: CLICommand[] = [
  {
    name: "对话", command: "hermes",
    description: "进入交互式对话模式",
    detail: "启动 TUI 界面，支持多行输入、工具调用展示、session 自动保存。",
    icon: "💬",
  },
  {
    name: "选模型", command: "hermes model",
    description: "选择 LLM Provider 和模型",
    detail: "支持 OpenRouter、OpenAI、Anthropic、Google、本地模型等。可配置 Smart Routing。",
    icon: "🤖",
  },
  {
    name: "配工具", command: "hermes tools",
    description: "启用/禁用工具和 Toolset",
    detail: "47+ 内置工具按 Toolset 分组，可按需开关。支持 MCP Server 接入。",
    icon: "🔧",
  },
  {
    name: "设置向导", command: "hermes setup",
    description: "首次配置引导",
    detail: "交互式向导，帮你选模型、配 API key、设置终端后端、开启消息平台。",
    icon: "⚙️",
  },
  {
    name: "诊断", command: "hermes doctor",
    description: "检查环境和配置",
    detail: "检查 Python 版本、依赖安装、API key 有效性、工具注册状态、网络连通性。",
    icon: "🩺",
  },
  {
    name: "消息网关", command: "hermes gateway",
    description: "启动多平台消息网关",
    detail: "一个进程同时服务 Telegram、Discord、微信等 20+ 平台。每个平台独立配置。",
    icon: "🌐",
  },
  {
    name: "多身份", command: "hermes profile",
    description: "管理 Agent 身份/实例",
    detail: "create/clone/clone-all。每个 Profile 独立 config、memory、skills、sessions。",
    icon: "👥",
  },
  {
    name: "升级", command: "hermes update",
    description: "更新到最新版本",
    detail: "检查并安装最新版本。建议定期更新以获取安全补丁。",
    icon: "📦",
  },
];
```

- [ ] **Step 2: Models/providers data**

```typescript
// src/data/models.ts
export interface Provider {
  name: string;
  key: string;
  envVar: string;
  models: string[];
  description: string;
}

export const providers: Provider[] = [
  {
    name: "OpenRouter", key: "openrouter", envVar: "OPENROUTER_API_KEY",
    models: ["nous-hermes-3", "claude-3.5-sonnet", "gpt-4o", "gemini-2.0-flash"],
    description: "200+ 模型统一接入，推荐首选",
  },
  {
    name: "OpenAI", key: "openai", envVar: "OPENAI_API_KEY",
    models: ["gpt-4o", "gpt-4o-mini", "o1"],
    description: "直连 OpenAI API",
  },
  {
    name: "Anthropic", key: "anthropic", envVar: "ANTHROPIC_API_KEY",
    models: ["claude-opus-4", "claude-sonnet-4"],
    description: "原生 Anthropic Messages API 支持",
  },
  {
    name: "本地模型", key: "local", envVar: "",
    models: ["llama-3", "hermes-3-local", "qwen-2.5"],
    description: "通过 Ollama/vLLM 等本地服务",
  },
];

export interface ConfigOption {
  key: string;
  label: string;
  type: "select" | "toggle" | "text";
  options?: { value: string; label: string }[];
  default: string;
  description: string;
}

export const configOptions: ConfigOption[] = [
  {
    key: "provider", label: "Provider", type: "select",
    options: providers.map((p) => ({ value: p.key, label: p.name })),
    default: "openrouter",
    description: "LLM 服务提供方",
  },
  {
    key: "model", label: "Model", type: "text",
    default: "nous-hermes-3",
    description: "模型标识",
  },
  {
    key: "smart_routing", label: "Smart Routing", type: "toggle",
    default: "true",
    description: "简单任务自动切换 cheap model 省费用",
  },
  {
    key: "max_iterations", label: "Max Iterations", type: "text",
    default: "90",
    description: "单次对话最大工具调用轮次",
  },
];
```

- [ ] **Step 3: Prompt layers data**

```typescript
// src/data/promptLayers.ts
export interface PromptLayer {
  order: number;
  name: string;
  source: string;
  description: string;
  example: string;
  editable: boolean;
}

export const promptLayers: PromptLayer[] = [
  {
    order: 1, name: "Agent Identity", source: "SOUL.md",
    description: "Agent 的身份定义，性格特征，行为准则",
    example: "You are Hermes, a helpful AI assistant created by Nous Research...",
    editable: true,
  },
  {
    order: 2, name: "Tool-aware Guidance", source: "内置",
    description: "基于启用的工具生成对应指引（Memory/Skills/Session Search）",
    example: "You have access to persistent memory. Use the memory tool to...",
    editable: false,
  },
  {
    order: 3, name: "Tool-use Enforcement", source: "内置",
    description: "针对倾向描述而非行动的模型（GPT/Gemini/Grok）强制使用工具",
    example: "You MUST use your tools to take action. Do not just describe what you would do.",
    editable: false,
  },
  {
    order: 4, name: "User/Gateway Prompt", source: "config.yaml",
    description: "用户自定义的系统指令",
    example: "Always respond in Chinese. Be concise.",
    editable: true,
  },
  {
    order: 5, name: "Persistent Memory", source: "MEMORY.md + USER.md",
    description: "Agent 的笔记和对用户的认知（frozen snapshot）",
    example: "## Memory Notes\n- User prefers terminal commands over GUI\n- Project uses Python 3.11",
    editable: true,
  },
  {
    order: 6, name: "External Memory", source: "Plugin (Honcho)",
    description: "外部记忆提供者注入的上下文",
    example: "[Honcho user model: developer, prefers direct communication]",
    editable: false,
  },
  {
    order: 7, name: "Skills Index", source: "~/.hermes/skills/",
    description: "可用 Skills 的元数据索引（仅名称+描述，不含全文）",
    example: "Available skills:\n- git-workflow: Standard git workflow with PR...\n- python-debug: Debug Python exceptions...",
    editable: false,
  },
  {
    order: 8, name: "Context Files", source: "AGENTS.md / .cursorrules",
    description: "项目级上下文文件（经过 prompt injection 扫描）",
    example: "# Project Context\nTech stack: React + TypeScript\nLinting: ESLint + Prettier",
    editable: true,
  },
  {
    order: 9, name: "Timestamp + Model Info", source: "系统",
    description: "当前时间和模型元信息",
    example: "Current time: 2026-04-13T15:30:00+08:00\nModel: hermes-3 (128K context)",
    editable: false,
  },
  {
    order: 10, name: "Platform + Environment", source: "系统",
    description: "平台提示和环境检测（WSL/Termux/容器）",
    example: "You are running on macOS via CLI. Use markdown formatting freely.",
    editable: false,
  },
];
```

- [ ] **Step 4: Tools data**

```typescript
// src/data/tools.ts
export interface ToolCategory {
  name: string;
  icon: string;
  tools: { name: string; description: string }[];
}

export const toolCategories: ToolCategory[] = [
  {
    name: "终端", icon: "⌨️",
    tools: [
      { name: "terminal", description: "执行 shell 命令（支持 6 种后端）" },
      { name: "process", description: "管理后台进程" },
    ],
  },
  {
    name: "文件", icon: "📁",
    tools: [
      { name: "read_file", description: "读取文件内容（支持模糊匹配路径）" },
      { name: "write_file", description: "写入文件（自动创建目录）" },
      { name: "patch", description: "精确修改文件中的代码段" },
      { name: "search_files", description: "在项目中搜索文件内容" },
    ],
  },
  {
    name: "Web 搜索", icon: "🔍",
    tools: [
      { name: "web_search", description: "网页搜索（Exa/Firecrawl/Tavily 后端）" },
      { name: "web_extract", description: "提取网页内容为结构化文本" },
    ],
  },
  {
    name: "浏览器", icon: "🌐",
    tools: [
      { name: "browser_navigate", description: "导航到 URL" },
      { name: "browser_snapshot", description: "截取当前页面快照" },
      { name: "browser_click", description: "点击页面元素" },
      { name: "browser_type", description: "在输入框中输入文本" },
      { name: "browser_scroll", description: "滚动页面" },
    ],
  },
  {
    name: "视觉 / 多模态", icon: "👁",
    tools: [
      { name: "vision_analyze", description: "分析图片内容" },
      { name: "image_generate", description: "通过 fal.ai 生成图片" },
      { name: "text_to_speech", description: "文本转语音（Edge TTS/ElevenLabs/OpenAI）" },
    ],
  },
  {
    name: "记忆", icon: "🧠",
    tools: [
      { name: "memory", description: "读写持久化笔记（MEMORY.md + USER.md）" },
      { name: "session_search", description: "搜索历史对话（SQLite FTS5）" },
    ],
  },
  {
    name: "Skills", icon: "📚",
    tools: [
      { name: "skills_list", description: "列出可用 Skills 元数据" },
      { name: "skill_view", description: "查看 Skill 完整内容" },
      { name: "skill_manage", description: "创建/编辑/删除 Skills" },
    ],
  },
  {
    name: "协作", icon: "🤝",
    tools: [
      { name: "delegate_task", description: "生成子 Agent 执行任务" },
      { name: "execute_code", description: "编程式工具调用（PTC）" },
      { name: "mixture_of_agents", description: "多模型协商推理" },
    ],
  },
  {
    name: "系统", icon: "🏠",
    tools: [
      { name: "todo", description: "任务规划和追踪" },
      { name: "clarify", description: "向用户提问澄清" },
      { name: "send_message", description: "跨平台发消息" },
      { name: "cronjob", description: "创建定时任务" },
    ],
  },
  {
    name: "Home Assistant", icon: "🏡",
    tools: [
      { name: "ha_list_entities", description: "列出智能家居设备" },
      { name: "ha_get_state", description: "查询设备状态" },
      { name: "ha_call_service", description: "控制设备" },
    ],
  },
];
```

- [ ] **Step 5: Skills data**

```typescript
// src/data/skills.ts
export interface SkillCategory {
  name: string;
  count: number;
  examples: string[];
}

export const skillCategories: SkillCategory[] = [
  { name: "software-development", count: 8, examples: ["git-workflow", "python-debug", "code-review"] },
  { name: "devops", count: 5, examples: ["docker-deploy", "ci-cd-setup", "log-analysis"] },
  { name: "research", count: 4, examples: ["paper-summary", "literature-review", "data-collection"] },
  { name: "data-science", count: 3, examples: ["pandas-analysis", "visualization", "ml-pipeline"] },
  { name: "creative", count: 4, examples: ["blog-writing", "story-generation", "image-prompt"] },
  { name: "github", count: 3, examples: ["pr-review", "issue-triage", "release-notes"] },
  { name: "mlops", count: 2, examples: ["model-evaluation", "training-pipeline"] },
  { name: "smart-home", count: 2, examples: ["scene-automation", "energy-monitoring"] },
];
```

- [ ] **Step 6: Platforms data**

```typescript
// src/data/platforms.ts
export interface PlatformGuide {
  name: string;
  icon: string;
  steps: { title: string; code?: string; note?: string }[];
}

export const platformGuides: PlatformGuide[] = [
  {
    name: "Telegram", icon: "✈️",
    steps: [
      { title: "创建 Bot", note: "在 Telegram 找 @BotFather，发送 /newbot，获取 token" },
      { title: "配置 .env", code: "TELEGRAM_BOT_TOKEN=your_token_here" },
      { title: "启动网关", code: "hermes gateway" },
      { title: "发消息测试", note: "在 Telegram 找到你的 bot，发送任何消息" },
    ],
  },
  {
    name: "Discord", icon: "🎮",
    steps: [
      { title: "创建应用", note: "在 Discord Developer Portal 创建 Application，添加 Bot" },
      { title: "获取 Token", note: "Bot → Reset Token → 复制" },
      { title: "配置 .env", code: "DISCORD_BOT_TOKEN=your_token_here" },
      { title: "邀请 Bot", note: "OAuth2 → URL Generator → bot scope → 生成链接 → 邀请到服务器" },
      { title: "启动网关", code: "hermes gateway" },
    ],
  },
  {
    name: "微信 (WeChat)", icon: "💚",
    steps: [
      { title: "准备", note: "需要 WeChat 桌面版 + 第三方 bridge (如 WeCom 企业微信接口)" },
      { title: "配置 .env", code: "WEIXIN_APP_ID=your_app_id\nWEIXIN_APP_SECRET=your_secret" },
      { title: "启动网关", code: "hermes gateway" },
      { title: "注意", note: "微信个人号接入限制较多，推荐使用企业微信或 WeCom 回调模式" },
    ],
  },
  {
    name: "飞书 (Feishu)", icon: "🐦",
    steps: [
      { title: "创建应用", note: "在飞书开放平台创建企业自建应用" },
      { title: "配置权限", note: "添加机器人能力，配置消息事件订阅" },
      { title: "配置 .env", code: "FEISHU_APP_ID=your_app_id\nFEISHU_APP_SECRET=your_secret\nFEISHU_VERIFICATION_TOKEN=your_token" },
      { title: "启动网关", code: "hermes gateway" },
    ],
  },
];
```

- [ ] **Step 7: Backends data**

```typescript
// src/data/backends.ts
export const backendHeaders = ["后端", "适用场景", "安全边界", "成本", "配置"];

export const backendRows = [
  ["local", "开发/个人使用", "无隔离（Agent 和你共享系统）", "免费", "TERMINAL_BACKEND=local"],
  ["Docker", "生产推荐", "容器级隔离", "低（仅容器资源）", "TERMINAL_BACKEND=docker"],
  ["SSH", "远程服务器", "网络级隔离", "服务器费用", "TERMINAL_BACKEND=ssh"],
  ["Modal", "Serverless", "函数级隔离", "按调用量计费", "TERMINAL_BACKEND=modal"],
  ["Daytona", "云开发环境", "Workspace 隔离", "按用量计费", "TERMINAL_BACKEND=daytona"],
  ["Singularity", "HPC/学术", "用户级隔离", "集群费用", "TERMINAL_BACKEND=singularity"],
];
```

- [ ] **Step 8: Commit**

```bash
git add src/data/
git commit -m "feat: add data files for Layer 1 content (commands, models, tools, skills, platforms, backends)"
```

---

## Task 7: Prompt Assembler Playground

**Files:**
- Create: `src/playgrounds/PromptAssembler.tsx`

This is the most important playground: users edit SOUL.md/MEMORY.md/USER.md/AGENTS.md content and see the assembled System Prompt in real time with token count estimation.

- [ ] **Step 1: Build PromptAssembler component**

```tsx
// src/playgrounds/PromptAssembler.tsx
import { useState, useMemo } from "react";
import { promptLayers } from "../data/promptLayers";

const DEFAULT_VALUES: Record<string, string> = {
  "SOUL.md": "You are Hermes, a knowledgeable and helpful AI assistant. You are direct, precise, and always use your tools to take action rather than just describing what you would do.",
  "MEMORY.md": "- User prefers terminal over GUI\n- Project uses Python 3.11 + uv\n- Timezone: Asia/Shanghai",
  "USER.md": "- Developer with 5 years experience\n- Interested in AI agents and automation\n- Communicates in Chinese",
  "AGENTS.md": "# Project: hermes-tutorial\nTech stack: React + TypeScript + Tailwind\nConventions: Use functional components, prefer composition over inheritance",
  "config.yaml": "Always respond in Chinese when the user writes in Chinese.",
};

function estimateTokens(text: string): number {
  // Rough estimate: 1 token ≈ 4 chars for mixed Chinese/English
  return Math.ceil(text.length / 3.5);
}

export function PromptAssembler() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [activeTab, setActiveTab] = useState("SOUL.md");

  const assembledPrompt = useMemo(() => {
    return promptLayers.map((layer) => {
      let content = "";
      switch (layer.order) {
        case 1: content = values["SOUL.md"]; break;
        case 4: content = values["config.yaml"]; break;
        case 5: content = `${values["MEMORY.md"]}\n\n---\n\n${values["USER.md"]}`; break;
        case 8: content = values["AGENTS.md"]; break;
        default: content = layer.example;
      }
      return { ...layer, content };
    });
  }, [values]);

  const totalText = assembledPrompt.map((l) => l.content).join("\n\n");
  const totalTokens = estimateTokens(totalText);

  const editableTabs = ["SOUL.md", "MEMORY.md", "USER.md", "AGENTS.md", "config.yaml"];

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between border-b border-border bg-bg-card px-4 py-2">
        <span className="text-sm font-medium">Prompt 组装可视化器</span>
        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
          ~{totalTokens.toLocaleString()} tokens
        </span>
      </div>

      <div className="grid lg:grid-cols-2">
        {/* Left: Editor */}
        <div className="border-r border-border">
          <div className="flex gap-1 border-b border-border bg-bg-primary px-2 py-1">
            {editableTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded px-2 py-1 text-xs transition-colors ${
                  activeTab === tab
                    ? "bg-accent/10 text-accent"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <textarea
            value={values[activeTab]}
            onChange={(e) =>
              setValues({ ...values, [activeTab]: e.target.value })
            }
            className="h-72 w-full resize-none bg-bg-primary p-4 font-mono text-sm text-text-primary outline-none"
            spellCheck={false}
          />
        </div>

        {/* Right: Assembled output */}
        <div className="h-[350px] overflow-y-auto bg-bg-primary p-4">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
            组装后的 System Prompt（10 层）
          </h4>
          {assembledPrompt.map((layer) => {
            const tokens = estimateTokens(layer.content);
            return (
              <div key={layer.order} className="mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                    {layer.order}
                  </span>
                  <span className="text-xs font-medium">{layer.name}</span>
                  <span className="text-xs text-text-muted">({layer.source})</span>
                  <span className="ml-auto text-xs text-text-muted">~{tokens}t</span>
                </div>
                <pre className="mt-1 rounded bg-bg-card p-2 text-xs text-text-secondary">
                  {layer.content.length > 200
                    ? layer.content.slice(0, 200) + "..."
                    : layer.content}
                </pre>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Import into `src/App.tsx` temporarily, confirm:
- Tab switching works between editable files
- Text changes reflect immediately in right panel
- Token count updates
- 10 layers display in order with numbered badges

- [ ] **Step 3: Commit**

```bash
git add src/playgrounds/PromptAssembler.tsx
git commit -m "feat: add Prompt Assembler playground with live assembly preview"
```

---

## Task 8: Config Builder Playground

**Files:**
- Create: `src/playgrounds/ConfigBuilder.tsx`

- [ ] **Step 1: Build ConfigBuilder component**

```tsx
// src/playgrounds/ConfigBuilder.tsx
import { useState, useMemo } from "react";
import { providers, configOptions } from "../data/models";

export function ConfigBuilder() {
  const [config, setConfig] = useState<Record<string, string>>(
    Object.fromEntries(configOptions.map((o) => [o.key, o.default])),
  );
  const [copied, setCopied] = useState(false);

  const selectedProvider = providers.find((p) => p.key === config.provider);

  const yaml = useMemo(() => {
    const lines: string[] = [
      "# ~/.hermes/config.yaml",
      `provider: ${config.provider}`,
      `model: ${config.model}`,
    ];
    if (config.smart_routing === "true") {
      lines.push("smart_routing:", "  enabled: true", "  cheap_model: auto");
    }
    lines.push(`max_iterations: ${config.max_iterations}`);
    if (selectedProvider?.envVar) {
      lines.push("", "# 在 ~/.hermes/.env 中配置:", `# ${selectedProvider.envVar}=your_key_here`);
    }
    return lines.join("\n");
  }, [config, selectedProvider]);

  const copyYaml = () => {
    navigator.clipboard.writeText(yaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-border">
      <div className="border-b border-border bg-bg-card px-4 py-2 text-sm font-medium">
        config.yaml 构建器
      </div>

      <div className="grid lg:grid-cols-2">
        {/* Left: Options */}
        <div className="space-y-4 border-r border-border p-4">
          {/* Provider select */}
          <div>
            <label className="mb-1 block text-xs font-medium text-text-muted">Provider</label>
            <div className="grid grid-cols-2 gap-2">
              {providers.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setConfig({ ...config, provider: p.key, model: p.models[0] })}
                  className={`rounded-lg border p-3 text-left text-sm transition-all ${
                    config.provider === p.key
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-text-muted"
                  }`}
                >
                  <div className="font-medium">{p.name}</div>
                  <div className="mt-1 text-xs text-text-muted">{p.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Model select */}
          {selectedProvider && (
            <div>
              <label className="mb-1 block text-xs font-medium text-text-muted">Model</label>
              <select
                value={config.model}
                onChange={(e) => setConfig({ ...config, model: e.target.value })}
                className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm outline-none focus:border-accent"
              >
                {selectedProvider.models.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          )}

          {/* Smart Routing toggle */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Smart Routing</div>
              <div className="text-xs text-text-muted">简单任务自动用便宜模型</div>
            </div>
            <button
              onClick={() => setConfig({ ...config, smart_routing: config.smart_routing === "true" ? "false" : "true" })}
              className={`h-6 w-11 rounded-full transition-colors ${
                config.smart_routing === "true" ? "bg-accent" : "bg-bg-elevated"
              }`}
            >
              <div
                className={`h-5 w-5 rounded-full bg-white transition-transform ${
                  config.smart_routing === "true" ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Max iterations */}
          <div>
            <label className="mb-1 block text-xs font-medium text-text-muted">
              Max Iterations: {config.max_iterations}
            </label>
            <input
              type="range" min="10" max="150" step="10"
              value={config.max_iterations}
              onChange={(e) => setConfig({ ...config, max_iterations: e.target.value })}
              className="w-full accent-accent"
            />
          </div>
        </div>

        {/* Right: Generated YAML */}
        <div className="relative bg-bg-primary p-4">
          <button
            onClick={copyYaml}
            className="absolute right-4 top-4 rounded-md border border-border bg-bg-card px-2 py-1 text-xs text-text-muted transition-colors hover:text-accent"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
          <pre className="font-mono text-sm leading-relaxed text-text-secondary">
            {yaml}
          </pre>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Confirm: provider selection updates model list, Smart Routing toggle works, YAML updates in real time, Copy button works.

- [ ] **Step 3: Commit**

```bash
git add src/playgrounds/ConfigBuilder.tsx
git commit -m "feat: add Config Builder playground with live YAML generation"
```

---

## Task 9: Memory Sandbox Playground

**Files:**
- Create: `src/playgrounds/MemorySandbox.tsx`

- [ ] **Step 1: Build MemorySandbox component**

```tsx
// src/playgrounds/MemorySandbox.tsx
import { useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Stage = "idle" | "writing" | "stored" | "loading" | "injected" | "nudge";

const stages: { key: Stage; label: string; description: string }[] = [
  { key: "idle", label: "输入", description: "Agent 决定保存一条记忆" },
  { key: "writing", label: "写入", description: "memory 工具将内容追加到 MEMORY.md" },
  { key: "stored", label: "落盘", description: "内容持久化在 ~/.hermes/MEMORY.md" },
  { key: "loading", label: "加载", description: "下次 session 启动时读取 MEMORY.md" },
  { key: "injected", label: "注入", description: "作为 frozen snapshot 注入 system prompt 第 5 层" },
  { key: "nudge", label: "审视", description: "经过若干轮对话后，Agent 被提醒审视和更新记忆" },
];

export function MemorySandbox() {
  const [memoryText, setMemoryText] = useState("User prefers terminal commands over GUI tools");
  const [currentStage, setCurrentStage] = useState<Stage>("idle");
  const [isPlaying, setIsPlaying] = useState(false);
  const reduced = useReducedMotion();

  const playSequence = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    const stageKeys = stages.map((s) => s.key);
    let i = 0;

    const advance = () => {
      if (i >= stageKeys.length) {
        setIsPlaying(false);
        return;
      }
      setCurrentStage(stageKeys[i]);
      i++;
      setTimeout(advance, reduced ? 100 : 1200);
    };
    advance();
  };

  const stageIndex = stages.findIndex((s) => s.key === currentStage);

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-border">
      <div className="border-b border-border bg-bg-card px-4 py-2 text-sm font-medium">
        记忆生命周期沙盒
      </div>

      <div className="p-4">
        {/* Input area */}
        <div className="flex gap-3">
          <input
            type="text"
            value={memoryText}
            onChange={(e) => setMemoryText(e.target.value)}
            placeholder="输入一条要记住的内容..."
            className="flex-1 rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm outline-none focus:border-accent"
          />
          <button
            onClick={playSequence}
            disabled={isPlaying || !memoryText.trim()}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg-primary transition-opacity disabled:opacity-50"
          >
            {isPlaying ? "播放中..." : "▶ 观看流转"}
          </button>
        </div>

        {/* Stage visualization */}
        <div className="mt-6 flex items-center gap-2">
          {stages.map((stage, i) => (
            <div key={stage.key} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                  i <= stageIndex
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-text-muted"
                }`}
              >
                {i + 1}
              </div>
              {i < stages.length - 1 && (
                <div
                  className={`mx-1 h-0.5 w-6 transition-colors sm:w-10 ${
                    i < stageIndex ? "bg-accent" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Current stage detail */}
        <div className="mt-4 rounded-lg bg-bg-card p-4">
          <div className="flex items-center gap-2">
            <span className="font-medium text-accent">{stages[stageIndex].label}</span>
            <span className="text-sm text-text-secondary">— {stages[stageIndex].description}</span>
          </div>

          {/* Stage-specific content preview */}
          <pre className="mt-3 rounded bg-bg-primary p-3 font-mono text-xs text-text-secondary">
            {currentStage === "idle" && `memory("save", "${memoryText}")`}
            {currentStage === "writing" && `# MEMORY.md\n- ${memoryText}`}
            {currentStage === "stored" && `~/.hermes/MEMORY.md  (${memoryText.length} chars / 2200 limit)`}
            {currentStage === "loading" && `[Session start] Loading MEMORY.md → frozen snapshot`}
            {currentStage === "injected" && `[System Prompt Layer 5]\n## Memory Notes\n- ${memoryText}`}
            {currentStage === "nudge" && `[Turn 15] "Review your memory notes. Is anything outdated?"`}
          </pre>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Confirm: text input works, Play button advances through 6 stages with visual progress, stage detail updates, reduced motion skips animation delays.

- [ ] **Step 3: Commit**

```bash
git add src/playgrounds/MemorySandbox.tsx
git commit -m "feat: add Memory Sandbox playground with 6-stage lifecycle visualization"
```

---

## Task 10: CSS Animations

**Files:**
- Create: `src/animations/MemoryFlowAnimation.tsx`, `src/animations/SkillLifecycleAnimation.tsx`

- [ ] **Step 1: Build MemoryFlowAnimation**

```tsx
// src/animations/MemoryFlowAnimation.tsx
import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

const layers = [
  { label: "MEMORY.md", color: "#d29922", desc: "Agent 笔记" },
  { label: "USER.md", color: "#3fb950", desc: "用户画像" },
  { label: "Session Search", color: "#58a6ff", desc: "FTS5 跨 session 搜索" },
  { label: "Honcho", color: "#a371f7", desc: "辩证式用户建模（可选）" },
];

export function MemoryFlowAnimation() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div ref={ref} className="mt-6 rounded-lg border border-border bg-bg-card p-6">
      <h4 className="mb-4 text-sm font-semibold text-text-muted">四层记忆 → System Prompt</h4>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        {/* Source layers */}
        <div className="flex flex-col gap-3">
          {layers.map((layer, i) => (
            <div
              key={layer.label}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="flex items-center gap-3 rounded-lg border p-3 transition-all"
              style={{
                borderColor: hoveredIndex === i ? layer.color : "var(--color-border)",
                backgroundColor: hoveredIndex === i ? layer.color + "10" : "transparent",
                opacity: inView || reduced ? 1 : 0,
                transform: inView || reduced ? "none" : "translateX(-20px)",
                transition: reduced ? "none" : `all 0.5s ease-out ${i * 0.15}s`,
              }}
            >
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: layer.color }}
              />
              <div>
                <div className="text-sm font-medium">{layer.label}</div>
                <div className="text-xs text-text-muted">{layer.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center gap-1 text-text-muted">
          <div className="hidden h-0.5 w-16 bg-border sm:block" />
          <span className="text-xs">frozen snapshot</span>
          <span className="text-lg">→</span>
        </div>

        {/* Target: System Prompt */}
        <div
          className="rounded-lg border border-accent/30 bg-accent/5 p-4"
          style={{
            opacity: inView || reduced ? 1 : 0,
            transform: inView || reduced ? "none" : "translateX(20px)",
            transition: reduced ? "none" : "all 0.5s ease-out 0.6s",
          }}
        >
          <div className="text-sm font-bold text-accent">System Prompt</div>
          <div className="mt-2 text-xs text-text-secondary">
            Layer 5: Persistent Memory
          </div>
          <div className="mt-1 text-xs text-text-muted">
            每次 session 开始时冻结快照
            <br />
            session 内不再变化（prefix caching）
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build SkillLifecycleAnimation**

```tsx
// src/animations/SkillLifecycleAnimation.tsx
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

const stages = [
  { icon: "🔧", label: "经验积累", desc: "5+ tool calls 完成复杂任务" },
  { icon: "✨", label: "自动创建", desc: "Agent 被提示保存为 Skill" },
  { icon: "💾", label: "存储", desc: "~/.hermes/skills/<category>/SKILL.md" },
  { icon: "🔍", label: "检索匹配", desc: "后续任务匹配到相关 Skill" },
  { icon: "📖", label: "使用", desc: "Skill 全文加载到 context" },
  { icon: "🔄", label: "改进/覆盖", desc: "Agent 发现过时则自动更新" },
];

export function SkillLifecycleAnimation() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="mt-6 rounded-lg border border-border bg-bg-card p-6">
      <h4 className="mb-4 text-sm font-semibold text-text-muted">Skill 生命周期</h4>

      <div className="flex flex-wrap justify-center gap-2">
        {stages.map((stage, i) => (
          <div key={stage.label} className="flex items-center">
            <div
              className="flex flex-col items-center rounded-lg border border-border p-3 text-center transition-all hover:border-accent"
              style={{
                opacity: inView || reduced ? 1 : 0,
                transform: inView || reduced ? "none" : "translateY(10px)",
                transition: reduced ? "none" : `all 0.4s ease-out ${i * 0.12}s`,
                minWidth: "100px",
              }}
            >
              <span className="text-xl">{stage.icon}</span>
              <span className="mt-1 text-xs font-medium">{stage.label}</span>
              <span className="mt-0.5 text-[10px] text-text-muted">{stage.desc}</span>
            </div>
            {i < stages.length - 1 && (
              <span className="mx-1 text-text-muted">→</span>
            )}
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-warning">
        ⚠ 注意：Agent 可能覆盖你手动编辑的 Skill。建议用 Git 管理 skills 目录。
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/animations/
git commit -m "feat: add Memory Flow and Skill Lifecycle CSS animations"
```

---

## Task 11: Layer 1 Content Sections

**Files:**
- Create: All 10 files in `src/sections/layer1/`
- Modify: `src/App.tsx`

**Note:** Each section follows the same structure pattern as Layer 0. Use the UI components, playgrounds, and animations already built. I'll show the first 3 sections in full to establish the pattern, then provide key content for the remaining 7.

- [ ] **Step 1: Create CLIOverview (1.1)**

```tsx
// src/sections/layer1/CLIOverview.tsx
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { CardGrid } from "../../components/ui/CardGrid";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { commands } from "../../data/commands";

export function CLIOverview() {
  return (
    <Section id="cli-overview">
      <TypewriterTitle text="Layer 1 · 上手" subtitle="打造你的私人 Agent" />

      <h3 className="mt-12 text-2xl font-bold">CLI 全景：hermes 的十八般武艺</h3>
      <p className="mt-4 text-text-secondary">
        所有操作都从 <code className="rounded bg-bg-card px-1.5 py-0.5 text-accent">hermes</code> 命令开始。
        这是后续所有章节的入口地图：
      </p>

      <div className="mt-6">
        <CardGrid
          columns={2}
          cards={commands.map((cmd) => ({
            title: cmd.name,
            icon: cmd.icon,
            description: cmd.command,
            detail: (
              <div>
                <p>{cmd.detail}</p>
                <CodeBlock lang="bash" code={cmd.command} />
              </div>
            ),
          }))}
        />
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Create ModelSelection (1.2) — integrates ConfigBuilder playground**

```tsx
// src/sections/layer1/ModelSelection.tsx
import { Section } from "../../components/layout/Section";
import { ConfigBuilder } from "../../playgrounds/ConfigBuilder";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

export function ModelSelection() {
  return (
    <Section id="model-selection">
      <h3 className="text-2xl font-bold">选模型 + Smart Routing + 成本控制</h3>

      <p className="mt-4 text-text-secondary">
        Hermes Agent 支持几乎所有 LLM Provider。选择 Provider 和模型是第一步——
        但同样重要的是<strong className="text-text-primary">控制成本</strong>。
      </p>

      <h4 className="mt-8 text-lg font-semibold">Smart Model Routing</h4>
      <p className="mt-2 text-text-secondary">
        80% 的交互不需要 frontier model。Smart Routing 自动将简单任务路由到 cheap model，
        复杂推理才调用 strong model，<strong className="text-text-primary">省 10x 费用</strong>。
      </p>

      <div className="mt-4 rounded-lg border border-warning/30 bg-warning/5 p-4">
        <p className="text-sm text-text-secondary">
          <strong className="text-warning">Why?</strong> 大多数工具调用（读文件、搜索）只需模型理解意图和参数，
          不需要深度推理。Smart Routing 在 Agent Loop 中自动判断：当前轮是简单操作还是需要推理。
        </p>
      </div>

      <h4 className="mt-8 text-lg font-semibold">试试构建你的配置</h4>
      <ConfigBuilder />

      <ExtendedReading
        links={[
          { title: "Configuration Guide", url: "https://hermes-agent.nousresearch.com/docs/user-guide/configuration", source: "官方文档" },
          { title: "How to Use Hermes Agent with Trinity-Large-Thinking", url: "https://www.arcee.ai/blog/how-to-use-hermes-agent-with-trinity-large-thinking", source: "Arcee AI" },
        ]}
      />
    </Section>
  );
}
```

- [ ] **Step 3: Create SoulMd (1.3) — integrates PromptAssembler playground**

```tsx
// src/sections/layer1/SoulMd.tsx
import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { PromptAssembler } from "../../playgrounds/PromptAssembler";

export function SoulMd() {
  return (
    <Section id="soul-md">
      <h3 className="text-2xl font-bold">塑造人格 — SOUL.md</h3>

      <p className="mt-4 text-text-secondary">
        SOUL.md 是 Agent 的身份定义文件，始终作为 System Prompt 的<strong className="text-text-primary">第一层</strong>注入。
        它决定了 Agent 的性格、语气、行为边界。
      </p>

      <h4 className="mt-8 text-lg font-semibold">写好 SOUL.md 的原则</h4>
      <ul className="mt-3 space-y-2 text-text-secondary">
        <li className="flex gap-2"><span className="text-accent">·</span>简洁：每个字都消耗 token，2200 字符上限内说清楚</li>
        <li className="flex gap-2"><span className="text-accent">·</span>具体：不写"be helpful"，写具体的行为指令</li>
        <li className="flex gap-2"><span className="text-accent">·</span>有性格：给 Agent 一个你喜欢的沟通风格</li>
      </ul>

      <CodeBlock
        lang="markdown"
        title="~/.hermes/SOUL.md 示例"
        code={`# Hermes Agent Identity

You are Hermes, my personal technical assistant.

## Communication Style
- Always respond in Chinese, but keep technical terms in English
- Be direct and concise, no filler words
- When unsure, use tools to verify before answering

## Behavior
- Always use terminal/file tools to take action, never just describe
- After completing complex tasks (5+ steps), save as a Skill
- Proactively update memory when learning something about me`}
      />

      <div className="mt-6 rounded-lg border border-warning/30 bg-warning/5 p-4">
        <p className="text-sm text-text-secondary">
          <strong className="text-warning">Why frozen snapshot?</strong> SOUL.md 的内容在 session 开始时被冻结注入 system prompt，
          session 内不再变化。这是为了 <strong>prefix caching</strong> — LLM Provider 可以缓存稳定的 system prompt prefix，
          后续每轮 API 调用只需处理新增的对话内容，大幅降低延迟和成本。
        </p>
      </div>

      <h4 className="mt-8 text-lg font-semibold">看看你的 Prompt 是怎么组装的</h4>
      <p className="mt-2 text-sm text-text-secondary">
        编辑左侧文件，右侧实时显示 10 层 System Prompt 的组装结果和 token 估算：
      </p>
      <PromptAssembler />
    </Section>
  );
}
```

- [ ] **Step 4: Create remaining Layer 1 sections (1.4 - 1.10)**

Create each file following the same pattern. Each section uses the appropriate UI components and data from Task 6. Key integration points:

**`src/sections/layer1/ProjectContext.tsx` (1.4)**:
- Two CodeBlock panels side by side: empty project vs. configured project with AGENTS.md
- Warning box about prompt injection scanning

**`src/sections/layer1/MemorySystem.tsx` (1.5)**:
- Import and render `MemorySandbox` playground
- Import and render `MemoryFlowAnimation`
- Four subsections for each memory layer
- Honcho section with "默认关闭" warning

**`src/sections/layer1/SkillsSystem.tsx` (1.6)**:
- Import and render `SkillLifecycleAnimation`
- `CardGrid` with `skillCategories` data showing 25+ categories
- SKILL.md format CodeBlock
- Community warning about auto-overwrite

**`src/sections/layer1/ToolExplorer.tsx` (1.7)**:
- `FoldPanel` for each category from `toolCategories` data
- Teaching "how to explore tools yourself" with `hermes tools` command

**`src/sections/layer1/Security.tsx` (1.8)**:
- `CheckList` with security items (dangerous commands, injection defense, credentials, etc.)

**`src/sections/layer1/MessagingPlatforms.tsx` (1.9)**:
- `TabPanel` with 4 tabs from `platformGuides` data

**`src/sections/layer1/TerminalBackends.tsx` (1.10)**:
- `HoverTable` with `backendHeaders` and `backendRows` data

Each file follows the exact same component structure as Steps 1-3. Create them all, then proceed.

- [ ] **Step 5: Wire all Layer 1 sections into App.tsx**

Update `src/App.tsx` to import and render all Layer 1 sections after Layer 0:

```tsx
// Add imports for all Layer 1 sections
import { CLIOverview } from "./sections/layer1/CLIOverview";
import { ModelSelection } from "./sections/layer1/ModelSelection";
import { SoulMd } from "./sections/layer1/SoulMd";
import { ProjectContext } from "./sections/layer1/ProjectContext";
import { MemorySystem } from "./sections/layer1/MemorySystem";
import { SkillsSystem } from "./sections/layer1/SkillsSystem";
import { ToolExplorer } from "./sections/layer1/ToolExplorer";
import { Security } from "./sections/layer1/Security";
import { MessagingPlatforms } from "./sections/layer1/MessagingPlatforms";
import { TerminalBackends } from "./sections/layer1/TerminalBackends";

// In the JSX, after Layer 0 sections:
{/* Layer 1 */}
<CLIOverview />
<ModelSelection />
<SoulMd />
<ProjectContext />
<MemorySystem />
<SkillsSystem />
<ToolExplorer />
<Security />
<MessagingPlatforms />
<TerminalBackends />
```

- [ ] **Step 6: Verify all sections in browser**

Scroll through the entire page:
- All 14 sections render without errors
- Navigation sidebar highlights correctly on scroll
- Playgrounds (Prompt Assembler, Config Builder, Memory Sandbox) work
- Animations trigger on scroll
- All UI components (CardGrid, FoldPanel, TabPanel, etc.) work correctly

- [ ] **Step 7: Commit**

```bash
git add src/sections/layer1/ src/App.tsx
git commit -m "feat: add all Layer 1 content sections with playgrounds and animations"
```

---

## Task 12: Remotion Overview Video

**Files:**
- Create: `/Users/panghu/code/Tool/remotion/src/HermesOverview.tsx`
- Modify: `/Users/panghu/code/Tool/remotion/src/Root.tsx`

This creates the ~30s overview video composition in the existing Remotion project.

- [ ] **Step 1: Create HermesOverview composition**

```tsx
// /Users/panghu/code/Tool/remotion/src/HermesOverview.tsx
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
} from "remotion";
import { z } from "zod";

export const HermesOverviewSchema = z.object({
  accentColor: z.string().default("#58a6ff"),
});

type Props = z.infer<typeof HermesOverviewSchema>;

const features = [
  { icon: "🔧", label: "47+ 工具", desc: "终端 · 文件 · Web · 浏览器 · 视觉" },
  { icon: "💬", label: "20+ 平台", desc: "Telegram · Discord · 微信 · 飞书" },
  { icon: "🧠", label: "持久记忆", desc: "跨 session 记住你的偏好" },
  { icon: "📚", label: "自动 Skills", desc: "从经验中学习可复用指令" },
];

export const HermesOverview: React.FC<Props> = ({ accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0d1117", fontFamily: "Inter, sans-serif" }}>
      {/* Title sequence: frames 0-60 */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
              transform: `translateY(${interpolate(frame, [0, 20], [30, 0], { extrapolateRight: "clamp" })}px)`,
            }}
          >
            <div style={{ fontSize: 72, fontWeight: 700, color: accentColor, textAlign: "center" }}>
              ⚡ Hermes Agent
            </div>
            <div
              style={{
                fontSize: 28,
                color: "#8b949e",
                textAlign: "center",
                marginTop: 16,
                opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              自进化的个人 AI Agent
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Features grid: frames 60-180 */}
      <Sequence from={60} durationInFrames={150}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, width: "100%" }}>
            {features.map((feat, i) => {
              const delay = i * 8;
              const localFrame = frame - 60;
              const scale = spring({ frame: localFrame - delay, fps, config: { damping: 12 } });

              return (
                <div
                  key={feat.label}
                  style={{
                    backgroundColor: "#161b22",
                    borderRadius: 16,
                    padding: 32,
                    border: `1px solid #30363d`,
                    transform: `scale(${scale})`,
                    opacity: interpolate(localFrame, [delay, delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                  }}
                >
                  <div style={{ fontSize: 40 }}>{feat.icon}</div>
                  <div style={{ fontSize: 24, fontWeight: 600, color: "#e6edf3", marginTop: 12 }}>
                    {feat.label}
                  </div>
                  <div style={{ fontSize: 16, color: "#8b949e", marginTop: 8 }}>
                    {feat.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Tagline: frames 180-270 */}
      <Sequence from={180} durationInFrames={90}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              fontSize: 36,
              color: "#e6edf3",
              textAlign: "center",
              opacity: interpolate(frame - 180, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            The agent that <span style={{ color: accentColor, fontWeight: 700 }}>grows</span> with you.
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Register composition in Root.tsx**

Add to `/Users/panghu/code/Tool/remotion/src/Root.tsx`:

```tsx
import { HermesOverview, HermesOverviewSchema } from "./HermesOverview";

// Add inside the fragment:
<Composition
  id="HermesOverview"
  component={HermesOverview}
  durationInFrames={270}
  fps={30}
  width={1920}
  height={1080}
  schema={HermesOverviewSchema}
  defaultProps={{
    accentColor: "#58a6ff",
  }}
/>
```

- [ ] **Step 3: Preview and render**

```bash
cd /Users/panghu/code/Tool/remotion
npm run dev
# Preview HermesOverview composition in Remotion Studio
# When satisfied:
npx remotion render HermesOverview --output-location /Users/panghu/code/rsearch/my_hermes_study/public/hermes-overview.mp4
```

- [ ] **Step 4: Integrate Remotion Player into WhatIsHermes section**

Update `src/sections/layer0/WhatIsHermes.tsx` — replace the video placeholder with the actual player:

```tsx
// Add at top:
import { Player } from "@remotion/player";
import { HermesOverview } from "../../../Tool/remotion/src/HermesOverview";
// OR use static video:
// <video src="/hermes-overview.mp4" controls />

// Replace the placeholder div with:
<div className="mt-8 overflow-hidden rounded-lg border border-border">
  <Player
    component={HermesOverview}
    inputProps={{ accentColor: "#58a6ff" }}
    durationInFrames={270}
    fps={30}
    compositionWidth={1920}
    compositionHeight={1080}
    style={{ width: "100%" }}
    controls
    autoPlay={false}
  />
</div>
```

Note: If `@remotion/player` bundle size is too large, use the pre-rendered `.mp4` instead:

```tsx
<video
  className="mt-8 w-full rounded-lg border border-border"
  src={`${import.meta.env.BASE_URL}hermes-overview.mp4`}
  controls
  poster={`${import.meta.env.BASE_URL}hermes-overview-poster.jpg`}
/>
```

- [ ] **Step 5: Commit**

```bash
cd /Users/panghu/code/rsearch/my_hermes_study
git add public/ src/sections/layer0/WhatIsHermes.tsx
git commit -m "feat: add Remotion overview video and integrate into Layer 0"
```

---

## Task 13: GitHub Pages Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create GitHub Actions workflow**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Verify build succeeds locally**

```bash
npm run build
```

Expected: `dist/` directory created with `index.html` and all assets.

- [ ] **Step 3: Verify build output**

```bash
ls -la dist/
# Should see index.html, assets/ directory
```

- [ ] **Step 4: Commit and push**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Pages deployment workflow"
```

Push to remote (user will do this manually or confirm):
```bash
git push origin main
```

After push, enable GitHub Pages in repo settings: Settings → Pages → Source: GitHub Actions.

- [ ] **Step 5: Verify deployment**

After Actions completes, visit `https://panghu.github.io/my_hermes_study/` and confirm the site loads correctly.

---

## Task 14: Final Integration & Polish

**Files:**
- Modify: Various files for responsive fixes, accessibility, and final polish

- [ ] **Step 1: Add mobile hamburger menu to Sidebar**

Update `src/components/layout/Sidebar.tsx` to add a mobile toggle button and overlay menu for screens < 1024px. The button should appear in the Header on mobile.

- [ ] **Step 2: Test responsive layout**

Verify in browser at:
- Desktop (1440px): Sidebar visible, main content beside it
- Tablet (768px): Sidebar hidden, content full width
- Mobile (375px): Content readable, code blocks scroll horizontally

- [ ] **Step 3: Verify all playgrounds on mobile**

- PromptAssembler: stacked vertically (editor on top, output below)
- ConfigBuilder: options on top, YAML below
- MemorySandbox: stages wrap to multiple rows

- [ ] **Step 4: Check prefers-reduced-motion**

Toggle reduced motion in OS settings, verify:
- TypewriterTitle shows text immediately without animation
- Terminal shows all lines immediately
- Section fade-in is instant
- Memory Sandbox stages advance without delay

- [ ] **Step 5: Lighthouse audit**

Run Lighthouse in Chrome DevTools:
- Performance: check for large bundle issues
- Accessibility: check contrast, focus states, aria labels
- Best Practices: check for console errors
- SEO: check meta tags

Fix any critical issues found.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "fix: responsive layout, accessibility, and polish"
```

---

## Self-Review Checklist

### Spec Coverage

| Spec Section | Task | Status |
|---|---|---|
| 0.1 What is Hermes Agent? | Task 5 Step 1 | ✅ |
| 0.2 Framework comparison | Task 5 Step 2 | ✅ |
| 0.3 Install + first conversation | Task 5 Step 3 | ✅ |
| 0.4 Architecture overview | Task 5 Step 4 | ✅ |
| 1.1 CLI overview | Task 11 Step 1 | ✅ |
| 1.2 Model + Smart Routing + cost | Task 11 Step 2 + Task 8 | ✅ |
| 1.3 SOUL.md | Task 11 Step 3 + Task 7 | ✅ |
| 1.4 Project context | Task 11 Step 4 | ✅ |
| 1.5 Memory system | Task 11 Step 4 + Task 9 + Task 10 | ✅ |
| 1.6 Skills system | Task 11 Step 4 + Task 10 | ✅ |
| 1.7 Tool explorer | Task 11 Step 4 | ✅ |
| 1.8 Security | Task 11 Step 4 | ✅ |
| 1.9 Messaging platforms | Task 11 Step 4 | ✅ |
| 1.10 Terminal backends | Task 11 Step 4 | ✅ |
| Prompt Assembler playground | Task 7 | ✅ |
| Config Builder playground | Task 8 | ✅ |
| Memory Sandbox playground | Task 9 | ✅ |
| Memory Flow animation | Task 10 Step 1 | ✅ |
| Skill Lifecycle animation | Task 10 Step 2 | ✅ |
| Typewriter title animation | Task 4 Step 1 | ✅ |
| Remotion overview video | Task 12 | ✅ |
| GitHub Pages deployment | Task 13 | ✅ |
| frontend-design skill | Noted in Task 5, 11 | ✅ |
| Lazy loading | Task 2 (useInView) + Task 3 (Section) | ✅ |
| prefers-reduced-motion | Task 2 (useReducedMotion) + all components | ✅ |
| Mobile responsive | Task 14 | ✅ |
| What → How → Why pattern | Task 5, 11 (content structure) | ✅ |
| Community voice | Task 5 Step 1 (balanced quotes), Step 2 (ExtendedReading) | ✅ |
| "Try it yourself" callouts | Task 4 Step 4 (TryItBox) + Task 5 Step 3 | ✅ |

### Type/Name Consistency

- `Section` component: `id` prop matches `navigation.ts` ids ✅
- `useInView` hook: consistently used across Section, TypewriterTitle, Terminal, animations ✅
- `useReducedMotion` hook: consistently used in all animated components ✅
- Data imports: all files export named types matching their consumers ✅
- `PromptAssembler` imports `promptLayers` from `src/data/promptLayers.ts` ✅
- `ConfigBuilder` imports `providers`, `configOptions` from `src/data/models.ts` ✅
