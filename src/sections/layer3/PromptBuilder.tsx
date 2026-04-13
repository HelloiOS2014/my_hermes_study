import { Section } from "../../components/layout/Section";
import { FoldPanel } from "../../components/ui/FoldPanel";
import { CodeBlock } from "../../components/ui/CodeBlock";

const layers = [
  {
    title: "Layer 1: Agent Identity (SOUL.md)",
    badge: "core",
    source: "~/.hermes/SOUL.md",
    desc: "定义 Agent 的人格、价值观和行为准则。这是 Hermes Agent 的「灵魂文件」，在所有对话中持久生效。",
    example: [
      "You are Hermes, a personal AI agent.",
      "You are helpful, honest, and harmless.",
      "You always explain your reasoning.",
    ].join("\n"),
  },
  {
    title: "Layer 2: Tool-aware Guidance",
    badge: "dynamic",
    source: "ToolRegistry.get_active_tools()",
    desc: "根据当前可用工具动态注入使用指引。例如：如果 web_search 可用，注入「你可以搜索网页获取最新信息」。",
    example: [
      "You have access to the following tools:",
      "- web_search: Search the internet",
      "- execute_code: Run Python code",
      "Use tools when they can help answer.",
    ].join("\n"),
  },
  {
    title: "Layer 3: Tool-use Enforcement",
    badge: "static",
    source: "硬编码规则",
    desc: "强制工具使用规则：如文件操作必须用工具（不能凭记忆编造内容）、危险命令需确认等。",
    example: [
      "IMPORTANT: When asked about file contents,",
      "ALWAYS use read_file tool. Never guess.",
      "For destructive operations (rm, git push",
      "--force), ask for user confirmation.",
    ].join("\n"),
  },
  {
    title: "Layer 4: User/Gateway System Prompt",
    badge: "optional",
    source: "config.yaml 或 gateway 平台配置",
    desc: "用户或 gateway 平台注入的自定义 system prompt。Discord bot 可能注入频道规则，CLI 模式下来自用户配置。",
    example: [
      "You are serving in a developer Discord.",
      "Keep responses concise and technical.",
      "Use code blocks for all code snippets.",
    ].join("\n"),
  },
  {
    title: "Layer 5: Persistent Memory (frozen snapshot)",
    badge: "dynamic",
    source: "~/.hermes/MEMORY.md 的快照",
    desc: "MEMORY.md 的当前内容被冻结注入。这是 agent 的「长期记忆」，包含用户偏好和历史学习。",
    example: [
      "## User Preferences",
      "- Prefers TypeScript over JavaScript",
      "- Uses pnpm as package manager",
      "- Timezone: Asia/Shanghai",
    ].join("\n"),
  },
  {
    title: "Layer 6: External Memory (Honcho)",
    badge: "plugin",
    source: "Honcho API 返回的上下文",
    desc: "来自 Honcho 外部记忆服务的额外上下文。Honcho 可以提供跨 session 的语义检索结果。",
    example: [
      "# Relevant past context (via Honcho):",
      "- [2024-03-15] User set up a Next.js",
      "  project with App Router",
      "- [2024-03-20] Discussed React Server",
      "  Components patterns",
    ].join("\n"),
  },
  {
    title: "Layer 7: Skills Index (metadata only)",
    badge: "dynamic",
    source: "~/.hermes/skills/*.md 元数据",
    desc: "所有已学习 Skill 的名称和描述（不含完整内容）。Agent 需要时会用 read_file 加载完整 Skill。",
    example: [
      "Available Skills:",
      "- git-workflow: Standard Git workflow",
      "- react-component: Create React components",
      "- deploy-vercel: Deploy to Vercel",
      "(Use read_file to load full skill)",
    ].join("\n"),
  },
  {
    title: "Layer 8: Context Files (AGENTS.md + injection scanning)",
    badge: "security",
    source: "项目目录中的 AGENTS.md / .hermes/ 文件",
    desc: "项目级上下文文件，类似 .cursorrules。系统会扫描内容，检测并过滤潜在的 prompt injection 攻击。",
    example: [
      "# Project: my-saas-app",
      "## Tech Stack",
      "- Next.js 14, TypeScript, Tailwind",
      "- Database: PostgreSQL + Prisma",
      "## Conventions",
      "- Components in src/components/",
    ].join("\n"),
  },
  {
    title: "Layer 9: Timestamp + Model Info",
    badge: "auto",
    source: "运行时自动生成",
    desc: "注入当前时间戳和模型信息，让 agent 知道「现在是什么时候」和「自己是什么模型」。",
    example: [
      "Current time: 2025-01-15T10:30:00+08:00",
      "Model: hermes-3-llama-3.1-8b",
      "Context window: 128000 tokens",
      "Temperature: 0.7",
    ].join("\n"),
  },
  {
    title: "Layer 10: Platform + Environment Hints",
    badge: "auto",
    source: "运行时环境检测",
    desc: "操作系统、Shell 类型、工作目录、Python 版本等环境信息。帮助 agent 生成平台适配的命令。",
    example: [
      "Platform: macOS 14.2 (arm64)",
      "Shell: /bin/zsh",
      "Working directory: ~/projects/my-app",
      "Python: 3.11.6",
      "Node: v20.10.0",
    ].join("\n"),
  },
];

export function PromptBuilder() {
  return (
    <Section id="prompt-builder">
      <h3 className="text-xl font-semibold">Prompt Builder 10 层组装</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        <code>_build_system_prompt()</code>（<code>run_agent.py:3057</code>）是
        Hermes Agent 的 prompt 工厂。它按照固定顺序将 10 个层级的信息组装成最终的 system
        prompt，每一层都有明确的来源和职责。
      </p>

      <p className="mt-3 text-sm text-text-muted">
        点击展开每一层查看来源、说明和示例内容。完整的 Prompt 组装过程可以在{" "}
        <a href="#prompt-assembler" className="text-accent hover:underline">
          Layer 1 的 Prompt Assembler 交互实验室
        </a>{" "}
        中体验。
      </p>

      <div className="mt-6 rounded-lg border border-border">
        {layers.map((layer, i) => (
          <FoldPanel
            key={layer.title}
            title={layer.title}
            badge={layer.badge}
            defaultOpen={i === 0}
          >
            <div className="space-y-3">
              <div className="text-sm">
                <span className="text-text-muted">Source: </span>
                <code className="text-xs text-accent">{layer.source}</code>
              </div>
              <p className="text-sm text-text-secondary">{layer.desc}</p>
              <CodeBlock code={layer.example} lang="markdown" title="示例内容" />
            </div>
          </FoldPanel>
        ))}
      </div>

      {/* Visual summary */}
      <div className="mt-8 rounded-lg border border-border bg-bg-card p-5">
        <h4 className="mb-3 text-sm font-semibold text-text-muted">
          组装顺序概览
        </h4>
        <div className="flex flex-wrap gap-2">
          {layers.map((layer, i) => (
            <div
              key={i}
              className="rounded-full border border-border bg-bg-elevated px-3 py-1 text-xs text-text-secondary"
            >
              {i + 1}. {layer.title.split(": ")[1]}
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-text-muted">
          最终 system prompt 由上述 10 层按顺序拼接而成，token 占用通常在 2000-5000 之间。
        </p>
      </div>
    </Section>
  );
}
