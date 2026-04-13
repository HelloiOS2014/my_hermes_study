export interface CLICommand { name: string; command: string; description: string; detail: string; icon: string; }

export const commands: CLICommand[] = [
  { name: "对话", command: "hermes", description: "进入交互式对话模式", detail: "启动 TUI 界面，支持多行输入、工具调用展示、session 自动保存。", icon: "💬" },
  { name: "选模型", command: "hermes model", description: "选择 LLM Provider 和模型", detail: "支持 OpenRouter、OpenAI、Anthropic、Google、本地模型等。可配置 Smart Routing。", icon: "🤖" },
  { name: "配工具", command: "hermes tools", description: "启用/禁用工具和 Toolset", detail: "47+ 内置工具按 Toolset 分组，可按需开关。支持 MCP Server 接入。", icon: "🔧" },
  { name: "设置向导", command: "hermes setup", description: "首次配置引导", detail: "交互式向导，帮你选模型、配 API key、设置终端后端、开启消息平台。", icon: "⚙️" },
  { name: "诊断", command: "hermes doctor", description: "检查环境和配置", detail: "检查 Python 版本、依赖安装、API key 有效性、工具注册状态、网络连通性。", icon: "🩺" },
  { name: "消息网关", command: "hermes gateway", description: "启动多平台消息网关", detail: "一个进程同时服务 Telegram、Discord、微信等 20+ 平台。每个平台独立配置。", icon: "🌐" },
  { name: "多身份", command: "hermes profile", description: "管理 Agent 身份/实例", detail: "create/clone/clone-all。每个 Profile 独立 config、memory、skills、sessions。", icon: "👥" },
  { name: "升级", command: "hermes update", description: "更新到最新版本", detail: "检查并安装最新版本。建议定期更新以获取安全补丁。", icon: "📦" },
];
