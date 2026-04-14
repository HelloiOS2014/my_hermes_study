export interface NavItem { id: string; label: string; }
export interface NavGroup { label: string; emoji: string; items: NavItem[]; }

export const navigation: NavGroup[] = [
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
  {
    label: "Layer 1 · 上手", emoji: "🛠",
    items: [
      { id: "cli-overview", label: "CLI 全景" },
      { id: "model-selection", label: "选模型 + 成本控制" },
      { id: "soul-md", label: "SOUL.md 人格塑造" },
      { id: "project-context", label: "项目上下文" },
      { id: "memory-system", label: "记忆系统" },
      { id: "skills-system", label: "Skills 系统" },
      { id: "tool-explorer", label: "工具箱导览" },
      { id: "security", label: "安全体系" },
      { id: "messaging-platforms", label: "消息平台" },
      { id: "terminal-backends", label: "终端后端" },
    ],
  },
  {
    label: "Layer 2 · 扩展", emoji: "🔌",
    items: [
      { id: "custom-tool", label: "写自定义 Tool" },
      { id: "plugin-hooks", label: "Plugin Hooks" },
      { id: "full-plugin", label: "写完整 Plugin" },
      { id: "mcp-server", label: "MCP Server 接入" },
      { id: "quality-skill", label: "写高质量 Skill" },
      { id: "multi-agent", label: "多 Agent 协作" },
      { id: "cron-automation", label: "定时任务与自动化" },
      { id: "mixture-of-agents", label: "Mixture of Agents" },
    ],
  },
  {
    label: "Layer 3 · 深入", emoji: "🔬",
    items: [
      { id: "function-calling", label: "Function Calling 格式" },
      { id: "hermes-models", label: "Hermes 模型家族" },
      { id: "agent-loop", label: "Agent Loop 源码" },
      { id: "prompt-builder", label: "Prompt Builder 10 层" },
      { id: "context-compression", label: "Context Compression" },
      { id: "tool-internals", label: "工具系统内核" },
      { id: "gateway-architecture", label: "Gateway 架构" },
      { id: "ptc", label: "PTC 编程式调用" },
      { id: "rl-gepa", label: "RL + GEPA 自进化" },
    ],
  },
  {
    label: "实战菜谱", emoji: "🍳",
    items: [
      { id: "recipe-coding", label: "个人编程助手" },
      { id: "recipe-messenger", label: "多平台信息管家" },
      { id: "recipe-smarthome", label: "智能家居中心" },
      { id: "recipe-research", label: "研究助理 Agent" },
      { id: "recipe-gallery", label: "社区案例展廊" },
    ],
  },
  {
    label: "运维手册", emoji: "🔧",
    items: [
      { id: "ops-troubleshoot", label: "故障排查" },
      { id: "ops-patterns", label: "Patterns & Anti-patterns" },
      { id: "ops-upgrade", label: "升级与迁移" },
    ],
  },
  {
    label: "附录", emoji: "📎",
    items: [
      { id: "appendix-config", label: "config.yaml 速查" },
      { id: "appendix-ecosystem", label: "生态地图" },
      { id: "appendix-glossary", label: "术语表" },
    ],
  },
];

export const allSectionIds = navigation.flatMap((g) => g.items.map((item) => item.id));
