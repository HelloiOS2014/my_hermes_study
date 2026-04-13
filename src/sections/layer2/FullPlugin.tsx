import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const dirStructure = `~/.hermes/plugins/my-translator/
├── plugin.yaml       # 插件元数据 + 配置
├── __init__.py       # 入口：注册 tools 和 hooks
├── schemas.py        # Tool Schema 定义
└── tools.py          # Tool Handler 实现`;

const pluginYamlExample = `# plugin.yaml — 插件元数据
name: my-translator
version: "1.0.0"
description: "翻译工具插件：支持多语言互译"
author: "your-name"
min_hermes_version: "0.9.0"

# 声明插件提供的 tools
tools:
  - name: translate_text
    schema: schemas.TRANSLATE_SCHEMA
    handler: tools.handle_translate

# 声明插件使用的 hooks
hooks:
  - event: post_tool_call
    handler: tools.add_translation_hint

# 配置项（用户可在 config.yaml 中覆盖）
config:
  default_target_lang: "zh"
  api_provider: "deepl"`;

const schemasExample = `# schemas.py — Tool Schema 定义
TRANSLATE_SCHEMA = {
    "name": "translate_text",
    "description": "将文本翻译为指定语言",
    "parameters": {
        "type": "object",
        "properties": {
            "text": {
                "type": "string",
                "description": "要翻译的文本"
            },
            "target_lang": {
                "type": "string",
                "description": "目标语言代码，如 zh, en, ja, ko"
            },
            "source_lang": {
                "type": "string",
                "description": "源语言代码（可选，自动检测）"
            }
        },
        "required": ["text", "target_lang"]
    }
}`;

const toolsExample = `# tools.py — Handler 实现
import json
import aiohttp

async def handle_translate(params: dict) -> str:
    """异步翻译 handler（is_async=True 自动识别）"""
    text = params["text"]
    target = params["target_lang"]
    source = params.get("source_lang", "auto")

    # 调用翻译 API
    async with aiohttp.ClientSession() as session:
        async with session.post(
            "https://api.deepl.com/v2/translate",
            data={
                "text": text,
                "target_lang": target.upper(),
                "source_lang": source.upper() if source != "auto" else "",
            },
            headers={"Authorization": "DeepL-Auth-Key YOUR_KEY"}
        ) as resp:
            data = await resp.json()

    return json.dumps({
        "translated": data["translations"][0]["text"],
        "detected_source": data["translations"][0]["detected_source_language"],
        "target_lang": target
    })

def add_translation_hint(tool_name: str, result: str, context: dict):
    """post_tool_call hook：为翻译结果添加提示"""
    if tool_name != "translate_text":
        return result
    try:
        data = json.loads(result)
        data["hint"] = "翻译结果仅供参考，请根据上下文调整"
        return json.dumps(data)
    except Exception:
        return result`;

const initExample = `# __init__.py — 插件入口
from hermes.plugin import Plugin
from .schemas import TRANSLATE_SCHEMA
from .tools import handle_translate, add_translation_hint

plugin = Plugin(__name__)

# 注册 tool
plugin.register_tool(
    schema=TRANSLATE_SCHEMA,
    handler=handle_translate,
    is_async=True  # 标记为异步 handler
)

# 注册 hook
plugin.register_hook(
    event="post_tool_call",
    handler=add_translation_hint
)`;

export function FullPlugin() {
  return (
    <Section id="full-plugin">
      <h3 className="text-xl font-semibold">写完整 Plugin（不 fork）</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        当你的扩展逻辑超出单个 Hook 能承载的范围——比如需要注册多个 Tool、配置项、
        以及 Hook 联动——就需要写一个完整的 Plugin。好消息是，你<strong>不需要 fork Hermes 源码</strong>，
        只需要在 <code>~/.hermes/plugins/</code> 目录下创建一个标准结构。
      </p>

      <div className="mt-6">
        <CodeBlock code={dirStructure} lang="bash" title="插件目录结构" />
      </div>

      <div className="mt-6 space-y-4">
        <CodeBlock code={pluginYamlExample} lang="yaml" title="plugin.yaml" />
        <CodeBlock code={schemasExample} lang="python" title="schemas.py" />
        <CodeBlock code={toolsExample} lang="python" title="tools.py" />
        <CodeBlock code={initExample} lang="python" title="__init__.py" />
      </div>

      {/* Async handler note */}
      <div className="mt-6 rounded-lg border border-accent/30 bg-accent/5 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-accent">
          <span>{"⚡"}</span> 异步 Handler 支持
        </div>
        <p className="text-sm text-text-secondary">
          如果你的 Tool 需要做网络请求或 I/O 操作，强烈建议使用 <code>async def</code> 定义 handler，
          并在注册时设置 <code>is_async=True</code>。Hermes 会自动在事件循环中调度异步 handler，
          避免阻塞其他 Tool 的执行。同步 handler 仍然完全支持，适合纯计算逻辑。
        </p>
      </div>

      <ExtendedReading
        links={[
          {
            title: "Hermes Plugin Building Guide",
            url: "https://docs.hermes-agent.dev/guides/building-plugins",
            source: "Official Docs",
          },
          {
            title: "Plugin API Reference",
            url: "https://docs.hermes-agent.dev/api/plugin-class",
            source: "Official Docs",
          },
        ]}
      />
    </Section>
  );
}
