import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { FlipCard } from "../../components/ui/FlipCard";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const frameworks = [
  {
    front: (
      <>
        <h4 className="font-semibold text-accent">LangGraph</h4>
        <p className="mt-2 text-sm text-text-secondary">
          编排框架 &mdash; 状态机 + 有向图
        </p>
      </>
    ),
    back: (
      <>
        <h4 className="font-semibold text-accent">LangGraph</h4>
        <p className="mt-2 text-sm text-text-secondary">
          最适合生产级多 Agent 状态管理。基于有向图定义工作流，
          每个节点是一个 Agent 或工具调用，边表示状态转移。
          优势是可视化和可控性强，但学习曲线陡峭。
        </p>
      </>
    ),
  },
  {
    front: (
      <>
        <h4 className="font-semibold text-accent">CrewAI</h4>
        <p className="mt-2 text-sm text-text-secondary">
          团队协作框架 &mdash; 角色分工
        </p>
      </>
    ),
    back: (
      <>
        <h4 className="font-semibold text-accent">CrewAI</h4>
        <p className="mt-2 text-sm text-text-secondary">
          最适合业务流程自动化。通过定义角色（Agent）、任务（Task）和团队（Crew），
          模拟人类团队协作。上手简单，但复杂场景的可控性有限。
        </p>
      </>
    ),
  },
  {
    front: (
      <>
        <h4 className="font-semibold text-accent">AutoGen</h4>
        <p className="mt-2 text-sm text-text-secondary">
          对话式多 Agent &mdash; 辩论决策
        </p>
      </>
    ),
    back: (
      <>
        <h4 className="font-semibold text-accent">AutoGen</h4>
        <p className="mt-2 text-sm text-text-secondary">
          最适合多模型讨论场景。多个 Agent 通过对话协作，
          支持人类介入和代码执行。灵活性极高，但编排复杂度也高。
        </p>
      </>
    ),
  },
  {
    front: (
      <>
        <h4 className="font-semibold text-accent">Hermes Agent</h4>
        <p className="mt-2 text-sm text-text-secondary">
          个人持久化 Agent &mdash; 自进化
        </p>
      </>
    ),
    back: (
      <>
        <h4 className="font-semibold text-accent">Hermes Agent</h4>
        <p className="mt-2 text-sm text-text-secondary">
          最适合个人 Agent + 持续学习。通过 Memory 记住你的偏好，
          通过 Skills 系统学习新能力，跨会话持续成长。
          单 Agent 架构简单直接，但不适合复杂多 Agent 协作。
        </p>
      </>
    ),
  },
];

export function Comparison() {
  return (
    <Section id="comparison">
      <TypewriterTitle
        text="0.2 和其他框架有什么不同"
        subtitle="点击卡片翻转查看详情"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {frameworks.map((fw, i) => (
          <FlipCard key={i} front={fw.front} back={fw.back} />
        ))}
      </div>

      <ExtendedReading
        links={[
          {
            title: "AI Agent Frameworks Compared (2025)",
            url: "https://www.turingpost.com/p/hermes",
            source: "TuringPost",
          },
        ]}
      />
    </Section>
  );
}
