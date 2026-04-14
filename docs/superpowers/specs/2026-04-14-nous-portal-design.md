# Nous Portal Section Design

**Goal:** 在 Layer 0 中新增 Nous Portal section，作为推荐入门路径，让读者通过 `hermes login` 一步获得模型访问权限，免费使用 MiMo-V2 Pro/Omni。

---

## 一、结构变更

### 新增 Section

- **Section ID:** `nous-portal`
- **标题:** Nous Portal 快速登录
- **文件:** `src/sections/layer0/NousPortal.tsx`
- **位置:** 插入到现有 `api-keys` 之前（成为 0.5）

### 编号重排

| 原编号 | 新编号 | Section ID | 标题 |
|--------|--------|------------|------|
| — | 0.5 | `nous-portal` | **Nous Portal 快速登录（新增）** |
| 0.5 | 0.6 | `api-keys` | 手动配置 API Keys（改标题） |
| 0.6 | 0.7 | `first-conversation` | 首次启动 & 第一次对话 |
| 0.7 | 0.8 | `directory-structure` | 目录结构一览 |
| 0.8 | 0.9 | `config-essentials` | 常用配置场景 |
| 0.9 | 0.10 | `soul-md-intro` | SOUL.md 人格定制 |
| 0.10 | 0.11 | `connect-platform` | 连接消息平台 |
| 0.11 | 0.12 | `architecture` | 架构鸟瞰 |

Layer 0 总计从 11 section 变为 **12 section**。

---

## 二、0.5 Nous Portal 快速登录（新 section 详细设计）

### 开篇

Nous Portal 是 Hermes Agent 官方的模型推理平台（portal.nousresearch.com）。通过它，你不需要到处找 API key — 一个账号就能访问模型和工具。

免费档可以直接使用 Xiaomi MiMo-V2 Pro（1M 长上下文、强工具调用）和 MiMo-V2 Omni（全模态理解）。免费模型列表可能随时间变化，以 Nous Portal 实际显示为准。

### Part 1: 3 步登录

Terminal 动画展示完整的 `hermes login` 流程：

```
$ hermes login
🔗 Opening browser for authentication...
   Verification URL: https://portal.nousresearch.com/device?code=ABCD-1234

   If browser doesn't open, visit the URL above and enter code: ABCD-1234

✔ Authentication successful!
✔ Agent key minted — valid for 30 minutes (auto-refreshes)
🎉 You're ready! Run `hermes` to start chatting.
```

**说明要点：**
- 使用 OAuth Device Code 流程（RFC 8628），在浏览器中授权，安全可靠
- 凭证保存在 `~/.hermes/auth.json`（不是 .env），自动刷新，不需要手动管理
- Agent key 自动续期，过期前自动重新获取

**⚠️ 实现注意：** 上述 Terminal 动画内容是推断的。实现时需运行 `hermes login` 捕获实际输出，以此为准。

**登录后的凭证管理：**
简短提示 `hermes auth` 命令：
- `hermes auth list` — 查看当前已登录的凭证
- `hermes auth remove nous` — 登出 Nous Portal
- `hermes auth` — 进入交互式凭证管理菜单

### Part 2: 免费可用的模型

HoverTable 展示：

| 模型 | 能力 | 特点 |
|------|------|------|
| MiMo-V2 Pro | 文本对话、工具调用、代码生成 | 1M 长上下文，Agent 专项优化，工具调用能力强 |
| MiMo-V2 Omni | 图片/视频/音频理解 + 文本 | 全模态，看得见听得懂能动手 |

callout 提示：
- 免费档不需要绑卡、不需要付费，登录即用
- MiMo-V2 Pro 是专门为 Agent 场景优化的模型 — 工具调用、多步推理、长上下文任务上表现特别好

**⚠️ 实现注意：** 免费模型列表可能随时间变化。源码中的 `_NOUS_ALLOWED_FREE_MODELS` 当前包含 `xiaomi/mimo-v2-pro` 和 `xiaomi/mimo-v2-omni`。实现时应验证最新状态。

### Part 3: 付费档概览

简短介绍（不深入配置细节），让读者知道"还有更多"：

**Nous Portal 订阅（Plus 及以上）还提供：**

- 所有模型解锁
- 托管工具网关 — 一个订阅搞定以下工具，不需要单独 API key：

HoverTable：

| 工具 | 能力 | 替代的独立 API Key |
|------|------|-------------------|
| Firecrawl 网关 | 网页搜索、抓取、内容提取 | FIRECRAWL_API_KEY |
| fal.ai 网关 | AI 图片生成 | FAL_KEY |
| OpenAI Audio 网关 | 语音合成 (TTS) | VOICE_TOOLS_OPENAI_KEY |
| Browser Use 网关 | 浏览器自动化 | BROWSERBASE_API_KEY |
| Modal 网关 | 云端代码执行 | 需自行注册 Modal |

开启方式提示：`.env` 中添加 `HERMES_ENABLE_NOUS_MANAGED_TOOLS=true`

末尾一句："详细配置见 Layer 1。"

### Part 4: Nous Portal vs 手动 API Keys 对比

HoverTable 对比：

| 维度 | Nous Portal | 手动 API Keys |
|------|-------------|---------------|
| 上手难度 | `hermes login` 一步搞定 | 逐个注册 provider、复制 key、编辑 .env |
| 免费选项 | MiMo-V2 Pro/Omni 免费 | Google AI Studio 免费额度、Ollama 本地 |
| 模型选择 | Portal 上可用的模型 | 200+ 模型（通过 OpenRouter 或直连） |
| 工具访问 | 付费档一站式（无需额外 key） | 每个工具单独配 API key |
| 凭证管理 | 自动刷新，存 auth.json | 手动管理，存 .env |
| 适合 | 新手入门、想省事 | 想用特定 provider、已有 key、注重选择自由 |

callout 提示：两种方式可以共存。你可以先用 Nous Portal 免费档跑起来，后续需要特定模型时再配手动 API key。

### 末尾链接

ExtendedReading：
- Nous Portal 官网: https://portal.nousresearch.com
- Xiaomi MiMo 开放平台: https://platform.xiaomimimo.com

### 交互组件

复用已有组件：Terminal（登录流程动画）、HoverTable（模型列表、工具列表、对比表）、callout 样式区块。不需要新建交互组件。

---

## 三、现有 API Keys section 调整

**文件:** `src/sections/layer0/ApiKeys.tsx`

1. **TypewriterTitle 变更:**
   - text: `"0.5 获取 API Key"` → `"0.6 手动配置 API Keys"`
   - subtitle: `"选对 Provider，配好密钥"` → `"需要特定 Provider？手动配置 API Key"`

2. **顶部加引导 callout:**
   在 TypewriterTitle 之后、决策树之前，加一个 accent 色 callout：
   "已经通过 Nous Portal 登录了？可以跳过这一节，直接去「首次启动」。"
   带一个链接/按钮滚动到 `#first-conversation`。

3. **EnvBuilder 保持不变**

4. **决策树调整:**
   在第一个选项前加一行：
   "如果你刚看完上一节的 Nous Portal 并且已经登录了，可以跳过这一节直接去「首次启动」。这一节是给需要手动配置特定 Provider 的用户准备的。"

---

## 四、其他文件变更

### navigation.ts

在 Layer 0 items 中 `api-keys` 前插入 `nous-portal`，并修改 `api-keys` 的 label：

```typescript
{ id: "nous-portal", label: "Nous Portal 快速登录" },
{ id: "api-keys", label: "手动配置 API Keys" },
```

### App.tsx

在 `<ApiKeys />` 前插入 `<NousPortal />`，新增 import。

### TypewriterTitle 编号更新

以下 section 的 TypewriterTitle text 需要编号 +1：

| 文件 | 原 text | 新 text |
|------|---------|---------|
| ApiKeys.tsx | 0.5 获取 API Key | 0.6 手动配置 API Keys |
| FirstConversation.tsx | 0.6 首次启动 & 第一次对话 | 0.7 首次启动 & 第一次对话 |
| DirectoryStructure.tsx | 0.7 目录结构一览 | 0.8 目录结构一览 |
| ConfigEssentials.tsx | 0.8 常用配置场景 | 0.9 常用配置场景 |
| SoulMdIntro.tsx | 0.9 SOUL.md 人格定制 | 0.10 SOUL.md 人格定制 |
| ConnectPlatform.tsx | 0.10 连接消息平台 | 0.11 连接消息平台 |
| ArchitectureOverview.tsx | 0.11 架构鸟瞰 | 0.12 架构鸟瞰 |

---

## 五、不变的部分

- WhatIsHermes.tsx — 不修改
- Comparison.tsx — 不修改
- Prerequisites.tsx — 不修改
- Installation.tsx — 不修改
- EnvBuilder.tsx — 不修改
- ConfigExplorer.tsx — 不修改
- DirectoryStructure.tsx — 仅改编号
- ConfigEssentials.tsx — 仅改编号
- SoulMdIntro.tsx — 仅改编号
- ConnectPlatform.tsx — 仅改编号
- ArchitectureOverview.tsx — 仅改编号
- 所有其他 Layer (1/2/3) — 不修改
