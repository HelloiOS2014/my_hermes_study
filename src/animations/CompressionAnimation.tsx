import { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

const steps = [
  { label: "\u539F\u59CB\u4E0A\u4E0B\u6587", tokens: 100, desc: "50+ \u8F6E\u5BF9\u8BDD\u7D2F\u79EF" },
  { label: "\u88C1\u526A\u65E7\u5DE5\u5177\u7ED3\u679C", tokens: 75, desc: "\u5EC9\u4EF7\u9884\u5904\u7406\uFF0C\u4E0D\u8C03 LLM" },
  { label: "\u4FDD\u62A4\u5934\u90E8", tokens: 75, desc: "System prompt + \u9996\u8F6E\u5BF9\u8BDD\u4E0D\u52A8" },
  { label: "\u4FDD\u62A4\u5C3E\u90E8", tokens: 75, desc: "\u6700\u8FD1 ~20K tokens \u4E0D\u52A8" },
  { label: "\u6458\u8981\u4E2D\u95F4\u6BB5", tokens: 40, desc: "\u7528 cheap model \u505A\u7ED3\u6784\u5316\u6458\u8981" },
];

const BAR_COLORS = ["#58a6ff", "#58a6ff", "#3fb950", "#3fb950", "#d29922"];

export function CompressionAnimation() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    if (currentStep >= steps.length - 1) return;

    const timer = setTimeout(() => {
      setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
    }, 800);

    return () => clearTimeout(timer);
  }, [inView, reduced, currentStep]);

  return (
    <div ref={ref} className="mt-6 rounded-lg border border-border bg-bg-card p-6">
      <h4 className="mb-4 text-sm font-semibold text-text-muted">
        Context Compression \u7B97\u6CD5\u6B65\u9AA4
      </h4>

      <div className="flex flex-col gap-3">
        {steps.map((step, i) => {
          const active = i <= currentStep;
          const color = BAR_COLORS[i] ?? "#58a6ff";

          return (
            <div
              key={step.label}
              className="flex items-center gap-4"
              style={{
                opacity: inView || reduced ? 1 : 0,
                transform: inView || reduced ? "none" : "translateX(-20px)",
                transition: reduced ? "none" : `all 0.4s ease-out ${i * 0.12}s`,
              }}
            >
              {/* Label + desc */}
              <div className="w-36 shrink-0">
                <div className="text-xs font-medium text-text-primary">
                  {step.label}
                </div>
                <div className="text-[10px] text-text-muted">{step.desc}</div>
              </div>

              {/* Token bar */}
              <div className="flex-1">
                <div className="h-5 rounded bg-bg-primary">
                  <div
                    className="flex h-full items-center rounded px-2 text-[10px] font-medium text-white"
                    style={{
                      width: active ? `${step.tokens}%` : "0%",
                      backgroundColor: color,
                      transition: reduced ? "none" : "width 0.6s ease-out",
                    }}
                  >
                    {active && `${step.tokens}%`}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs text-warning">
        \u26A0 \u89E6\u53D1\u9608\u503C: 50% context length
      </p>
    </div>
  );
}
