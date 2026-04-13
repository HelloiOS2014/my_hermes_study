import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { TabPanel } from "../../components/ui/TabPanel";
import { ExtendedReading } from "../../components/ui/ExtendedReading";
import { FunctionCallingAnimation } from "../../animations/FunctionCallingAnimation";

const hermesFullExample = [
  "<tools>",
  '  <tool>{"name": "web_search", "description": "Search the web",',
  '         "parameters": {"query": {"type": "string"}}}</tool>',
  '  <tool>{"name": "execute_code", "description": "Run Python code",',
  '         "parameters": {"code": {"type": "string"}}}</tool>',
  "</tools>",
  "",
  "User: 帮我查一下今天北京的天气",
  "",
  "<scratch_pad>",
  "GOAP Analysis:",
  "- Goal: 获取北京今天的天气信息",
  "- Current State: 没有天气数据",
  "- Action Plan:",
  "  1. web_search 搜索北京天气",
  "  2. 解析结果并返回给用户",
  "- Expected Outcome: 用户获得准确的天气信息",
  "</scratch_pad>",
  "",
  "<tool_call>",
  '{"name": "web_search", "arguments": {"query": "北京今天天气"}}',
  "</tool_call>",
  "",
  "<tool_response>",
  '{"results": [{"title": "北京天气",',
  '  "snippet": "今天：晴，25°C / 15°C，东北风3级"}]}',
  "</tool_response>",
].join("\n");

const openaiExample = [
  "// OpenAI Function Calling (role-based API)",
  "{",
  '  "model": "gpt-4",',
  '  "messages": [{"role": "user", "content": "北京天气"}],',
  '  "tools": [{',
  '    "type": "function",',
  '    "function": {',
  '      "name": "web_search",',
  '      "parameters": {"type": "object",',
  '        "properties": {"query": {"type": "string"}}}',
  "    }",
  "  }]",
  "}",
  "",
  "// Response (separate tool_calls field):",
  "{",
  '  "choices": [{',
  '    "message": {',
  '      "role": "assistant",',
  '      "tool_calls": [{',
  '        "id": "call_abc123",',
  '        "function": {',
  '          "name": "web_search",',
  '          "arguments": "{\\"query\\": \\"北京天气\\"}"',
  "        }",
  "      }]",
  "    }",
  "  }]",
  "}",
].join("\n");

export function FunctionCalling() {
  return (
    <Section id="function-calling">
      <TypewriterTitle text="Layer 3 \u00B7 深入" subtitle="理解引擎" />

      <h3 className="text-xl font-semibold">Hermes Function Calling Format</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        Hermes 使用 <strong>XML tag 系统</strong>在纯文本流中实现 function calling。
        这套格式不依赖任何 API 层面的特殊字段，而是直接嵌入在模型的文本输出中。
        四个核心标签构成完整的工具调用协议：
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[
          {
            tag: "<tools>",
            desc: "在 system prompt 中声明可用工具的 schema，每个工具用 <tool> 子标签包裹",
          },
          {
            tag: "<tool_call>",
            desc: "模型输出的工具调用请求，包含 name 和 arguments 的 JSON",
          },
          {
            tag: "<tool_response>",
            desc: "工具执行结果注入回对话流，供模型继续推理",
          },
          {
            tag: "<scratch_pad>",
            desc: "GOAP 推理区域 -- Goal/State/Plan/Outcome 结构化思考，Hermes 3 引入",
          },
        ].map((item) => (
          <div
            key={item.tag}
            className="rounded-lg border border-border bg-bg-card p-4"
          >
            <code className="text-sm font-bold text-accent">{item.tag}</code>
            <p className="mt-2 text-sm text-text-secondary">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <CodeBlock
          code={hermesFullExample}
          lang="text"
          title="Hermes Function Calling -- 完整请求/响应流程"
        />
      </div>

      <FunctionCallingAnimation />

      <h4 className="mt-10 text-lg font-semibold">
        vs OpenAI: 两种 Function Calling 范式
      </h4>
      <p className="mt-3 leading-relaxed text-text-secondary">
        OpenAI 的 function calling 依赖 API 层面的 <code>tools</code> 字段和
        <code>tool_calls</code> 响应结构——工具调用是<strong>API 协议的一部分</strong>。
        而 Hermes 的方案将工具调用编码为<strong>纯文本 XML 标签</strong>，
        嵌入在模型的文本输出流中。
      </p>

      <div className="mt-6">
        <TabPanel
          tabs={[
            {
              label: "Hermes (XML in text)",
              content: (
                <CodeBlock
                  code={hermesFullExample}
                  lang="text"
                  title="XML 标签嵌入文本流"
                />
              ),
            },
            {
              label: "OpenAI (role-based API)",
              content: (
                <CodeBlock
                  code={openaiExample}
                  lang="json"
                  title="API 协议层的 tool_calls"
                />
              ),
            },
          ]}
        />
      </div>

      {/* Why box */}
      <div className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-5">
        <h4 className="mb-2 font-semibold text-accent">Why: 为什么用 XML 文本标签？</h4>
        <p className="text-sm leading-relaxed text-text-secondary">
          XML 标签直接嵌入文本流意味着模型在<strong>训练阶段</strong>就学会了工具调用格式，
          不依赖任何特定 API provider 的 function calling 实现。这让 Hermes 可以在任意
          LLM 后端（包括本地 Ollama、vLLM 等）上使用统一的工具调用协议——
          只要模型学过这套 XML 格式，就能自主完成 tool use，无需 API 层面的额外支持。
        </p>
      </div>

      <ExtendedReading
        links={[
          {
            title: "hermes-function-calling-v1 Dataset",
            url: "https://huggingface.co/datasets/NousResearch/hermes-function-calling-v1",
            source: "HuggingFace",
          },
          {
            title: "Hermes 2 Pro Function Calling Blog",
            url: "https://huggingface.co/blog/NousResearch/hermes-2-pro-function-calling",
            source: "HuggingFace Blog",
          },
        ]}
      />
    </Section>
  );
}
