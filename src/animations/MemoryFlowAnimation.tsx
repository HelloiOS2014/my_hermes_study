import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

const layers = [
  { label: "MEMORY.md", color: "#d29922", desc: "Agent 笔记" },
  { label: "USER.md", color: "#3fb950", desc: "用户画像" },
  { label: "Session Search", color: "#58a6ff", desc: "FTS5 跨 session 搜索" },
  { label: "Honcho", color: "#a371f7", desc: "辩证式用户建模（可选）" },
];

export function MemoryFlowAnimation() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div ref={ref} className="mt-6 rounded-lg border border-border bg-bg-card p-6">
      <h4 className="mb-4 text-sm font-semibold text-text-muted">四层记忆 → System Prompt</h4>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        <div className="flex flex-col gap-3">
          {layers.map((layer, i) => (
            <div key={layer.label} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}
              className="flex items-center gap-3 rounded-lg border p-3 transition-all"
              style={{
                borderColor: hoveredIndex === i ? layer.color : "var(--color-border)",
                backgroundColor: hoveredIndex === i ? layer.color + "10" : "transparent",
                opacity: inView || reduced ? 1 : 0,
                transform: inView || reduced ? "none" : "translateX(-20px)",
                transition: reduced ? "none" : `all 0.5s ease-out ${i * 0.15}s`,
              }}>
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: layer.color }} />
              <div>
                <div className="text-sm font-medium">{layer.label}</div>
                <div className="text-xs text-text-muted">{layer.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-1 text-text-muted">
          <div className="hidden h-0.5 w-16 bg-border sm:block" />
          <span className="text-xs">frozen snapshot</span>
          <span className="text-lg">→</span>
        </div>
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-4"
          style={{
            opacity: inView || reduced ? 1 : 0,
            transform: inView || reduced ? "none" : "translateX(20px)",
            transition: reduced ? "none" : "all 0.5s ease-out 0.6s",
          }}>
          <div className="text-sm font-bold text-accent">System Prompt</div>
          <div className="mt-2 text-xs text-text-secondary">Layer 5: Persistent Memory</div>
          <div className="mt-1 text-xs text-text-muted">每次 session 开始时冻结快照<br />session 内不再变化（prefix caching）</div>
        </div>
      </div>
    </div>
  );
}
