import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { PromptAssembler } from "../../playgrounds/PromptAssembler";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const soulMdExample = `# SOUL.md — Hermes 的人格定义

You are Hermes, a knowledgeable and helpful AI assistant.

## Principles
- Be direct and precise — never hedge when you know the answer
- Always use tools to take action, don't just describe what you would do
- When uncertain, ask clarifying questions before proceeding
- Respond in the same language the user writes in

## Personality
- Professional but approachable
- Prefer terminal workflows over GUI when possible
- Show your reasoning process for complex decisions`;

export function SoulMd() {
  return (
    <Section id="soul-md">
      <h3 className="text-xl font-semibold">塑造人格 — SOUL.md</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        SOUL.md 是 Hermes System Prompt 的<strong>第一层</strong>——它定义了 Agent 的身份、性格和行为准则。
        每次 session 启动时，SOUL.md 的内容会被注入到 prompt 的最前面。
      </p>

      <h4 className="mt-6 font-medium">写好 SOUL.md 的三原则</h4>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-bg-card p-4">
          <div className="text-lg font-bold text-accent">简洁</div>
          <p className="mt-1 text-sm text-text-secondary">
            每个 token 都占 context window。SOUL.md 建议控制在 200~500 字以内。
          </p>
        </div>
        <div className="rounded-lg border border-border bg-bg-card p-4">
          <div className="text-lg font-bold text-accent">具体</div>
          <p className="mt-1 text-sm text-text-secondary">
            避免"做一个好助手"这种废话。写清楚期望的行为模式和约束条件。
          </p>
        </div>
        <div className="rounded-lg border border-border bg-bg-card p-4">
          <div className="text-lg font-bold text-accent">有性格</div>
          <p className="mt-1 text-sm text-text-secondary">
            给 Agent 一个鲜明的风格——是严谨的工程师还是热情的导师？性格越明确，回复越一致。
          </p>
        </div>
      </div>

      <div className="mt-6">
        <CodeBlock code={soulMdExample} lang="markdown" title="~/.hermes/SOUL.md" />
      </div>

      {/* Why box */}
      <div className="mt-6 rounded-lg border border-warning/30 bg-warning/5 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-warning">
          <span>💡</span> 为什么是 frozen snapshot？
        </div>
        <p className="text-sm text-text-secondary">
          SOUL.md 在 session 启动时冻结为快照注入 system prompt，session 内不再变化。
          这是为了利用 LLM 的 <strong>prefix caching</strong>——固定的 system prompt 前缀只需编码一次，
          后续每轮对话复用缓存，大幅降低延迟和成本。
        </p>
      </div>

      <PromptAssembler />

      <ExtendedReading
        links={[
          {
            title: "SOUL.md 编写指南",
            url: "https://docs.hermes-agent.dev/soul-md",
            source: "Official Docs",
          },
          {
            title: "System Prompt 最佳实践",
            url: "https://docs.anthropic.com/claude/docs/system-prompts",
            source: "Anthropic Docs",
          },
        ]}
      />
    </Section>
  );
}
