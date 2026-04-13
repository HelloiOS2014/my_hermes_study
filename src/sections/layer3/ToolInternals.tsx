import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { HoverTable } from "../../components/ui/HoverTable";

const toolEntryCode = [
  "@dataclass",
  "class ToolEntry:",
  '    name: str                    # 工具名，如 "read_file"',
  '    toolset: str                 # 所属工具集，如 "filesystem"',
  "    schema: dict                 # JSON Schema (OpenAI format)",
  "    handler: Callable            # 实际执行函数",
  "    check_fn: Callable | None    # 前置检查（权限、参数校验）",
  "    requires_env: list[str]      # 需要的环境变量",
  "    is_async: bool               # 是否异步执行",
  '    emoji: str                   # 显示用 emoji，如 "📄"',
  "    max_result_size_chars: int   # 结果截断上限（字符数）",
  "",
  "",
  "class ToolRegistry:",
  '    """Singleton registry for all tools"""',
  "    _instance = None",
  "    _tools: dict[str, ToolEntry] = {}",
  "",
  "    @classmethod",
  "    def register(cls, entry: ToolEntry):",
  "        cls._tools[entry.name] = entry",
  "",
  "    @classmethod",
  "    def get(cls, name: str) -> ToolEntry:",
  "        return cls._tools[name]",
  "",
  "    @classmethod",
  "    def get_active_tools(cls) -> list[ToolEntry]:",
  "        return [t for t in cls._tools.values()",
  "                if t.check_fn is None or t.check_fn()]",
].join("\n");

const registerPatternCode = [
  "# tools/filesystem/read_file.py",
  "from ..registry import ToolRegistry, ToolEntry",
  "",
  "def _handle_read_file(path: str, offset: int = 0,",
  "                       limit: int | None = None) -> str:",
  '    """Read file contents with optional range"""',
  "    with open(path) as f:",
  "        lines = f.readlines()",
  "    if limit:",
  "        lines = lines[offset:offset + limit]",
  '    return "".join(lines)',
  "",
  "# Self-registration at import time!",
  "ToolRegistry.register(ToolEntry(",
  '    name="read_file",',
  '    toolset="filesystem",',
  "    schema={",
  '        "type": "function",',
  '        "function": {',
  '            "name": "read_file",',
  '            "description": "Read a file\'s contents",',
  '            "parameters": {',
  '                "type": "object",',
  '                "properties": {',
  '                    "path": {"type": "string"},',
  '                    "offset": {"type": "integer"},',
  '                    "limit": {"type": "integer"}',
  "                },",
  '                "required": ["path"]',
  "            }",
  "        }",
  "    },",
  "    handler=_handle_read_file,",
  "    check_fn=None,",
  "    requires_env=[],",
  "    is_async=False,",
  '    emoji="📄",',
  "    max_result_size_chars=50_000,",
  "))",
].join("\n");

const coercionExamples = [
  ["string → int", '"42" → 42', "当 schema 声明 type: integer 时自动转换"],
  ["string → bool", '"true" → True', "识别 true/false/yes/no 等常见布尔值"],
  ["string → float", '"3.14" → 3.14', "当 schema 声明 type: number 时转换"],
  ["string → list", '"[1,2,3]" → [1,2,3]', "尝试 JSON parse 字符串为数组"],
  ["null handling", 'null / "null" → None', "统一处理 null 值"],
];

export function ToolInternals() {
  return (
    <Section id="tool-internals">
      <h3 className="text-xl font-semibold">工具系统内核</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        Hermes 的工具系统围绕 <strong>ToolRegistry 单例</strong>构建。
        每个工具都是一个 <code>ToolEntry</code> 数据类，包含 schema、handler、
        权限检查等完整定义。工具文件在 import 时自动注册——无需手动维护列表。
      </p>

      <h4 className="mt-8 text-lg font-semibold">ToolEntry 结构 + Registry 模式</h4>
      <div className="mt-4">
        <CodeBlock
          code={toolEntryCode}
          lang="python"
          title="tools/registry.py -- ToolEntry & ToolRegistry"
        />
      </div>

      <h4 className="mt-10 text-lg font-semibold">自注册模式</h4>
      <p className="mt-3 leading-relaxed text-text-secondary">
        每个工具文件在被 import 时调用 <code>ToolRegistry.register()</code> 完成注册。
        框架启动时只需 import 工具目录，所有工具就自动就绪。
        这种模式让<strong>添加新工具</strong>变得极其简单——创建文件、实现 handler、调用 register 即可。
      </p>
      <div className="mt-4">
        <CodeBlock
          code={registerPatternCode}
          lang="python"
          title="tools/filesystem/read_file.py -- 自注册示例"
        />
      </div>

      {/* Parallel safety */}
      <h4 className="mt-10 text-lg font-semibold">并行安全机制</h4>
      <p className="mt-3 leading-relaxed text-text-secondary">
        工具的并行执行由三层机制保障（详见 Agent Loop 章节）：
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          {
            label: "_PARALLEL_SAFE_TOOLS",
            desc: "白名单：read_file、web_search 等只读工具",
            color: "text-success",
          },
          {
            label: "Path Conflict Detection",
            desc: "同文件操作自动串行化，防止竞态条件",
            color: "text-warning",
          },
          {
            label: "_NEVER_PARALLEL_TOOLS",
            desc: "黑名单：execute_code、write_file 等副作用工具",
            color: "text-error",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-border bg-bg-card p-4"
          >
            <code className={`text-xs font-bold ${item.color}`}>
              {item.label}
            </code>
            <p className="mt-2 text-sm text-text-secondary">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Argument coercion */}
      <h4 className="mt-10 text-lg font-semibold">参数自动转型</h4>
      <p className="mt-3 mb-4 leading-relaxed text-text-secondary">
        LLM 输出的 JSON 参数经常类型不精确（比如数字以字符串形式返回）。
        工具系统根据 schema 声明的类型自动转换，减少工具调用失败：
      </p>
      <HoverTable
        headers={["转换类型", "示例", "触发条件"]}
        rows={coercionExamples}
      />
    </Section>
  );
}
