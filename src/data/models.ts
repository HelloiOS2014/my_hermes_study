export interface Provider { name: string; key: string; envVar: string; models: string[]; description: string; }

export const providers: Provider[] = [
  { name: "OpenRouter", key: "openrouter", envVar: "OPENROUTER_API_KEY", models: ["nous-hermes-3", "claude-3.5-sonnet", "gpt-4o", "gemini-2.0-flash"], description: "200+ 模型统一接入，推荐首选" },
  { name: "OpenAI", key: "openai", envVar: "OPENAI_API_KEY", models: ["gpt-4o", "gpt-4o-mini", "o1"], description: "直连 OpenAI API" },
  { name: "Anthropic", key: "anthropic", envVar: "ANTHROPIC_API_KEY", models: ["claude-opus-4", "claude-sonnet-4"], description: "原生 Anthropic Messages API 支持" },
  { name: "本地模型", key: "local", envVar: "", models: ["llama-3", "hermes-3-local", "qwen-2.5"], description: "通过 Ollama/vLLM 等本地服务" },
];

export interface ConfigOption { key: string; label: string; type: "select" | "toggle" | "text"; options?: { value: string; label: string }[]; default: string; description: string; }

export const configOptions: ConfigOption[] = [
  { key: "provider", label: "Provider", type: "select", options: providers.map((p) => ({ value: p.key, label: p.name })), default: "openrouter", description: "LLM 服务提供方" },
  { key: "model", label: "Model", type: "text", default: "nous-hermes-3", description: "模型标识" },
  { key: "smart_routing", label: "Smart Routing", type: "toggle", default: "true", description: "简单任务自动切换 cheap model 省费用" },
  { key: "max_iterations", label: "Max Iterations", type: "text", default: "90", description: "单次对话最大工具调用轮次" },
];
