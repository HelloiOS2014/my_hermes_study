import { useState } from "react";

interface Step {
  label: string;
  detail: string;
  show: string;
}

const SCENARIO_INPUT = "帮我搜索 Hermes Agent 的最新版本";

const STEPS: Step[] = [
  {
    label: "System Prompt 组装",
    detail: "加载 SOUL.md + MEMORY.md + USER.md + Skills index + ...",
    show: "10 层 → ~2,400 tokens",
  },
  {
    label: "API 调用",
    detail: "发送 messages + tools 到 LLM",
    show: "POST /v1/chat/completions\nmodel: hermes-3\ntools: [web_search, read_file, ...]",
  },
  {
    label: "解析 tool_call",
    detail: "LLM 返回工具调用请求",
    show: '<tool_call>\n{"name":"web_search","arguments":{"query":"Hermes Agent latest version"}}\n</tool_call>',
  },
  {
    label: "工具执行",
    detail: "并行安全检查 → 执行 web_search",
    show: "web_search → 8 results found\n_PARALLEL_SAFE_TOOLS ✓",
  },
  {
    label: "结果注入",
    detail: "工具结果追加到 messages",
    show: '<tool_response>\n{"results":[{"title":"Hermes Agent v0.8.0","url":"..."}]}\n</tool_response>',
  },
  {
    label: "第 2 轮 API 调用",
    detail: "带工具结果再次调用 LLM",
    show: "messages: [..., tool_response]\n无新 tool_call → break",
  },
  {
    label: "最终回复",
    detail: "Agent Loop 结束，返回文本",
    show: "Hermes Agent 的最新版本是 v0.8.0，发布于 2026 年 4 月...",
  },
  {
    label: "Post-loop",
    detail: "Memory sync + Skill nudge + Session 持久化",
    show: "memory_sync ✓\nskill_nudge: 本次仅 2 tool calls，不触发\nsession_save ✓",
  },
];

export function AgentSimulator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [input, setInput] = useState(SCENARIO_INPUT);

  const activeStepData = STEPS[currentStep];

  const advance = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const reset = () => {
    setCurrentStep(0);
  };

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-border">
      <div className="border-b border-border bg-bg-card px-4 py-2 text-sm font-medium">
        Agent Loop 模拟器
      </div>
      <div className="p-4">
        {/* Top: input */}
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm outline-none focus:border-accent"
            placeholder="用户输入..."
          />
        </div>

        {/* Middle: step list */}
        <div className="mt-6 space-y-2">
          {STEPS.map((step, i) => {
            const isPast = i < currentStep;
            const isCurrent = i === currentStep;
            const isFuture = i > currentStep;

            return (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2 transition-all ${
                  isCurrent
                    ? "border-accent bg-accent/5"
                    : isPast
                      ? "border-border bg-bg-card opacity-60"
                      : "border-border bg-bg-primary opacity-40"
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isCurrent
                      ? "bg-accent/10 text-accent"
                      : isPast
                        ? "bg-accent/10 text-accent"
                        : "bg-bg-elevated text-text-muted"
                  }`}
                >
                  {isPast ? "\u2713" : i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <span
                    className={`text-sm font-medium ${
                      isCurrent ? "text-accent" : isPast ? "text-text-secondary" : "text-text-muted"
                    }`}
                  >
                    {step.label}
                  </span>
                  {isFuture && (
                    <span className="ml-2 text-xs text-text-muted">{step.detail}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom: detail panel */}
        {activeStepData && (
          <div className="mt-4 rounded-lg bg-bg-card p-4">
            <div className="flex items-center gap-2">
              <span className="font-medium text-accent">{activeStepData.label}</span>
              <span className="text-sm text-text-secondary">-- {activeStepData.detail}</span>
            </div>
            <pre className="mt-3 whitespace-pre-wrap rounded bg-bg-primary p-3 font-mono text-xs text-text-secondary">
              {activeStepData.show}
            </pre>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={advance}
            disabled={currentStep >= STEPS.length - 1}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg-primary transition-opacity disabled:opacity-50"
          >
            下一步 →
          </button>
          <button
            onClick={reset}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-accent"
          >
            重置
          </button>
        </div>
      </div>
    </div>
  );
}
