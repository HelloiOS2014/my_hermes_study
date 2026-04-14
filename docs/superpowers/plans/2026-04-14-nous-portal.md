# Nous Portal Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Nous Portal section (0.5) to Layer 0 as the recommended onboarding path, and renumber all subsequent sections.

**Architecture:** Create one new section component (NousPortal.tsx), update navigation.ts and App.tsx to include it, modify ApiKeys.tsx title/callout, and update TypewriterTitle numbers in 7 existing files.

**Tech Stack:** React 19, TypeScript strict, Tailwind CSS v4, existing UI components (Terminal, HoverTable, ExtendedReading, CodeBlock)

**Spec:** `docs/superpowers/specs/2026-04-14-nous-portal-design.md`

---

## File Structure

**Create:**
- `src/sections/layer0/NousPortal.tsx` — Nous Portal 快速登录 section

**Modify:**
- `src/data/navigation.ts:12` — insert nous-portal item, change api-keys label
- `src/App.tsx:10,76` — add NousPortal import and JSX
- `src/sections/layer0/ApiKeys.tsx:41-42` — change title/subtitle, add skip callout
- `src/sections/layer0/FirstConversation.tsx:131` — change 0.6 → 0.7
- `src/sections/layer0/DirectoryStructure.tsx:77` — change 0.7 → 0.8
- `src/sections/layer0/ConfigEssentials.tsx:10` — change 0.8 → 0.9
- `src/sections/layer0/SoulMdIntro.tsx:70` — change 0.9 → 0.10
- `src/sections/layer0/ConnectPlatform.tsx:54` — change 0.10 → 0.11
- `src/sections/layer0/ArchitectureOverview.tsx:46` — change 0.11 → 0.12

---

### Task 1: Create NousPortal.tsx

**Files:**
- Create: `src/sections/layer0/NousPortal.tsx`

- [ ] **Step 1: Create the full NousPortal component**

Create `src/sections/layer0/NousPortal.tsx`:

```tsx
import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { Terminal } from "../../components/ui/Terminal";
import { HoverTable } from "../../components/ui/HoverTable";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const loginLines = [
  { type: "command" as const, text: "hermes login" },
  {
    type: "output" as const,
    text: "🔗 Opening browser for authentication...",
    delay: 800,
  },
  {
    type: "output" as const,
    text: "   Verification URL: https://portal.nousresearch.com/device?code=ABCD-1234",
    delay: 400,
  },
  { type: "output" as const, text: "" },
  {
    type: "output" as const,
    text: "   If browser doesn't open, visit the URL above and enter code: ABCD-1234",
    delay: 600,
  },
  { type: "output" as const, text: "", delay: 1500 },
  {
    type: "output" as const,
    text: "✔ Authentication successful!",
    delay: 600,
  },
  {
    type: "output" as const,
    text: "✔ Agent key minted — valid for 30 minutes (auto-refreshes)",
    delay: 400,
  },
  {
    type: "output" as const,
    text: "🎉 You're ready! Run `hermes` to start chatting.",
    delay: 400,
  },
];

export function NousPortal() {
  return (
    <Section id="nous-portal">
      <TypewriterTitle
        text="0.5 Nous Portal 快速登录"
        subtitle="一步登录，免费模型立即可用"
      />

      <p className="text-text-secondary">
        <strong>Nous Portal</strong> 是 Hermes Agent
        官方的模型推理平台。通过它，你不需要到处找 API key —
        一个账号就能访问模型和工具。
      </p>
      <p className="mt-2 text-text-secondary">
        免费档可以直接使用 Xiaomi MiMo-V2 Pro（1M
        长上下文、强工具调用）和 MiMo-V2 Omni（全模态理解）。
        免费模型列表可能随时间变化，以 Nous Portal 实际显示为准。
      </p>

      {/* Part 1: Login flow */}
      <h3 className="mt-8 text-lg font-semibold">3 步登录</h3>
      <div className="mt-3">
        <Terminal title="hermes login" lines={loginLines} />
      </div>

      <div className="mt-4 space-y-2 text-sm text-text-secondary">
        <p>
          使用 OAuth Device Code 流程（RFC 8628），在浏览器中授权，安全可靠。
        </p>
        <p>
          凭证保存在{" "}
          <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-accent">
            ~/.hermes/auth.json
          </code>
          （不是 .env），自动刷新，不需要手动管理。
        </p>
      </div>

      {/* Auth management commands */}
      <h4 className="mt-6 font-semibold">凭证管理</h4>
      <div className="mt-2">
        <HoverTable
          headers={["命令", "作用"]}
          rows={[
            ["hermes auth list", "查看当前已登录的凭证"],
            ["hermes auth remove nous", "登出 Nous Portal"],
            ["hermes auth", "进入交互式凭证管理菜单"],
          ]}
        />
      </div>

      {/* Part 2: Free models */}
      <h3 className="mt-10 text-lg font-semibold">免费可用的模型</h3>
      <div className="mt-3">
        <HoverTable
          headers={["模型", "能力", "特点"]}
          rows={[
            [
              "MiMo-V2 Pro",
              "文本对话、工具调用、代码生成",
              "1M 长上下文，Agent 专项优化，工具调用能力强",
            ],
            [
              "MiMo-V2 Omni",
              "图片/视频/音频理解 + 文本",
              "全模态，看得见听得懂能动手",
            ],
          ]}
        />
      </div>

      <div className="mt-4 rounded-lg border border-success/30 bg-success/5 p-4">
        <p className="text-sm text-text-secondary">
          <strong className="text-success">免费档</strong>
          不需要绑卡、不需要付费，登录即用。MiMo-V2 Pro
          是专门为 Agent 场景优化的模型 —
          工具调用、多步推理、长上下文任务上表现特别好，非常适合
          Hermes Agent。
        </p>
      </div>

      {/* Part 3: Paid tier overview */}
      <h3 className="mt-10 text-lg font-semibold">
        付费档：一个订阅搞定一切
      </h3>
      <p className="mt-2 text-sm text-text-secondary">
        Nous Portal 订阅（Plus 及以上）还提供所有模型解锁 +
        托管工具网关 — 不需要单独配各个工具的 API key：
      </p>
      <div className="mt-3">
        <HoverTable
          headers={["工具", "能力", "替代的独立 API Key"]}
          rows={[
            ["Firecrawl 网关", "网页搜索、抓取、内容提取", "FIRECRAWL_API_KEY"],
            ["fal.ai 网关", "AI 图片生成", "FAL_KEY"],
            ["OpenAI Audio 网关", "语音合成 (TTS)", "VOICE_TOOLS_OPENAI_KEY"],
            [
              "Browser Use 网关",
              "浏览器自动化",
              "BROWSERBASE_API_KEY",
            ],
            ["Modal 网关", "云端代码执行", "需自行注册 Modal"],
          ]}
        />
      </div>
      <p className="mt-3 text-sm text-text-muted">
        开启方式：在{" "}
        <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
          ~/.hermes/.env
        </code>{" "}
        中添加{" "}
        <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
          HERMES_ENABLE_NOUS_MANAGED_TOOLS=true
        </code>
        。详细配置见 Layer 1。
      </p>

      {/* Part 4: Comparison table */}
      <h3 className="mt-10 text-lg font-semibold">
        Nous Portal vs 手动 API Keys
      </h3>
      <div className="mt-3">
        <HoverTable
          headers={["维度", "Nous Portal", "手动 API Keys"]}
          rows={[
            [
              "上手难度",
              "hermes login 一步搞定",
              "逐个注册 provider、复制 key、编辑 .env",
            ],
            [
              "免费选项",
              "MiMo-V2 Pro/Omni 免费",
              "Google AI Studio 免费额度、Ollama 本地",
            ],
            [
              "模型选择",
              "Portal 上可用的模型",
              "200+ 模型（通过 OpenRouter 或直连）",
            ],
            [
              "工具访问",
              "付费档一站式（无需额外 key）",
              "每个工具单独配 API key",
            ],
            [
              "凭证管理",
              "自动刷新，存 auth.json",
              "手动管理，存 .env",
            ],
            [
              "适合",
              "新手入门、想省事",
              "想用特定 provider、已有 key、注重选择自由",
            ],
          ]}
        />
      </div>

      <div className="mt-4 rounded-lg border border-accent/30 bg-accent/5 p-4">
        <p className="text-sm text-text-secondary">
          <strong className="text-accent">两种方式可以共存。</strong>
          你可以先用 Nous Portal 免费档跑起来，后续需要特定模型时再配手动
          API key。
        </p>
      </div>

      <ExtendedReading
        links={[
          {
            title: "Nous Portal 官网",
            url: "https://portal.nousresearch.com",
            source: "Nous Research",
          },
          {
            title: "Xiaomi MiMo 开放平台",
            url: "https://platform.xiaomimimo.com",
            source: "Xiaomi",
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

Expected: PASS (component exists but is not yet imported in App.tsx, tree-shaking ignores it)

- [ ] **Step 3: Commit**

```bash
git add src/sections/layer0/NousPortal.tsx
git commit -m "feat(layer0): create NousPortal section component"
```

---

### Task 2: Wire up navigation, App.tsx, and renumber all sections

**Files:**
- Modify: `src/data/navigation.ts:12`
- Modify: `src/App.tsx:10,76`
- Modify: `src/sections/layer0/ApiKeys.tsx:41-42` — title + subtitle + add callout
- Modify: `src/sections/layer0/FirstConversation.tsx:131` — 0.6 → 0.7
- Modify: `src/sections/layer0/DirectoryStructure.tsx:77` — 0.7 → 0.8
- Modify: `src/sections/layer0/ConfigEssentials.tsx:10` — 0.8 → 0.9
- Modify: `src/sections/layer0/SoulMdIntro.tsx:70` — 0.9 → 0.10
- Modify: `src/sections/layer0/ConnectPlatform.tsx:54` — 0.10 → 0.11
- Modify: `src/sections/layer0/ArchitectureOverview.tsx:46` — 0.11 → 0.12

- [ ] **Step 1: Update navigation.ts**

In `src/data/navigation.ts`, in the Layer 0 items array, insert `nous-portal` before `api-keys` and change the `api-keys` label:

```typescript
// Insert BEFORE the api-keys line:
{ id: "nous-portal", label: "Nous Portal 快速登录" },
// Change the api-keys line to:
{ id: "api-keys", label: "手动配置 API Keys" },
```

- [ ] **Step 2: Update App.tsx imports**

In `src/App.tsx`, add the NousPortal import after line 9 (after Installation import):

```tsx
import { NousPortal } from "./sections/layer0/NousPortal";
```

- [ ] **Step 3: Update App.tsx JSX**

In the Layer 0 JSX block, insert `<NousPortal />` between `<Installation />` and `<ApiKeys />`:

```tsx
<Installation />
<NousPortal />
<ApiKeys />
```

- [ ] **Step 4: Update ApiKeys.tsx title, subtitle, and add skip callout**

In `src/sections/layer0/ApiKeys.tsx`:

Change the TypewriterTitle (around line 41-43):
```tsx
// From:
text="0.5 获取 API Key"
subtitle="选对 Provider，配好密钥"
// To:
text="0.6 手动配置 API Keys"
subtitle="需要特定 Provider？手动配置 API Key"
```

After the closing `/>` of TypewriterTitle and before the `{/* Decision tree */}` comment (or `<h3>` for "该选哪个 Provider？"), insert this callout:

```tsx
<div className="mb-8 rounded-lg border border-accent/30 bg-accent/5 p-4">
  <p className="text-sm text-text-secondary">
    已经通过 Nous Portal 登录了？可以
    <button
      onClick={() => document.getElementById("first-conversation")?.scrollIntoView({ behavior: "smooth" })}
      className="mx-1 text-accent underline hover:no-underline"
    >
      跳过这一节，直接去「首次启动」
    </button>
    。这一节是给需要手动配置特定 Provider 的用户准备的。
  </p>
</div>
```

- [ ] **Step 5: Renumber all 6 remaining sections**

Change the TypewriterTitle `text` prop in each file:

| File | Line | From | To |
|------|------|------|-----|
| `src/sections/layer0/FirstConversation.tsx` | ~131 | `"0.6 首次启动 & 第一次对话"` | `"0.7 首次启动 & 第一次对话"` |
| `src/sections/layer0/DirectoryStructure.tsx` | ~77 | `"0.7 目录结构一览"` | `"0.8 目录结构一览"` |
| `src/sections/layer0/ConfigEssentials.tsx` | ~10 | `"0.8 常用配置场景"` | `"0.9 常用配置场景"` |
| `src/sections/layer0/SoulMdIntro.tsx` | ~70 | `"0.9 SOUL.md 人格定制"` | `"0.10 SOUL.md 人格定制"` |
| `src/sections/layer0/ConnectPlatform.tsx` | ~54 | `"0.10 连接消息平台"` | `"0.11 连接消息平台"` |
| `src/sections/layer0/ArchitectureOverview.tsx` | ~46 | `"0.11 架构鸟瞰"` | `"0.12 架构鸟瞰"` |

- [ ] **Step 6: Verify build**

```bash
npm run build
```

Expected: PASS — 510 modules, no errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(layer0): add NousPortal to navigation, renumber sections 0.5→0.12"
```

---

## Self-Review

**1. Spec coverage:**

| Spec Section | Implemented In |
|---|---|
| New section 0.5 NousPortal (Part 1-4) | Task 1 |
| navigation.ts insert | Task 2 Step 1 |
| App.tsx wiring | Task 2 Steps 2-3 |
| ApiKeys title/subtitle/callout change | Task 2 Step 4 |
| Renumber 7 sections | Task 2 Step 5 (ApiKeys in Step 4, 6 others in Step 5) |

No gaps.

**2. Placeholder scan:** No TBD/TODO. All code complete.

**3. Type consistency:** NousPortal export name matches App.tsx import. Section id `nous-portal` matches navigation.ts. All existing component interfaces (Terminal, HoverTable, CodeBlock, ExtendedReading) used correctly per their TypeScript signatures.
