import { useState, useMemo } from "react";

interface ToolParam {
  name: string;
  type: "string" | "number" | "boolean" | "array";
  description: string;
  required: boolean;
}

interface ToolDef {
  name: string;
  description: string;
  parameters: ToolParam[];
}

const DEFAULT_TOOL: ToolDef = {
  name: "get_weather",
  description: "Get current weather for a location",
  parameters: [
    { name: "location", type: "string", description: "City name", required: true },
  ],
};

export function ToolSchemaDesigner() {
  const [tool, setTool] = useState<ToolDef>(DEFAULT_TOOL);
  const [activeTab, setActiveTab] = useState<"json" | "xml">("json");
  const [copied, setCopied] = useState(false);

  const jsonSchema = useMemo(() => {
    const properties: Record<string, { type: string; description: string }> = {};
    const required: string[] = [];

    for (const p of tool.parameters) {
      properties[p.name] = { type: p.type, description: p.description };
      if (p.required) required.push(p.name);
    }

    const schema = {
      type: "function" as const,
      function: {
        name: tool.name,
        description: tool.description,
        parameters: {
          type: "object" as const,
          properties,
          ...(required.length > 0 ? { required } : {}),
        },
      },
    };

    return JSON.stringify(schema, null, 2);
  }, [tool]);

  const hermesXml = useMemo(() => {
    const inner = jsonSchema;
    return `<tools>\n${inner}\n</tools>`;
  }, [jsonSchema]);

  const output = activeTab === "json" ? jsonSchema : hermesXml;

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateParam = (index: number, patch: Partial<ToolParam>) => {
    setTool((prev) => ({
      ...prev,
      parameters: prev.parameters.map((p, i) => (i === index ? { ...p, ...patch } : p)),
    }));
  };

  const removeParam = (index: number) => {
    setTool((prev) => ({
      ...prev,
      parameters: prev.parameters.filter((_, i) => i !== index),
    }));
  };

  const addParam = () => {
    setTool((prev) => ({
      ...prev,
      parameters: [...prev.parameters, { name: "", type: "string", description: "", required: false }],
    }));
  };

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-border">
      <div className="border-b border-border bg-bg-card px-4 py-2 text-sm font-medium">
        Tool Schema 设计器
      </div>
      <div className="grid lg:grid-cols-2">
        {/* Left panel: form */}
        <div className="space-y-4 border-r border-border p-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-text-muted">Tool Name</label>
            <input
              type="text"
              value={tool.name}
              onChange={(e) => setTool({ ...tool, name: e.target.value })}
              className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm outline-none focus:border-accent"
              placeholder="e.g. get_weather"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-text-muted">Description</label>
            <input
              type="text"
              value={tool.description}
              onChange={(e) => setTool({ ...tool, description: e.target.value })}
              className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm outline-none focus:border-accent"
              placeholder="What does this tool do?"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium text-text-muted">Parameters</label>
            <div className="space-y-3">
              {tool.parameters.map((param, i) => (
                <div key={i} className="rounded-lg border border-border bg-bg-card p-3">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={param.name}
                      onChange={(e) => updateParam(i, { name: e.target.value })}
                      className="rounded border border-border bg-bg-primary px-2 py-1 text-sm outline-none focus:border-accent"
                      placeholder="param name"
                    />
                    <select
                      value={param.type}
                      onChange={(e) => updateParam(i, { type: e.target.value as ToolParam["type"] })}
                      className="rounded border border-border bg-bg-primary px-2 py-1 text-sm outline-none focus:border-accent"
                    >
                      <option value="string">string</option>
                      <option value="number">number</option>
                      <option value="boolean">boolean</option>
                      <option value="array">array</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    value={param.description}
                    onChange={(e) => updateParam(i, { description: e.target.value })}
                    className="mt-2 w-full rounded border border-border bg-bg-primary px-2 py-1 text-sm outline-none focus:border-accent"
                    placeholder="parameter description"
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs text-text-secondary">
                      <input
                        type="checkbox"
                        checked={param.required}
                        onChange={(e) => updateParam(i, { required: e.target.checked })}
                        className="accent-accent"
                      />
                      Required
                    </label>
                    <button
                      onClick={() => removeParam(i)}
                      className="text-xs text-text-muted transition-colors hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={addParam}
              className="mt-3 rounded-lg border border-dashed border-border px-3 py-2 text-xs text-text-muted transition-colors hover:border-accent hover:text-accent"
            >
              + Add parameter
            </button>
          </div>
        </div>

        {/* Right panel: output */}
        <div className="relative bg-bg-primary">
          <div className="flex items-center justify-between border-b border-border px-2 py-1">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab("json")}
                className={`rounded px-2 py-1 text-xs transition-colors ${activeTab === "json" ? "bg-accent/10 text-accent" : "text-text-muted hover:text-text-secondary"}`}
              >
                JSON Schema
              </button>
              <button
                onClick={() => setActiveTab("xml")}
                className={`rounded px-2 py-1 text-xs transition-colors ${activeTab === "xml" ? "bg-accent/10 text-accent" : "text-text-muted hover:text-text-secondary"}`}
              >
                Hermes XML
              </button>
            </div>
            <button
              onClick={copyOutput}
              className="rounded-md border border-border bg-bg-card px-2 py-1 text-xs text-text-muted transition-colors hover:text-accent"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="h-[400px] overflow-y-auto p-4 font-mono text-sm leading-relaxed text-text-secondary">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}
