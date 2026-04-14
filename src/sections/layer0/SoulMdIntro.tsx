import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { TabPanel } from "../../components/ui/TabPanel";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const templates = [
  {
    label: "专业技术助手",
    soul: `# SOUL

You are a senior software engineer assistant.

## Style
- Be concise and direct. No fluff.
- Code first, explanation second.
- Use Chinese for conversation, English for code comments and technical terms.

## Rules
- Always show the command before explaining what it does.
- When uncertain, say so explicitly.
- Never make up URLs or version numbers.`,
    example:
      "Docker 是容器引擎。核心概念：image（镜像）、container（容器）、volume（持久化存储）。\n\n```bash\ndocker run -it ubuntu bash\n```\n\n这会拉取 ubuntu 镜像并启动一个交互式容器。",
  },
  {
    label: "日常伙伴",
    soul: `# SOUL

You are a friendly and patient personal assistant.

## Style
- Warm and approachable tone.
- Use analogies to explain complex concepts.
- Break down steps clearly, assume no prior knowledge.
- Use Chinese throughout, including explanations.

## Rules
- Always ask before taking actions that modify files.
- Offer multiple options when there's no clear best choice.
- Celebrate small wins with the user.`,
    example:
      "你可以把 Docker 想象成一个「虚拟小房间」🏠\n\n就像你在电脑里搭了一个独立的小空间，里面有自己的系统、软件，和你的电脑互不干扰。\n\n想试试的话，我们一步步来？首先需要安装 Docker Desktop...",
  },
  {
    label: "研究助理",
    soul: `# SOUL

You are a meticulous research assistant.

## Style
- Structured output: use headers, bullet points, tables.
- Always cite sources with URLs.
- Present multiple perspectives on controversial topics.
- Academic Chinese with technical precision.

## Rules
- Distinguish between facts and opinions explicitly.
- When web search results conflict, note the discrepancy.
- Proactively suggest related topics worth exploring.`,
    example:
      "## Docker 概述\n\nDocker 是一个开源容器化平台（Solomon Hykes, 2013）。\n\n### 核心架构\n| 组件 | 职责 |\n|------|------|\n| Docker Engine | 容器运行时 |\n| Docker Hub | 镜像仓库 |\n\n### 与虚拟机的区别\n据 IBM 研究报告（2024），容器启动时间比 VM 快 10-100 倍...\n\n> 延伸阅读：Kubernetes 与 Docker 的关系",
  },
];

export function SoulMdIntro() {
  return (
    <Section id="soul-md-intro">
      <TypewriterTitle
        text="0.9 SOUL.md 人格定制"
        subtitle="定义你的 Agent 是谁"
      />

      <p className="text-text-secondary">
        SOUL.md 是 Agent 每次对话系统提示词的第一层。它定义的不是
        Agent 知道什么，而是 Agent <strong>是谁</strong> —
        回答风格、思维方式、行为准则。
      </p>
      <p className="mt-2 text-sm text-text-muted">
        文件位置：
        <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono">
          ~/.hermes/SOUL.md
        </code>
        ，安装时自动创建。
      </p>

      {/* Templates comparison */}
      <h3 className="mt-8 text-lg font-semibold">3 个模板对比</h3>
      <p className="mt-1 text-sm text-text-secondary">
        同一个问题「什么是 Docker？」在不同人格下的回答：
      </p>

      <div className="mt-4">
        <TabPanel
          tabs={templates.map((t) => ({
            label: t.label,
            content: (
              <div className="space-y-4">
                <CodeBlock
                  code={t.soul}
                  lang="markdown"
                  title="SOUL.md"
                />
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-text-muted">
                    回答效果：
                  </h4>
                  <div className="rounded-lg border border-border bg-bg-card p-4 text-sm text-text-secondary whitespace-pre-line">
                    {t.example}
                  </div>
                </div>
              </div>
            ),
          }))}
        />
      </div>

      {/* Practical tips */}
      <div className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-4">
        <h4 className="mb-2 text-sm font-semibold text-accent">
          实用建议
        </h4>
        <ul className="space-y-1.5 text-sm text-text-secondary">
          <li>
            控制在 <strong>500 token 以内</strong> — SOUL.md
            在每条消息里都被注入，太长 = 每次对话都多花钱
          </li>
          <li>
            <strong>越具体越好</strong> —
            「用中文回答，代码注释用英文」比 「be helpful」有用一百倍
          </li>
          <li>随时改随时生效，不需要重启 hermes</li>
          <li>
            没灵感？先用默认的，用几天后根据实际不满意的地方修改
          </li>
        </ul>
      </div>

      {/* SOUL.md vs personality */}
      <h3 className="mt-8 text-lg font-semibold">
        SOUL.md vs config personality
      </h3>
      <div className="mt-3 space-y-2 text-sm text-text-secondary">
        <p>
          <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
            config.yaml
          </code>{" "}
          的{" "}
          <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
            agent.personality
          </code>{" "}
          是预设快捷方式（一个词切换风格）。SOUL.md 是自由格式
          markdown，完全控制。两者可以同时用，SOUL.md 优先级更高。
        </p>
      </div>

      <ExtendedReading
        links={[
          {
            title: "Layer 1: SOUL.md 深度定制",
            url: "#soul-md",
            source: "本教程",
          },
        ]}
      />
    </Section>
  );
}
