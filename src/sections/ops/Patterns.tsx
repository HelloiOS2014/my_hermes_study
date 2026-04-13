import { Section } from "../../components/layout/Section";
import { CardGrid } from "../../components/ui/CardGrid";

interface PatternCardProps {
  title: string;
  description: string;
  solution: string;
  variant: "good" | "bad";
}

function PatternCard({ title, description, solution, variant }: PatternCardProps) {
  const borderColor = variant === "good" ? "border-success/40" : "border-error/40";
  const bgColor = variant === "good" ? "bg-success/5" : "bg-error/5";
  const tagBg = variant === "good" ? "bg-success/20 text-success" : "bg-error/20 text-error";
  const tagLabel = variant === "good" ? "Good" : "Anti";
  const solutionLabel = variant === "good" ? "做法" : "解决";

  return (
    <div className={`rounded-lg border ${borderColor} ${bgColor} p-4`}>
      <div className="mb-2 flex items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${tagBg}`}>{tagLabel}</span>
        <h4 className="font-medium">{title}</h4>
      </div>
      <p className="text-sm text-text-secondary">{description}</p>
      <div className="mt-3 rounded border border-border bg-bg-primary/50 px-3 py-2 text-sm">
        <span className="font-medium text-text-muted">{solutionLabel}：</span>
        <span className="text-text-secondary">{solution}</span>
      </div>
    </div>
  );
}

const goodPatterns: PatternCardProps[] = [
  {
    title: "Memory 定期审视",
    description:
      "MEMORY.md 有约 2200 字符的容量上限。定期审视可以确保记忆内容始终是最新、最相关的，避免过时信息挤占空间。",
    solution:
      "设置 nudge interval 让 Agent 定期提醒你审视，或手动用 /memory 命令查看和编辑当前记忆内容。",
    variant: "good",
  },
  {
    title: "Skills Git 管理",
    description:
      "把 Skills 目录纳入版本控制，这样 Agent 自动覆盖你的 Skill 时，你可以随时 diff 和回滚，不会丢失手动优化。",
    solution:
      "cd ~/.hermes/skills && git init，然后定期 commit。覆盖后 git diff 看变化，git checkout 回滚。",
    variant: "good",
  },
  {
    title: "成本监控",
    description:
      "LLM API 费用容易失控，特别是使用 frontier 模型进行长对话时。主动监控比收到账单后惊讶要好得多。",
    solution:
      "在 API 平台设置 spending limit，启用 Smart Routing 让非关键请求自动降级到更便宜的模型，定期 check usage。",
    variant: "good",
  },
  {
    title: "Context 管理",
    description:
      "长对话会导致 context window 膨胀，不仅增加费用，还可能让模型"忘记"早期关键信息或产生幻觉。",
    solution:
      "主动使用 /compress 压缩上下文，保持对话聚焦在单一任务上。多个不相关任务应开新 session。",
    variant: "good",
  },
];

const antiPatterns: PatternCardProps[] = [
  {
    title: "Memory 写满不清理",
    description:
      "2200 字符上限意味着空间有限。如果全是过时的项目信息和已解决的问题，新的重要信息就写不进去了。",
    solution:
      "定期审视 MEMORY.md，删除已过时的条目。设置 nudge interval 让 Agent 提醒你清理。",
    variant: "bad",
  },
  {
    title: "Skill 被自动覆盖",
    description:
      "Agent 在执行 Skill 后会评估结果，如果它认为可以"改进"就会自动覆盖你的手动编辑——这是社区反馈最多的痛点。",
    solution:
      "用 Git 管理 Skills 目录，或在 Skill frontmatter 中设置高版本号锁定。详见 Layer 2 防覆盖策略。",
    variant: "bad",
  },
  {
    title: "Agent 幻觉工具",
    description:
      "Agent 有时会尝试调用不存在的工具，或调用已被禁用的 toolset 中的工具，导致报错或产生无意义的输出。",
    solution:
      "用 hermes tools check 确认已启用的工具集，重启 session 刷新工具列表。必要时在 config.yaml 中显式声明 toolsets。",
    variant: "bad",
  },
  {
    title: "费用失控",
    description:
      "没设 spending limit + 所有请求都走 frontier 模型 = 月底账单爆炸。一个深度调试 session 可能消耗几十美元。",
    solution:
      "启用 Smart Routing 让日常对话自动用便宜模型，frontier 只用于复杂任务。在 API 平台设硬性 spending limit。",
    variant: "bad",
  },
  {
    title: "Context 溢出",
    description:
      "50+ 轮对话不压缩，context 膨胀到接近窗口上限。模型开始丢失早期信息，输出质量急剧下降，token 费用飙升。",
    solution:
      "手动 /compress 或降低自动压缩阈值。养成习惯：一个任务完成就开新 session，而不是在同一个 session 里做所有事。",
    variant: "bad",
  },
];

export function Patterns() {
  return (
    <Section id="ops-patterns">
      <h3 className="text-xl font-semibold">Patterns & Anti-patterns</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        用好 Hermes 不只是会用命令——更重要的是养成好习惯、避开常见陷阱。
        下面是社区总结的最佳实践和反面教材，每一条都来自真实的踩坑经历。
      </p>

      {/* Good Patterns */}
      <h4 className="mt-8 text-lg font-semibold text-success">Good Patterns</h4>
      <p className="mt-1 text-sm text-text-muted">让 Hermes 越用越顺手的习惯</p>
      <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
        {goodPatterns.map((p) => (
          <PatternCard key={p.title} {...p} />
        ))}
      </div>

      {/* Anti-patterns */}
      <h4 className="mt-10 text-lg font-semibold text-error">Anti-patterns</h4>
      <p className="mt-1 text-sm text-text-muted">这些坑，踩一次就够了</p>
      <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
        {antiPatterns.map((p) => (
          <PatternCard key={p.title} {...p} />
        ))}
      </div>

      {/* Summary callout */}
      <div className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-4">
        <div className="mb-2 text-sm font-semibold text-accent">一句话总结</div>
        <p className="text-sm text-text-secondary">
          Good patterns 的核心是<strong>主动维护</strong>——定期清理 Memory、版本控制 Skills、监控费用、管理 Context。
          Anti-patterns 的本质是<strong>放任不管</strong>——让 Agent 自由发挥而不设边界，最终失控的是你自己。
        </p>
      </div>
    </Section>
  );
}
