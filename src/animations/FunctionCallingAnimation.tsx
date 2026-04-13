import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

const steps = [
  {
    icon: "\u{1F4CB}",
    label: "System Prompt",
    desc: "<tools> \u5B9A\u4E49\u6CE8\u5165",
    code: '<tools>[{"name":"web_search"...}]</tools>',
  },
  {
    icon: "\u{1F916}",
    label: "Model \u8F93\u51FA",
    desc: "<tool_call> \u8C03\u7528",
    code: '<tool_call>\n{"name":"web_search",\n "arguments":{"query":"..."}}\n</tool_call>',
  },
  {
    icon: "\u26A1",
    label: "\u5DE5\u5177\u6267\u884C",
    desc: "\u6267\u884C\u5E76\u8FD4\u56DE\u7ED3\u679C",
    code: 'web_search(query="MCP protocol") \u2192 8 results',
  },
  {
    icon: "\u{1F4E8}",
    label: "\u7ED3\u679C\u6CE8\u5165",
    desc: "<tool_response> \u8FD4\u56DE",
    code: "<tool_response>\n{\"results\":[...]}\n</tool_response>",
  },
  {
    icon: "\u{1F4AC}",
    label: "\u7EE7\u7EED\u63A8\u7406",
    desc: "Model \u751F\u6210\u6700\u7EC8\u56DE\u590D",
    code: "\u6839\u636E\u641C\u7D22\u7ED3\u679C\uFF0CMCP \u534F\u8BAE\u662F...",
  },
];

const hermesExample = `<tools>
[{"type":"function",
  "function":{"name":"web_search",
    "parameters":{...}}}]
</tools>

<tool_call>
{"name":"web_search","arguments":{"query":"MCP"}}
</tool_call>

<tool_response>
{"results":[...]}
</tool_response>`;

const openaiExample = `// Request
{"tools":[{"type":"function",
  "function":{"name":"web_search",
    "parameters":{...}}}],
 "messages":[...]}

// Response
{"tool_calls":[{"function":{
  "name":"web_search",
  "arguments":"{\\"query\\":\\"MCP\\"}"}}]}`;

export function FunctionCallingAnimation() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="mt-6 rounded-lg border border-border bg-bg-card p-6">
      <h4 className="mb-4 text-sm font-semibold text-text-muted">
        Function Calling \u65F6\u5E8F
      </h4>

      {/* Step flow */}
      <div className="flex flex-wrap justify-center gap-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center">
            <div
              className="flex flex-col items-center rounded-lg border border-border p-3 text-center transition-all hover:border-accent"
              style={{
                opacity: inView || reduced ? 1 : 0,
                transform: inView || reduced ? "none" : "translateY(10px)",
                transition: reduced ? "none" : `all 0.4s ease-out ${i * 0.12}s`,
                minWidth: "120px",
                maxWidth: "160px",
              }}
            >
              <span className="text-xl">{step.icon}</span>
              <span className="mt-1 text-xs font-medium">{step.label}</span>
              <span className="mt-0.5 text-[10px] text-text-muted">{step.desc}</span>
              <pre className="mt-2 w-full overflow-x-auto rounded bg-bg-primary p-1.5 text-left text-[10px] leading-tight text-text-secondary">
                {step.code}
              </pre>
            </div>
            {i < steps.length - 1 && (
              <span className="mx-1 text-text-muted">\u2192</span>
            )}
          </div>
        ))}
      </div>

      {/* Comparison section */}
      <div className="mt-6">
        <h4 className="mb-3 text-sm font-semibold text-text-muted">
          Hermes XML vs OpenAI API \u683C\u5F0F\u5BF9\u6BD4
        </h4>
        <div
          className="grid gap-4 sm:grid-cols-2"
          style={{
            opacity: inView || reduced ? 1 : 0,
            transform: inView || reduced ? "none" : "translateY(10px)",
            transition: reduced ? "none" : "all 0.5s ease-out 0.7s",
          }}
        >
          <div className="rounded-lg border border-accent/40 bg-bg-primary p-4">
            <div className="mb-2 text-xs font-semibold text-accent">
              Hermes XML\uFF08\u660E\u6587\u5D4C\u5165 prompt\uFF09
            </div>
            <pre className="overflow-x-auto text-[10px] leading-tight text-text-secondary">
              {hermesExample}
            </pre>
          </div>
          <div className="rounded-lg border border-warning/40 bg-bg-primary p-4">
            <div className="mb-2 text-xs font-semibold text-warning">
              OpenAI API\uFF08JSON \u53C2\u6570\uFF09
            </div>
            <pre className="overflow-x-auto text-[10px] leading-tight text-text-secondary">
              {openaiExample}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
