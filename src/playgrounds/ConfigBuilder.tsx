import { useState, useMemo } from "react";
import { providers } from "../data/models";

export function ConfigBuilder() {
  const [config, setConfig] = useState<Record<string, string>>({ provider: "openrouter", model: "nous-hermes-3", smart_routing: "true", max_iterations: "90" });
  const [copied, setCopied] = useState(false);
  const selectedProvider = providers.find((p) => p.key === config.provider);

  const yaml = useMemo(() => {
    const lines = ["# ~/.hermes/config.yaml", `provider: ${config.provider}`, `model: ${config.model}`];
    if (config.smart_routing === "true") lines.push("smart_routing:", "  enabled: true", "  cheap_model: auto");
    lines.push(`max_iterations: ${config.max_iterations}`);
    if (selectedProvider?.envVar) lines.push("", "# 在 ~/.hermes/.env 中配置:", `# ${selectedProvider.envVar}=your_key_here`);
    return lines.join("\n");
  }, [config, selectedProvider]);

  const copyYaml = () => { navigator.clipboard.writeText(yaml); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-border">
      <div className="border-b border-border bg-bg-card px-4 py-2 text-sm font-medium">config.yaml 构建器</div>
      <div className="grid lg:grid-cols-2">
        <div className="space-y-4 border-r border-border p-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-text-muted">Provider</label>
            <div className="grid grid-cols-2 gap-2">
              {providers.map((p) => (
                <button key={p.key} onClick={() => setConfig({ ...config, provider: p.key, model: p.models[0] ?? "" })} className={`rounded-lg border p-3 text-left text-sm transition-all ${config.provider === p.key ? "border-accent bg-accent/5" : "border-border hover:border-text-muted"}`}>
                  <div className="font-medium">{p.name}</div>
                  <div className="mt-1 text-xs text-text-muted">{p.description}</div>
                </button>
              ))}
            </div>
          </div>
          {selectedProvider && (
            <div>
              <label className="mb-1 block text-xs font-medium text-text-muted">Model</label>
              <select value={config.model} onChange={(e) => setConfig({ ...config, model: e.target.value })} className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm outline-none focus:border-accent">
                {selectedProvider.models.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div><div className="text-sm font-medium">Smart Routing</div><div className="text-xs text-text-muted">简单任务自动用便宜模型</div></div>
            <button onClick={() => setConfig({ ...config, smart_routing: config.smart_routing === "true" ? "false" : "true" })} className={`h-6 w-11 rounded-full transition-colors ${config.smart_routing === "true" ? "bg-accent" : "bg-bg-elevated"}`}>
              <div className={`h-5 w-5 rounded-full bg-white transition-transform ${config.smart_routing === "true" ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-text-muted">Max Iterations: {config.max_iterations}</label>
            <input type="range" min="10" max="150" step="10" value={config.max_iterations} onChange={(e) => setConfig({ ...config, max_iterations: e.target.value })} className="w-full accent-accent" />
          </div>
        </div>
        <div className="relative bg-bg-primary p-4">
          <button onClick={copyYaml} className="absolute right-4 top-4 rounded-md border border-border bg-bg-card px-2 py-1 text-xs text-text-muted transition-colors hover:text-accent">{copied ? "✓ Copied" : "Copy"}</button>
          <pre className="font-mono text-sm leading-relaxed text-text-secondary">{yaml}</pre>
        </div>
      </div>
    </div>
  );
}
