import { useState, useMemo } from "react";

interface ProviderOption {
  key: string;
  envVar: string;
  name: string;
  description: string;
  placeholder: string;
  group: "llm" | "tool";
}

const providerOptions: ProviderOption[] = [
  {
    key: "openrouter",
    envVar: "OPENROUTER_API_KEY",
    name: "OpenRouter",
    description: "200+ 模型，一个 key 搞定",
    placeholder: "sk-or-v1-xxxxxxxx",
    group: "llm",
  },
  {
    key: "anthropic",
    envVar: "ANTHROPIC_API_KEY",
    name: "Anthropic",
    description: "Claude 直连，延迟最低",
    placeholder: "sk-ant-xxxxxxxx",
    group: "llm",
  },
  {
    key: "google",
    envVar: "GOOGLE_API_KEY",
    name: "Google AI",
    description: "Gemini，有免费额度",
    placeholder: "AIzaxxxxxxxx",
    group: "llm",
  },
  {
    key: "glm",
    envVar: "GLM_API_KEY",
    name: "智谱 GLM",
    description: "国产模型，中文优化",
    placeholder: "xxxxxxxx.xxxxxxxx",
    group: "llm",
  },
  {
    key: "kimi",
    envVar: "KIMI_API_KEY",
    name: "Kimi / Moonshot",
    description: "长上下文中文模型",
    placeholder: "sk-xxxxxxxx",
    group: "llm",
  },
  {
    key: "minimax",
    envVar: "MINIMAX_API_KEY",
    name: "MiniMax",
    description: "多模态中文模型",
    placeholder: "xxxxxxxx",
    group: "llm",
  },
  {
    key: "exa",
    envVar: "EXA_API_KEY",
    name: "Exa",
    description: "高质量网页搜索",
    placeholder: "xxxxxxxx",
    group: "tool",
  },
  {
    key: "firecrawl",
    envVar: "FIRECRAWL_API_KEY",
    name: "Firecrawl",
    description: "网页抓取和内容提取",
    placeholder: "fc-xxxxxxxx",
    group: "tool",
  },
  {
    key: "fal",
    envVar: "FAL_KEY",
    name: "fal.ai",
    description: "AI 图片生成",
    placeholder: "xxxxxxxx",
    group: "tool",
  },
];

export function EnvBuilder() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["openrouter"]));
  const [copied, setCopied] = useState(false);

  const toggle = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const envContent = useMemo(() => {
    const llm = providerOptions.filter(
      (p) => p.group === "llm" && selected.has(p.key)
    );
    const tools = providerOptions.filter(
      (p) => p.group === "tool" && selected.has(p.key)
    );
    const lines: string[] = ["# ~/.hermes/.env", ""];
    if (llm.length > 0) {
      lines.push("# === LLM Provider ===");
      llm.forEach((p) => lines.push(`${p.envVar}=${p.placeholder}`));
      lines.push("");
    }
    if (tools.length > 0) {
      lines.push("# === Tool APIs (可选) ===");
      tools.forEach((p) => lines.push(`${p.envVar}=${p.placeholder}`));
      lines.push("");
    }
    if (llm.length === 0 && tools.length === 0) {
      lines.push("# 请在左侧勾选至少一个 LLM Provider");
    }
    return lines.join("\n");
  }, [selected]);

  const copy = () => {
    navigator.clipboard.writeText(envContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const llmProviders = providerOptions.filter((p) => p.group === "llm");
  const toolProviders = providerOptions.filter((p) => p.group === "tool");

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-border">
      <div className="border-b border-border bg-bg-card px-4 py-2 text-sm font-medium">
        .env 配置生成器
      </div>
      <div className="grid lg:grid-cols-2">
        {/* Left: checkboxes */}
        <div className="space-y-4 border-r border-border p-4">
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              LLM Provider（至少选一个）
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {llmProviders.map((p) => (
                <button
                  key={p.key}
                  onClick={() => toggle(p.key)}
                  className={`rounded-lg border p-3 text-left text-sm transition-all ${
                    selected.has(p.key)
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-text-muted"
                  }`}
                >
                  <div className="font-medium">{p.name}</div>
                  <div className="mt-1 text-xs text-text-muted">
                    {p.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              工具 API（可选，增强能力）
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {toolProviders.map((p) => (
                <button
                  key={p.key}
                  onClick={() => toggle(p.key)}
                  className={`rounded-lg border p-3 text-left text-sm transition-all ${
                    selected.has(p.key)
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-text-muted"
                  }`}
                >
                  <div className="font-medium">{p.name}</div>
                  <div className="mt-1 text-xs text-text-muted">
                    {p.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Right: preview */}
        <div className="relative bg-bg-primary p-4">
          <button
            onClick={copy}
            className="absolute right-4 top-4 rounded-md border border-border bg-bg-card px-2 py-1 text-xs text-text-muted transition-colors hover:text-accent"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
          <pre className="font-mono text-sm leading-relaxed text-text-secondary">
            {envContent}
          </pre>
        </div>
      </div>
    </div>
  );
}
