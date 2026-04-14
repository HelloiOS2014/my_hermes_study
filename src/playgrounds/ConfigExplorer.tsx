import { useState } from "react";
import { CodeBlock } from "../components/ui/CodeBlock";

interface Scenario {
  id: string;
  question: string;
  icon: string;
  description: string;
  configSnippet: string;
  tips: string[];
  highlightSection: string;
}

const scenarios: Scenario[] = [
  {
    id: "model",
    question: "想换个模型？",
    icon: "🔄",
    description: "两种方式：hermes model 交互式选择（最简单），或者编辑 config.yaml。provider 设为 auto 时根据 .env 中可用的 key 自动选择。",
    configSnippet: `model:
  default: "anthropic/claude-sonnet-4"
  provider: "openrouter"`,
    tips: ["hermes model 命令可以交互式选择，不用手动编辑文件"],
    highlightSection: "model",
  },
  {
    id: "cost",
    question: "太贵了？",
    icon: "💰",
    description: "开启 Smart Model Routing：简单对话自动用便宜模型，复杂任务才用贵的。Claude Opus ~$15/M tokens，Haiku ~$0.25/M — 开启后省 70-80%。",
    configSnippet: `smart_model_routing:
  enabled: true
  cheap_model: "anthropic/claude-haiku"
  expensive_model: "anthropic/claude-sonnet-4"`,
    tips: ["日常闲聊自动走 Haiku，写代码/复杂分析才切 Sonnet"],
    highlightSection: "smart_model_routing",
  },
  {
    id: "safety",
    question: "怕搞坏电脑？",
    icon: "🛡",
    description: "默认 terminal.backend: local — Agent 直接在你机器上执行命令，包括危险命令。换 Docker 后 Agent 在容器里跑，炸了重建就行。",
    configSnippet: `terminal:
  backend: "docker"
  docker:
    image: "hermes-sandbox:latest"
    volumes:
      - "~/workspace:/workspace"`,
    tips: ["折中方案：保持 local 但在 platform_toolsets 里关掉危险工具"],
    highlightSection: "terminal",
  },
  {
    id: "memory",
    question: "它记了奇怪的东西？",
    icon: "🧠",
    description: "nudge_interval 控制多少轮对话后检查是否需要更新记忆。太小 = 频繁打断，太大 = 记不住。你随时可以直接编辑 ~/.hermes/MEMORY.md。",
    configSnippet: `memory:
  enabled: true
  nudge_interval: 5
  char_limit: 4000`,
    tips: ["直接编辑 MEMORY.md 可以删掉不想让它记住的内容"],
    highlightSection: "memory",
  },
  {
    id: "compression",
    question: "对话太长变傻了？",
    icon: "📦",
    description: "上下文窗口满了 Agent 会自动压缩历史消息。threshold 控制何时触发，ratio 控制压缩后保留多少。默认值适合大多数场景。",
    configSnippet: `compression:
  threshold: 0.50
  ratio: 0.30
  protected_messages: 4`,
    tips: ["protected_messages 保护最近 N 轮不被压缩"],
    highlightSection: "compression",
  },
  {
    id: "tools",
    question: "有些工具不想用？",
    icon: "🔧",
    description: "按平台单独配置工具开关。典型场景：Telegram 上关掉 execute_code（远程太危险），CLI 下关掉 send_message（防止乱发消息）。",
    configSnippet: `platform_toolsets:
  cli:
    web_search: true
    execute_code: true
    send_message: false
  telegram:
    execute_code: false
    web_search: true`,
    tips: ["hermes tools 命令可以交互式配置"],
    highlightSection: "platform_toolsets",
  },
];

export function ConfigExplorer() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = scenarios.find((s) => s.id === activeId);

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-border">
      <div className="border-b border-border bg-bg-card px-4 py-2 text-sm font-medium">
        config.yaml 场景浏览器
      </div>
      <div className="grid lg:grid-cols-5">
        {/* Left: scenario cards */}
        <div className="space-y-0 border-r border-border lg:col-span-2">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() =>
                setActiveId(activeId === s.id ? null : s.id)
              }
              className={`w-full border-b border-border p-4 text-left transition-colors last:border-0 ${
                activeId === s.id
                  ? "bg-accent/5"
                  : "hover:bg-bg-card"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{s.icon}</span>
                <span
                  className={`font-medium ${
                    activeId === s.id ? "text-accent" : ""
                  }`}
                >
                  {s.question}
                </span>
              </div>
              {activeId === s.id && (
                <div className="mt-3 space-y-3 animate-fade-in-up">
                  <p className="text-sm text-text-secondary">
                    {s.description}
                  </p>
                  {/* Mobile: show config inline */}
                  <div className="lg:hidden">
                    <CodeBlock
                      code={s.configSnippet}
                      lang="yaml"
                      title="config.yaml"
                    />
                  </div>
                  {s.tips.map((tip) => (
                    <p
                      key={tip}
                      className="text-xs text-text-muted"
                    >
                      💡 {tip}
                    </p>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Right: config preview (desktop only) */}
        <div className="hidden bg-bg-primary p-4 lg:col-span-3 lg:block">
          {active ? (
            <div>
              <div className="mb-2 text-xs text-text-muted">
                ~/.hermes/config.yaml →{" "}
                <span className="text-accent">
                  {active.highlightSection}
                </span>
              </div>
              <CodeBlock
                code={active.configSnippet}
                lang="yaml"
                title={`config.yaml · ${active.highlightSection}`}
              />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-text-muted">
              ← 点击左边的场景查看对应配置
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
