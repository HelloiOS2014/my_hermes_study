import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { FoldPanel } from "../../components/ui/FoldPanel";
import { HoverTable } from "../../components/ui/HoverTable";

const configHeaders = ["字段", "类型", "默认值", "说明"];

const basicConfig = [
  ["provider", "string", "openrouter", "LLM Provider"],
  ["model", "string", "-", "模型标识"],
  ["api_key", "string", "-", "API 密钥（建议放 .env）"],
  ["max_iterations", "int", "90", "最大工具调用轮次"],
];

const smartRouting = [
  ["smart_routing.enabled", "bool", "false", "启用双模型路由"],
  ["smart_routing.cheap_model", "string", "auto", "简单任务用的模型"],
];

const terminal = [
  ["terminal_backend", "string", "local", "终端后端 (local/docker/ssh/modal/daytona/singularity)"],
];

const memory = [
  ["memory_char_limit", "int", "2200", "MEMORY.md 字符上限"],
  ["user_char_limit", "int", "1375", "USER.md 字符上限"],
  ["memory_nudge_interval", "int", "10", "记忆审视提醒间隔（轮次）"],
];

const compression = [
  ["compression_threshold", "float", "0.5", "触发压缩的 context 占比"],
  ["compression_model", "string", "auto", "压缩用的模型"],
];

const mcp = [
  ["mcp_servers", "object", "{}", "MCP Server 配置"],
];

export function ConfigReference() {
  return (
    <Section id="appendix-config">
      <TypewriterTitle text="附录" subtitle="速查参考" />

      <h3 className="text-xl font-semibold">config.yaml 全字段速查</h3>
      <p className="mt-3 mb-6 text-text-secondary leading-relaxed">
        以下列出 Hermes Agent 配置文件中所有核心字段，按功能分组折叠展示。
      </p>

      <div className="rounded-lg border border-border">
        <FoldPanel title="基础配置" badge="4 字段" defaultOpen>
          <HoverTable headers={configHeaders} rows={basicConfig} />
        </FoldPanel>

        <FoldPanel title="Smart Routing" badge="2 字段">
          <HoverTable headers={configHeaders} rows={smartRouting} />
        </FoldPanel>

        <FoldPanel title="终端" badge="1 字段">
          <HoverTable headers={configHeaders} rows={terminal} />
        </FoldPanel>

        <FoldPanel title="记忆" badge="3 字段">
          <HoverTable headers={configHeaders} rows={memory} />
        </FoldPanel>

        <FoldPanel title="压缩" badge="2 字段">
          <HoverTable headers={configHeaders} rows={compression} />
        </FoldPanel>

        <FoldPanel title="MCP" badge="1 字段">
          <HoverTable headers={configHeaders} rows={mcp} />
        </FoldPanel>
      </div>
    </Section>
  );
}
