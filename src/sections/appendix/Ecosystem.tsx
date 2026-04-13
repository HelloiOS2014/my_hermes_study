import { Section } from "../../components/layout/Section";
import { CardGrid } from "../../components/ui/CardGrid";

const officialCards = [
  {
    title: "Hermes Agent GitHub",
    description: "官方源码仓库",
    icon: "📦",
    detail: (
      <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
        github.com/NousResearch/hermes-agent
      </a>
    ),
  },
  {
    title: "官方文档",
    description: "安装、配置、API 全参考",
    icon: "📖",
    detail: (
      <a href="https://hermes-agent.nousresearch.com/docs/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
        hermes-agent.nousresearch.com/docs/
      </a>
    ),
  },
  {
    title: "Hermes Function Calling 参考实现",
    description: "函数调用示例与规范",
    icon: "🔧",
    detail: (
      <a href="https://github.com/NousResearch/hermes-function-calling" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
        github.com/NousResearch/hermes-function-calling
      </a>
    ),
  },
  {
    title: "hermes-agent-self-evolution",
    description: "自我进化机制源码",
    icon: "🧬",
    detail: (
      <a href="https://github.com/NousResearch/hermes-agent-self-evolution" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
        github.com/NousResearch/hermes-agent-self-evolution
      </a>
    ),
  },
];

const communityCards = [
  {
    title: "awesome-hermes-agent",
    description: "社区精选资源列表",
    icon: "🌟",
    detail: (
      <a href="https://github.com/topics/hermes-agent" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
        GitHub Topics: hermes-agent
      </a>
    ),
  },
  {
    title: "agentskills.io",
    description: "开放标准 Agent Skills 规范",
    icon: "🎯",
    detail: (
      <a href="https://agentskills.io" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
        agentskills.io
      </a>
    ),
  },
  {
    title: "hermes-function-calling-v1 数据集",
    description: "HuggingFace 开源训练数据",
    icon: "🤗",
    detail: (
      <a href="https://huggingface.co/datasets/NousResearch/hermes-function-calling-v1" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
        HuggingFace: hermes-function-calling-v1
      </a>
    ),
  },
  {
    title: "Hermes 3 论文",
    description: "arXiv 2408.11857",
    icon: "📄",
    detail: (
      <a href="https://arxiv.org/abs/2408.11857" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
        arxiv.org/abs/2408.11857
      </a>
    ),
  },
];

const tutorialCards = [
  {
    title: "DataCamp Tutorial",
    description: "入门教程：从零搭建 Hermes Agent",
    icon: "🎓",
    detail: (
      <a href="https://www.datacamp.com/tutorial/hermes-agent" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
        datacamp.com/tutorial/hermes-agent
      </a>
    ),
  },
  {
    title: "NxCode Setup Guide",
    description: "环境配置与部署指南",
    icon: "⚙️",
    detail: (
      <a href="https://nxcode.dev/hermes-agent-setup" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
        nxcode.dev/hermes-agent-setup
      </a>
    ),
  },
  {
    title: "Substack: Inside Hermes Agent",
    description: "深度剖析架构与设计决策",
    icon: "✍️",
    detail: (
      <a href="https://substack.com/inside-hermes-agent" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
        Substack: Inside Hermes Agent
      </a>
    ),
  },
  {
    title: "DEV Community: Honest Review",
    description: "社区用户诚实评测",
    icon: "💬",
    detail: (
      <a href="https://dev.to/hermes-agent-honest-review" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
        dev.to: Honest Review
      </a>
    ),
  },
  {
    title: "Medium: Complete Setup Guide",
    description: "完整安装与配置教程",
    icon: "📝",
    detail: (
      <a href="https://medium.com/hermes-agent-complete-setup" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
        Medium: Complete Setup Guide
      </a>
    ),
  },
  {
    title: "TuringPost: Hermes vs OpenClaw",
    description: "横向对比评测",
    icon: "⚖️",
    detail: (
      <a href="https://www.turingpost.com/hermes-vs-openclaw" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
        TuringPost: Hermes vs OpenClaw
      </a>
    ),
  },
];

export function Ecosystem() {
  return (
    <Section id="appendix-ecosystem">
      <h3 className="text-xl font-semibold">生态地图</h3>
      <p className="mt-3 mb-6 text-text-secondary leading-relaxed">
        Hermes Agent 相关的官方资源、社区项目、教程与博文汇总。点击卡片展开链接。
      </p>

      <h4 className="mb-3 text-sm font-semibold text-text-muted uppercase tracking-wide">官方资源</h4>
      <CardGrid cards={officialCards} columns={2} />

      <h4 className="mt-8 mb-3 text-sm font-semibold text-text-muted uppercase tracking-wide">社区资源</h4>
      <CardGrid cards={communityCards} columns={2} />

      <h4 className="mt-8 mb-3 text-sm font-semibold text-text-muted uppercase tracking-wide">教程与博文</h4>
      <CardGrid cards={tutorialCards} columns={2} />
    </Section>
  );
}
