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
];

export const allSectionIds = navigation.flatMap((g) => g.items.map((item) => item.id));
