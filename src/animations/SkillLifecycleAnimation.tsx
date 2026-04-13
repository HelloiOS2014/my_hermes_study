import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

const stages = [
  { icon: "🔧", label: "经验积累", desc: "5+ tool calls 完成复杂任务" },
  { icon: "✨", label: "自动创建", desc: "Agent 被提示保存为 Skill" },
  { icon: "💾", label: "存储", desc: "~/.hermes/skills/SKILL.md" },
  { icon: "🔍", label: "检索匹配", desc: "后续任务匹配到相关 Skill" },
  { icon: "📖", label: "使用", desc: "Skill 全文加载到 context" },
  { icon: "🔄", label: "改进/覆盖", desc: "Agent 发现过时则自动更新" },
];

export function SkillLifecycleAnimation() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="mt-6 rounded-lg border border-border bg-bg-card p-6">
      <h4 className="mb-4 text-sm font-semibold text-text-muted">Skill 生命周期</h4>
      <div className="flex flex-wrap justify-center gap-2">
        {stages.map((stage, i) => (
          <div key={stage.label} className="flex items-center">
            <div className="flex flex-col items-center rounded-lg border border-border p-3 text-center transition-all hover:border-accent"
              style={{
                opacity: inView || reduced ? 1 : 0,
                transform: inView || reduced ? "none" : "translateY(10px)",
                transition: reduced ? "none" : `all 0.4s ease-out ${i * 0.12}s`,
                minWidth: "100px",
              }}>
              <span className="text-xl">{stage.icon}</span>
              <span className="mt-1 text-xs font-medium">{stage.label}</span>
              <span className="mt-0.5 text-[10px] text-text-muted">{stage.desc}</span>
            </div>
            {i < stages.length - 1 && <span className="mx-1 text-text-muted">→</span>}
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-warning">⚠ 注意：Agent 可能覆盖你手动编辑的 Skill。建议用 Git 管理 skills 目录。</p>
    </div>
  );
}
