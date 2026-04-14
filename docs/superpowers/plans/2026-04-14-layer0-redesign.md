# Layer 0 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand Layer 0 from 4 thin sections to 11 comprehensive sections covering prerequisites, installation, API keys, first conversation, directory structure, config scenarios, SOUL.md, and messaging platform setup.

**Architecture:** Delete old QuickStart, create 7 new section components + 2 new playground components (EnvBuilder, ConfigExplorer), update navigation and App routing. All new components follow existing patterns: Section wrapper, TypewriterTitle, reuse existing UI components (Terminal, CodeBlock, TabPanel, CheckList, CardGrid, FoldPanel, TryItBox, ExtendedReading, HoverTable).

**Tech Stack:** React 19, TypeScript strict, Tailwind CSS v4, Shiki (via existing CodeBlock), existing UI component library

**Spec:** `docs/superpowers/specs/2026-04-14-layer0-redesign.md`

---

## File Structure

**Create:**
- `src/sections/layer0/Prerequisites.tsx` — 前置要求 section
- `src/sections/layer0/Installation.tsx` — 安装 section
- `src/sections/layer0/ApiKeys.tsx` — API Key 配置 section
- `src/sections/layer0/FirstConversation.tsx` — 首次启动 section
- `src/sections/layer0/DirectoryStructure.tsx` — 目录结构 section
- `src/sections/layer0/ConfigEssentials.tsx` — 常用配置 section
- `src/sections/layer0/SoulMdIntro.tsx` — SOUL.md 入门 section
- `src/sections/layer0/ConnectPlatform.tsx` — 消息平台接入 section
- `src/playgrounds/EnvBuilder.tsx` — .env 文件生成器组件
- `src/playgrounds/ConfigExplorer.tsx` — config.yaml 场景浏览器组件

**Modify:**
- `src/data/navigation.ts` — Layer 0 items 从 4 扩展到 11
- `src/App.tsx` — 更新 imports 和组件渲染顺序
- `src/sections/layer0/WhatIsHermes.tsx:15` — 改 subtitle
- `src/sections/layer0/ArchitectureOverview.tsx:46` — 改编号

**Delete:**
- `src/sections/layer0/QuickStart.tsx`

---

### Task 1: Scaffolding — navigation, App.tsx, minor edits

**Files:**
- Modify: `src/data/navigation.ts`
- Modify: `src/App.tsx`
- Modify: `src/sections/layer0/WhatIsHermes.tsx:15`
- Modify: `src/sections/layer0/ArchitectureOverview.tsx:46`
- Delete: `src/sections/layer0/QuickStart.tsx`
- Create: 8 stub files (all new section components)

This task sets up the skeleton so the build passes with placeholder sections before implementing each one.

- [ ] **Step 1: Update navigation.ts**

Replace the Layer 0 items array in `src/data/navigation.ts`:

```typescript
// In the first NavGroup (Layer 0), replace the items array:
{
  label: "Layer 0 · 初见", emoji: "👀",
  items: [
    { id: "what-is-hermes", label: "What is Hermes Agent?" },
    { id: "comparison", label: "和其他框架有什么不同" },
    { id: "prerequisites", label: "前置要求" },
    { id: "installation", label: "安装 Hermes" },
    { id: "api-keys", label: "获取 API Key" },
    { id: "first-conversation", label: "首次启动 & 第一次对话" },
    { id: "directory-structure", label: "目录结构一览" },
    { id: "config-essentials", label: "常用配置场景" },
    { id: "soul-md-intro", label: "SOUL.md 人格定制" },
    { id: "connect-platform", label: "连接消息平台" },
    { id: "architecture", label: "架构鸟瞰" },
  ],
},
```

- [ ] **Step 2: Create all 8 stub section files**

Each stub follows this pattern (change id, title, subtitle for each):

`src/sections/layer0/Prerequisites.tsx`:
```tsx
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";

export function Prerequisites() {
  return (
    <Section id="prerequisites">
      <TypewriterTitle text="0.3 前置要求" subtitle="安装前确认环境就绪" />
      <p className="text-text-secondary">内容建设中...</p>
    </Section>
  );
}
```

`src/sections/layer0/Installation.tsx`:
```tsx
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";

export function Installation() {
  return (
    <Section id="installation">
      <TypewriterTitle text="0.4 安装 Hermes" subtitle="三种安装方式，选适合你的" />
      <p className="text-text-secondary">内容建设中...</p>
    </Section>
  );
}
```

`src/sections/layer0/ApiKeys.tsx`:
```tsx
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";

export function ApiKeys() {
  return (
    <Section id="api-keys">
      <TypewriterTitle text="0.5 获取 API Key" subtitle="选对 Provider，配好密钥" />
      <p className="text-text-secondary">内容建设中...</p>
    </Section>
  );
}
```

`src/sections/layer0/FirstConversation.tsx`:
```tsx
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";

export function FirstConversation() {
  return (
    <Section id="first-conversation">
      <TypewriterTitle text="0.6 首次启动 & 第一次对话" subtitle="敲下第一个回车" />
      <p className="text-text-secondary">内容建设中...</p>
    </Section>
  );
}
```

`src/sections/layer0/DirectoryStructure.tsx`:
```tsx
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";

export function DirectoryStructure() {
  return (
    <Section id="directory-structure">
      <TypewriterTitle text="0.7 目录结构一览" subtitle="了解 ~/.hermes/ 里的每个文件" />
      <p className="text-text-secondary">内容建设中...</p>
    </Section>
  );
}
```

`src/sections/layer0/ConfigEssentials.tsx`:
```tsx
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";

export function ConfigEssentials() {
  return (
    <Section id="config-essentials">
      <TypewriterTitle text="0.8 常用配置场景" subtitle="你想做什么，改哪里" />
      <p className="text-text-secondary">内容建设中...</p>
    </Section>
  );
}
```

`src/sections/layer0/SoulMdIntro.tsx`:
```tsx
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";

export function SoulMdIntro() {
  return (
    <Section id="soul-md-intro">
      <TypewriterTitle text="0.9 SOUL.md 人格定制" subtitle="定义你的 Agent 是谁" />
      <p className="text-text-secondary">内容建设中...</p>
    </Section>
  );
}
```

`src/sections/layer0/ConnectPlatform.tsx`:
```tsx
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";

export function ConnectPlatform() {
  return (
    <Section id="connect-platform">
      <TypewriterTitle text="0.10 连接消息平台" subtitle="让 Agent 上手机" />
      <p className="text-text-secondary">内容建设中...</p>
    </Section>
  );
}
```

- [ ] **Step 3: Update App.tsx**

Replace the Layer 0 imports and JSX in `src/App.tsx`:

```tsx
// Replace these Layer 0 imports:
// import { QuickStart } from "./sections/layer0/QuickStart";
// With:
import { Prerequisites } from "./sections/layer0/Prerequisites";
import { Installation } from "./sections/layer0/Installation";
import { ApiKeys } from "./sections/layer0/ApiKeys";
import { FirstConversation } from "./sections/layer0/FirstConversation";
import { DirectoryStructure } from "./sections/layer0/DirectoryStructure";
import { ConfigEssentials } from "./sections/layer0/ConfigEssentials";
import { SoulMdIntro } from "./sections/layer0/SoulMdIntro";
import { ConnectPlatform } from "./sections/layer0/ConnectPlatform";

// In the JSX, replace the Layer 0 block:
{/* Layer 0 · 初见 */}
<WhatIsHermes />
<Comparison />
<Prerequisites />
<Installation />
<ApiKeys />
<FirstConversation />
<DirectoryStructure />
<ConfigEssentials />
<SoulMdIntro />
<ConnectPlatform />
<ArchitectureOverview />
```

- [ ] **Step 4: Update WhatIsHermes subtitle**

In `src/sections/layer0/WhatIsHermes.tsx`, line 15, change:
```tsx
// From:
<TypewriterTitle text="Layer 0 · 初见" subtitle="5 分钟建立直觉" />
// To:
<TypewriterTitle text="Layer 0 · 初见" subtitle="从零到跑通" />
```

- [ ] **Step 5: Update ArchitectureOverview section number**

In `src/sections/layer0/ArchitectureOverview.tsx`, line 46, change:
```tsx
// From:
<TypewriterTitle text="0.4 架构鸟瞰" subtitle="点击模块跳转到详细章节" />
// To:
<TypewriterTitle text="0.11 架构鸟瞰" subtitle="点击模块跳转到详细章节" />
```

- [ ] **Step 6: Delete QuickStart.tsx**

```bash
rm src/sections/layer0/QuickStart.tsx
```

- [ ] **Step 7: Verify build**

```bash
npm run build
```

Expected: Build succeeds. All 11 Layer 0 sections render (8 stubs show "内容建设中...").

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "refactor(layer0): scaffold 11-section structure, delete QuickStart"
```

---

### Task 2: Prerequisites section

**Files:**
- Modify: `src/sections/layer0/Prerequisites.tsx` (replace stub)

- [ ] **Step 1: Implement Prerequisites.tsx**

Replace the entire content of `src/sections/layer0/Prerequisites.tsx`:

```tsx
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { CodeBlock } from "../../components/ui/CodeBlock";

interface DepItem {
  name: string;
  version: string;
  why: string;
  check: string;
  install: string;
  required: boolean;
}

const deps: DepItem[] = [
  {
    name: "Python",
    version: "≥ 3.11",
    why: "Agent 核心运行时，使用了 match 语句、TaskGroup 等 3.11 新特性",
    check: "python3 --version",
    install: "pyenv install 3.11 / brew install python@3.11 / apt install python3.11",
    required: true,
  },
  {
    name: "Node.js",
    version: "v22",
    why: "浏览器工具需要（网页浏览、截图、Playwright）。不用浏览器功能可跳过",
    check: "node --version",
    install: "nvm install 22 / brew install node@22",
    required: false,
  },
  {
    name: "Git",
    version: "任意",
    why: "安装脚本通过 git clone 拉取代码",
    check: "git --version",
    install: "一般已预装",
    required: true,
  },
  {
    name: "ripgrep",
    version: "任意",
    why: "search_files 工具的后端，没有它 fallback 到较慢的 Python 实现",
    check: "rg --version",
    install: "brew install ripgrep / apt install ripgrep",
    required: false,
  },
  {
    name: "ffmpeg",
    version: "任意",
    why: "语音消息的 TTS/STT 编解码，不用语音可跳过",
    check: "ffmpeg -version",
    install: "brew install ffmpeg / apt install ffmpeg",
    required: false,
  },
];

const platforms = [
  { name: "macOS", status: "✅", note: "" },
  { name: "Linux", status: "✅", note: "" },
  { name: "WSL2", status: "✅", note: "" },
  { name: "Termux (Android)", status: "⚠️", note: "部分功能受限（无浏览器工具、无 WhatsApp）" },
  { name: "Windows 原生", status: "❌", note: "必须使用 WSL2" },
];

export function Prerequisites() {
  return (
    <Section id="prerequisites">
      <TypewriterTitle text="0.3 前置要求" subtitle="安装前确认环境就绪" />

      <div className="space-y-3">
        {deps.map((dep) => (
          <div
            key={dep.name}
            className="rounded-lg border border-border bg-bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  dep.required
                    ? "bg-accent/10 text-accent"
                    : "bg-bg-elevated text-text-muted"
                }`}
              >
                {dep.required ? "必需" : "可选"}
              </span>
              <h4 className="font-semibold">{dep.name}</h4>
              <span className="text-sm text-text-muted">{dep.version}</span>
            </div>
            <p className="mt-2 text-sm text-text-secondary">{dep.why}</p>
            <div className="mt-3">
              <CodeBlock code={dep.check} lang="bash" title="检查命令" />
            </div>
            <p className="mt-2 text-xs text-text-muted">
              安装: {dep.install}
            </p>
          </div>
        ))}
      </div>

      {/* Platform compatibility */}
      <h3 className="mt-10 text-lg font-semibold">平台兼容性</h3>
      <div className="mt-3 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-card">
              <th className="px-4 py-3 text-left font-medium text-text-secondary">
                平台
              </th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">
                支持
              </th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">
                备注
              </th>
            </tr>
          </thead>
          <tbody>
            {platforms.map((p) => (
              <tr
                key={p.name}
                className="border-b border-border last:border-0 hover:bg-bg-card"
              >
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3">{p.status}</td>
                <td className="px-4 py-3 text-text-secondary">{p.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Common pitfalls */}
      <div className="mt-8 rounded-lg border border-warning/30 bg-warning/5 p-4">
        <h4 className="mb-2 text-sm font-semibold text-warning">
          常见坑提醒
        </h4>
        <ul className="space-y-1 text-sm text-text-secondary">
          <li>
            macOS 自带 Python 通常是 3.9（太旧），需要额外安装 3.11+
          </li>
          <li>
            Ubuntu 22.04 自带 3.10，差一个小版本，同样需要额外装
          </li>
          <li>
            安装脚本会自动用{" "}
            <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono text-xs">
              uv python install 3.11
            </code>{" "}
            尝试安装，但手动准备更稳
          </li>
        </ul>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/sections/layer0/Prerequisites.tsx
git commit -m "feat(layer0): implement Prerequisites section with dependency checklist"
```

---

### Task 3: Installation section

**Files:**
- Modify: `src/sections/layer0/Installation.tsx` (replace stub)

- [ ] **Step 1: Implement Installation.tsx**

Replace the entire content of `src/sections/layer0/Installation.tsx`:

```tsx
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { Terminal } from "../../components/ui/Terminal";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { TabPanel } from "../../components/ui/TabPanel";
import { HoverTable } from "../../components/ui/HoverTable";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const quickInstallLines = [
  {
    type: "command" as const,
    text: "curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash",
  },
  { type: "output" as const, text: "🔍 Detecting OS... macOS (arm64)" },
  {
    type: "output" as const,
    text: "📦 Installing uv package manager...",
    delay: 600,
  },
  {
    type: "output" as const,
    text: "🐍 Python 3.11 found",
    delay: 400,
  },
  {
    type: "output" as const,
    text: "📥 Cloning hermes-agent to ~/.hermes/hermes-agent/...",
    delay: 800,
  },
  {
    type: "output" as const,
    text: "📦 Installing dependencies (uv pip install -e '.[all]')...",
    delay: 1200,
  },
  {
    type: "output" as const,
    text: "🔗 Symlinked hermes → ~/.local/bin/hermes",
    delay: 400,
  },
  {
    type: "output" as const,
    text: "✅ Hermes Agent v0.9.0 installed successfully!",
    delay: 400,
  },
];

const devInstallCode = `git clone https://github.com/NousResearch/hermes-agent.git
cd hermes-agent
curl -LsSf https://astral.sh/uv/install.sh | sh
uv venv venv --python 3.11
source venv/bin/activate
uv pip install -e ".[all,dev]"`;

const termuxInstallCode = `# Termux 使用 .[termux] extra
# 排除不兼容的语音依赖
uv pip install -e ".[termux]"

# 注意限制：
# - 浏览器工具不可用
# - WhatsApp 工具不可用
# - 其他功能正常`;

const verifyLines = [
  { type: "command" as const, text: "source ~/.bashrc" },
  { type: "comment" as const, text: "或 source ~/.zshrc" },
  { type: "command" as const, text: "hermes --version", delay: 400 },
  { type: "output" as const, text: "hermes-agent v0.9.0" },
  { type: "command" as const, text: "which hermes", delay: 400 },
  { type: "output" as const, text: "/home/user/.local/bin/hermes" },
  { type: "command" as const, text: "hermes doctor", delay: 600 },
  { type: "output" as const, text: "✅ Python 3.11.9" },
  { type: "output" as const, text: "✅ Node.js v22.12.0" },
  { type: "output" as const, text: "✅ Git 2.43.0" },
  { type: "output" as const, text: "✅ ripgrep 14.1.0" },
  { type: "output" as const, text: "⚠️  No API key configured — run hermes setup" },
];

const installSteps = [
  "检测操作系统（Linux / macOS / Termux；Windows 重定向到 PowerShell 安装器）",
  "安装 uv（Astral 的快速 Python 包管理器）",
  "确保 Python 3.11 可用",
  "检查/安装 Git、Node.js v22",
  "安装系统包：ripgrep、ffmpeg",
  "克隆仓库到 ~/.hermes/hermes-agent/（先试 SSH，失败回退 HTTPS）",
  "创建 Python 虚拟环境",
  "uv pip install -e \".[all]\"（可编辑安装，含所有 extras）",
  "安装 Node.js 依赖 + Playwright Chromium",
  "符号链接 hermes → ~/.local/bin/",
  "创建 ~/.hermes/ 配置目录 + 复制示例配置文件",
  "创建 ~/.hermes/SOUL.md",
  "同步内置 Skills",
];

export function Installation() {
  return (
    <Section id="installation">
      <TypewriterTitle
        text="0.4 安装 Hermes"
        subtitle="三种安装方式，选适合你的"
      />

      <TabPanel
        tabs={[
          {
            label: "一键安装（推荐）",
            content: (
              <div className="space-y-6">
                <Terminal title="Quick Install" lines={quickInstallLines} />

                <div>
                  <h4 className="mb-3 font-semibold">
                    安装脚本做了什么？
                  </h4>
                  <ol className="space-y-1.5 text-sm text-text-secondary">
                    {installSteps.map((step, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="shrink-0 text-text-muted">
                          {i + 1}.
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">安装脚本选项</h4>
                  <HoverTable
                    headers={["选项", "作用"]}
                    rows={[
                      ["--no-venv", "跳过虚拟环境，使用系统 Python"],
                      ["--skip-setup", "跳过安装后的交互式 setup wizard"],
                      ["--branch NAME", "安装指定分支（默认 main）"],
                      [
                        "--dir PATH",
                        "自定义安装目录（默认 ~/.hermes/hermes-agent/）",
                      ],
                    ]}
                  />
                </div>
              </div>
            ),
          },
          {
            label: "开发者安装",
            content: (
              <div className="space-y-4">
                <p className="text-sm text-text-secondary">
                  适合想看源码、提 PR、调试内部逻辑的开发者。
                </p>
                <CodeBlock
                  code={devInstallCode}
                  lang="bash"
                  title="Developer Install"
                />
                <p className="text-sm text-text-muted">
                  跑测试：
                  <code className="ml-1 rounded bg-bg-elevated px-1.5 py-0.5 font-mono">
                    python -m pytest tests/ -q
                  </code>
                </p>
              </div>
            ),
          },
          {
            label: "Termux (Android)",
            content: (
              <div className="space-y-4">
                <CodeBlock
                  code={termuxInstallCode}
                  lang="bash"
                  title="Termux Install"
                />
              </div>
            ),
          },
        ]}
      />

      {/* Verification */}
      <h3 className="mt-10 text-lg font-semibold">安装后验证</h3>
      <div className="mt-3">
        <Terminal title="Verify Installation" lines={verifyLines} />
      </div>

      {/* Troubleshooting */}
      <h3 className="mt-10 text-lg font-semibold">故障排查</h3>
      <div className="mt-3">
        <HoverTable
          headers={["问题", "原因", "解决"]}
          rows={[
            [
              "command not found: hermes",
              "PATH 没刷新",
              "source ~/.bashrc 或 export PATH=\"$HOME/.local/bin:$PATH\"",
            ],
            [
              "权限错误",
              "~/.local/bin 权限不对",
              "chmod 755 ~/.local/bin/hermes",
            ],
            [
              "Python 版本不匹配",
              "uv 没自动安装 3.11",
              "uv python install 3.11 手动安装",
            ],
            [
              "clone 失败",
              "网络问题或 SSH 未配置",
              "安装脚本会自动回退 HTTPS，或手动设代理",
            ],
          ]}
        />
      </div>

      {/* Update / Uninstall */}
      <h3 className="mt-10 text-lg font-semibold">更新和卸载</h3>
      <div className="mt-3 space-y-2 text-sm text-text-secondary">
        <p>
          <strong>更新：</strong>
          <code className="ml-1 rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-accent">
            hermes update
          </code>
          （拉取最新代码 + 重新安装，保留配置和记忆）
        </p>
        <p>
          <strong>卸载：</strong>
          <code className="ml-1 rounded bg-bg-elevated px-1.5 py-0.5 font-mono">
            rm -rf ~/.hermes ~/.local/bin/hermes
          </code>
        </p>
        <p>
          <strong>OpenClaw 迁移：</strong>
          <code className="ml-1 rounded bg-bg-elevated px-1.5 py-0.5 font-mono">
            hermes claw migrate
          </code>
          （导入设置、记忆、Skills、API Keys）
        </p>
      </div>

      <ExtendedReading
        links={[
          {
            title: "Hermes Agent GitHub 仓库",
            url: "https://github.com/NousResearch/hermes-agent",
            source: "GitHub",
          },
        ]}
      />
    </Section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/sections/layer0/Installation.tsx
git commit -m "feat(layer0): implement Installation section with 3 install methods"
```

---

### Task 4: EnvBuilder playground + ApiKeys section

**Files:**
- Create: `src/playgrounds/EnvBuilder.tsx`
- Modify: `src/sections/layer0/ApiKeys.tsx` (replace stub)

- [ ] **Step 1: Create EnvBuilder.tsx**

Create `src/playgrounds/EnvBuilder.tsx`:

```tsx
import { useState, useMemo } from "react";

interface ProviderOption {
  key: string;
  envVar: string;
  name: string;
  description: string;
  placeholder: string;
  group: "llm" | "tool";
}

const providerOptions: ProviderOption[] = [
  {
    key: "openrouter",
    envVar: "OPENROUTER_API_KEY",
    name: "OpenRouter",
    description: "200+ 模型，一个 key 搞定",
    placeholder: "sk-or-v1-xxxxxxxx",
    group: "llm",
  },
  {
    key: "anthropic",
    envVar: "ANTHROPIC_API_KEY",
    name: "Anthropic",
    description: "Claude 直连，延迟最低",
    placeholder: "sk-ant-xxxxxxxx",
    group: "llm",
  },
  {
    key: "google",
    envVar: "GOOGLE_API_KEY",
    name: "Google AI",
    description: "Gemini，有免费额度",
    placeholder: "AIzaxxxxxxxx",
    group: "llm",
  },
  {
    key: "glm",
    envVar: "GLM_API_KEY",
    name: "智谱 GLM",
    description: "国产模型，中文优化",
    placeholder: "xxxxxxxx.xxxxxxxx",
    group: "llm",
  },
  {
    key: "kimi",
    envVar: "KIMI_API_KEY",
    name: "Kimi / Moonshot",
    description: "长上下文中文模型",
    placeholder: "sk-xxxxxxxx",
    group: "llm",
  },
  {
    key: "minimax",
    envVar: "MINIMAX_API_KEY",
    name: "MiniMax",
    description: "多模态中文模型",
    placeholder: "xxxxxxxx",
    group: "llm",
  },
  {
    key: "exa",
    envVar: "EXA_API_KEY",
    name: "Exa",
    description: "高质量网页搜索",
    placeholder: "xxxxxxxx",
    group: "tool",
  },
  {
    key: "firecrawl",
    envVar: "FIRECRAWL_API_KEY",
    name: "Firecrawl",
    description: "网页抓取和内容提取",
    placeholder: "fc-xxxxxxxx",
    group: "tool",
  },
  {
    key: "fal",
    envVar: "FAL_KEY",
    name: "fal.ai",
    description: "AI 图片生成",
    placeholder: "xxxxxxxx",
    group: "tool",
  },
];

export function EnvBuilder() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["openrouter"]));
  const [copied, setCopied] = useState(false);

  const toggle = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const envContent = useMemo(() => {
    const llm = providerOptions.filter(
      (p) => p.group === "llm" && selected.has(p.key)
    );
    const tools = providerOptions.filter(
      (p) => p.group === "tool" && selected.has(p.key)
    );
    const lines: string[] = ["# ~/.hermes/.env", ""];
    if (llm.length > 0) {
      lines.push("# === LLM Provider ===");
      llm.forEach((p) => lines.push(`${p.envVar}=${p.placeholder}`));
      lines.push("");
    }
    if (tools.length > 0) {
      lines.push("# === Tool APIs (可选) ===");
      tools.forEach((p) => lines.push(`${p.envVar}=${p.placeholder}`));
      lines.push("");
    }
    if (llm.length === 0 && tools.length === 0) {
      lines.push("# 请在左侧勾选至少一个 LLM Provider");
    }
    return lines.join("\n");
  }, [selected]);

  const copy = () => {
    navigator.clipboard.writeText(envContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const llmProviders = providerOptions.filter((p) => p.group === "llm");
  const toolProviders = providerOptions.filter((p) => p.group === "tool");

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-border">
      <div className="border-b border-border bg-bg-card px-4 py-2 text-sm font-medium">
        .env 配置生成器
      </div>
      <div className="grid lg:grid-cols-2">
        {/* Left: checkboxes */}
        <div className="space-y-4 border-r border-border p-4">
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              LLM Provider（至少选一个）
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {llmProviders.map((p) => (
                <button
                  key={p.key}
                  onClick={() => toggle(p.key)}
                  className={`rounded-lg border p-3 text-left text-sm transition-all ${
                    selected.has(p.key)
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-text-muted"
                  }`}
                >
                  <div className="font-medium">{p.name}</div>
                  <div className="mt-1 text-xs text-text-muted">
                    {p.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              工具 API（可选，增强能力）
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {toolProviders.map((p) => (
                <button
                  key={p.key}
                  onClick={() => toggle(p.key)}
                  className={`rounded-lg border p-3 text-left text-sm transition-all ${
                    selected.has(p.key)
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-text-muted"
                  }`}
                >
                  <div className="font-medium">{p.name}</div>
                  <div className="mt-1 text-xs text-text-muted">
                    {p.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Right: preview */}
        <div className="relative bg-bg-primary p-4">
          <button
            onClick={copy}
            className="absolute right-4 top-4 rounded-md border border-border bg-bg-card px-2 py-1 text-xs text-text-muted transition-colors hover:text-accent"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
          <pre className="font-mono text-sm leading-relaxed text-text-secondary">
            {envContent}
          </pre>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Implement ApiKeys.tsx**

Replace the entire content of `src/sections/layer0/ApiKeys.tsx`:

```tsx
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { CardGrid } from "../../components/ui/CardGrid";
import { TabPanel } from "../../components/ui/TabPanel";
import { HoverTable } from "../../components/ui/HoverTable";
import { ExtendedReading } from "../../components/ui/ExtendedReading";
import { EnvBuilder } from "../../playgrounds/EnvBuilder";

const providerCards = [
  {
    title: "就想快速试试",
    description: "OpenRouter — 一个 key 用 200+ 模型，按量付费，有 $1 免费额度",
    icon: "🚀",
  },
  {
    title: "要最好的质量",
    description: "Anthropic 或 Google 直连 — Claude / Gemini，延迟最低",
    icon: "🧠",
  },
  {
    title: "想免费用",
    description: "Google AI Studio 免费额度 / Ollama 跑本地开源模型",
    icon: "💰",
  },
  {
    title: "国内模型",
    description: "智谱 GLM / Kimi / MiniMax — 国内访问快，中文优化好",
    icon: "🇨🇳",
  },
  {
    title: "注重隐私",
    description: "Ollama + 本地模型 — 数据不出本机，完全离线可用",
    icon: "🔒",
  },
];

export function ApiKeys() {
  return (
    <Section id="api-keys">
      <TypewriterTitle
        text="0.5 获取 API Key"
        subtitle="选对 Provider，配好密钥"
      />

      {/* Decision tree */}
      <h3 className="text-lg font-semibold">该选哪个 Provider？</h3>
      <div className="mt-3">
        <CardGrid cards={providerCards} columns={3} />
      </div>

      {/* Cost reference */}
      <h3 className="mt-10 text-lg font-semibold">费用参考</h3>
      <div className="mt-3">
        <HoverTable
          headers={["Provider", "模型", "每百万 token", "一次对话约"]}
          rows={[
            ["Anthropic", "Claude Opus", "~$15", "~¥0.5"],
            ["Anthropic", "Claude Haiku", "~$0.25", "~¥0.01"],
            ["Google", "Gemini Flash", "有免费额度", "免费"],
            ["OpenRouter", "取决于模型", "略有加价", "因模型而异"],
            ["Ollama", "本地模型", "免费", "免费（电费除外）"],
          ]}
        />
        <p className="mt-2 text-xs text-text-muted">
          以上为粗略估算，实际费用取决于对话长度和模型定价。开启
          Smart Model Routing 后日常使用可省 70-80%。
        </p>
      </div>

      {/* Get key steps */}
      <h3 className="mt-10 text-lg font-semibold">获取步骤</h3>
      <div className="mt-3">
        <TabPanel
          tabs={[
            {
              label: "OpenRouter",
              content: (
                <ol className="space-y-2 text-sm text-text-secondary">
                  <li>1. 打开 openrouter.ai → 注册账号</li>
                  <li>2. Dashboard → API Keys → Create Key</li>
                  <li>3. 复制 key（以 sk-or-v1- 开头）</li>
                </ol>
              ),
            },
            {
              label: "Anthropic",
              content: (
                <ol className="space-y-2 text-sm text-text-secondary">
                  <li>1. 打开 console.anthropic.com → 注册</li>
                  <li>2. API Keys → Create Key</li>
                  <li>3. 复制 key（以 sk-ant- 开头）</li>
                </ol>
              ),
            },
            {
              label: "Google AI Studio",
              content: (
                <ol className="space-y-2 text-sm text-text-secondary">
                  <li>1. 打开 aistudio.google.com</li>
                  <li>2. 点击 &ldquo;Get API key&rdquo;</li>
                  <li>3. 复制 key（以 AIza 开头）</li>
                </ol>
              ),
            },
          ]}
        />
      </div>

      {/* EnvBuilder playground */}
      <h3 className="mt-10 text-lg font-semibold">配置 .env</h3>
      <p className="mt-2 text-sm text-text-secondary">
        文件位置：
        <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-accent">
          ~/.hermes/.env
        </code>
        （安装脚本已创建）。勾选你有的 Provider，复制生成的内容：
      </p>
      <EnvBuilder />

      <p className="mt-3 text-sm text-text-secondary">
        也可以用{" "}
        <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono">
          hermes login
        </code>{" "}
        通过 Nous Portal OAuth 登录，无需手动配 API key。
      </p>

      {/* Privacy callout */}
      <div className="mt-6 rounded-lg border border-border bg-bg-card p-4">
        <h4 className="mb-2 text-sm font-semibold">数据隐私</h4>
        <ul className="space-y-1 text-sm text-text-secondary">
          <li>OpenRouter：消息经 OpenRouter 服务器中转到模型 provider</li>
          <li>Anthropic / Google 直连：消息直接到 provider 服务器</li>
          <li>Ollama 本地模型：数据完全不出本机</li>
        </ul>
      </div>

      {/* Security callout */}
      <div className="mt-4 rounded-lg border border-error/30 bg-error/5 p-4">
        <h4 className="mb-1 text-sm font-semibold text-error">安全提醒</h4>
        <p className="text-sm text-text-secondary">
          .env 包含你的 API 密钥 = 你的钱。不要分享、不要提交到
          git、不要截图发群里。
        </p>
      </div>

      <ExtendedReading
        links={[
          {
            title: "OpenRouter Pricing",
            url: "https://openrouter.ai/models",
            source: "OpenRouter",
          },
          {
            title: "Anthropic Pricing",
            url: "https://www.anthropic.com/pricing",
            source: "Anthropic",
          },
          {
            title: "Google AI Pricing",
            url: "https://ai.google.dev/pricing",
            source: "Google",
          },
        ]}
      />
    </Section>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/playgrounds/EnvBuilder.tsx src/sections/layer0/ApiKeys.tsx
git commit -m "feat(layer0): implement ApiKeys section with EnvBuilder playground"
```

---

### Task 5: FirstConversation section

**Files:**
- Modify: `src/sections/layer0/FirstConversation.tsx` (replace stub)

- [ ] **Step 1: Implement FirstConversation.tsx**

Replace the entire content of `src/sections/layer0/FirstConversation.tsx`:

```tsx
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { Terminal } from "../../components/ui/Terminal";
import { CardGrid } from "../../components/ui/CardGrid";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const setupWizardLines = [
  { type: "command" as const, text: "hermes" },
  {
    type: "output" as const,
    text: "✨ Welcome to Hermes Agent!",
    delay: 600,
  },
  {
    type: "output" as const,
    text: "   Let's set up your agent in a few steps.",
    delay: 300,
  },
  { type: "output" as const, text: "", delay: 400 },
  {
    type: "output" as const,
    text: "? Choose your LLM provider:",
    delay: 500,
  },
  {
    type: "output" as const,
    text: "  ❯ OpenRouter (200+ models, recommended)",
  },
  { type: "output" as const, text: "    Anthropic (Claude)" },
  { type: "output" as const, text: "    Google (Gemini)" },
  { type: "output" as const, text: "    Local (Ollama)", delay: 800 },
  { type: "output" as const, text: "", delay: 300 },
  {
    type: "output" as const,
    text: "? Choose your default model:",
    delay: 500,
  },
  {
    type: "output" as const,
    text: "  ❯ anthropic/claude-sonnet-4 (balanced)",
  },
  { type: "output" as const, text: "    anthropic/claude-opus-4 (most capable)" },
  {
    type: "output" as const,
    text: "    google/gemini-2.5-flash (fast & cheap)",
    delay: 800,
  },
  { type: "output" as const, text: "", delay: 300 },
  {
    type: "output" as const,
    text: "✔ Configuration saved to ~/.hermes/config.yaml",
    delay: 400,
  },
  {
    type: "output" as const,
    text: "✨ Setup complete! Type your first message below.",
    delay: 400,
  },
];

const firstChatLines = [
  {
    type: "output" as const,
    text: "💬 Hermes Agent v0.9.0 — Type your message or /help",
  },
  { type: "output" as const, text: "" },
  {
    type: "command" as const,
    text: "帮我搜一下 MCP 协议是什么，整理成笔记保存",
    delay: 1000,
  },
  { type: "output" as const, text: "", delay: 600 },
  {
    type: "output" as const,
    text: '🔍 [web_search] Searching: "MCP Model Context Protocol"...',
    delay: 1200,
  },
  {
    type: "output" as const,
    text: "📝 [write_file] Saving to ~/notes/mcp-overview.md",
    delay: 800,
  },
  {
    type: "output" as const,
    text: "📄 [read_file] Verifying saved note...",
    delay: 600,
  },
  { type: "output" as const, text: "", delay: 400 },
  {
    type: "output" as const,
    text: "MCP (Model Context Protocol) 是 Anthropic 提出的开放协议，",
  },
  {
    type: "output" as const,
    text: "它让 AI 模型能够统一地调用外部工具和数据源...",
  },
  { type: "output" as const, text: "（笔记已保存到 ~/notes/mcp-overview.md）" },
];

const slashCommands = [
  { title: "/help", description: "查看所有可用命令", icon: "❓" },
  { title: "/model", description: "切换模型（对话中途也能换）", icon: "🔄" },
  { title: "/tools", description: "查看当前可用工具列表", icon: "🔧" },
  { title: "/memory", description: "查看 Agent 记住了什么", icon: "🧠" },
  { title: "/clear", description: "清空当前对话上下文", icon: "🗑" },
  { title: "Ctrl+C", description: "退出 Hermes", icon: "⏏" },
];

const cliCommands = [
  { title: "hermes setup", description: "重新运行 setup wizard", icon: "⚙️" },
  { title: "hermes model", description: "交互式选择/切换模型", icon: "🤖" },
  { title: "hermes tools", description: "配置工具开关", icon: "🔨" },
  {
    title: "hermes config set",
    description: "修改单个配置项",
    icon: "📝",
  },
  { title: "hermes doctor", description: "诊断依赖和配置问题", icon: "🩺" },
  { title: "hermes update", description: "更新到最新版", icon: "⬆️" },
  {
    title: "hermes gateway setup",
    description: "配置消息平台（见 0.10）",
    icon: "📱",
  },
];

export function FirstConversation() {
  return (
    <Section id="first-conversation">
      <TypewriterTitle
        text="0.6 首次启动 & 第一次对话"
        subtitle="敲下第一个回车"
      />

      {/* Setup Wizard */}
      <h3 className="text-lg font-semibold">Setup Wizard</h3>
      <p className="mt-2 text-sm text-text-secondary">
        首次运行{" "}
        <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-accent">
          hermes
        </code>{" "}
        时自动触发 setup wizard。它会检测你在 .env 中配了哪些
        key，只显示对应的 provider：
      </p>
      <div className="mt-3">
        <Terminal title="Setup Wizard" lines={setupWizardLines} />
      </div>
      <p className="mt-3 text-sm text-text-muted">
        已经运行过？用{" "}
        <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono">
          hermes setup
        </code>{" "}
        可以重新进入 wizard。
      </p>

      {/* First conversation */}
      <h3 className="mt-10 text-lg font-semibold">第一次对话</h3>
      <div className="mt-3">
        <Terminal title="First Conversation" lines={firstChatLines} />
      </div>
      <div className="mt-4 rounded-lg border border-accent/30 bg-accent/5 p-4">
        <p className="text-sm text-text-secondary">
          <strong className="text-accent">看到了吗？</strong> 它不只是回答问题，还自动搜了网页、写了文件。这就是
          Agent 和 Chatbot 的区别 — 它能{" "}
          <strong>采取行动</strong>，而不仅仅是生成文本。
        </p>
      </div>

      {/* Slash commands */}
      <h3 className="mt-10 text-lg font-semibold">对话内命令</h3>
      <div className="mt-3">
        <CardGrid cards={slashCommands} columns={3} />
      </div>

      {/* CLI commands */}
      <h3 className="mt-8 text-lg font-semibold">CLI 子命令</h3>
      <div className="mt-3">
        <CardGrid cards={cliCommands} columns={3} />
      </div>

      <ExtendedReading
        links={[
          {
            title: "Hermes Agent 官方文档",
            url: "https://hermes-agent.nousresearch.com/docs/",
            source: "Official Docs",
          },
        ]}
      />
    </Section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/sections/layer0/FirstConversation.tsx
git commit -m "feat(layer0): implement FirstConversation section with setup wizard demo"
```

---

### Task 6: DirectoryStructure section

**Files:**
- Modify: `src/sections/layer0/DirectoryStructure.tsx` (replace stub)

- [ ] **Step 1: Implement DirectoryStructure.tsx**

Replace the entire content of `src/sections/layer0/DirectoryStructure.tsx`:

```tsx
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { FoldPanel } from "../../components/ui/FoldPanel";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

interface FileEntry {
  name: string;
  description: string;
  category: "user" | "agent" | "system";
  children?: FileEntry[];
}

const categoryStyles = {
  user: { badge: "🟢 你编辑", color: "text-success" },
  agent: { badge: "🔵 自动管理", color: "text-accent" },
  system: { badge: "⚙️ 系统管理", color: "text-text-muted" },
};

const fileTree: FileEntry[] = [
  { name: "config.yaml", description: "所有配置的总入口（下一节详细讲）", category: "user" },
  { name: ".env", description: "API 密钥，安装时从 .env.example 复制而来", category: "user" },
  { name: "SOUL.md", description: "Agent 人格定义（0.9 节详细讲）", category: "user" },
  { name: "MEMORY.md", description: "Agent 观察到的你的偏好和习惯，它会自己更新。你可以看、可以改、可以删", category: "agent" },
  { name: "USER.md", description: "Agent 对你的理解（职业、技能、喜好），自动维护", category: "agent" },
  { name: "AGENTS.md", description: "项目级指令（可选，类似 .cursorrules）", category: "user" },
  {
    name: "hermes-agent/",
    description: "程序本体（安装脚本管理）",
    category: "system",
    children: [
      { name: "venv/", description: "Python 虚拟环境", category: "system" },
      { name: "...", description: "源代码", category: "system" },
    ],
  },
  { name: "skills/", description: "已学习的技能文件。有些自动创建，你也可以手写", category: "agent" },
  { name: "memories/", description: "SQLite FTS5 记忆数据库，用于跨会话搜索相关上下文", category: "agent" },
  { name: "sessions/", description: "对话历史记录", category: "agent" },
  { name: "logs/", description: "运行日志", category: "agent" },
  { name: "cron/", description: "定时任务配置", category: "user" },
  { name: "hooks/", description: "Hook 脚本", category: "user" },
  { name: "image_cache/", description: "图片缓存", category: "agent" },
  { name: "audio_cache/", description: "音频缓存", category: "agent" },
  { name: "pairing/", description: "设备配对信息", category: "agent" },
];

function FileTreeItem({ entry }: { entry: FileEntry }) {
  const style = categoryStyles[entry.category];
  if (entry.children) {
    return (
      <FoldPanel title={entry.name} badge={style.badge}>
        <p className="mb-3 text-sm text-text-secondary">{entry.description}</p>
        <div className="space-y-0">
          {entry.children.map((child) => (
            <FileTreeItem key={child.name} entry={child} />
          ))}
        </div>
      </FoldPanel>
    );
  }
  return (
    <div className="flex items-start gap-3 border-b border-border/50 py-2.5 last:border-0">
      <code className={`shrink-0 font-mono text-sm ${style.color}`}>
        {entry.name}
      </code>
      <span className="text-sm text-text-secondary">{entry.description}</span>
      <span className="ml-auto shrink-0 rounded-full bg-bg-elevated px-2 py-0.5 text-xs text-text-muted">
        {style.badge}
      </span>
    </div>
  );
}

export function DirectoryStructure() {
  return (
    <Section id="directory-structure">
      <TypewriterTitle
        text="0.7 目录结构一览"
        subtitle="了解 ~/.hermes/ 里的每个文件"
      />

      <div className="flex flex-wrap gap-4 text-sm">
        {Object.values(categoryStyles).map((s) => (
          <span key={s.badge} className="flex items-center gap-1.5">
            <span>{s.badge}</span>
          </span>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-border">
        <div className="border-b border-border bg-bg-card px-4 py-2">
          <code className="text-sm text-text-muted">~/.hermes/</code>
        </div>
        <div className="p-4">
          {fileTree.map((entry) => (
            <FileTreeItem key={entry.name} entry={entry} />
          ))}
        </div>
      </div>

      {/* Backup advice */}
      <div className="mt-8 rounded-lg border border-warning/30 bg-warning/5 p-4">
        <h4 className="mb-2 text-sm font-semibold text-warning">
          备份建议
        </h4>
        <p className="text-sm text-text-secondary">
          <strong>更新前务必备份：</strong> config.yaml, .env, SOUL.md,
          skills/, memories/ — 这些是你的数据。
        </p>
        <p className="mt-1 text-sm text-text-secondary">
          <strong>可以安全删除：</strong> sessions/（对话历史，可再生）、logs/、image_cache/、audio_cache/
        </p>
      </div>

      <ExtendedReading
        links={[
          {
            title: "Layer 1: 记忆系统详解",
            url: "#memory-system",
            source: "本教程",
          },
          {
            title: "Layer 1: Skills 系统详解",
            url: "#skills-system",
            source: "本教程",
          },
        ]}
      />
    </Section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/sections/layer0/DirectoryStructure.tsx
git commit -m "feat(layer0): implement DirectoryStructure section with interactive file tree"
```

---

### Task 7: ConfigExplorer playground + ConfigEssentials section

**Files:**
- Create: `src/playgrounds/ConfigExplorer.tsx`
- Modify: `src/sections/layer0/ConfigEssentials.tsx` (replace stub)

**Note:** The config.yaml field names used below are based on research of the hermes-agent repo's `cli-config.yaml.example`. If a field name is incorrect, the implementer should verify against the actual file at `https://github.com/NousResearch/hermes-agent` and adjust.

- [ ] **Step 1: Create ConfigExplorer.tsx**

Create `src/playgrounds/ConfigExplorer.tsx`:

```tsx
import { useState } from "react";
import { CodeBlock } from "../components/ui/CodeBlock";

interface Scenario {
  id: string;
  question: string;
  icon: string;
  description: string;
  configSnippet: string;
  tips: string[];
  highlightSection: string;
}

const scenarios: Scenario[] = [
  {
    id: "model",
    question: "想换个模型？",
    icon: "🔄",
    description: "两种方式：hermes model 交互式选择（最简单），或者编辑 config.yaml。provider 设为 auto 时根据 .env 中可用的 key 自动选择。",
    configSnippet: `model:
  default: "anthropic/claude-sonnet-4"
  provider: "openrouter"`,
    tips: ["hermes model 命令可以交互式选择，不用手动编辑文件"],
    highlightSection: "model",
  },
  {
    id: "cost",
    question: "太贵了？",
    icon: "💰",
    description: "开启 Smart Model Routing：简单对话自动用便宜模型，复杂任务才用贵的。Claude Opus ~$15/M tokens，Haiku ~$0.25/M — 开启后省 70-80%。",
    configSnippet: `smart_model_routing:
  enabled: true
  cheap_model: "anthropic/claude-haiku"
  expensive_model: "anthropic/claude-sonnet-4"`,
    tips: ["日常闲聊自动走 Haiku，写代码/复杂分析才切 Sonnet"],
    highlightSection: "smart_model_routing",
  },
  {
    id: "safety",
    question: "怕搞坏电脑？",
    icon: "🛡",
    description: "默认 terminal.backend: local — Agent 直接在你机器上执行命令，包括危险命令。换 Docker 后 Agent 在容器里跑，炸了重建就行。",
    configSnippet: `terminal:
  backend: "docker"
  docker:
    image: "hermes-sandbox:latest"
    volumes:
      - "~/workspace:/workspace"`,
    tips: ["折中方案：保持 local 但在 platform_toolsets 里关掉危险工具"],
    highlightSection: "terminal",
  },
  {
    id: "memory",
    question: "它记了奇怪的东西？",
    icon: "🧠",
    description: "nudge_interval 控制多少轮对话后检查是否需要更新记忆。太小 = 频繁打断，太大 = 记不住。你随时可以直接编辑 ~/.hermes/MEMORY.md。",
    configSnippet: `memory:
  enabled: true
  nudge_interval: 5
  char_limit: 4000`,
    tips: ["直接编辑 MEMORY.md 可以删掉不想让它记住的内容"],
    highlightSection: "memory",
  },
  {
    id: "compression",
    question: "对话太长变傻了？",
    icon: "📦",
    description: "上下文窗口满了 Agent 会自动压缩历史消息。threshold 控制何时触发，ratio 控制压缩后保留多少。默认值适合大多数场景。",
    configSnippet: `compression:
  threshold: 0.50
  ratio: 0.30
  protected_messages: 4`,
    tips: ["protected_messages 保护最近 N 轮不被压缩"],
    highlightSection: "compression",
  },
  {
    id: "tools",
    question: "有些工具不想用？",
    icon: "🔧",
    description: "按平台单独配置工具开关。典型场景：Telegram 上关掉 execute_code（远程太危险），CLI 下关掉 send_message（防止乱发消息）。",
    configSnippet: `platform_toolsets:
  cli:
    web_search: true
    execute_code: true
    send_message: false
  telegram:
    execute_code: false
    web_search: true`,
    tips: ["hermes tools 命令可以交互式配置"],
    highlightSection: "platform_toolsets",
  },
];

export function ConfigExplorer() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = scenarios.find((s) => s.id === activeId);

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-border">
      <div className="border-b border-border bg-bg-card px-4 py-2 text-sm font-medium">
        config.yaml 场景浏览器
      </div>
      <div className="grid lg:grid-cols-5">
        {/* Left: scenario cards */}
        <div className="space-y-0 border-r border-border lg:col-span-2">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() =>
                setActiveId(activeId === s.id ? null : s.id)
              }
              className={`w-full border-b border-border p-4 text-left transition-colors last:border-0 ${
                activeId === s.id
                  ? "bg-accent/5"
                  : "hover:bg-bg-card"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{s.icon}</span>
                <span
                  className={`font-medium ${
                    activeId === s.id ? "text-accent" : ""
                  }`}
                >
                  {s.question}
                </span>
              </div>
              {activeId === s.id && (
                <div className="mt-3 space-y-3 animate-fade-in-up">
                  <p className="text-sm text-text-secondary">
                    {s.description}
                  </p>
                  {/* Mobile: show config inline */}
                  <div className="lg:hidden">
                    <CodeBlock
                      code={s.configSnippet}
                      lang="yaml"
                      title="config.yaml"
                    />
                  </div>
                  {s.tips.map((tip) => (
                    <p
                      key={tip}
                      className="text-xs text-text-muted"
                    >
                      💡 {tip}
                    </p>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Right: config preview (desktop only) */}
        <div className="hidden bg-bg-primary p-4 lg:col-span-3 lg:block">
          {active ? (
            <div>
              <div className="mb-2 text-xs text-text-muted">
                ~/.hermes/config.yaml →{" "}
                <span className="text-accent">
                  {active.highlightSection}
                </span>
              </div>
              <CodeBlock
                code={active.configSnippet}
                lang="yaml"
                title={`config.yaml · ${active.highlightSection}`}
              />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-text-muted">
              ← 点击左边的场景查看对应配置
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Implement ConfigEssentials.tsx**

Replace the entire content of `src/sections/layer0/ConfigEssentials.tsx`:

```tsx
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { ExtendedReading } from "../../components/ui/ExtendedReading";
import { ConfigExplorer } from "../../playgrounds/ConfigExplorer";

export function ConfigEssentials() {
  return (
    <Section id="config-essentials">
      <TypewriterTitle
        text="0.8 常用配置场景"
        subtitle="你想做什么，改哪里"
      />

      <p className="text-text-secondary">
        配置文件位置：
        <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-accent">
          ~/.hermes/config.yaml
        </code>
        。不用通读整个文件 — 点击下面的场景，看你需要改哪里：
      </p>

      <ConfigExplorer />

      <p className="mt-4 text-sm text-text-muted">
        大部分配置也可以通过命令行修改：
        <code className="ml-1 rounded bg-bg-elevated px-1.5 py-0.5 font-mono">
          hermes config set &lt;key&gt; &lt;value&gt;
        </code>
      </p>

      <ExtendedReading
        links={[
          {
            title: "config.yaml 完整速查",
            url: "#appendix-config",
            source: "本教程 · 附录",
          },
        ]}
      />
    </Section>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/playgrounds/ConfigExplorer.tsx src/sections/layer0/ConfigEssentials.tsx
git commit -m "feat(layer0): implement ConfigEssentials section with ConfigExplorer playground"
```

---

### Task 8: SoulMdIntro section

**Files:**
- Modify: `src/sections/layer0/SoulMdIntro.tsx` (replace stub)

- [ ] **Step 1: Implement SoulMdIntro.tsx**

Replace the entire content of `src/sections/layer0/SoulMdIntro.tsx`:

```tsx
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { TabPanel } from "../../components/ui/TabPanel";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const templates = [
  {
    label: "专业技术助手",
    soul: `# SOUL

You are a senior software engineer assistant.

## Style
- Be concise and direct. No fluff.
- Code first, explanation second.
- Use Chinese for conversation, English for code comments and technical terms.

## Rules
- Always show the command before explaining what it does.
- When uncertain, say so explicitly.
- Never make up URLs or version numbers.`,
    example:
      "Docker 是容器引擎。核心概念：image（镜像）、container（容器）、volume（持久化存储）。\n\n```bash\ndocker run -it ubuntu bash\n```\n\n这会拉取 ubuntu 镜像并启动一个交互式容器。",
  },
  {
    label: "日常伙伴",
    soul: `# SOUL

You are a friendly and patient personal assistant.

## Style
- Warm and approachable tone.
- Use analogies to explain complex concepts.
- Break down steps clearly, assume no prior knowledge.
- Use Chinese throughout, including explanations.

## Rules
- Always ask before taking actions that modify files.
- Offer multiple options when there's no clear best choice.
- Celebrate small wins with the user.`,
    example:
      "你可以把 Docker 想象成一个「虚拟小房间」🏠\n\n就像你在电脑里搭了一个独立的小空间，里面有自己的系统、软件，和你的电脑互不干扰。\n\n想试试的话，我们一步步来？首先需要安装 Docker Desktop...",
  },
  {
    label: "研究助理",
    soul: `# SOUL

You are a meticulous research assistant.

## Style
- Structured output: use headers, bullet points, tables.
- Always cite sources with URLs.
- Present multiple perspectives on controversial topics.
- Academic Chinese with technical precision.

## Rules
- Distinguish between facts and opinions explicitly.
- When web search results conflict, note the discrepancy.
- Proactively suggest related topics worth exploring.`,
    example:
      "## Docker 概述\n\nDocker 是一个开源容器化平台（Solomon Hykes, 2013）。\n\n### 核心架构\n| 组件 | 职责 |\n|------|------|\n| Docker Engine | 容器运行时 |\n| Docker Hub | 镜像仓库 |\n\n### 与虚拟机的区别\n据 IBM 研究报告（2024），容器启动时间比 VM 快 10-100 倍...\n\n> 延伸阅读：Kubernetes 与 Docker 的关系",
  },
];

export function SoulMdIntro() {
  return (
    <Section id="soul-md-intro">
      <TypewriterTitle
        text="0.9 SOUL.md 人格定制"
        subtitle="定义你的 Agent 是谁"
      />

      <p className="text-text-secondary">
        SOUL.md 是 Agent 每次对话系统提示词的第一层。它定义的不是
        Agent 知道什么，而是 Agent <strong>是谁</strong> —
        回答风格、思维方式、行为准则。
      </p>
      <p className="mt-2 text-sm text-text-muted">
        文件位置：
        <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono">
          ~/.hermes/SOUL.md
        </code>
        ，安装时自动创建。
      </p>

      {/* Templates comparison */}
      <h3 className="mt-8 text-lg font-semibold">3 个模板对比</h3>
      <p className="mt-1 text-sm text-text-secondary">
        同一个问题「什么是 Docker？」在不同人格下的回答：
      </p>

      <div className="mt-4">
        <TabPanel
          tabs={templates.map((t) => ({
            label: t.label,
            content: (
              <div className="space-y-4">
                <CodeBlock
                  code={t.soul}
                  lang="markdown"
                  title="SOUL.md"
                />
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-text-muted">
                    回答效果：
                  </h4>
                  <div className="rounded-lg border border-border bg-bg-card p-4 text-sm text-text-secondary whitespace-pre-line">
                    {t.example}
                  </div>
                </div>
              </div>
            ),
          }))}
        />
      </div>

      {/* Practical tips */}
      <div className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-4">
        <h4 className="mb-2 text-sm font-semibold text-accent">
          实用建议
        </h4>
        <ul className="space-y-1.5 text-sm text-text-secondary">
          <li>
            控制在 <strong>500 token 以内</strong> — SOUL.md
            在每条消息里都被注入，太长 = 每次对话都多花钱
          </li>
          <li>
            <strong>越具体越好</strong> —
            「用中文回答，代码注释用英文」比 「be helpful」有用一百倍
          </li>
          <li>随时改随时生效，不需要重启 hermes</li>
          <li>
            没灵感？先用默认的，用几天后根据实际不满意的地方修改
          </li>
        </ul>
      </div>

      {/* SOUL.md vs personality */}
      <h3 className="mt-8 text-lg font-semibold">
        SOUL.md vs config personality
      </h3>
      <div className="mt-3 space-y-2 text-sm text-text-secondary">
        <p>
          <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
            config.yaml
          </code>{" "}
          的{" "}
          <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
            agent.personality
          </code>{" "}
          是预设快捷方式（一个词切换风格）。SOUL.md 是自由格式
          markdown，完全控制。两者可以同时用，SOUL.md 优先级更高。
        </p>
      </div>

      <ExtendedReading
        links={[
          {
            title: "Layer 1: SOUL.md 深度定制",
            url: "#soul-md",
            source: "本教程",
          },
        ]}
      />
    </Section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/sections/layer0/SoulMdIntro.tsx
git commit -m "feat(layer0): implement SoulMdIntro section with 3 persona templates"
```

---

### Task 9: ConnectPlatform section

**Files:**
- Modify: `src/sections/layer0/ConnectPlatform.tsx` (replace stub)

- [ ] **Step 1: Implement ConnectPlatform.tsx**

Replace the entire content of `src/sections/layer0/ConnectPlatform.tsx`:

```tsx
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { TabPanel } from "../../components/ui/TabPanel";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { Terminal } from "../../components/ui/Terminal";
import { TryItBox } from "../../components/ui/TryItBox";
import { HoverTable } from "../../components/ui/HoverTable";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const telegramLines = [
  { type: "command" as const, text: "hermes gateway setup" },
  { type: "output" as const, text: "? Select platform to configure:", delay: 600 },
  { type: "output" as const, text: "  ❯ Telegram" },
  { type: "output" as const, text: "    Discord" },
  { type: "output" as const, text: "    Slack" },
  { type: "output" as const, text: "    ...", delay: 800 },
  { type: "output" as const, text: "✔ Telegram configured!", delay: 600 },
  { type: "command" as const, text: "hermes gateway run", delay: 400 },
  { type: "output" as const, text: "🚀 Starting gateway...", delay: 600 },
  { type: "output" as const, text: "✅ Telegram bot online — @YourBot", delay: 800 },
  { type: "output" as const, text: "📡 Listening for messages..." },
];

const telegramEnv = `TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_ALLOWED_USERS=你的数字ID`;

const discordEnv = `DISCORD_BOT_TOKEN=你的bot_token
DISCORD_ALLOWED_USERS=你的Discord用户ID或用户名`;

const feishuEnv = `FEISHU_APP_ID=cli_xxxxxxxx
FEISHU_APP_SECRET=xxxxxxxx
FEISHU_CONNECTION_MODE=websocket
FEISHU_ALLOWED_USERS=你的飞书用户ID`;

const wecomEnv = `WECOM_CORP_ID=你的企业ID
WECOM_BOT_SECRET=你的bot_secret
WECOM_ALLOWED_USERS=用户ID`;

const serviceCode = `# 安装为系统服务（推荐）
hermes gateway install
hermes gateway start
hermes gateway status

# 或用 tmux 临时运行
tmux new -s hermes
hermes gateway run
# Ctrl+B D 断开（Agent 继续运行）
# tmux attach -t hermes 重新连接`;

export function ConnectPlatform() {
  return (
    <Section id="connect-platform">
      <TypewriterTitle
        text="0.10 连接消息平台"
        subtitle="让 Agent 上手机"
      />

      <p className="text-text-secondary">
        Hermes 支持 18+ 消息平台。选你最常用的一个，接上去：
      </p>
      <p className="mt-2 text-sm text-text-muted">
        关键概念：用{" "}
        <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono">
          hermes gateway setup
        </code>{" "}
        配置平台，用{" "}
        <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono">
          hermes gateway run
        </code>{" "}
        启动。所有已配置的平台会同时运行。
      </p>

      <div className="mt-6">
        <TabPanel
          tabs={[
            {
              label: "Telegram",
              content: (
                <div className="space-y-4">
                  <ol className="space-y-2 text-sm text-text-secondary">
                    <li>
                      1. 打开 Telegram → 搜索{" "}
                      <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
                        @BotFather
                      </code>{" "}
                      → 发送{" "}
                      <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
                        /newbot
                      </code>
                    </li>
                    <li>
                      2. 按提示起名 → 拿到 Bot Token（格式{" "}
                      <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
                        123456:ABC-DEF...
                      </code>
                      ）
                    </li>
                    <li>
                      3. 获取你的 User ID：搜索{" "}
                      <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
                        @userinfobot
                      </code>{" "}
                      → 发送任意消息 → 它回复你的数字 ID
                    </li>
                    <li>4. 编辑 ~/.hermes/.env：</li>
                  </ol>
                  <CodeBlock
                    code={telegramEnv}
                    lang="bash"
                    title="~/.hermes/.env"
                  />
                  <ol
                    start={5}
                    className="space-y-2 text-sm text-text-secondary"
                  >
                    <li>5. 运行配置向导并启动：</li>
                  </ol>
                  <Terminal
                    title="Telegram Setup"
                    lines={telegramLines}
                  />
                  <p className="text-sm text-text-secondary">
                    6. 手机上找到你的 bot → 发消息 → 验证收到回复
                  </p>
                </div>
              ),
            },
            {
              label: "Discord",
              content: (
                <div className="space-y-4">
                  <ol className="space-y-2 text-sm text-text-secondary">
                    <li>
                      1. 打开 Discord Developer Portal
                      (discord.com/developers) → New Application
                    </li>
                    <li>2. 左侧 Bot → Add Bot → Copy Token</li>
                    <li>
                      3. 左侧 Bot → 打开 Privileged Gateway Intents
                      下的 <strong>Message Content Intent</strong>
                    </li>
                    <li>
                      4. 左侧 OAuth2 → URL Generator → 勾选 bot scope
                      + Send/Read Messages → 复制邀请链接 →
                      邀请到你的服务器
                    </li>
                    <li>5. 编辑 ~/.hermes/.env：</li>
                  </ol>
                  <CodeBlock
                    code={discordEnv}
                    lang="bash"
                    title="~/.hermes/.env"
                  />
                  <ol
                    start={6}
                    className="space-y-2 text-sm text-text-secondary"
                  >
                    <li>
                      6.{" "}
                      <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
                        hermes gateway setup
                      </code>{" "}
                      → 选 Discord
                    </li>
                    <li>
                      7.{" "}
                      <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
                        hermes gateway run
                      </code>
                    </li>
                  </ol>
                </div>
              ),
            },
            {
              label: "飞书 (Lark)",
              content: (
                <div className="space-y-4">
                  <ol className="space-y-2 text-sm text-text-secondary">
                    <li>
                      1. 打开飞书开放平台 (open.feishu.cn) →
                      创建企业自建应用
                    </li>
                    <li>2. 获取 App ID 和 App Secret</li>
                    <li>3. 配置应用能力 → 添加机器人</li>
                    <li>
                      4. 选择连接模式（WebSocket 推荐，无需公网 IP）
                    </li>
                    <li>5. 编辑 ~/.hermes/.env：</li>
                  </ol>
                  <CodeBlock
                    code={feishuEnv}
                    lang="bash"
                    title="~/.hermes/.env"
                  />
                  <ol
                    start={6}
                    className="space-y-2 text-sm text-text-secondary"
                  >
                    <li>
                      6.{" "}
                      <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
                        hermes gateway setup
                      </code>{" "}
                      → 选 Feishu
                    </li>
                    <li>
                      7.{" "}
                      <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
                        hermes gateway run
                      </code>
                    </li>
                  </ol>
                </div>
              ),
            },
            {
              label: "微信",
              content: (
                <div className="space-y-4">
                  <p className="text-sm text-text-secondary">
                    hermes-agent 支持三种微信接入方式：
                  </p>
                  <HoverTable
                    headers={["方式", "适合", "限制"]}
                    rows={[
                      [
                        "企业微信 AI Bot",
                        "企业内部使用",
                        "需要企业微信管理员权限",
                      ],
                      [
                        "企业微信自建应用",
                        "企业正式部署",
                        "需要配置回调地址（公网 IP）",
                      ],
                      [
                        "个人微信（iLink Bot）",
                        "个人使用",
                        "依赖第三方 API，稳定性受限",
                      ],
                    ]}
                  />
                  <p className="text-sm text-text-secondary">
                    推荐从企业微信 AI Bot 开始（最简单）：
                  </p>
                  <CodeBlock
                    code={wecomEnv}
                    lang="bash"
                    title="~/.hermes/.env"
                  />
                  <p className="text-sm text-text-muted">
                    个人微信方式另有社区项目 HermesClaw
                    提供桥接。
                  </p>
                </div>
              ),
            },
          ]}
        />
      </div>

      {/* Security warning */}
      <div className="mt-8 rounded-lg border border-error/30 bg-error/5 p-4">
        <h4 className="mb-2 text-sm font-semibold text-error">
          ⚠️ ALLOWED_USERS 必须配置！
        </h4>
        <p className="text-sm text-text-secondary">不配 = 任何人都能：</p>
        <ul className="mt-1 space-y-1 text-sm text-text-secondary">
          <li>- 跟你的 Agent 聊天</li>
          <li>- 消耗你的 API 额度（= 花你的钱）</li>
          <li>
            - 让 Agent 在你的机器上执行命令（如果 terminal backend 是
            local）
          </li>
        </ul>
      </div>

      {/* Background running */}
      <h3 className="mt-8 text-lg font-semibold">后台运行</h3>
      <p className="mt-2 text-sm text-text-secondary">
        Agent 需要持续运行才能接收消息：
      </p>
      <div className="mt-3">
        <CodeBlock code={serviceCode} lang="bash" title="Service Management" />
      </div>

      {/* Multi-platform */}
      <h3 className="mt-8 text-lg font-semibold">多平台同时运行</h3>
      <p className="mt-2 text-sm text-text-secondary">
        不需要特殊命令。配置好多个平台的 env 变量后，
        <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono">
          hermes gateway run
        </code>{" "}
        自动检测并同时启动所有已配置的平台。
      </p>

      <TryItBox>
        <p>
          选一个你常用的平台，按上面的步骤接上去。从 Telegram 开始最简单。
        </p>
      </TryItBox>

      <ExtendedReading
        links={[
          {
            title: "Layer 1: 消息平台完整列表",
            url: "#messaging-platforms",
            source: "本教程",
          },
        ]}
      />
    </Section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/sections/layer0/ConnectPlatform.tsx
git commit -m "feat(layer0): implement ConnectPlatform section with 4 platform guides"
```

---

## Self-Review

**1. Spec coverage check:**

| Spec Section | Implemented In |
|---|---|
| 0.1 WhatIsHermes — 微改 subtitle | Task 1 Step 4 |
| 0.2 Comparison — 不动 | N/A |
| 0.3 Prerequisites | Task 2 |
| 0.4 Installation | Task 3 |
| 0.5 API Keys + EnvBuilder | Task 4 |
| 0.6 First Conversation | Task 5 |
| 0.7 Directory Structure | Task 6 |
| 0.8 Config Essentials + ConfigExplorer | Task 7 |
| 0.9 SOUL.md Intro | Task 8 |
| 0.10 Connect Platform | Task 9 |
| 0.11 Architecture — 编号变更 | Task 1 Step 5 |
| navigation.ts 变更 | Task 1 Step 1 |
| App.tsx 变更 | Task 1 Step 3 |
| QuickStart 删除 | Task 1 Step 6 |
| #quick-start 锚点迁移 | Task 1 Step 1 (navigation.ts removes old ID) |

No gaps found.

**2. Placeholder scan:** No TBD/TODO/"implement later" found. All steps contain complete code.

**3. Type consistency check:**
- All section components use `Section` wrapper with correct `id` prop matching navigation.ts ✓
- All `TypewriterTitle` uses consistent `text`/`subtitle` pattern ✓
- `EnvBuilder` exports match `ApiKeys` import ✓
- `ConfigExplorer` exports match `ConfigEssentials` import ✓
- All existing UI component interfaces (`Terminal`, `CodeBlock`, `TabPanel`, `CardGrid`, `FoldPanel`, `TryItBox`, `HoverTable`, `ExtendedReading`) used correctly per their TypeScript interfaces ✓
