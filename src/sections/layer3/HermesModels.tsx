import { Section } from "../../components/layout/Section";
import { CardGrid } from "../../components/ui/CardGrid";
import { HoverTable } from "../../components/ui/HoverTable";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const models = [
  {
    title: "Hermes 2 Pro",
    icon: "🥈",
    description: "Function Calling 准确率 90%，JSON 模式 84%",
    detail: (
      <p>基于 Mistral/Llama 微调，首个达到生产级 function calling 准确率的开源模型。支持单轮和多轮工具调用。</p>
    ),
  },
  {
    title: "Hermes 3",
    icon: "🥇",
    description: "GOAP scratch_pad，更强的 Agent 能力",
    detail: (
      <p>引入目标导向行动规划（GOAP），在 {"<scratch_pad>"} 中进行 Goals/Actions/Observations/Reflections 推理后再调用工具。</p>
    ),
  },
  {
    title: "任意 LLM",
    icon: "🔄",
    description: "框架兼容 OpenAI/Anthropic/Gemini 等所有模型",
    detail: (
      <p>hermes-agent 框架使用标准 chat completions API，可搭配任何模型。但 Hermes 模型对 XML 工具调用格式有原生训练优化。</p>
    ),
  },
];

const datasetHeaders = ["子集", "内容", "规模"];
const datasetRows = [
  ["单轮 Function Calling", "单次工具调用场景", "~1,500 条"],
  ["多轮 Function Calling", "多步工具链场景", "~1,000 条"],
  ["Glaive Function Calling", "Glaive 合成数据", "~5,000 条"],
  ["Agentic JSON Mode", "Agent 决策 JSON 输出", "~800 条"],
  ["单轮 JSON Mode", "结构化 JSON 输出", "~500 条"],
];

export function HermesModels() {
  return (
    <Section id="hermes-models">
      <h3 className="text-2xl font-bold">Hermes 模型家族</h3>

      <p className="mt-4 text-text-secondary">
        Hermes 模型是 NousResearch 专门为 function calling 和 agent 场景训练的开源模型系列。
        hermes-agent 框架可以使用任何 LLM，但 Hermes 模型有原生优化。
      </p>

      <div className="mt-8">
        <CardGrid cards={models} columns={3} />
      </div>

      <h4 className="mt-10 text-lg font-semibold">训练数据：hermes-function-calling-v1</h4>
      <p className="mt-2 text-text-secondary">
        Hermes 模型的 function calling 能力来自精心构建的训练数据集（ShareGPT 格式，共 5 个子集）：
      </p>

      <div className="mt-4">
        <HoverTable headers={datasetHeaders} rows={datasetRows} />
      </div>

      <div className="mt-6 rounded-lg border border-accent/30 bg-accent/5 p-4">
        <p className="text-sm text-text-secondary">
          <strong className="text-accent">关键区分：</strong>
          hermes-agent 是<strong>框架</strong>（可搭配任何 LLM），Hermes 是<strong>模型</strong>（对 XML 格式有原生优化）。
          用 Hermes 模型 + hermes-agent 框架是最佳组合，但用 GPT-4o 或 Claude 也完全可以。
        </p>
      </div>

      <ExtendedReading
        links={[
          { title: "hermes-function-calling-v1 数据集", url: "https://huggingface.co/datasets/NousResearch/hermes-function-calling-v1", source: "HuggingFace" },
          { title: "Hermes 3 Technical Report", url: "https://arxiv.org/pdf/2408.11857", source: "arXiv" },
        ]}
      />
    </Section>
  );
}
