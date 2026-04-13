import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { Terminal } from "../../components/ui/Terminal";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { TryItBox } from "../../components/ui/TryItBox";

const quickInstallLines = [
  { type: "command" as const, text: "curl -fsSL https://raw.githubusercontent.com/hermes-ai/hermes-agent/main/install.sh | bash" },
  { type: "output" as const, text: "✔ Hermes Agent v0.12.3 installed to ~/.local/bin/hermes" },
  { type: "command" as const, text: "source ~/.bashrc" },
  { type: "command" as const, text: "hermes setup" },
  { type: "output" as const, text: "✨ Setup complete! Run `hermes` to start your first conversation." },
];

const devInstallCode = `git clone https://github.com/hermes-ai/hermes-agent.git
cd hermes-agent
uv venv
uv pip install -e ".[dev]"`;

const firstConversationLines = [
  { type: "command" as const, text: "hermes" },
  { type: "output" as const, text: "\u{1F4AC} Hermes Agent v0.12.3 — Type your message or /help" },
  { type: "command" as const, text: "什么是 MCP？它和普通 API 有什么区别？" },
  { type: "output" as const, text: "\u{1F50D} [web_search] Searching: \"MCP Model Context Protocol vs API\"...", delay: 1200 },
  { type: "output" as const, text: "\u{1F4DD} [write_file] Saving summary to ~/notes/mcp-overview.md", delay: 800 },
  { type: "output" as const, text: "MCP (Model Context Protocol) 是 Anthropic 提出的开放协议，它让 AI 模型能够统一地调用外部工具和数据源…", delay: 600 },
];

export function QuickStart() {
  return (
    <Section id="quick-start">
      <TypewriterTitle
        text="0.3 安装 + 第一次对话"
        subtitle="两种安装方式，选适合你的"
      />

      <h3 className="text-lg font-semibold">快速安装</h3>
      <div className="mt-3">
        <Terminal title="Quick Install" lines={quickInstallLines} />
      </div>

      <h3 className="mt-8 text-lg font-semibold">开发者安装</h3>
      <div className="mt-3">
        <CodeBlock code={devInstallCode} lang="bash" title="Developer Install" />
      </div>

      <h3 className="mt-8 text-lg font-semibold">第一次对话</h3>
      <div className="mt-3">
        <Terminal title="First Conversation" lines={firstConversationLines} />
      </div>

      <TryItBox>
        <p>现在打开你的终端，运行 <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-accent">hermes</code></p>
      </TryItBox>
    </Section>
  );
}
