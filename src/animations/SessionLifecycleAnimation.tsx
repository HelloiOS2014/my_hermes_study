import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

const steps = [
  { icon: "\u{1F7E2}", label: "Session \u5F00\u59CB", desc: "\u52A0\u8F7D memory snapshot\uFF0C\u6784\u5EFA system prompt" },
  { icon: "\u{1F4AC}", label: "\u5BF9\u8BDD\u8FDB\u884C", desc: "\u7528\u6237\u6D88\u606F \u2192 LLM \u2192 \u5DE5\u5177\u8C03\u7528 \u2192 \u5FAA\u73AF" },
  { icon: "\u{1F4C8}", label: "Context \u81A8\u80C0", desc: "\u6D88\u606F\u5386\u53F2\u4E0D\u65AD\u589E\u957F" },
  { icon: "\u{1F5DC}", label: "\u538B\u7F29\u89E6\u53D1", desc: "\u8D85\u8FC7 50% context length \u2192 \u81EA\u52A8\u6458\u8981" },
  { icon: "\u{1F4BE}", label: "\u6301\u4E45\u5316", desc: "Session \u4FDD\u5B58\u5230 SQLite \u6570\u636E\u5E93" },
  { icon: "\u{1F50D}", label: "\u672A\u6765\u641C\u7D22", desc: "FTS5 \u5168\u6587\u7D22\u5F15\uFF0C\u540E\u7EED session \u53EF\u68C0\u7D22" },
];

export function SessionLifecycleAnimation() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="mt-6 rounded-lg border border-border bg-bg-card p-6">
      <h4 className="mb-4 text-sm font-semibold text-text-muted">
        Session \u751F\u547D\u5468\u671F
      </h4>

      <div className="relative ml-4">
        {/* Vertical connecting line */}
        <div
          className="absolute left-[7px] top-2 w-0.5 bg-border"
          style={{
            height: inView || reduced ? "calc(100% - 16px)" : "0%",
            transition: reduced ? "none" : "height 0.8s ease-out 0.2s",
          }}
        />

        <div className="flex flex-col gap-4">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className="relative flex items-start gap-3 pl-6"
              style={{
                opacity: inView || reduced ? 1 : 0,
                transform: inView || reduced ? "none" : "translateY(12px)",
                transition: reduced ? "none" : `all 0.4s ease-out ${i * 0.15}s`,
              }}
            >
              {/* Dot */}
              <span className="absolute left-0 top-0.5 text-sm">{step.icon}</span>

              {/* Content */}
              <div>
                <div className="text-sm font-medium text-text-primary">
                  {step.label}
                </div>
                <div className="text-xs text-text-muted">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
