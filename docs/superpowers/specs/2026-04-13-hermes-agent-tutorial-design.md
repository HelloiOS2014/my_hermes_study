# Hermes Agent 交互式教程 — 设计规格书

> 目标版本：hermes-agent v0.8.x | 最后更新：2026-04-13

---

## 1. 项目概述

### 1.1 目标

为 NousResearch hermes-agent 创建一篇**交互式 Playground 教程**，覆盖从「5 分钟上手」到「fork 改核心」的完整路径。教程面向中文社区，以实操为主线、架构分析穿插其中，融合社区优秀实践。

### 1.2 受众

- **AI 爱好者 / 折腾党**：想快速搭建个人 Agent 并通过消息平台日常使用
- **技术开发者**：想深入理解架构原理并基于源码做二次开发
- 教程采用四层渐进结构，每层独立可停，读者按需选择深度

### 1.3 交付形式

- **单页 React Web App**，暗色「工作台」风格
- **选择性使用 Remotion** 动画（仅 2 处），其余用 CSS 动画
- 部署到 **GitHub Pages**
- 语言：**中文为主**，专业术语保留英文（Agent Loop、Skills、Memory 等）

### 1.4 技术栈

| 层 | 选型 | 理由 |
|----|------|------|
| 框架 | React 19 + Vite | 与 Remotion 生态一致，组件可复用 |
| 样式 | Tailwind CSS | utility-first 适合暗色主题，减少自定义 CSS 量 |
| 动画 | CSS @keyframes + Intersection Observer | 轻量、尊重 prefers-reduced-motion |
| 视频 | @remotion/player（内嵌播放） | 缩略图按需加载 |
| 代码高亮 | Shiki（通过 @shikijs/transformers） | 构建时高亮，零运行时成本，主题与暗色调一致 |
| 部署 | gh-pages / GitHub Actions | 静态产物直推 |
| GitHub 仓库 | panghu/my_hermes_study (GitHub Pages) | 现有仓库，启用 Pages |
| Remotion 项目 | /Users/panghu/code/Tool/remotion | 已有环境，复用 |

> **实现注意**：前端页面实现阶段使用 `frontend-design` skill 确保设计质量。

---

## 2. 视觉设计

### 2.1 色调

```
主背景:     #0d1117  (GitHub Dark)
内容区:     #161b22
卡片/面板:  #1c2128
主文字:     #e6edf3
次要文字:   #8b949e
强调色:     #58a6ff  (链接/交互)
成功色:     #3fb950
警告色:     #d29922
错误色:     #f85149
代码块底:   #0d1117 + 左侧彩色竖条区分语言
```

### 2.2 布局

**桌面端 (≥1024px)**：
```
┌──────────────────────────────────────────────────┐
│  Header: Logo + 标题 + GitHub Star + v0.8.x 标注  │
├────────┬─────────────────────────────────────────┤
│        │                                         │
│  Nav   │   Main Content (max-width: 860px)       │
│  固定   │   ┌──────────────────────────────────┐  │
│  240px │   │ 叙述段 (What → How → Why)        │  │
│        │   ├──────────────────────────────────┤  │
│  四层   │   │ Playground / 动画 / 交互组件      │  │
│  分组   │   ├──────────────────────────────────┤  │
│  +菜谱  │   │ "试试看" 提示框 / 延伸阅读       │  │
│  +运维  │   └──────────────────────────────────┘  │
│  +附录  │                                         │
├────────┴─────────────────────────────────────────┤
│  Footer: GitHub / 官方文档 / 社区链接             │
└──────────────────────────────────────────────────┘
```

**移动端 (<1024px)**：Nav 收为顶部汉堡菜单，内容单列满宽。

### 2.3 排版

- 标题：`Inter` 或 `Space Grotesk`（无衬线，现代感）
- 正文/代码：`JetBrains Mono` 或 `Fira Code`（终端气质）
- 行高 1.7，段间距 1.5em，代码块行高 1.5

### 2.4 章节过渡

四个大 Layer 入口处触发 CSS 打字机动画：光标闪烁 → 逐字打出章节标题 → 内容淡入。其余小节使用简单的 `fadeInUp` 进入动画（Intersection Observer 触发）。

---

## 3. 内容结构

### 3.0 写作原则

每个特性的讲解遵循 **What → How → Why** 三段式：
- **What**：这是什么，解决什么问题
- **How**：怎么配置/使用，附代码示例
- **Why**：为什么这样设计（设计决策的思考）

每节末尾附**延伸阅读**，链接到社区博文/官方文档。

区分 **"观看演示"** 和 **"动手试试"**：
- 演示用模拟终端/动画展示
- 动手用绿色提示框：「现在打开你的终端，运行 `hermes ...`」

### Layer 0：初见 — 5 分钟建立直觉

**目标**：让读者「哇，这东西好酷」然后立刻上手体验。不做深度技术科普。

#### 0.1 What is Hermes Agent?

- 一句话定位：自进化的个人 AI Agent 框架
- 核心能力矩阵：47+ 工具 / 20+ 平台 / 多模型 / 自学习
- 社区评价引用（平衡视角）：
  - 正面：「the agent that grows with you」
  - 理性：DEV Community honest review 的关键观点——Skills 本质是结构化 prompt injection with CRUD
- **交互**：Remotion 概览视频（~30s），展示 Agent 从安装到对话到学习的完整画面

#### 0.2 和其他框架有什么不同

- 定位图：Hermes Agent 在 agent 生态中的位置
  - LangGraph = 编排框架（状态机）
  - CrewAI = 团队协作框架（角色分工）
  - AutoGen = 对话式多 Agent（辩论）
  - Hermes Agent = 个人持久化 Agent（自进化）
- 不是全面评测，而是「什么场景选它」
- **交互**：交互对比卡片（hover/click 翻转展示差异）

#### 0.3 安装 + 第一次对话

- Quick install（curl）+ Developer setup（git clone + uv）
- 安装完立刻进入第一次对话：让 Agent 帮你搜索一个技术问题并写入文件
- 体验完整工具调用链：用户提问 → Agent 调 web_search → 调 write_file → 返回总结
- **交互**：模拟终端（逐字打字动画展示完整流程）+ 绿色「动手试试」提示框

#### 0.4 架构鸟瞰

- 此时读者已经有了体感，回头看架构才有意义
- 五大模块：Agent Core / Tools / Memory / Skills / Gateway
- 点击模块跳转到对应 Layer 的详细章节
- **交互**：SVG 交互架构图（hover 高亮模块 + tooltip 简介，click 跳转）

---

### Layer 1：上手 — 打造你的私人 Agent

**目标**：掌握所有使用层的定制手段，打造一个「懂你的」Agent。

#### 1.1 CLI 全景：hermes 的十八般武艺

- 逐一介绍核心子命令：`hermes`（对话）/ `model`（选模型）/ `tools`（配工具）/ `setup`（向导）/ `doctor`（诊断）/ `gateway`（消息网关）/ `profile`（多身份）/ `update`（升级）
- 这是后续所有章节的入口地图
- **交互**：命令卡片网格（点击展开看说明和示例）

#### 1.2 选模型 + Smart Routing + 成本控制

- **What**：Provider 接入（OpenRouter/OpenAI/Anthropic/本地模型）
- **How**：config.yaml 中 provider/model 配置，API key 管理
- Smart Model Routing：cheap model（简单任务）vs strong model（复杂推理）自动切换
- 成本控制：API 限额设置、Credential Pool（多 key 轮转）
- **Why**：为什么要双模型路由？（80% 的交互不需要 frontier model，省 10x 费用）
- **交互**：**config.yaml 构建器**（勾选 provider / 选模型 / 开关 routing → 实时生成配置，可 copy）

#### 1.3 塑造人格 — SOUL.md

- **What**：Agent 身份定义文件，始终注入 system prompt 的第一层
- **How**：写好 SOUL.md 的原则：简洁、具体、有性格。多个示例模板（助手型/极客型/严肃型）
- 展示 SOUL.md 在 10 层 prompt 组装中的位置
- **Why**：为什么用 frozen snapshot 而不是实时更新？（prefix caching 优化——system prompt 稳定才能让 LLM provider 缓存 prefix）
- **交互**：**Prompt 组装可视化器**（左侧分栏填写 SOUL.md / MEMORY.md / USER.md / AGENTS.md，右侧实时拼出完整 System Prompt，显示 10 层组装顺序和估算 token 数）

#### 1.4 项目上下文 — AGENTS.md / .cursorrules / HERMES.md

- **What**：项目级配置文件，让 Agent 理解当前项目的约定
- **How**：文件放在项目根目录，Agent 启动时自动加载
- AGENTS.md 示例：编码规范、技术栈说明、常见命令
- **Why**：为什么有 prompt injection 扫描？（防止恶意仓库通过 context 文件劫持 Agent）
- **交互**：文件对比面板（空白项目 vs 配置后的项目，差异高亮）

#### 1.5 记忆系统全貌

- **What**：四层记忆架构
  1. **MEMORY.md**（2200 char）：Agent 的个人笔记
  2. **USER.md**（1375 char）：Agent 对用户的认知
  3. **Session Search**（SQLite + FTS5）：跨 session 全文搜索，LLM 摘要后注入
  4. **Honcho**（可选）：12 维度辩证式用户画像建模
- **How**：
  - memory 工具的使用方式
  - Session Search 的触发条件和搜索语法
  - Honcho 的开启/配置（默认关闭）
  - Memory nudge 机制（固定轮次后提醒 Agent 审视记忆）
- **Why**：
  - 为什么 Honcho 默认关闭？（社区反馈：功能不够成熟，多数用户感到困惑）
  - 为什么 frozen snapshot？（同 1.3 的 prefix caching 解释，这里深入到实现细节）
- 引用 Substack「Inside Hermes Agent」文章的记忆架构分析
- **交互**：
  - **记忆生命周期沙盒**（输入一条 memory → 看它存到 MEMORY.md → 看下次 session 加载 → 看 frozen snapshot 注入 prompt → 看 nudge 触发更新）
  - **CSS 四层记忆流动画**（数据从各层流入 system prompt 的动态过程）

#### 1.6 Skills 系统

- **What**：程序化记忆——Agent 从经验中创建的可复用指令
- **How**：
  - `skills_list` / `skill_view` 的两级披露机制
  - 浏览/安装/使用内置 Skills（25+ 类别）
  - 自动创建触发条件：5+ tool calls / error recovery / 用户纠正
  - SKILL.md 格式（agentskills.io 标准）
- **Why**：为什么 Skills 是 markdown 而非代码？（LLM 原生可读，零序列化成本，任何模型都能理解）
- 引用 BSWEN「Does Hermes AI Overwrite Your Manual Skill Edits?」讨论 + 社区防覆盖策略
- **交互**：
  - Skill 卡片墙（25+ 类别分类浏览，点击展开 SKILL.md 预览）
  - **CSS Skill 生命周期动画**（经验积累 → 创建 → 存储 → 匹配检索 → 使用 → 改进 → 可能覆盖）

#### 1.7 工具箱导览：自助探索 47+ 工具

- **What**：47+ 内置工具按 Toolset 分组
- **How**：
  - `hermes tools` 命令查看可用工具
  - 工具 schema 怎么读（JSON Schema 结构）
  - 怎么看工具源码找可配选项
  - Toolset 组合与 enable/disable
- 分类展示（不逐一详解，教「怎么自己探索」）：
  - 终端 / 文件 / Web 搜索 / 浏览器自动化 / 视觉 / 图片生成 / TTS / Home Assistant / Memory / Skills / Delegate / PTC / MCP
- **交互**：
  - 分类折叠面板（每类展开看工具列表 + 简介）
  - **Tool Schema 设计器**（定义工具名/描述/参数 → 预览 JSON Schema + 在 Hermes XML `<tools>` 中的样子）

#### 1.8 安全体系

- 危险命令审批机制（destructive pattern matching + 用户确认）
- Prompt Injection 防御（context 文件和 memory 的注入扫描）
- Credential 管理（`~/.hermes/.env` + `chmod 600`）
- Credential Pool（多 API key 轮转）
- 路径安全（敏感系统路径写入阻止）
- URL 安全验证
- **交互**：安全检查清单（checkbox 风格，自测清单）

#### 1.9 消息平台 + Gateway 基础

- 20+ 平台概览
- 四大主流平台详细教程（Tab 切换）：Telegram / Discord / 微信（WeChat）/ 飞书（Feishu）
- Gateway 工作原理简介：每平台一个 adapter → 消息路由 → 每消息创建 AIAgent 实例 → SQLite session 持续性
- 语音消息转录、媒体文件投递（MEDIA:/path 语法）
- 引用 Medium 完整部署指南
- **交互**：Tab 多平台配置步骤

#### 1.10 终端后端选型

- 6 种后端对比：

| 后端 | 适用场景 | 安全边界 | 成本 |
|------|---------|---------|------|
| local | 开发/个人 | 无隔离 | 免费 |
| Docker | 生产推荐 | 容器隔离 | 低 |
| SSH | 远程服务器 | 网络隔离 | 看服务器 |
| Modal | Serverless | 函数级隔离 | 按用量 |
| Daytona | 云开发环境 | Workspace 隔离 | 按用量 |
| Singularity | HPC 场景 | 用户级隔离 | 看集群 |

- 怎么配置每种后端
- **Why**：为什么需要这么多后端？（安全需求 × 部署场景 = 多种组合）
- **交互**：对比表（hover 高亮行）

---

### Layer 2：扩展 — 让 Agent 获得新能力

**目标**：掌握扩展手段，不 fork 源码就能给 Agent 加功能。

#### 2.1 写自定义 Tool

- **What**：3 文件修改法（内置 Tool）或 Plugin 法（无需 fork）
- **How**：完整流程
  1. 定义 schema（JSON Schema）
  2. 写 handler（必须返回 `json.dumps()` 字符串）
  3. 注册到 registry（`registry.register()`）
  4. 添加到 toolset
  5. **测试与调试**（这部分之前缺失）：
     - 如何验证 LLM 能正确调用工具
     - 参数传错的排查方法
     - 工具返回格式错误的表现和修复
     - 使用 `hermes doctor` 检查工具注册状态
- **Why**：为什么 handler 必须返回字符串？（LLM 消费的是文本，dict 会导致序列化问题）
- **交互**：**三栏代码 Playground**（schema / handler / toolsets.py 修改，每栏可编辑，带语法高亮）

#### 2.2 Plugin Hooks（轻量扩展点）

- **What**：不需要写完整 Plugin，只用 hooks 就能拦截/增强行为
- **How**：
  - `pre_tool_call`：工具调用前拦截（日志/审批/参数修改）
  - `post_tool_call`：工具调用后处理（结果过滤/统计）
  - `pre_llm_call`：LLM 调用前注入上下文
  - `on_session_start`：session 启动时初始化
- 每个 hook 附完整代码示例
- **交互**：代码示例 + 效果说明面板

#### 2.3 写完整 Plugin（不 fork）

- **What**：完整的 Plugin 四件套
- **How**：
  - 目录结构：`~/.hermes/plugins/<name>/`
  - `plugin.yaml`（元数据）
  - `__init__.py`（wiring）
  - `schemas.py`（LLM 看到的工具描述）
  - `tools.py`（handlers）
  - 支持 async handler（`is_async=True`）
- 引用官方 Plugin Building Guide
- **交互**：文件树（左）+ 代码面板（右，点击文件切换内容）

#### 2.4 MCP Server 接入

- **What**：Model Context Protocol，让 Agent 连接外部工具服务
- **How**：
  - Stdio transport（command + args）
  - HTTP/StreamableHTTP transport（url）
  - config.yaml 中 `mcp_servers` 配置
  - 实战：接入 GitHub MCP Server
  - 特性：自动重连、sampling 支持、credential 剥离、超时配置
- **交互**：配置编辑器（填配置 → 预览 config.yaml 片段）

#### 2.5 写高质量 Skill + 防覆盖策略

- **What**：SKILL.md 规范和最佳实践
- **How**：
  - agentskills.io 标准格式：frontmatter（name/description/version/platforms/prerequisites）+ body
  - 好 Skill 的特征：单一职责、清晰步骤、明确的前置条件
  - **防覆盖策略**（社区高频问题）：
    - 版本锁定
    - 手动编辑标记
    - Git 管理 skills 目录
- 引用社区讨论
- **交互**：模板代码块（填 frontmatter → 生成 SKILL.md 骨架，可 copy）

#### 2.6 多 Profile + 多 Agent 协作

- **What**：Profile 系统——每个 Profile 是完全隔离的 Agent 实例
- **How**：
  - `hermes profile create/clone/clone-all`
  - 每个 Profile：独立 config / memory / skills / sessions / gateway
  - `delegate_task` 工具：子 Agent 生成
  - 限制：max depth 2，blocked tools（delegate/clarify/memory/send_message/execute_code），默认 50 iterations
  - 批量并行（ThreadPoolExecutor）
- **Why**：为什么子 Agent 禁止某些工具？（防递归失控 + 安全隔离）
- **交互**：流程图（多 Agent 消息流向可视化，父子关系 + 工具权限标注）

#### 2.7 定时任务与自动化

- **What**：内置 Cron 系统 + Gateway 自动响应 + Webhook 触发
- **How**：
  - `cronjob` 工具的使用
  - Cron 表达式配置
  - 结合 Gateway 做定时推送
  - Webhook 触发外部事件
- 实战示例：每日早报推送到 Telegram
- **交互**：示例代码 + 配置说明

#### 2.8 Mixture of Agents 多模型推理

- **What**：让多个 LLM 协商出一个答案
- **How**：`mixture_of_agents` 工具的使用场景和配置
- **Why**：什么场景值得花多倍 token？（高风险决策/创意发散/代码审查）
- **交互**：概念图（多模型输入 → 汇聚 → 输出）

---

### Layer 3：深入 — 理解引擎

**目标**：理解 hermes-agent 的核心实现，具备 fork 修改的能力。

#### 3.1 Hermes Function Calling Format

- **What**：Hermes 模型的工具调用格式——XML 标签体系
  - `<tools>` 包裹工具定义（JSON Schema，放在 system prompt 中）
  - `<tool_call>` 包裹工具调用（model 输出）
  - `<tool_response>` 包裹工具结果
  - `<scratch_pad>` GOAP 目标导向行动规划（Goals/Actions/Observations/Reflections）
- **How**：完整的请求-响应示例
- vs OpenAI 格式对比：
  - OpenAI：role-based message + `tools` API 参数 + `tool_calls` 字段
  - Hermes：XML 文本标签 + system prompt 内嵌
- **Why**：为什么选 XML 而非 API 级别？（模型训练时直接在文本中学习工具使用，不依赖 API 层）
- 引用 hermes-function-calling-v1 数据集
- **交互**：**CSS 时序动画**（system prompt 组装 → model 输出 `<tool_call>` → 执行 → `<tool_response>` → model 继续推理）+ Hermes vs OpenAI 格式对比面板

#### 3.2 Hermes 模型家族

- Hermes 2 Pro：function calling 准确率 90%，JSON 模式 84%
- Hermes 3：GOAP scratch_pad，更强的 Agent 能力
- 训练数据：hermes-function-calling-v1 数据集（5 子集：单轮/多轮/Glaive/JSON）
- 模型与框架的关系：hermes-agent 框架可用任何 LLM，但 Hermes 模型对 XML 格式有原生优化
- **交互**：模型卡片（展示各模型能力参数）

#### 3.3 Agent Loop 源码剖析

- 核心函数：`run_conversation()`（run_agent.py:7544）
- 完整流程：
  1. 初始化（复制 history / 水合 todo store / 设置 session）
  2. System prompt 构建（一次性，cached）
  3. Preflight compression（history 已超阈值则提前压缩）
  4. Plugin hooks（`pre_llm_call`）
  5. **Main while loop**（`api_call_count < max_iterations`）：
     - 检查用户中断
     - 消耗 iteration budget
     - 构建 API request
     - 调用 LLM（streaming/non-streaming）
     - 有 tool_calls → 执行（并行当安全） → 追加结果 → 继续循环
     - 无 tool_calls → break（最终回复）
     - 边缘情况：context overflow → 压缩 / truncated → 重试
  6. Post-loop（memory sync / skill nudge / session 持久化 / trajectory 保存）
- **Iteration Budget**：parent 90 / child 50，thread-safe，`execute_code` 退款
- **并行工具执行**：`_PARALLEL_SAFE_TOOLS` 白名单 + 路径冲突检测 + `_NEVER_PARALLEL_TOOLS` 黑名单 + `_MAX_TOOL_WORKERS=8`
- 三种 API 模式：`chat_completions` / `codex_responses` / `anthropic_messages`
- **交互**：
  - **Remotion Agent Loop 生命周期动画**（~45s，展示完整循环流程包括分支和异常处理）
  - **Agent 对话模拟器**（输入一句话 → 逐步展示 Agent Loop 每步的中间状态：prompt 组装 → API 调用 → tool_call 解析 → 工具执行 → 结果注入 → 下一轮或结束）

#### 3.4 Prompt Builder 10 层组装

- 函数：`_build_system_prompt()`（run_agent.py:3057）
- 10 层组装顺序：
  1. Agent Identity（SOUL.md / 默认 fallback）
  2. Tool-aware guidance（Memory/Session Search/Skills guidance）
  3. Tool-use enforcement（针对 GPT/Gemini/Grok 的强制工具使用指令）
  4. User/Gateway system prompt（自定义指令）
  5. Persistent memory（MEMORY.md + USER.md frozen snapshot）
  6. External memory（Plugin memory providers / Honcho）
  7. Skills index（可用 skills 的元数据索引）
  8. Context files（AGENTS.md / .cursorrules / HERMES.md + injection scanning）
  9. Timestamp + model info
  10. Platform hints + Environment hints（WSL/Termux/容器检测）
- **交互**：展开/折叠有序列表（复用 1.3 的 Prompt 组装可视化器，这里展示完整 10 层）

#### 3.5 Context Compression 算法

- 类：`context_compressor.py`
- 算法步骤：
  1. Prune old tool results（廉价预处理，不调 LLM）
  2. Protect head messages（system prompt + 首轮对话）
  3. Protect tail messages（~20K tokens 的最近上下文）
  4. Summarize middle turns（用辅助 cheap model 做结构化摘要）
  5. 迭代更新（后续压缩更新前一次 summary）
- 触发阈值：50% context length
- Summary prefix 注入
- **CSS Session 生命周期动画**（session 开始 → 对话 → context 膨胀 → 压缩触发 → 持久化 → 未来被 FTS5 搜索）
- **交互**：CSS 步骤动画（展示压缩前后的 token 数变化，每步高亮当前操作区域）

#### 3.6 工具系统内核

- **Registry 单例模式**：`ToolRegistry` + `ToolEntry` 数据类（name/toolset/schema/handler/check_fn/requires_env/is_async/emoji/max_result_size_chars）
- **自注册**：每个工具文件 import 时调 `registry.register()`，`model_tools.py` 触发发现
- **并行安全判定**：`_PARALLEL_SAFE_TOOLS` 白名单、路径冲突检测（同路径的 read_file + write_file 串行）、`_NEVER_PARALLEL_TOOLS`
- **参数强制转换**：LLM 返回的字符串参数自动转为 schema 声明的类型（`"42"` → `42`）
- **交互**：源码注解 + 调用链 trace 可视化

#### 3.7 Gateway 架构

- `gateway/run.py`：网关运行器
- 平台适配器模式：`gateway/platforms/<platform>.py`
- 每消息创建 AIAgent → SQLite session 持续性
- 语音消息转录（`faster-whisper` 本地 / Whisper API）
- 媒体文件投递（`MEDIA:/path` 语法）
- DM pairing 安全机制
- sticker 缓存
- **交互**：架构图（消息从平台 → adapter → agent → 响应 → 平台的完整流向）

#### 3.8 PTC 编程式工具调用

- **What**：LLM 写 Python 脚本，通过 RPC 调用 Hermes 工具
- 两种传输：
  - Local（UDS）：Unix domain socket，parent 生成 `hermes_tools.py` stub
  - Remote（file-based）：Docker/SSH/Modal/Daytona 场景，文件轮询
- 沙盒：只允许 7 个工具（web_search/web_extract/read_file/write_file/search_files/patch/terminal）
- **Why**：为什么 PTC 存在？（多步工具链压缩为单次推理，减少 context 消耗和 API 调用次数）
- **交互**：架构图（两种传输对比）+ 代码示例

#### 3.9 RL 训练 + GEPA 自进化

- **RL 训练**：
  - `save_trajectories` flag → JSONL traces
  - `trajectory_compressor.py` 压缩
  - `batch_runner.py` 批量生成
  - Tinker-Atropos 集成（git submodule）
- **GEPA（Genetic-Pareto Prompt Evolution）**：
  - hermes-agent-self-evolution 仓库
  - DSPy 集成
  - 自动优化 Skills / Tool descriptions / System prompts / Code
  - 无需 GPU，~$2-10/次
  - ICLR 2026 Oral paper
- **交互**：数据流图 + 论文链接 + 仓库链接

---

### 实战菜谱（侧边栏独立入口）

不打断四层主线。每个菜谱是端到端的完整实战项目。

#### R1 个人编程助手

- 目标：终端 + 文件工具 + Skills 自动积累
- 配置 SOUL.md、选择编程相关 toolset
- 演示 Agent 自动创建编程相关 Skill

#### R2 多平台信息管家

- 目标：Telegram + 定时 Cron + Web 搜索
- 每日早报推送
- 引用 Medium 部署指南

#### R3 智能家居中心

- 目标：Home Assistant 集成
- 引用 Home Assistant 工具文档
- 语音控制场景

#### R4 研究助理 Agent

- 目标：Web 搜索 + 浏览器自动化 + 记忆持久化
- 引用 awesome-hermes-agent 中的 hermes-research-agent

#### R5 社区精选案例展廊

- autonovel（10万字小说生成 pipeline）
- hermescraft（Minecraft 伴侣）
- hermes-incident-commander（SRE 自愈 Agent）
- hermes-life-os（个人操作系统）
- 每个案例：简介 + 架构图 + 仓库链接

---

### 运维手册（侧边栏独立入口）

#### O1 常见问题 & hermes doctor

- 安装问题排查
- 平台适配坑（WSL/Termux/容器）
- API 连接问题
- `hermes doctor` 使用指南

#### O2 Patterns & Anti-patterns

- **Memory 清理**：满了怎么办？定期 review 策略
- **Skill 恢复**：被 Agent 自动改坏了怎么恢复？Git 管理策略
- **幻觉工具修复**：Agent 持续调用不存在的工具
- **费用排查**：API 费用异常飙升的排查流程
- **Context 溢出**：回答质量下降的症状和处理（手动 /compress + 调整 threshold）

#### O3 升级与迁移

- `hermes update` 流程
- 版本间迁移注意事项
- 配置兼容性

---

### 附录

#### A. config.yaml 全字段速查

全配置字段表，分组说明。

#### B. 生态地图

- [awesome-hermes-agent](https://github.com/0xNyk/awesome-hermes-agent)
- [agentskills.io](https://agentskills.io) 开放标准
- [Hermes Function Calling 参考实现](https://github.com/NousResearch/Hermes-Function-Calling)
- [hermes-function-calling-v1 数据集](https://huggingface.co/datasets/NousResearch/hermes-function-calling-v1)
- [hermes-agent-self-evolution](https://github.com/NousResearch/hermes-agent-self-evolution)
- [Hermes 3 论文 (arXiv 2408.11857)](https://arxiv.org/pdf/2408.11857)
- 官方文档：https://hermes-agent.nousresearch.com/docs/
- 社区博文索引：DataCamp / NxCode / ByteIota / Substack / DEV Community / Medium

#### C. 术语表

Agent Loop / Skills / Toolset / Memory Snapshot / Frozen Snapshot / PTC / MCP / GOAP / Smart Routing / Iteration Budget 等核心术语中英对照。

---

## 4. 交互组件清单

### 4.1 Playground 级（核心，真正可玩）

| # | 组件 | 所在章节 | 功能 |
|---|------|---------|------|
| 1 | Prompt 组装可视化器 | 1.3 / 3.4 | 填写 SOUL/MEMORY/USER/AGENTS.md → 实时拼出完整 System Prompt + token 计数 |
| 2 | config.yaml 构建器 | 1.2 | 勾选选项 → 实时生成配置文件 + copy |
| 3 | Tool Schema 设计器 | 1.7 | 定义工具 → 预览 JSON Schema + Hermes XML 格式 |
| 4 | Agent 对话模拟器 | 3.3 | 逐步执行 Agent Loop 每步，可暂停查看中间状态 |
| 5 | 记忆生命周期沙盒 | 1.5 | 写 memory → 看流转全过程 |
| 6 | 三栏代码 Playground | 2.1 | 编辑 Tool schema/handler/toolsets，带语法高亮 |

### 4.2 展示级（辅助理解）

| # | 组件 | 所在章节 |
|---|------|---------|
| 7 | 模拟终端 | 0.3 |
| 8 | SVG 架构交互图 | 0.4 |
| 9 | 交互对比卡片 | 0.2 |
| 10 | 命令卡片网格 | 1.1 |
| 11 | 分类折叠面板 | 1.7 |
| 12 | Skill 卡片墙 | 1.6 |
| 13 | Tab 多平台配置 | 1.9 |
| 14 | 文件树 + 代码联动 | 2.3 |

### 4.3 CSS 动画（无状态）

| # | 动画 | 所在章节 |
|---|------|---------|
| 15 | 四层记忆流动画 | 1.5 |
| 16 | Skill 生命周期动画 | 1.6 |
| 17 | Session 生命周期动画 | 3.5 |
| 18 | Function Calling 时序动画 | 3.1 |
| 19 | Context Compression 步骤动画 | 3.5 |
| 20 | 章节入口打字机效果 | 各 Layer 入口 |

### 4.4 Remotion 视频（仅 2 个）

| # | 视频 | 时长 | 所在章节 |
|---|------|------|---------|
| 21 | 开场概览 | ~30s | 0.1 |
| 22 | Agent Loop 生命周期 | ~45s | 3.3 |

---

## 5. 性能与可访问性

### 5.1 懒加载

- 首屏只渲染 Layer 0
- 其余 Layer 通过 Intersection Observer 触发渲染
- Playground 组件在进入视口前 500px 时预加载

### 5.2 视频策略

- Remotion Player 默认显示缩略图静帧
- 点击后加载并播放
- 提供 fallback 静态图（给禁用 JS 的场景）

### 5.3 动画偏好

- 所有 CSS 动画检查 `prefers-reduced-motion: reduce`
- 减弱模式下：动画替换为直接显示，打字机效果跳过

### 5.4 移动端

- 所有 Playground 组件适配移动端（纵向布局替换横向）
- 代码块支持水平滚动
- 触摸手势支持

---

## 6. 分阶段交付

### Phase 1：核心体验

- Layer 0 全部 + Layer 1 全部
- Playground：Prompt 组装可视化器 + config.yaml 构建器 + 记忆沙盒
- CSS 动画：打字机 + 四层记忆流 + Skill 生命周期
- Remotion：开场概览视频
- 部署到 GitHub Pages

### Phase 2：扩展与深入

- Layer 2 全部 + Layer 3 全部
- Playground：Tool Schema 设计器 + Agent 对话模拟器 + 三栏代码
- CSS 动画：Function Calling 时序 + Context Compression + Session 生命周期
- Remotion：Agent Loop 生命周期视频

### Phase 3：生态补全

- 实战菜谱（R1-R5）
- 运维手册（O1-O3）
- 附录（A-C）
- 全部展示级组件完善

---

## 7. 引用的社区资源

| 来源 | 引用位置 | 用途 |
|------|---------|------|
| DEV Community Honest Review | 0.1 | 平衡评价 |
| Substack「Inside Hermes Agent」 | 1.5 | 记忆架构分析 |
| BSWEN「Skill Overwrite」 | 1.6 / 2.5 | 防覆盖策略 |
| Medium 完整部署指南 | 1.9 / R2 | 平台部署 |
| awesome-hermes-agent | R5 / 附录 B | 社区案例 |
| TuringPost「Hermes vs OpenClaw」 | 0.2 | 框架对比 |
| Hermes 3 arXiv 论文 | 3.2 | 模型背景 |
| hermes-function-calling-v1 数据集 | 3.1 / 3.2 | 训练数据 |
| 官方文档各章节 | 各延伸阅读 | 权威参考 |
