import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const stats = [
  { value: "47+", label: "内置工具" },
  { value: "20+", label: "消息平台" },
  { value: "200+", label: "LLM 模型" },
  { value: "\u221E", label: "自我进化" },
];

export function WhatIsHermes() {
  return (
    <Section id="what-is-hermes">
      <TypewriterTitle text="Layer 0 \u00B7 \u521D\u89C1" subtitle="5 \u5206\u949F\u5EFA\u7ACB\u76F4\u89C9" />

      <h3 className="text-xl font-semibold">What is Hermes Agent?</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        Hermes \u662F\u4E00\u4E2A <strong>\u53EF\u81EA\u6211\u8FDB\u5316\u7684\u4E2A\u4EBA AI Agent \u6846\u67B6</strong>\u3002
        \u5B83\u4E0D\u4EC5\u4EC5\u662F\u4E00\u4E2A\u804A\u5929\u673A\u5668\u4EBA\uFF0C\u800C\u662F\u80FD\u591F\u8BB0\u4F4F\u4F60\u7684\u504F\u597D\u3001\u5B66\u4E60\u65B0\u6280\u80FD\u3001
        \u8C03\u7528\u5DE5\u5177\u5B8C\u6210\u4EFB\u52A1\uFF0C\u5E76\u901A\u8FC7 Skills \u7CFB\u7EDF\u6301\u7EED\u6210\u957F\u7684\u667A\u80FD\u4F53\u3002
        \u652F\u6301 200+ \u5927\u8BED\u8A00\u6A21\u578B\u3001\u8DE8 20+ \u5E73\u53F0\u8FD0\u884C\uFF0C\u5E76\u901A\u8FC7 MCP \u534F\u8BAE\u8FDE\u63A5\u5916\u90E8\u5DE5\u5177\u3002
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
          <cite className="mt-2 block text-xs text-text-muted">&mdash; GitHub \u793E\u533A\u7528\u6237</cite>
        </blockquote>
        <blockquote className="rounded-lg border-l-4 border-warning bg-warning/5 py-3 pl-4 pr-4">
          <p className="text-sm italic text-text-secondary">
            &ldquo;Skills are essentially structured prompt injection with CRUD &mdash; powerful,
            but you need to understand what that means for safety.&rdquo;
          </p>
          <cite className="mt-2 block text-xs text-text-muted">&mdash; DEV Community \u8BDA\u5B9E\u8BC4\u6D4B</cite>
        </blockquote>
      </div>

      {/* Video Placeholder */}
      <div className="mt-8 flex aspect-video items-center justify-center rounded-lg border border-border bg-bg-card">
        <div className="text-center text-text-muted">
          <div className="text-4xl">{"\u25B6"}</div>
          <p className="mt-2 text-sm">\u6982\u89C8\u89C6\u9891 (~30s)</p>
        </div>
      </div>

      <ExtendedReading
        links={[
          {
            title: "Hermes Agent GitHub \u4ED3\u5E93",
            url: "https://github.com/hermes-ai/hermes-agent",
            source: "GitHub",
          },
          {
            title: "An Honest Review of Hermes Agent",
            url: "https://dev.to/hermes-honest-review",
            source: "DEV Community",
          },
          {
            title: "Hermes Agent \u5B98\u65B9\u6587\u6863",
            url: "https://docs.hermes-agent.dev",
            source: "Official Docs",
          },
        ]}
      />
    </Section>
  );
}
