import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { TabPanel } from "../../components/ui/TabPanel";
import { ExtendedReading } from "../../components/ui/ExtendedReading";
import { ToolSchemaDesigner } from "../../playgrounds/ToolSchemaDesigner";

const schemaExample = `# schemas.py — 定义 tool 的名称、描述和参数
GET_WEATHER_SCHEMA = {
    "name": "get_weather",
    "description": "获取指定城市的当前天气信息",
    "parameters": {
        "type": "object",
        "properties": {
            "city": {
                "type": "string",
                "description": "城市名称，如 'Beijing'"
            },
            "unit": {
                "type": "string",
                "enum": ["celsius", "fahrenheit"],
                "description": "温度单位，默认 celsius"
            }
        },
        "required": ["city"]
    }
}`;

const handlerExample = `# handlers.py — 实现 tool 的实际逻辑
import json
import requests

def handle_get_weather(params: dict) -> str:
    """handler 必须返回 json.dumps() 字符串"""
    city = params["city"]
    unit = params.get("unit", "celsius")

    # 调用真实天气 API（示例）
    resp = requests.get(
        f"https://wttr.in/{city}?format=j1"
    )
    data = resp.json()
    temp = data["current_condition"][0]["temp_C"]

    return json.dumps({
        "city": city,
        "temperature": f"{temp}°C",
        "condition": data["current_condition"][0]["weatherDesc"][0]["value"]
    })`;

const registerExample = `# __init__.py — 注册 tool 到 Hermes
from hermes.tool_registry import registry
from .schemas import GET_WEATHER_SCHEMA
from .handlers import handle_get_weather

registry.register(
    schema=GET_WEATHER_SCHEMA,
    handler=handle_get_weather,
    category="utilities"
)`;

const pluginMethodExample = `# plugin.yaml — 一行注册，自动发现
name: weather-tools
version: "1.0"
tools:
  - schema: schemas.GET_WEATHER_SCHEMA
    handler: handlers.handle_get_weather`;

const debugExample = `# 验证 LLM 是否正确调用了你的 tool
hermes doctor --check-tools

# 查看 tool 注册状态
hermes tools list | grep get_weather

# 启用 debug 模式查看 tool 调用日志
hermes chat --debug
# 输出会包含：
# [TOOL_CALL] get_weather {"city": "Beijing"}
# [TOOL_RESULT] {"city": "Beijing", "temperature": "22°C", ...}

# 常见参数不匹配调试
# 1. LLM 传了 schema 中没有的参数 → 检查 description 是否清晰
# 2. required 参数缺失 → 检查 schema 的 required 数组
# 3. 类型不匹配 → 确保 enum/type 约束正确`;

export function CustomTool() {
  return (
    <Section id="custom-tool">
      <TypewriterTitle text="Layer 2 · 扩展" subtitle="让 Agent 获得新能力" />

      <h3 className="text-xl font-semibold">写自定义 Tool</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        Hermes 的强大之处在于你可以让 Agent 做<strong>任何事</strong>——
        只要你把它封装成一个 Tool。核心思路很简单：定义 Schema 告诉 LLM "这个工具能干什么"，
        实现 Handler 执行实际逻辑，然后注册到 Hermes。
      </p>

      <p className="mt-4 leading-relaxed text-text-secondary">
        有两种方式创建自定义 Tool：
      </p>

      <TabPanel
        tabs={[
          {
            label: "3-File 方法",
            content: (
              <div className="space-y-4">
                <p className="text-sm text-text-secondary">
                  最清晰的方式：<strong>schema</strong>（定义接口）→{" "}
                  <strong>handler</strong>（实现逻辑）→{" "}
                  <strong>register</strong>（注册到框架）。适合需要复杂逻辑或多文件组织的 Tool。
                </p>
                <CodeBlock code={schemaExample} lang="python" title="schemas.py" />
                <CodeBlock code={handlerExample} lang="python" title="handlers.py" />
                <CodeBlock code={registerExample} lang="python" title="__init__.py" />
              </div>
            ),
          },
          {
            label: "Plugin 方法",
            content: (
              <div className="space-y-4">
                <p className="text-sm text-text-secondary">
                  更简洁的方式：在 <code>plugin.yaml</code> 中声明 schema 和 handler 的映射，
                  Hermes 会自动发现并注册。适合轻量级 Tool。
                </p>
                <CodeBlock code={pluginMethodExample} lang="yaml" title="plugin.yaml" />
              </div>
            ),
          },
        ]}
      />

      {/* Testing & Debugging */}
      <h4 className="mt-8 text-lg font-semibold">测试与调试</h4>
      <p className="mt-2 text-sm text-text-secondary">
        写完 Tool 之后，你需要验证 LLM 能正确发现并调用它。最常见的问题是参数不匹配——
        LLM 理解的参数和你 Schema 定义的不一致。
      </p>
      <div className="mt-4">
        <CodeBlock code={debugExample} lang="bash" title="调试命令" />
      </div>

      {/* Why box */}
      <div className="mt-6 rounded-lg border border-warning/30 bg-warning/5 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-warning">
          <span>{"💡"}</span> 为什么 handler 必须返回 json.dumps() 字符串？
        </div>
        <p className="text-sm text-text-secondary">
          Hermes 的 Tool 结果会被注入到 LLM 的上下文中。LLM 需要结构化的文本来理解结果——
          返回原始 Python 对象（dict、list）会导致序列化不一致。<code>json.dumps()</code> 保证了
          输出格式可预测、可解析，也方便 Agent 在后续推理中引用具体字段。
        </p>
      </div>

      {/* Interactive Playground */}
      <h4 className="mt-8 text-lg font-semibold">Tool Schema 设计器</h4>
      <p className="mt-2 text-sm text-text-secondary">
        在下面的交互式设计器中拖拽参数，实时预览生成的 JSON Schema 和 Hermes XML 格式。
      </p>
      <ToolSchemaDesigner />

      <ExtendedReading
        links={[
          {
            title: "Hermes 官方 Adding Tools Guide",
            url: "https://docs.hermes-agent.dev/guides/adding-tools",
            source: "Official Docs",
          },
          {
            title: "Tool Use Best Practices for LLM Agents",
            url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use",
            source: "Anthropic",
          },
        ]}
      />
    </Section>
  );
}
