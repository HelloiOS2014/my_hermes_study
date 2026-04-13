import { useState, useMemo } from "react";
import { promptLayers } from "../data/promptLayers";

const DEFAULT_VALUES: Record<string, string> = {
  "SOUL.md": "You are Hermes, a knowledgeable and helpful AI assistant. You are direct, precise, and always use your tools to take action rather than just describing what you would do.",
  "MEMORY.md": "- User prefers terminal over GUI\n- Project uses Python 3.11 + uv\n- Timezone: Asia/Shanghai",
  "USER.md": "- Developer with 5 years experience\n- Interested in AI agents and automation\n- Communicates in Chinese",
  "AGENTS.md": "# Project: hermes-tutorial\nTech stack: React + TypeScript + Tailwind\nConventions: Use functional components",
  "config.yaml": "Always respond in Chinese when the user writes in Chinese.",
};

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 3.5);
}

export function PromptAssembler() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [activeTab, setActiveTab] = useState("SOUL.md");

  const assembledPrompt = useMemo(() => {
    return promptLayers.map((layer) => {
      let content = "";
      switch (layer.order) {
        case 1: content = values["SOUL.md"] ?? ""; break;
        case 4: content = values["config.yaml"] ?? ""; break;
        case 5: content = `${values["MEMORY.md"] ?? ""}\n\n---\n\n${values["USER.md"] ?? ""}`; break;
        case 8: content = values["AGENTS.md"] ?? ""; break;
        default: content = layer.example;
      }
      return { ...layer, content };
    });
  }, [values]);

  const totalText = assembledPrompt.map((l) => l.content).join("\n\n");
  const totalTokens = estimateTokens(totalText);
  const editableTabs = ["SOUL.md", "MEMORY.md", "USER.md", "AGENTS.md", "config.yaml"];

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between border-b border-border bg-bg-card px-4 py-2">
        <span className="text-sm font-medium">Prompt 组装可视化器</span>
        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">~{totalTokens.toLocaleString()} tokens</span>
      </div>
      <div className="grid lg:grid-cols-2">
        <div className="border-r border-border">
          <div className="flex gap-1 border-b border-border bg-bg-primary px-2 py-1">
            {editableTabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded px-2 py-1 text-xs transition-colors ${activeTab === tab ? "bg-accent/10 text-accent" : "text-text-muted hover:text-text-secondary"}`}>{tab}</button>
            ))}
          </div>
          <textarea value={values[activeTab] ?? ""} onChange={(e) => setValues({ ...values, [activeTab]: e.target.value })} className="h-72 w-full resize-none bg-bg-primary p-4 font-mono text-sm text-text-primary outline-none" spellCheck={false} />
        </div>
        <div className="h-[350px] overflow-y-auto bg-bg-primary p-4">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">组装后的 System Prompt（10 层）</h4>
          {assembledPrompt.map((layer) => {
            const tokens = estimateTokens(layer.content);
            return (
              <div key={layer.order} className="mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">{layer.order}</span>
                  <span className="text-xs font-medium">{layer.name}</span>
                  <span className="text-xs text-text-muted">({layer.source})</span>
                  <span className="ml-auto text-xs text-text-muted">~{tokens}t</span>
                </div>
                <pre className="mt-1 rounded bg-bg-card p-2 text-xs text-text-secondary">{layer.content.length > 200 ? layer.content.slice(0, 200) + "..." : layer.content}</pre>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
