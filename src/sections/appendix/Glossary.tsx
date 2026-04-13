import { Section } from "../../components/layout/Section";
import { HoverTable } from "../../components/ui/HoverTable";

const glossaryHeaders = ["术语", "英文", "解释"];

const glossaryRows = [
  ["Agent Loop", "Agent Loop", "核心对话循环：接收消息 → 调用 LLM → 执行工具 → 返回结果"],
  ["Skills", "Skills", "从经验中自动创建的可复用 markdown 指令"],
  ["Toolset", "Toolset", "工具分组，可整体启用/禁用"],
  ["Frozen Snapshot", "Frozen Snapshot", "记忆在 session 开始时冻结注入 prompt，session 内不变"],
  ["Prefix Caching", "Prefix Caching", "LLM Provider 缓存稳定的 system prompt 前缀"],
  ["PTC", "Programmatic Tool Calling", "LLM 写 Python 脚本通过 RPC 调用工具"],
  ["MCP", "Model Context Protocol", "连接外部工具服务的标准协议"],
  ["GOAP", "Goal-Oriented Action Planning", "Hermes 3 的目标导向行动规划"],
  ["Smart Routing", "Smart Routing", "简单任务自动路由到便宜模型"],
  ["Iteration Budget", "Iteration Budget", "Agent Loop 最大迭代次数（默认 parent 90 / child 50）"],
  ["Session Search", "Session Search", "基于 SQLite FTS5 的跨 session 全文搜索"],
  ["Honcho", "Honcho", "12 维度辩证式用户画像建模（可选）"],
  ["Memory Nudge", "Memory Nudge", "固定轮次后提醒 Agent 审视记忆"],
  ["Gateway", "Gateway", "20+ 平台消息网关"],
  ["Credential Pool", "Credential Pool", "多 API key 轮转机制"],
];

export function Glossary() {
  return (
    <Section id="appendix-glossary">
      <h3 className="text-xl font-semibold">术语表</h3>
      <p className="mt-3 mb-6 text-text-secondary leading-relaxed">
        Hermes Agent 核心概念与缩写的快速参考。
      </p>

      <HoverTable headers={glossaryHeaders} rows={glossaryRows} />
    </Section>
  );
}
