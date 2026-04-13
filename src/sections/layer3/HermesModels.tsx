import { Section } from "../../components/layout/Section";
import { CardGrid } from "../../components/ui/CardGrid";
import { HoverTable } from "../../components/ui/HoverTable";

const modelCards = [
  {
    title: "Hermes 2 Pro",
    icon: "\u26A1",
    description: "90% function calling, 84% JSON mode",
    detail: (
      <ul className="list-disc space-y-1 pl-4">
        <li>基于 Mistral / Llama 2 微调</li>
        <li>Function calling 准确率 90%</li>
        <li>JSON mode 准确率 84%</li>
        <li>首次引入 XML tag function calling 格式</li>
        <li>支持 7B / 8x7B 等多种尺寸</li>
      </ul>
    ),
  },
  {
    title: "Hermes 3",
    icon: "\uD83E\uDDE0",
    description: "GOAP scratch_pad, stronger agent",
    detail: (
      <ul className="list-disc space-y-1 pl-4">
        <li>基于 Llama 3.1 系列微调 (8B / 70B / 405B)</li>
        <li>引入 GOAP scratch_pad 推理</li>
        <li>更强的多步推理和 agent 能力</li>
        <li>改进的 tool use 准确率和鲁棒性</li>
        <li>NousResearch 旗舰 agent 模型</li>
      </ul>
    ),
  },
  {
    title: "通用 LLM 兼容",
    icon: "\uD83D\uDD17",
    description: "任何 LLM 均可接入 hermes-agent",
    detail: (
      <ul className="list-disc space-y-1 pl-4">
        <li>GPT-4o / Claude / Gemini 通过 API adapter</li>
        <li>Ollama / vLLM 本地部署模型</li>
        <li>需要 system prompt 注入 XML 格式说明</li>
        <li>非 Hermes 模型可能需要更多 prompt engineering</li>
        <li>hermes-agent 自动检测并适配</li>
      </ul>
    ),
  },
];

const datasetSubsets = [
  ["func_calling_singleturn", "单轮工具调用", "基础 function calling 场景"],
  ["func_calling_multiturn", "多轮工具调用", "对话中多次调用工具"],
  ["func_calling_parallel", "并行工具调用", "同时调用多个工具"],
  ["json_mode", "JSON 结构输出", "按 schema 输出结构化数据"],
  ["glaive_func_calling", "Glaive 增强集", "来自 Glaive 的补充训练数据"],
];

export function HermesModels() {
  return (
    <Section id="hermes-models">
      <h3 className="text-xl font-semibold">Hermes 模型家族</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        NousResearch 发布的 Hermes 系列模型针对 agent 场景专门优化，
        通过 hermes-function-calling-v1 数据集训练出原生的 XML function calling 能力。
        但 hermes-agent 框架本身可以与<strong>任意 LLM</strong> 配合工作。
      </p>

      <div className="mt-6">
        <CardGrid columns={3} cards={modelCards} />
      </div>

      <h4 className="mt-10 text-lg font-semibold">训练数据：hermes-function-calling-v1</h4>
      <p className="mt-3 leading-relaxed text-text-secondary">
        Hermes 模型的 function calling 能力来自专门构建的训练数据集，
        包含 5 个子集覆盖不同的工具调用场景：
      </p>

      <div className="mt-6">
        <HoverTable
          headers={["子集名称", "描述", "覆盖场景"]}
          rows={datasetSubsets}
        />
      </div>

      {/* Key insight */}
      <div className="mt-8 rounded-lg border border-warning/30 bg-warning/5 p-5">
        <h4 className="mb-2 font-semibold text-warning">关键区分</h4>
        <p className="text-sm leading-relaxed text-text-secondary">
          <strong>hermes-agent</strong>（框架）和 <strong>Hermes 模型</strong>（LLM）是两个独立项目。
          框架可以接入 200+ 模型，但 Hermes 系列模型因为在训练数据中包含了 XML function calling 格式，
          能够更自然地生成 <code>&lt;tool_call&gt;</code> 标签——
          这就像母语者 vs 学了语法的外语者，都能沟通，但流畅度不同。
        </p>
      </div>
    </Section>
  );
}
