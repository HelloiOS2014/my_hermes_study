export interface PromptLayer { order: number; name: string; source: string; description: string; example: string; editable: boolean; }

export const promptLayers: PromptLayer[] = [
  { order: 1, name: "Agent Identity", source: "SOUL.md", description: "Agent 的身份定义，性格特征，行为准则", example: "You are Hermes, a helpful AI assistant created by Nous Research...", editable: true },
  { order: 2, name: "Tool-aware Guidance", source: "内置", description: "基于启用的工具生成对应指引", example: "You have access to persistent memory. Use the memory tool to...", editable: false },
  { order: 3, name: "Tool-use Enforcement", source: "内置", description: "针对倾向描述而非行动的模型强制使用工具", example: "You MUST use your tools to take action.", editable: false },
  { order: 4, name: "User/Gateway Prompt", source: "config.yaml", description: "用户自定义的系统指令", example: "Always respond in Chinese. Be concise.", editable: true },
  { order: 5, name: "Persistent Memory", source: "MEMORY.md + USER.md", description: "Agent 的笔记和对用户的认知（frozen snapshot）", example: "## Memory Notes\n- User prefers terminal commands over GUI", editable: true },
  { order: 6, name: "External Memory", source: "Plugin (Honcho)", description: "外部记忆提供者注入的上下文", example: "[Honcho user model: developer, prefers direct communication]", editable: false },
  { order: 7, name: "Skills Index", source: "~/.hermes/skills/", description: "可用 Skills 的元数据索引", example: "Available skills:\n- git-workflow: Standard git workflow...", editable: false },
  { order: 8, name: "Context Files", source: "AGENTS.md", description: "项目级上下文文件（经过 injection 扫描）", example: "# Project Context\nTech stack: React + TypeScript", editable: true },
  { order: 9, name: "Timestamp + Model Info", source: "系统", description: "当前时间和模型元信息", example: "Current time: 2026-04-13T15:30:00+08:00", editable: false },
  { order: 10, name: "Platform + Environment", source: "系统", description: "平台提示和环境检测", example: "You are running on macOS via CLI.", editable: false },
];
