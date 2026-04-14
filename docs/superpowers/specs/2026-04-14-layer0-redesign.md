# Layer 0 Redesign — 从零到跑通

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 重新设计 Layer 0（初见），从当前 4 section 寥寥数语的安装说明，扩展为 11 section 的完整入门指南，让读者看完后能独立安装、配置、使用 hermes-agent 并接入消息平台。

**Architecture:** 在现有 React + Vite + Tailwind CSS v4 项目基础上，保留 0.1（WhatIsHermes）和 0.2（Comparison）不动，删除旧 QuickStart，新增 7 个 section 组件 + 2 个新交互组件（EnvBuilder、ConfigExplorer），修改 navigation 和 App.tsx 路由。

**Tech Stack:** React 19, TypeScript strict, Tailwind CSS v4, 复用现有 UI 组件（Terminal, CodeBlock, TabPanel, CheckList, CardGrid, FoldPanel, TryItBox, ExtendedReading）

---

## 一、Layer 0 整体结构

**标题变更：** "Layer 0 · 初见 — 5 分钟建立直觉" → "Layer 0 · 初见 — 从零到跑通"

**用户心理旅程：** 了解 → 装好 → 跑起来 → 理解 → 定制 → 扩展 → 全貌

| # | Section ID | 标题 | 状态 | 阶段 |
|---|-----------|------|------|------|
| 0.1 | `what-is-hermes` | What is Hermes Agent? | 保留不动 | 了解 |
| 0.2 | `comparison` | 和其他框架有什么不同 | 保留不动 | 了解 |
| 0.3 | `prerequisites` | 前置要求 | **新增** | 装好 |
| 0.4 | `installation` | 安装 Hermes | **新增** | 装好 |
| 0.5 | `api-keys` | 获取 API Key | **新增** | 装好 |
| 0.6 | `first-conversation` | 首次启动 & 第一次对话 | **新增**（替代旧 QuickStart） | 跑起来 |
| 0.7 | `directory-structure` | 目录结构一览 | **新增** | 理解 |
| 0.8 | `config-essentials` | 常用配置场景 | **新增** | 定制 |
| 0.9 | `soul-md-intro` | SOUL.md 人格定制 | **新增** | 定制 |
| 0.10 | `connect-platform` | 连接消息平台 | **新增** | 扩展 |
| 0.11 | `architecture` | 架构鸟瞰 | 保留不动，编号变更 | 全貌 |

**删除：** `src/sections/layer0/QuickStart.tsx`（内容拆分到 0.4、0.5、0.6）

**⚠️ 锚点迁移：** 删除 QuickStart 后 `#quick-start` 锚点失效。实现时需全局搜索 `quick-start` 引用（navigation.ts、其他 section 内链），将其改为 `installation`。

---

## 二、navigation.ts 变更

Layer 0 的 items 从 4 个变为 11 个：

```typescript
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

---

## 三、各 Section 详细设计

### 0.1 WhatIsHermes — 微改

仅修改 TypewriterTitle 的 subtitle：`"5 分钟建立直觉"` → `"从零到跑通"`。其余内容不动。

### 0.2 Comparison — 保留不动

---

### 0.3 Prerequisites（前置要求）

**文件：** `src/sections/layer0/Prerequisites.tsx`

**目的：** 帮读者确认环境就绪，避免安装时踩坑。

**内容：**

**必装依赖表格（5 项）：**

| 依赖 | 版本要求 | 为什么需要 | 检查命令 | 安装方式 |
|------|---------|-----------|---------|---------|
| Python | ≥ 3.11 | Agent 核心运行时，使用了 match 语句、TaskGroup 等 3.11 新特性 | `python3 --version` | pyenv / brew install python@3.11 / apt install python3.11 |
| Node.js | v22 | 浏览器工具需要（网页浏览、截图、Playwright）。**不用浏览器功能可跳过** | `node --version` | nvm install 22 / brew install node@22 |
| Git | 任意 | 安装脚本通过 git clone 拉取代码 | `git --version` | 一般已预装 |
| ripgrep | 任意（可选） | `search_files` 工具的后端，没有它 fallback 到较慢的 Python 实现 | `rg --version` | brew install ripgrep / apt install ripgrep |
| ffmpeg | 任意（可选） | 语音消息的 TTS/STT 编解码，不用语音可跳过 | `ffmpeg -version` | brew install ffmpeg / apt install ffmpeg |

**平台兼容性：**
- macOS ✅
- Linux ✅
- WSL2 ✅
- Termux (Android) ⚠️ 部分功能受限（无浏览器工具、无 WhatsApp）
- **Windows 原生 ❌**（必须使用 WSL2）

**常见坑提醒（用 callout 样式）：**
- macOS 自带 Python 通常是 3.9（太旧），需要额外安装 3.11+
- Ubuntu 22.04 自带 3.10，差一个小版本，同样需要额外装
- 安装脚本会自动用 `uv python install 3.11` 尝试安装，但手动准备更稳

**交互组件：** 复用 `CheckList` 组件，每项带检查命令（可复制），勾选已安装项。底部显示就绪状态判定。

**末尾链接：** 无（直接进入下一节安装）

---

### 0.4 Installation（安装 Hermes）

**文件：** `src/sections/layer0/Installation.tsx`

**目的：** 从安装到验证成功的完整流程。

**内容结构：TabPanel 三个 tab**

#### Tab 1: 一键安装（推荐）

**安装命令：**
```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

**安装脚本做了什么（逐步说明，不只是"跑一下"）：**
1. 检测操作系统（Linux/macOS/Termux；Windows 重定向到 PowerShell 安装器）
2. 安装 `uv`（Astral 的快速 Python 包管理器）
3. 确保 Python 3.11 可用
4. 检查/安装 Git、Node.js v22
5. 安装系统包：ripgrep、ffmpeg
6. 克隆仓库到 `~/.hermes/hermes-agent/`（先试 SSH，失败回退 HTTPS）
7. 创建 Python 虚拟环境 `~/.hermes/hermes-agent/venv/`
8. `uv pip install -e ".[all]"`（可编辑安装，含所有 extras）
9. 安装 Node.js 依赖 + Playwright Chromium
10. 符号链接 `hermes` 到 `~/.local/bin/`
11. 创建 `~/.hermes/` 配置目录 + 复制示例配置文件
12. 创建 `~/.hermes/SOUL.md`
13. 同步内置 Skills

**安装脚本选项：**
| 选项 | 作用 |
|------|------|
| `--no-venv` | 跳过虚拟环境，使用系统 Python |
| `--skip-setup` | 跳过安装后的交互式 setup wizard |
| `--branch NAME` | 安装指定分支（默认 main） |
| `--dir PATH` | 自定义安装目录（默认 `~/.hermes/hermes-agent/`） |

**Terminal 动画：** 展示安装过程（curl → 依赖检测 → 克隆 → 安装 → 完成）

#### Tab 2: 开发者安装

```bash
git clone https://github.com/NousResearch/hermes-agent.git
cd hermes-agent
curl -LsSf https://astral.sh/uv/install.sh | sh
uv venv venv --python 3.11
source venv/bin/activate
uv pip install -e ".[all,dev]"
```

什么时候用：想看源码、提 PR、调试内部逻辑、跑测试（`python -m pytest tests/ -q`）

#### Tab 3: Termux (Android)

- 使用 `.[termux]` extra，排除不兼容的语音依赖
- 浏览器工具和 WhatsApp 工具不可用
- 其他功能正常

#### 安装后验证（通用，在 TabPanel 外）

```bash
source ~/.bashrc          # 或 source ~/.zshrc，刷新 PATH
hermes --version          # 应显示 v0.9.0
which hermes              # 应显示 ~/.local/bin/hermes
hermes doctor             # 诊断所有依赖和配置状态
```

Terminal 动画展示验证命令 + 期望输出。

#### 故障排查

| 问题 | 原因 | 解决 |
|------|------|------|
| `command not found: hermes` | PATH 没刷新 | `source ~/.bashrc` 或 `export PATH="$HOME/.local/bin:$PATH"` |
| 权限错误 | `~/.local/bin` 权限不对 | `chmod 755 ~/.local/bin/hermes` |
| Python 版本不匹配 | uv 没自动安装 3.11 | `uv python install 3.11` 手动安装 |
| clone 失败 | 网络问题或 SSH 未配置 | 安装脚本会自动回退 HTTPS，或手动设代理 |

#### 更新和卸载

- 更新：`hermes update`（拉取最新代码 + 重新安装，保留你的配置和记忆）
- 卸载：`rm -rf ~/.hermes ~/.local/bin/hermes`
- OpenClaw 迁移：`hermes claw migrate`（导入设置、记忆、Skills、API Keys）

**交互组件：** TabPanel + Terminal 动画

**末尾链接：** ExtendedReading → Hermes Agent GitHub 仓库

---

### 0.5 API Keys（获取 API Key）

**文件：** `src/sections/layer0/ApiKeys.tsx`

**目的：** 帮读者选对 provider、拿到 key、配好 .env。

**内容结构：**

#### 决策树：该选哪个 Provider？

用 CardGrid 展示 5 种选择路径：

| 你的情况 | 推荐 Provider | 理由 |
|---------|--------------|------|
| 🚀 就想快速试试 | **OpenRouter** | 一个 key 用 200+ 模型，按量付费，注册即用，有 $1 免费额度 |
| 🧠 要最好的质量 | **Anthropic** 或 **Google** 直连 | Claude / Gemini 直连，延迟最低，质量最好 |
| 💰 想免费用 | **Google AI Studio** 或 **Ollama** | Google 有免费额度；Ollama 跑本地开源模型完全免费（需 GPU） |
| 🇨🇳 国内模型 | **智谱 GLM / Kimi / MiniMax** | 国内访问快，中文优化好 |
| 🔒 注重隐私 | **Ollama + 本地模型** | 数据不出本机，完全离线可用 |

#### 费用参考

| Provider | 模型 | 价格（每百万 token） | 一次普通对话（~5K tokens）约 |
|----------|------|-------------------|--------------------------|
| Anthropic | Claude Opus | ~$15 | ¥0.5 |
| Anthropic | Claude Haiku | ~$0.25 | ¥0.01 |
| Google | Gemini Flash | 有免费额度 | 免费 |
| OpenRouter | 取决于模型 | 略有加价 | 因模型而异 |
| Ollama | 本地模型 | 免费 | 免费（电费除外） |

*以上为粗略估算，实际费用取决于对话长度、input/output token 比例和汇率。详细价格请查看各 provider 官网。*

提示：开启 Smart Model Routing 后日常使用可省 70-80%（简单问题用便宜模型）

#### 获取步骤（TabPanel，3 个 tab）

**Tab: OpenRouter**
1. 打开 openrouter.ai → 注册账号
2. Dashboard → API Keys → Create Key
3. 复制 key

**Tab: Anthropic**
1. 打开 console.anthropic.com → 注册
2. API Keys → Create Key
3. 复制 key

**Tab: Google AI Studio**
1. 打开 aistudio.google.com
2. 点击 "Get API key"
3. 复制 key

#### 配置到 .env

文件位置：`~/.hermes/.env`（安装脚本已创建）

CodeBlock 展示 .env 格式：
```bash
# === LLM Provider（至少选一个） ===
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxx

# === 或者直连 Provider ===
# ANTHROPIC_API_KEY=sk-ant-xxxxxxxx
# GOOGLE_API_KEY=AIzaxxxxxxxx

# === 工具类 API Key（可选，增强能力） ===
# EXA_API_KEY=              # 高质量网页搜索
# FIRECRAWL_API_KEY=        # 网页抓取和内容提取
# FAL_KEY=                  # AI 图片生成
```

#### 数据隐私说明（callout）

- OpenRouter：消息经 OpenRouter 服务器中转到模型 provider
- Anthropic/Google 直连：消息直接到 provider 服务器
- Ollama 本地模型：数据完全不出本机
- 所有 provider 都有各自的数据使用政策，敏感数据建议用本地模型

#### 安全提醒（callout）

`.env` 包含你的 API 密钥 = 你的钱。不要分享、不要提交到 git、不要截图发群里。

**交互组件：** **EnvBuilder**（新组件）— 左侧 checkbox grid 勾选你有的 provider → 右侧实时生成 `.env` 文件内容 → 复制按钮

**末尾链接：** ExtendedReading → 各 provider 官方定价页面（OpenRouter pricing, Anthropic pricing, Google AI pricing）

---

### 0.6 First Conversation（首次启动 & 第一次对话）

**文件：** `src/sections/layer0/FirstConversation.tsx`

**目的：** 读者第一次启动 hermes 的完整体验。

**内容结构：**

#### Part 1: Setup Wizard

首次运行 `hermes` 时自动触发 setup wizard。Terminal 动画完整展示：

```
$ hermes
✨ Welcome to Hermes Agent!
   Let's set up your agent in a few steps.

? Choose your LLM provider:
  ❯ OpenRouter (200+ models, recommended)
    Anthropic (Claude)
    Google (Gemini)
    Local (Ollama)
    
? Choose your default model:
  ❯ anthropic/claude-sonnet-4 (balanced)
    anthropic/claude-opus-4 (most capable)
    google/gemini-2.5-flash (fast & cheap)

✔ Configuration saved to ~/.hermes/config.yaml
✨ Setup complete! Type your first message below.
```

说明：setup wizard 会检测你在 `.env` 中配了哪些 key，只显示对应的 provider。不需要提前手动编辑 config.yaml。

如果已经运行过，可以用 `hermes setup` 重新进入 wizard。

**⚠️ 实现注意：** 上述 wizard 流程是推断的。实现时需运行 `hermes setup` 捕获实际 wizard 输出，以此为准制作 Terminal 动画内容。

#### Part 2: 第一次对话 Demo

Terminal 动画：
```
💬 Hermes Agent v0.9.0 — Type your message or /help

> 帮我搜一下 MCP 协议是什么，整理成笔记保存

🔍 [web_search] Searching: "MCP Model Context Protocol"...
📝 [write_file] Saving to ~/notes/mcp-overview.md
📄 [read_file] Reading saved note for verification...

MCP (Model Context Protocol) 是 Anthropic 提出的开放协议...
（笔记已保存到 ~/notes/mcp-overview.md）
```

重点用注释说明：**看到了吗？它不只是回答问题，还自动搜了网页、写了文件。这就是 Agent 和 Chatbot 的区别。**

#### Part 3: 你需要知道的命令

**对话内斜杠命令（CardGrid）：**

| 命令 | 作用 |
|------|------|
| `/help` | 查看所有可用命令 |
| `/model` | 切换模型（对话中途也能换） |
| `/tools` | 查看当前可用工具列表 |
| `/memory` | 查看 Agent 记住了什么关于你的信息 |
| `/clear` | 清空当前对话上下文 |
| `Ctrl+C` | 退出 Hermes |

**CLI 子命令（CardGrid）：**

| 命令 | 作用 |
|------|------|
| `hermes setup` | 重新运行 setup wizard |
| `hermes model` | 交互式选择/切换模型 |
| `hermes tools` | 配置工具开关 |
| `hermes config set <key> <value>` | 修改单个配置项 |
| `hermes doctor` | 诊断依赖和配置问题 |
| `hermes update` | 更新到最新版 |
| `hermes gateway setup` | 配置消息平台（见 0.10） |

**交互组件：** Terminal 动画（setup wizard + 对话 demo），CardGrid 命令速查

**末尾链接：** ExtendedReading → Hermes Agent 官方文档 CLI 部分

---

### 0.7 Directory Structure（目录结构一览）

**文件：** `src/sections/layer0/DirectoryStructure.tsx`

**目的：** 第一次对话后 `~/.hermes/` 已经有内容了，现在解释每个文件/目录是什么。

**内容结构：**

#### 交互式目录树

用嵌套的 FoldPanel 展示，颜色区分三类：

```
~/.hermes/
├── 🟢 config.yaml          主配置文件（你编辑）
├── 🟢 .env                 API Keys（你编辑）
├── 🟢 SOUL.md              Agent 人格定义（你编辑）
├── 🔵 MEMORY.md            Agent 的长期记忆（Agent 自动维护）
├── 🔵 USER.md              Agent 对你的理解和画像（Agent 自动维护）
├── 🟢 AGENTS.md            项目级指令（你编辑，可选）
├── ⚙️ hermes-agent/        程序本体
│   ├── venv/               Python 虚拟环境
│   └── ...                 源代码
├── 🔵 skills/              已学习的技能文件
├── 🔵 memories/            SQLite FTS5 记忆数据库（会话搜索用）
├── 🔵 sessions/            对话历史记录
├── 🔵 logs/                运行日志
├── 🟢 cron/                定时任务配置（你编辑）
├── 🟢 hooks/               Hook 脚本（你编辑）
├── 🔵 image_cache/         图片缓存
├── 🔵 audio_cache/         音频缓存
├── 🔵 pairing/             设备配对信息
└── 🔵 whatsapp/session/    WhatsApp 会话数据
```

**图例：** 🟢 你编辑的 · 🔵 Agent/系统自动管理 · ⚙️ 安装程序管理

#### 关键文件说明

| 文件 | 说明 |
|------|------|
| config.yaml | 所有配置的总入口，下一节详细讲 |
| .env | API 密钥，安装时从 `.env.example` 复制而来 |
| SOUL.md | Agent 的人格定义，0.9 节详细讲 |
| MEMORY.md | Agent 观察到的你的偏好和习惯，它会自己更新。你可以看、可以改、可以删 |
| USER.md | Agent 对你这个人的理解（职业、技能、喜好），自动维护 |
| skills/ | Agent 学到的可复用能力。有些自动创建，你也可以手写 |
| memories/ | SQLite FTS5 数据库，用于跨会话搜索相关上下文 |

#### 备份建议（callout）

**更新前务必备份这些：** `config.yaml`, `.env`, `SOUL.md`, `skills/`, `memories/` — 这些是你的数据。

**可以安全删除的：** `sessions/`（对话历史，可再生）、`logs/`、`image_cache/`、`audio_cache/`

**交互组件：** FoldPanel 嵌套目录树，点击展开子目录，hover 每个节点显示说明 tooltip，颜色 badge 区分三类

**末尾链接：** ExtendedReading → Layer 1 记忆系统、Skills 系统

---

### 0.8 Config Essentials（常用配置场景）

**文件：** `src/sections/layer0/ConfigEssentials.tsx`

**目的：** 不讲"config.yaml 有什么字段"，讲"你想做什么，改哪里"。

**内容结构：** 6 个场景卡片 + config.yaml 实时预览

#### 场景 1："我想换个模型"

**两种方式：**
- 方式 A（推荐）：`hermes model` 交互式选择，最简单
- 方式 B：编辑 `~/.hermes/config.yaml`

```yaml
model:
  default: "anthropic/claude-sonnet-4"  # 改这里
  provider: "openrouter"                   # 和这里
```

provider 设为 `auto` 时根据 .env 中可用的 key 自动选择。

#### 场景 2："太贵了，怎么省钱"

开启 Smart Model Routing：简单对话自动用便宜模型，复杂任务才用贵的。

```yaml
smart_model_routing:
  enabled: true
  cheap_model: "anthropic/claude-haiku"      # 简单问题
  expensive_model: "anthropic/claude-sonnet-4" # 复杂问题
```

实际效果：Claude Opus ~$15/M tokens，Haiku ~$0.25/M tokens。开启后日常使用省 70-80%。

#### 场景 3："怕它搞坏我的电脑"

默认 `terminal.backend: local` — Agent 直接在你的机器上执行命令，**包括危险命令**。

**方案 A：换 Docker（推荐）**
```yaml
terminal:
  backend: "docker"
  docker:
    image: "hermes-sandbox:latest"
    volumes:
      - "~/workspace:/workspace"    # 只挂载你允许它访问的目录
```
Agent 在容器里跑，炸了重建就行，你的系统不受影响。

**方案 B：关掉危险工具**
```yaml
platform_toolsets:
  cli:
    execute_code: false    # 禁止执行代码
    # 其他工具保持默认
```

#### 场景 4："它老是记些奇怪的东西"

```yaml
memory:
  enabled: true            # 关掉就完全不记忆
  nudge_interval: 5        # 每 5 轮对话检查一次是否需要更新记忆
  char_limit: 4000         # MEMORY.md 最大字符数
```

- `nudge_interval` 太小 = 频繁打断对话节奏去更新记忆
- `nudge_interval` 太大 = 记不住你的偏好
- 你随时可以直接编辑 `~/.hermes/MEMORY.md`，删掉不想让它记住的

#### 场景 5："对话太长它就变傻了"

上下文窗口满了 Agent 会自动压缩历史消息：

```yaml
compression:
  threshold: 0.50          # 到 50% token 上限时触发压缩
  ratio: 0.30              # 压缩后保留 30% 的内容
  protected_messages: 4    # 最近 4 轮对话不被压缩
```

- threshold 太低 = 压缩太早，浪费上下文空间
- threshold 太高 = 快满了才压缩，来不及时可能截断
- ratio 太小 = 压缩太狠，丢失重要上下文
- 默认值适合大多数场景，一般不需要改

#### 场景 6："有些工具我不想让它用"

按平台单独配置工具开关：

```yaml
platform_toolsets:
  cli:
    web_search: true
    execute_code: true
    send_message: false      # CLI 下关掉，防止 Agent 自作主张发消息
  telegram:
    execute_code: false      # Telegram 上关掉代码执行（远程太危险）
    web_search: true
```

也可以用 `hermes tools` 命令交互式配置。

**⚠️ 实现注意：** 所有 config.yaml 字段名需对照 hermes-agent 仓库中的 `cli-config.yaml.example` 逐一验证。上述片段中的字段名（如 `smart_model_routing.cheap_model`、`compression.protected_messages`、`platform_toolsets.cli.execute_code`）是基于调研推断的，可能与实际不符。

**交互组件：** **ConfigExplorer**（新组件）— 左栏 6 张场景卡片（标题是问句），点击展开配置方法 + config 片段 + 说明。右栏固定显示 config.yaml 预览，选中场景时对应区域高亮。**移动端（<768px）**改为纵向堆叠：场景卡片在上，展开时内联显示 config 片段，隐藏右栏预览。

**末尾链接：** ExtendedReading → 附录 config.yaml 完整速查（`appendix-config`）

---

### 0.9 SOUL.md Intro（SOUL.md 人格定制）

**文件：** `src/sections/layer0/SoulMdIntro.tsx`

**目的：** 理解 SOUL.md 是什么、怎么写、写好写坏差别多大。

**内容结构：**

#### SOUL.md 是什么

SOUL.md 是 Agent 每次对话系统提示词的第一层。它定义的不是 Agent 知道什么，而是 Agent **是谁** — 回答风格、思维方式、行为准则。

文件位置：`~/.hermes/SOUL.md`，安装时自动创建。

#### 3 个模板对比（TabPanel，3 个 tab）

**Tab 1: 专业技术助手**
```markdown
# SOUL

You are a senior software engineer assistant.

## Style
- Be concise and direct. No fluff.
- Code first, explanation second.
- Use Chinese for conversation, English for code comments and technical terms.

## Rules
- Always show the command before explaining what it does.
- When uncertain, say so explicitly.
- Never make up URLs or version numbers.
```

**Tab 2: 日常伙伴**
```markdown
# SOUL

You are a friendly and patient personal assistant.

## Style
- Warm and approachable tone.
- Use analogies to explain complex concepts.
- Break down steps clearly, assume no prior knowledge.
- Use Chinese throughout, including explanations.

## Rules  
- Always ask before taking actions that modify files.
- Offer multiple options when there's no clear best choice.
- Celebrate small wins with the user.
```

**Tab 3: 研究助理**
```markdown
# SOUL

You are a meticulous research assistant.

## Style
- Structured output: use headers, bullet points, tables.
- Always cite sources with URLs.
- Present multiple perspectives on controversial topics.
- Academic Chinese with technical precision.

## Rules
- Distinguish between facts and opinions explicitly.
- When web search results conflict, note the discrepancy.
- Proactively suggest related topics worth exploring.
```

**每个 tab 下方：** 用并排 CodeBlock 展示"同一个问题在不同人格下的回答对比"，让读者直观感受差异。

示例问题："什么是 Docker？"
- 技术助手："Docker 是容器引擎。`docker run -it ubuntu bash` 启动一个容器。"
- 日常伙伴："你可以把 Docker 想象成一个'虚拟小房间'……"
- 研究助理："Docker 是一个开源容器化平台（Merkel, 2014）。从技术架构看……"

#### 实用建议（callout）

- 控制在 **500 token 以内** — SOUL.md 在每条消息里都被注入，太长 = 每次对话都多花钱
- **越具体越好** — "用中文回答，代码注释用英文" 比 "be helpful" 有用一百倍
- 随时改随时生效，不需要重启 hermes
- 没灵感？先用默认的，用几天后根据实际不满意的地方修改

#### SOUL.md vs config.yaml personality

- `config.yaml` 的 `agent.personality` 是预设快捷方式（一个词切换风格）
- SOUL.md 是自由格式 markdown，完全控制
- 两者可以同时用，SOUL.md 优先级更高
- Layer 0 推荐用 SOUL.md（更灵活），config personality 在 Layer 1 详细讲

**交互组件：** TabPanel 切 3 个模板

**末尾链接：** ExtendedReading → Layer 1 SOUL.md 人格塑造（`soul-md`）深度定制

---

### 0.10 Connect Platform（连接消息平台）

**文件：** `src/sections/layer0/ConnectPlatform.tsx`

**目的：** CLI 跑通后，接入手机/IM 平台，让 Agent 随时可用。

**内容结构：**

#### 开篇

Hermes 支持 18+ 消息平台。你不需要全部接入，选你最常用的一个就够。

**关键概念：** 用 `hermes gateway setup` 配置平台，用 `hermes gateway run` 启动。所有已配置的平台会同时运行。

#### 4 个平台教程（TabPanel，4 个 tab）

**Tab 1: Telegram（最推荐入门）**

1. 打开 Telegram → 搜索 `@BotFather` → 发送 `/newbot`
2. 按提示起名 → 拿到 Bot Token（格式 `123456:ABC-DEF...`）
3. 获取你的 User ID：搜索 `@userinfobot` → 发送任意消息 → 它回复你的数字 ID
4. 编辑 `~/.hermes/.env`，添加：
```bash
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_ALLOWED_USERS=你的数字ID
```
5. 运行配置向导：`hermes gateway setup`（选择 Telegram，确认配置）
6. 启动：`hermes gateway run`
7. 手机上找到你的 bot → 发消息 → 验证收到回复

Terminal 动画展示完整流程。

**Tab 2: Discord**

1. 打开 Discord Developer Portal (discord.com/developers) → New Application
2. 左侧 Bot → Add Bot → Copy Token
3. 左侧 Bot → 打开 Privileged Gateway Intents 下的 **Message Content Intent**
4. 左侧 OAuth2 → URL Generator → 勾选 `bot` scope + `Send Messages`/`Read Messages` → 复制邀请链接 → 邀请到你的服务器
5. 编辑 `~/.hermes/.env`：
```bash
DISCORD_BOT_TOKEN=你的bot token
DISCORD_ALLOWED_USERS=你的Discord用户ID或用户名
```
6. `hermes gateway setup` → 选 Discord
7. `hermes gateway run`

**Tab 3: 飞书 (Lark)**

1. 打开飞书开放平台 (open.feishu.cn) → 创建企业自建应用
2. 获取 App ID 和 App Secret
3. 配置应用能力 → 添加机器人
4. 选择连接模式（WebSocket 推荐，无需公网 IP）
5. 编辑 `~/.hermes/.env`：
```bash
FEISHU_APP_ID=cli_xxxxxxxx
FEISHU_APP_SECRET=xxxxxxxx
FEISHU_CONNECTION_MODE=websocket      # 或 webhook
FEISHU_ALLOWED_USERS=你的飞书用户ID
```
6. `hermes gateway setup` → 选 Feishu
7. `hermes gateway run`

**Tab 4: 微信**

hermes-agent 支持三种微信接入方式：

| 方式 | 适合 | 限制 |
|------|------|------|
| **企业微信 AI Bot** | 企业内部使用 | 需要企业微信管理员权限 |
| **企业微信自建应用** | 企业正式部署 | 需要配置回调地址（公网 IP） |
| **个人微信（iLink Bot）** | 个人使用 | 依赖第三方 iLink Bot API，稳定性受限 |

推荐从企业微信 AI Bot 开始（最简单），配置 `.env`：
```bash
WECOM_CORP_ID=你的企业ID
WECOM_BOT_SECRET=你的bot secret
WECOM_ALLOWED_USERS=用户ID
```

个人微信方式另有社区项目 HermesClaw (github.com/AaronWong1999/hermesclaw) 提供桥接。

#### ⚠️ 安全重点（callout，红色警告风格）

**`ALLOWED_USERS` 必须配置！**

不配 = 任何人都能：
- 跟你的 Agent 聊天
- 消耗你的 API 额度（= 花你的钱）
- 让 Agent 在你的机器上执行命令（如果 terminal backend 是 local）

每个平台都有自己的 `*_ALLOWED_USERS` 变量。也可以设置全局 `GATEWAY_ALLOW_ALL_USERS=true` 打开（**强烈不推荐**）。

#### 后台运行

Agent 需要持续运行才能接收消息。几种方案：

**方案 A: hermes 自带服务管理（推荐）**
```bash
hermes gateway install    # 安装为系统服务（systemd/launchd）
hermes gateway start      # 启动服务
hermes gateway status     # 查看状态
hermes gateway stop       # 停止
hermes gateway uninstall  # 卸载服务
```

**方案 B: tmux/screen（临时用）**
```bash
tmux new -s hermes
hermes gateway run
# Ctrl+B D 断开（Agent 继续运行）
# tmux attach -t hermes 重新连接
```

#### 多平台同时运行

不需要特殊命令。配置好多个平台的 env 变量后，`hermes gateway run` 自动检测并同时启动所有已配置的平台。

**交互组件：** TabPanel（4 平台）+ Terminal 动画 + TryItBox "选一个你常用的平台，现在就接上去"

**末尾链接：** ExtendedReading → Layer 1 消息平台完整列表（`messaging-platforms`）

---

### 0.11 Architecture — 保留现有 ArchitectureOverview.tsx 不动，编号变更

---

## 四、新增交互组件

### 4.1 EnvBuilder（用于 0.5 API Keys）

**文件：** `src/playgrounds/EnvBuilder.tsx`

**功能：** 勾选 provider → 生成 .env 内容 → 复制

**界面：**
- 左侧：checkbox grid，每个 provider 一张小卡片（logo + 名称 + 一句话说明）
- 分组：LLM Providers / Tool APIs / 其他
- 右侧：实时预览的 CodeBlock，显示根据勾选生成的 .env 文件内容
- 底部：复制按钮

**Provider 列表：**
- LLM: OpenRouter, Anthropic, Google/Gemini, 智谱GLM, Kimi, MiniMax, Hugging Face, Ollama (local)
- Tools: Exa (web search), Firecrawl (web crawl), fal.ai (image gen), Honcho (user modeling)

注：Nous Portal OAuth (`hermes login`) 是命令行 OAuth 流程，不是 env 变量，不放在 checkbox 中。在 0.5 正文里单独提一句作为替代方案。

**交互逻辑：**
- 勾选 provider → 对应的 `KEY=` 出现在右侧预览
- 每个 key 有 placeholder 提示（如 `sk-or-v1-your-key-here`）
- 复制按钮一键复制整个 .env 内容

### 4.2 ConfigExplorer（用于 0.8 Config Essentials）

**文件：** `src/playgrounds/ConfigExplorer.tsx`

**功能：** 场景卡片 + config.yaml 实时预览高亮

**界面：**
- 左栏（~40%）：6 张场景卡片纵向排列
  - 每张卡片标题是问句（"太贵了？"、"怕搞坏电脑？"）
  - 点击展开：配置方法文字说明 + 具体 config 片段
  - 同时只展开一张（accordion 模式）
- 右栏（~60%）：固定的 config.yaml 完整预览（CodeBlock）
  - 选中场景时，对应的 YAML 行高亮（背景色变化 + 左侧色条）
  - 未选中时显示完整默认配置，弱化颜色

**高亮逻辑：**
- 场景 1 选中 → 高亮 `model:` 段
- 场景 2 选中 → 高亮 `smart_model_routing:` 段
- 场景 3 选中 → 高亮 `terminal:` 段
- 场景 4 选中 → 高亮 `memory:` 段
- 场景 5 选中 → 高亮 `compression:` 段
- 场景 6 选中 → 高亮 `platform_toolsets:` 段

---

## 五、App.tsx 变更

1. 删除 `QuickStart` 的 import 和使用
2. 新增 7 个 section 组件的 import
3. 按新顺序排列 Layer 0 section 组件
4. ArchitectureOverview 位置移到 ConnectPlatform 之后

---

## 六、TypewriterTitle 编号更新

所有现有 section 中使用 TypewriterTitle 的 `text` prop 需要更新编号：
- ArchitectureOverview: "0.4 架构鸟瞰" → "0.11 架构鸟瞰"

---

## 七、与其他 Layer 的衔接

每个新增 section 末尾都通过 ExtendedReading 组件链接到相关的深入内容：

| Section | 链接到 |
|---------|--------|
| 0.4 Installation | GitHub 仓库 |
| 0.5 API Keys | 各 provider 定价页 |
| 0.6 First Conversation | 官方文档 CLI 部分 |
| 0.7 Directory Structure | Layer 1: 记忆系统、Skills 系统 |
| 0.8 Config Essentials | 附录: config.yaml 完整速查 |
| 0.9 SOUL.md Intro | Layer 1: SOUL.md 人格塑造 |
| 0.10 Connect Platform | Layer 1: 消息平台完整列表 |

---

## 八、不变的部分

- `src/sections/layer0/WhatIsHermes.tsx` — 仅改 TypewriterTitle subtitle（"5 分钟建立直觉" → "从零到跑通"）
- `src/sections/layer0/Comparison.tsx` — 不修改
- `src/sections/layer0/ArchitectureOverview.tsx` — 只改 TypewriterTitle 编号
- 所有其他 Layer (1/2/3)、Recipes、Ops、Appendix 的 section — 不修改
- 所有现有 UI 组件 — 不修改（只新增 EnvBuilder 和 ConfigExplorer）
- 整体布局（Header, Sidebar, Footer） — 不修改（Sidebar 内容随 navigation.ts 自动更新）
