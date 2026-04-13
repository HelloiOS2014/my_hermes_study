import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { Terminal } from "../../components/ui/Terminal";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { TryItBox } from "../../components/ui/TryItBox";

const quickInstallLines = [
  { type: "command" as const, text: "curl -fsSL https://raw.githubusercontent.com/hermes-ai/hermes-agent/main/install.sh | bash" },
  { type: "output" as const, text: "\u2714 Hermes Agent v0.12.3 installed to ~/.local/bin/hermes" },
  { type: "command" as const, text: "source ~/.bashrc" },
  { type: "command" as const, text: "hermes setup" },
  { type: "output" as const, text: "\u2728 Setup complete! Run `hermes` to start your first conversation." },
];

const devInstallCode = `git clone https://github.com/hermes-ai/hermes-agent.git
cd hermes-agent
uv venv
uv pip install -e ".[dev]"`;

const firstConversationLines = [
  { type: "command" as const, text: "hermes" },
  { type: "output" as const, text: "\u{1F4AC} Hermes Agent v0.12.3 \u2014 Type your message or /help" },
  { type: "command" as const, text: "\u4EC0\u4E48\u662F MCP\uFF1F\u5B83\u548C\u666E\u901A API \u6709\u4EC0\u4E48\u533A\u522B\uFF1F" },
  { type: "output" as const, text: "\u{1F50D} [web_search] Searching: \"MCP Model Context Protocol vs API\"...", delay: 1200 },
  { type: "output" as const, text: "\u{1F4DD} [write_file] Saving summary to ~/notes/mcp-overview.md", delay: 800 },
  { type: "output" as const, text: "MCP (Model Context Protocol) \u662F Anthropic \u63D0\u51FA\u7684\u5F00\u653E\u534F\u8BAE\uFF0C\u5B83\u8BA9 AI \u6A21\u578B\u80FD\u591F\u7EDF\u4E00\u5730\u8C03\u7528\u5916\u90E8\u5DE5\u5177\u548C\u6570\u636E\u6E90\u2026", delay: 600 },
];

export function QuickStart() {
  return (
    <Section id="quick-start">
      <TypewriterTitle
        text="0.3 \u5B89\u88C5 + \u7B2C\u4E00\u6B21\u5BF9\u8BDD"
        subtitle="\u4E24\u79CD\u5B89\u88C5\u65B9\u5F0F\uFF0C\u9009\u9002\u5408\u4F60\u7684"
      />

      <h3 className="text-lg font-semibold">\u5FEB\u901F\u5B89\u88C5</h3>
      <div className="mt-3">
        <Terminal title="Quick Install" lines={quickInstallLines} />
      </div>

      <h3 className="mt-8 text-lg font-semibold">\u5F00\u53D1\u8005\u5B89\u88C5</h3>
      <div className="mt-3">
        <CodeBlock code={devInstallCode} lang="bash" title="Developer Install" />
      </div>

      <h3 className="mt-8 text-lg font-semibold">\u7B2C\u4E00\u6B21\u5BF9\u8BDD</h3>
      <div className="mt-3">
        <Terminal title="First Conversation" lines={firstConversationLines} />
      </div>

      <TryItBox>
        <p>\u73B0\u5728\u6253\u5F00\u4F60\u7684\u7EC8\u7AEF\uFF0C\u8FD0\u884C <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-accent">hermes</code></p>
      </TryItBox>
    </Section>
  );
}
