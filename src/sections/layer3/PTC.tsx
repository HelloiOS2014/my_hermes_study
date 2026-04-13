import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { TabPanel } from "../../components/ui/TabPanel";

const ptcExample = [
  "# PTC Script Example: 批量文件重命名",
  "# LLM 生成此脚本，通过 RPC 调用 Hermes 工具",
  "",
  "import hermes_rpc",
  "",
  "# 1. 列出目录中的所有文件",
  'files = hermes_rpc.call("list_dir", {"path": "./src/components"})',
  "",
  "# 2. 筛选需要重命名的文件",
  "tsx_files = [f for f in files",
  '             if f.endswith(".tsx") and f[0].islower()]',
  "",
  "# 3. 批量执行重命名",
  "for old_name in tsx_files:",
  "    new_name = old_name[0].upper() + old_name[1:]",
  '    hermes_rpc.call("run_terminal", {',
  '        "command": f"mv ./src/components/{old_name}"',
  '                   f" ./src/components/{new_name}"',
  "    })",
  "",
  "# 4. 验证结果",
  'result = hermes_rpc.call("list_dir", {"path": "./src/components"})',
  "print(f'Renamed {len(tsx_files)} files')",
  "print(result)",
].join("\n");

const transportRows = [
  {
    label: "Local (UDS)",
    desc: "Unix Domain Socket 直连",
    detail:
      "CLI 模式下使用。Agent 进程内直接通过 UDS 调用工具 handler，零网络开销，延迟最低。",
  },
  {
    label: "Remote (file-based polling)",
    desc: "基于文件系统的轮询 RPC",
    detail:
      "Gateway / 远程模式下使用。PTC 脚本将调用请求写入共享文件，Agent 轮询执行并将结果写回。适用于沙箱隔离环境。",
  },
];

const sandboxTools = [
  "read_file",
  "write_file",
  "list_dir",
  "grep_search",
  "file_search",
  "run_terminal",
  "web_search",
];

export function PTC() {
  return (
    <Section id="ptc">
      <h3 className="text-xl font-semibold">PTC 编程式工具调用</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        PTC (Programmatic Tool Calling) 是 Hermes 的高级工具调用模式：
        LLM 不是逐个调用工具，而是<strong>生成一段 Python 脚本</strong>，
        通过 RPC 接口批量调用 Hermes 工具。这将多步工具链压缩为单次推理轮次。
      </p>

      <div className="mt-6">
        <CodeBlock
          code={ptcExample}
          lang="python"
          title="PTC Script -- LLM 生成的批量操作脚本"
        />
      </div>

      {/* Two transports */}
      <h4 className="mt-10 text-lg font-semibold">两种传输模式</h4>
      <div className="mt-4">
        <TabPanel
          tabs={transportRows.map((t) => ({
            label: t.label,
            content: (
              <div className="space-y-3">
                <p className="font-medium text-text-secondary">{t.desc}</p>
                <p className="text-sm text-text-secondary">{t.detail}</p>
              </div>
            ),
          }))}
        />
      </div>

      {/* Sandbox */}
      <h4 className="mt-10 text-lg font-semibold">沙箱限制：仅 7 个工具</h4>
      <p className="mt-3 leading-relaxed text-text-secondary">
        PTC 脚本运行在受限沙箱中，只能调用以下 7 个工具。
        这是安全设计——PTC 脚本由 LLM 生成，需要限制其能力边界：
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {sandboxTools.map((tool) => (
          <code
            key={tool}
            className="rounded-lg border border-border bg-bg-card px-3 py-1.5 text-sm"
          >
            {tool}
          </code>
        ))}
      </div>

      {/* Why box */}
      <div className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-5">
        <h4 className="mb-2 font-semibold text-accent">
          Why: 为什么需要 PTC？
        </h4>
        <p className="text-sm leading-relaxed text-text-secondary">
          传统 agent 循环中，每次工具调用都需要一轮 LLM 推理（发送请求 → 等待响应 → 解析 → 执行）。
          对于「重命名 50 个文件」这样的批量操作，需要 50+ 轮推理。PTC 让 LLM 一次生成完整的
          Python 脚本，通过 RPC 调用工具——<strong>50 次操作压缩为 1 次推理</strong>。
          这不仅大幅降低延迟和 API 成本，还减少了中间步骤出错的概率。
        </p>
      </div>
    </Section>
  );
}
