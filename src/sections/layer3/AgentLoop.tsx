import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { TabPanel } from "../../components/ui/TabPanel";
import { HoverTable } from "../../components/ui/HoverTable";
import { AgentSimulator } from "../../playgrounds/AgentSimulator";

const flowSteps = [
  { num: "1", title: "Initialize", desc: "加载配置、构建 ToolRegistry、初始化 memory snapshot" },
  { num: "2", title: "System Prompt", desc: "调用 _build_system_prompt() 组装 10 层 system prompt" },
  { num: "3", title: "Preflight Compression", desc: "如果历史消息超过 50% context 长度，触发压缩" },
  { num: "4", title: "Plugin Hooks", desc: "执行 pre_loop plugins（如 Honcho memory sync）" },
  { num: "5", title: "Main While Loop", desc: "核心循环：check interrupt → consume budget → build request → call LLM → tool_calls? execute : break → handle edge cases" },
  { num: "6", title: "Post-loop", desc: "保存 memory、更新 Skill、触发 post_loop plugins" },
];

const parallelSafeExample = [
  "# _PARALLEL_SAFE_TOOLS (whitelist)",
  "_PARALLEL_SAFE_TOOLS = {",
  '    "read_file", "list_dir", "web_search",',
  '    "web_extract", "grep_search", "file_search",',
  "}",
  "",
  "# _NEVER_PARALLEL_TOOLS (blacklist)",
  "_NEVER_PARALLEL_TOOLS = {",
  '    "execute_code", "write_file", "run_terminal",',
  "}",
  "",
  "# _MAX_TOOL_WORKERS = 8",
  "# Path conflict detection: if two tools",
  "# target the same file, serialize them",
].join("\n");

const apiModesRows = [
  ["chat_completions", "OpenAI-compatible API", "GPT-4o, Ollama, vLLM, etc."],
  ["codex_responses", "Codex Responses API", "o3, o4-mini (reasoning models)"],
  ["anthropic_messages", "Anthropic Messages API", "Claude 3.5/4 系列"],
];

export function AgentLoop() {
  return (
    <Section id="agent-loop">
      <h3 className="text-xl font-semibold">Agent Loop 源码剖析</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        <code>run_conversation()</code> 是 Hermes Agent 的心脏
        （<code>run_agent.py:7544</code>）。理解这个函数就理解了 agent 的完整生命周期。
      </p>

      {/* Numbered flow */}
      <div className="mt-6 space-y-3">
        {flowSteps.map((step) => (
          <div
            key={step.num}
            className="flex gap-4 rounded-lg border border-border bg-bg-card p-4"
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
              {step.num}
            </div>
            <div>
              <h4 className="font-medium">{step.title}</h4>
              <p className="mt-1 text-sm text-text-secondary">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Iteration Budget */}
      <h4 className="mt-10 text-lg font-semibold">Iteration Budget</h4>
      <p className="mt-3 leading-relaxed text-text-secondary">
        为了防止 agent 无限循环，系统设置了<strong>迭代预算</strong>：
        parent agent 最多 90 次迭代，child agent 最多 50 次。预算是 thread-safe 的，
        每次 tool call 消耗 1 次。特殊规则：<code>execute_code</code> 工具会
        <strong>退还</strong>预算（因为代码执行本身可能包含多步逻辑，不应重复计费）。
      </p>

      {/* Parallel Tool Execution */}
      <h4 className="mt-10 text-lg font-semibold">并行工具执行</h4>
      <p className="mt-3 leading-relaxed text-text-secondary">
        当 LLM 返回多个 tool_call 时，系统通过三层规则决定是否并行执行：
      </p>

      <div className="mt-6">
        <CodeBlock
          code={parallelSafeExample}
          lang="python"
          title="并行安全规则 -- run_agent.py"
        />
      </div>

      <ol className="mt-4 list-inside list-decimal space-y-2 text-sm text-text-secondary">
        <li>
          <strong>白名单检查</strong>：只有 _PARALLEL_SAFE_TOOLS 中的工具可以并行
        </li>
        <li>
          <strong>路径冲突检测</strong>：即使在白名单中，如果两个工具操作同一文件，自动串行化
        </li>
        <li>
          <strong>黑名单拒绝</strong>：_NEVER_PARALLEL_TOOLS 中的工具始终串行，最多 8 个 worker
        </li>
      </ol>

      {/* Three API Modes */}
      <h4 className="mt-10 text-lg font-semibold">三种 API 模式</h4>
      <p className="mt-3 mb-4 leading-relaxed text-text-secondary">
        Hermes Agent 通过 adapter 模式支持三种不同的 LLM API 协议：
      </p>

      <TabPanel
        tabs={[
          {
            label: "对比表",
            content: (
              <HoverTable
                headers={["模式", "API 格式", "适用模型"]}
                rows={apiModesRows}
              />
            ),
          },
          {
            label: "切换方式",
            content: (
              <div className="text-sm text-text-secondary">
                <p>
                  API 模式通过 <code>config.yaml</code> 中的 <code>api_mode</code> 字段配置，
                  或在运行时通过 <code>--api-mode</code> 参数指定。Agent 会根据选择的模型自动推断默认模式，
                  但你可以手动覆盖。
                </p>
                <CodeBlock
                  code={[
                    "# config.yaml",
                    "api_mode: chat_completions  # default",
                    "",
                    "# CLI override",
                    "hermes chat --api-mode anthropic_messages",
                  ].join("\n")}
                  lang="yaml"
                  title="API 模式配置"
                />
              </div>
            ),
          },
        ]}
      />

      {/* Video placeholder */}
      <div className="mt-8 flex aspect-video items-center justify-center rounded-lg border border-border bg-bg-card">
        <div className="text-center text-text-muted">
          <div className="text-4xl">{"▶"}</div>
          <p className="mt-2 text-sm">
            Agent Loop 生命周期动画 (~45s) -- Remotion 视频待集成
          </p>
        </div>
      </div>

      {/* Agent Simulator Playground */}
      <div className="mt-8">
        <h4 className="mb-4 text-lg font-semibold">Agent Loop 模拟器</h4>
        <AgentSimulator />
      </div>
    </Section>
  );
}
