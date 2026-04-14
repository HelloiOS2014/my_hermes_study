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
        text="0.7 首次启动 & 第一次对话"
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
