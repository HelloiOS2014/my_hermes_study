import { Section } from "../../components/layout/Section";
import { MemorySandbox } from "../../playgrounds/MemorySandbox";
import { MemoryFlowAnimation } from "../../animations/MemoryFlowAnimation";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

export function MemorySystem() {
  return (
    <Section id="memory-system">
      <h3 className="text-xl font-semibold">记忆系统全貌</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        Hermes 的记忆系统有四个层次，从简单的本地文件到可选的云端推理，覆盖了不同场景的记忆需求。
      </p>

      {/* 4 subsections */}
      <div className="mt-6 space-y-6">
        {/* MEMORY.md */}
        <div className="rounded-lg border border-border bg-bg-card p-5">
          <h4 className="font-medium text-accent">1. MEMORY.md — Agent 笔记本</h4>
          <p className="mt-2 text-sm text-text-secondary">
            Agent 在对话中认为重要的信息（用户偏好、项目状态、关键决策）会通过 <code>memory</code> 工具写入
            <code>~/.hermes/MEMORY.md</code>。下次 session 启动时自动注入 system prompt。
            容量上限约 2200 字符，Agent 会定期被提醒审视和精简。
          </p>
        </div>

        {/* USER.md */}
        <div className="rounded-lg border border-border bg-bg-card p-5">
          <h4 className="font-medium text-accent">2. USER.md — 用户画像</h4>
          <p className="mt-2 text-sm text-text-secondary">
            与 MEMORY.md 类似，但专门存储<strong>关于用户的信息</strong>：编程经验、沟通习惯、时区偏好等。
            这让 Agent 能跨 session 保持对你的理解——你不需要每次都重新自我介绍。
          </p>
        </div>

        {/* Session Search */}
        <div className="rounded-lg border border-border bg-bg-card p-5">
          <h4 className="font-medium text-accent">3. Session Search — 跨 session 搜索</h4>
          <p className="mt-2 text-sm text-text-secondary">
            所有历史对话存储在 SQLite 中，通过 FTS5（全文搜索）引擎索引。
            Agent 可以搜索过去的对话记录——比如"我们上次讨论的数据库方案是什么？"
            这是 MEMORY.md 的重要补充：笔记本只记重点，搜索可以回溯所有细节。
          </p>
        </div>

        {/* Honcho */}
        <div className="rounded-lg border border-border bg-bg-card p-5">
          <h4 className="font-medium text-accent">4. Honcho — 辩证式用户建模（可选）</h4>
          <p className="mt-2 text-sm text-text-secondary">
            Honcho 是一个实验性功能：用独立的 LLM 推理过程分析你的行为模式，构建深层用户模型。
            它不是简单记录你说了什么，而是推断你<em>为什么</em>这样做。
          </p>
        </div>
      </div>

      {/* Why box */}
      <div className="mt-6 rounded-lg border border-warning/30 bg-warning/5 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-warning">
          <span>💡</span> 为什么 Honcho 默认关闭？
        </div>
        <p className="text-sm text-text-secondary">
          Honcho 需要额外的 LLM 调用来分析用户行为，这意味着更多的 API 费用和潜在的隐私顾虑。
          对于大多数用户来说，MEMORY.md + USER.md + Session Search 已经足够强大。
          Honcho 更适合需要深度个性化的长期使用场景。
        </p>
      </div>

      <MemorySandbox />
      <MemoryFlowAnimation />

      <ExtendedReading
        links={[
          {
            title: "Hermes Memory Architecture Deep Dive",
            url: "https://mranand.substack.com/p/inside-hermes-agent-how-a-self-improving",
            source: "Substack",
          },
          {
            title: "Honcho: Dialectical User Modeling",
            url: "https://github.com/plastic-labs/honcho",
            source: "GitHub",
          },
        ]}
      />
    </Section>
  );
}
