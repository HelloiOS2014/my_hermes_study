export interface NavItem { id: string; label: string; }
export interface NavGroup { label: string; emoji: string; items: NavItem[]; }

export const navigation: NavGroup[] = [
  {
    label: "Layer 0 · 初见", emoji: "👀",
    items: [
      { id: "what-is-hermes", label: "What is Hermes Agent?" },
      { id: "comparison", label: "和其他框架有什么不同" },
      { id: "quick-start", label: "安装 + 第一次对话" },
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
];

export const allSectionIds = navigation.flatMap((g) => g.items.map((item) => item.id));
