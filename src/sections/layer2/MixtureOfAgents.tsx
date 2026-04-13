import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { CardGrid } from "../../components/ui/CardGrid";

const moaConfigExample = `# config.yaml — Mixture of Agents 配置
mixture_of_agents:
  enabled: true
  strategy: "debate"    # debate | voting | layered

  # 参与推理的模型列表
  models:
    - provider: openai
      model: gpt-4o
      role: "primary"
    - provider: anthropic
      model: claude-sonnet-4-20250514
      role: "challenger"
    - provider: google
      model: gemini-2.0-pro
      role: "reviewer"

  # 协商参数
  max_rounds: 3         # 最多协商轮数
  consensus_threshold: 0.8  # 共识度阈值
  aggregator_model: "claude-sonnet-4-20250514"  # 最终汇总用的模型

# 使用方式
# hermes chat --moa
# 或在对话中：/moa on`;

const flowExample = `# Mixture of Agents 执行流程（debate 策略）

# Round 1：各模型独立回答
# GPT-4o    → "建议使用 PostgreSQL，因为..."
# Claude    → "建议使用 SQLite，因为..."
# Gemini    → "建议使用 PostgreSQL，但考虑..."

# Round 2：看到其他模型的回答后修正
# GPT-4o    → "同意 PostgreSQL，补充索引建议..."
# Claude    → "修正观点：并发场景下 PostgreSQL 更合适..."
# Gemini    → "综合来看 PostgreSQL + 读写分离..."

# Final：Aggregator 汇总
# Claude (aggregator) → "共识：使用 PostgreSQL。
#   关键决策因素：并发需求、索引优化、读写分离..."`;

export function MixtureOfAgents() {
  return (
    <Section id="mixture-of-agents">
      <h3 className="text-xl font-semibold">Mixture of Agents 多模型推理</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        让多个 LLM 就同一个问题独立推理，然后协商出最终答案。
        这不是简单的"多数投票"——每个模型可以看到其他模型的论证，
        经过多轮辩论后由 Aggregator 模型汇总出经过验证的结论。
      </p>

      <div className="mt-6">
        <CodeBlock code={moaConfigExample} lang="yaml" title="config.yaml — MoA 配置" />
      </div>

      <div className="mt-6">
        <CodeBlock code={flowExample} lang="bash" title="debate 执行流程示意" />
      </div>

      {/* When to use */}
      <h4 className="mt-8 text-lg font-semibold">什么场景值得使用？</h4>
      <p className="mt-2 text-sm text-text-secondary">
        MoA 的代价是 token 消耗翻倍甚至更多。以下场景的收益足以覆盖成本：
      </p>
      <div className="mt-4">
        <CardGrid
          columns={3}
          cards={[
            {
              title: "高风险决策",
              description: "架构选型、安全审计",
              detail: (
                <p className="text-sm text-text-secondary">
                  错误决策的代价远高于多花的 token。多个模型交叉验证能显著降低
                  单一模型的盲点风险——尤其是涉及安全、合规、数据架构等领域。
                </p>
              ),
            },
            {
              title: "创意发散",
              description: "方案探索、头脑风暴",
              detail: (
                <p className="text-sm text-text-secondary">
                  不同模型有不同的训练偏向，会产生真正多样化的方案。
                  GPT 可能偏向工程实践，Claude 偏向安全考量，Gemini 偏向多模态方案。
                </p>
              ),
            },
            {
              title: "代码审查",
              description: "关键 PR、核心逻辑",
              detail: (
                <p className="text-sm text-text-secondary">
                  让多个模型分别审查同一段代码，综合发现更多潜在问题。
                  实践中，MoA 代码审查比单模型审查多发现约 30% 的问题。
                </p>
              ),
            },
          ]}
        />
      </div>

      {/* Why box */}
      <div className="mt-6 rounded-lg border border-warning/30 bg-warning/5 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-warning">
          <span>{"💡"}</span> 什么场景不值得用 MoA？
        </div>
        <p className="text-sm text-text-secondary">
          日常对话、简单查询、格式转换——这些场景单模型已经足够好，
          使用 MoA 只会增加延迟和费用。经验法则：如果你不会为了同一个问题咨询三个专家，
          那就不需要 MoA。另外，MoA 的多轮协商意味着响应时间会增加 3-5 倍，
          对延迟敏感的交互式场景不适合。
        </p>
      </div>
    </Section>
  );
}
