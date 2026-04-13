import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const stats = [
  { value: "47+", label: "内置工具" },
  { value: "20+", label: "消息平台" },
  { value: "200+", label: "LLM 模型" },
  { value: "∞", label: "自我进化" },
];

export function WhatIsHermes() {
  return (
    <Section id="what-is-hermes">
      <TypewriterTitle text="Layer 0 · 初见" subtitle="5 分钟建立直觉" />

      <h3 className="text-xl font-semibold">What is Hermes Agent?</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        Hermes 是一个 <strong>可自我进化的个人 AI Agent 框架</strong>。
        它不仅仅是一个聊天机器人，而是能够记住你的偏好、学习新技能、
        调用工具完成任务，并通过 Skills 系统持续成长的智能体。
        支持 200+ 大语言模型、跨 20+ 平台运行，并通过 MCP 协议连接外部工具。
      </p>

      {/* Stat Cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-border bg-bg-card p-5 text-center transition-colors hover:border-accent/50"
          >
            <div className="text-3xl font-bold text-accent">{s.value}</div>
            <div className="mt-1 text-sm text-text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Community Quotes */}
      <div className="mt-8 space-y-4">
        <blockquote className="rounded-lg border-l-4 border-success bg-success/5 py-3 pl-4 pr-4">
          <p className="text-sm italic text-text-secondary">
            &ldquo;The agent that grows with you &mdash; it remembers context across sessions and
            actually learns your preferences.&rdquo;
          </p>
          <cite className="mt-2 block text-xs text-text-muted">&mdash; GitHub 社区用户</cite>
        </blockquote>
        <blockquote className="rounded-lg border-l-4 border-warning bg-warning/5 py-3 pl-4 pr-4">
          <p className="text-sm italic text-text-secondary">
            &ldquo;Skills are essentially structured prompt injection with CRUD &mdash; powerful,
            but you need to understand what that means for safety.&rdquo;
          </p>
          <cite className="mt-2 block text-xs text-text-muted">&mdash; DEV Community 诚实评测</cite>
        </blockquote>
      </div>

      {/* Video Placeholder */}
      <div className="mt-8 flex aspect-video items-center justify-center rounded-lg border border-border bg-bg-card">
        <div className="text-center text-text-muted">
          <div className="text-4xl">{"▶"}</div>
          <p className="mt-2 text-sm">概览视频 (~30s)</p>
        </div>
      </div>

      <ExtendedReading
        links={[
          {
            title: "Hermes Agent GitHub 仓库",
            url: "https://github.com/hermes-ai/hermes-agent",
            source: "GitHub",
          },
          {
            title: "An Honest Review of Hermes Agent",
            url: "https://dev.to/hermes-honest-review",
            source: "DEV Community",
          },
          {
            title: "Hermes Agent 官方文档",
            url: "https://docs.hermes-agent.dev",
            source: "Official Docs",
          },
        ]}
      />
    </Section>
  );
}
