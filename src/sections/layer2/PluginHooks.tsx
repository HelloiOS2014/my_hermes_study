import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { FoldPanel } from "../../components/ui/FoldPanel";

const preToolCallExample = `# pre_tool_call：在 Tool 执行前拦截
# 用途：日志记录、参数校验、权限控制

from hermes.hooks import hook

@hook("pre_tool_call")
def log_tool_usage(tool_name: str, params: dict, context: dict):
    """记录每次 tool 调用，便于审计和调试"""
    import logging
    logger = logging.getLogger("hermes.audit")
    logger.info(f"Tool called: {tool_name}, params: {params}")

    # 返回 None 表示放行，返回 dict 可以修改参数
    # 返回 {"block": True, "reason": "..."} 可以阻止调用
    if tool_name == "execute_command" and "rm -rf" in params.get("command", ""):
        return {"block": True, "reason": "危险命令已被拦截"}

    return None`;

const postToolCallExample = `# post_tool_call：在 Tool 返回结果后处理
# 用途：结果过滤、脱敏、metrics 采集

from hermes.hooks import hook

@hook("post_tool_call")
def filter_sensitive_data(tool_name: str, result: str, context: dict):
    """过滤 tool 返回结果中的敏感信息"""
    import re
    import json

    # 脱敏：隐藏 API keys、tokens 等
    sanitized = re.sub(
        r'(api_key|token|password|secret)["\\'s]*[:=]\\s*["\\'](.*?)["\\'']',
        r'\\1: "***REDACTED***"',
        result
    )

    # 采集 metrics
    context.setdefault("tool_call_count", 0)
    context["tool_call_count"] += 1

    return sanitized  # 返回修改后的结果`;

const preLlmCallExample = `# pre_llm_call：在发送请求到 LLM 前拦截
# 用途：prompt 注入检测、token 预算控制、请求改写

from hermes.hooks import hook

@hook("pre_llm_call")
def enforce_token_budget(messages: list, context: dict):
    """控制 token 消耗，超过预算时截断历史"""
    import tiktoken
    enc = tiktoken.encoding_for_model("gpt-4")

    total_tokens = sum(len(enc.encode(m["content"])) for m in messages)
    max_budget = context.get("token_budget", 100_000)

    if total_tokens > max_budget:
        # 保留 system prompt + 最近 10 条消息
        return {"messages": [messages[0]] + messages[-10:]}

    return None`;

const onSessionStartExample = `# on_session_start：session 初始化时触发
# 用途：加载自定义配置、环境检测、欢迎消息

from hermes.hooks import hook

@hook("on_session_start")
def setup_workspace(context: dict):
    """根据当前目录自动加载项目配置"""
    import os
    import yaml

    project_config = os.path.join(os.getcwd(), ".hermes-project.yaml")
    if os.path.exists(project_config):
        with open(project_config) as f:
            config = yaml.safe_load(f)
        context["project"] = config
        return {
            "system_prompt_append": f"当前项目: {config.get('name', 'unknown')}\\n"
                                   f"技术栈: {', '.join(config.get('stack', []))}"
        }

    return None`;

export function PluginHooks() {
  return (
    <Section id="plugin-hooks">
      <h3 className="text-xl font-semibold">Plugin Hooks（轻量扩展点）</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        不想写完整 Plugin？Hermes 提供了 4 个 Hook 点，让你用一个装饰器函数就能插入自定义逻辑。
        Hook 按执行时机分布在 Agent 生命周期的关键节点上：
      </p>

      {/* Hook lifecycle visual */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
        <span className="rounded-lg border border-border bg-bg-card px-3 py-2 font-mono text-accent">on_session_start</span>
        <span className="text-text-muted">{"-->"}</span>
        <span className="rounded-lg border border-border bg-bg-card px-3 py-2 font-mono text-accent">pre_llm_call</span>
        <span className="text-text-muted">{"-->"}</span>
        <span className="rounded-lg border border-border bg-bg-card px-3 py-2 font-mono text-warning">LLM</span>
        <span className="text-text-muted">{"-->"}</span>
        <span className="rounded-lg border border-border bg-bg-card px-3 py-2 font-mono text-accent">pre_tool_call</span>
        <span className="text-text-muted">{"-->"}</span>
        <span className="rounded-lg border border-border bg-bg-card px-3 py-2 font-mono text-warning">Tool</span>
        <span className="text-text-muted">{"-->"}</span>
        <span className="rounded-lg border border-border bg-bg-card px-3 py-2 font-mono text-accent">post_tool_call</span>
      </div>

      <div className="mt-8 space-y-1 rounded-lg border border-border">
        <FoldPanel title="pre_tool_call — Tool 执行前拦截" badge="最常用" defaultOpen>
          <p className="mb-3 text-sm text-text-secondary">
            每次 Agent 调用 Tool 之前触发。可以记录日志、校验参数、甚至阻止危险操作。
          </p>
          <CodeBlock code={preToolCallExample} lang="python" title="hooks/audit.py" />
        </FoldPanel>

        <FoldPanel title="post_tool_call — Tool 返回后处理" badge="安全必备">
          <p className="mb-3 text-sm text-text-secondary">
            Tool 执行完成后、结果返回给 LLM 之前触发。适合做结果脱敏、格式转换和 metrics 采集。
          </p>
          <CodeBlock code={postToolCallExample} lang="python" title="hooks/filter.py" />
        </FoldPanel>

        <FoldPanel title="pre_llm_call — LLM 请求前拦截">
          <p className="mb-3 text-sm text-text-secondary">
            在构造好消息列表、准备发送给 LLM 之前触发。可以控制 token 预算、检测 prompt 注入、修改请求。
          </p>
          <CodeBlock code={preLlmCallExample} lang="python" title="hooks/budget.py" />
        </FoldPanel>

        <FoldPanel title="on_session_start — Session 初始化">
          <p className="mb-3 text-sm text-text-secondary">
            新的对话 session 创建时触发。适合加载项目配置、检测环境、注入自定义 system prompt。
          </p>
          <CodeBlock code={onSessionStartExample} lang="python" title="hooks/workspace.py" />
        </FoldPanel>
      </div>
    </Section>
  );
}
