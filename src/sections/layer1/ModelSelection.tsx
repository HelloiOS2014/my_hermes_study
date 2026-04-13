import { Section } from "../../components/layout/Section";
import { ConfigBuilder } from "../../playgrounds/ConfigBuilder";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

export function ModelSelection() {
  return (
    <Section id="model-selection">
      <h3 className="text-xl font-semibold">选模型 + Smart Routing + 成本控制</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        Hermes 支持 200+ 模型，通过 OpenRouter 聚合或直连各家 API。
        但真正的杀手锏是 <strong>Smart Routing</strong>——自动判断任务复杂度，
        简单任务用便宜模型，复杂任务才调度前沿模型。
      </p>
      <p className="mt-2 leading-relaxed text-text-secondary">
        现实中，80% 的日常任务根本不需要 frontier model。
        开启 Smart Routing 后，Agent 会在 cheap model 和 main model 间智能切换。
      </p>

      {/* Why box */}
      <div className="mt-6 rounded-lg border border-warning/30 bg-warning/5 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-warning">
          <span>💡</span> 为什么需要双模型路由？
        </div>
        <p className="text-sm text-text-secondary">
          如果所有请求都打到 GPT-4 / Claude Opus 级别的模型，一天下来 API 费用可能超过 $10。
          而大部分"帮我改个变量名"、"查一下语法"这类任务，用 GPT-4o-mini 或 Haiku 就绰绰有余。
          Smart Routing 能帮你节省高达 <strong>10 倍</strong>的成本。
        </p>
      </div>

      <ConfigBuilder />

      <ExtendedReading
        links={[
          {
            title: "Hermes 配置参考（config.yaml）",
            url: "https://hermes-agent.nousresearch.com/docs/user-guide/configuration",
            source: "Official Docs",
          },
          {
            title: "OpenRouter Model 列表",
            url: "https://openrouter.ai/models",
            source: "OpenRouter",
          },
        ]}
      />
    </Section>
  );
}
