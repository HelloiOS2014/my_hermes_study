import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { HoverTable } from "../../components/ui/HoverTable";

const profileExample = `# 创建新 Profile（隔离的 Agent 实例）
hermes profile create work-assistant
hermes profile create code-reviewer

# 克隆现有 Profile（继承配置和记忆）
hermes profile clone default --name weekend-coder

# 切换 Profile
hermes profile use work-assistant

# 列出所有 Profile
hermes profile list
# default        (active)
# work-assistant
# code-reviewer
# weekend-coder`;

const delegateExample = `# Agent 在对话中使用 delegate_task 产生子 Agent
# 这是 LLM 自动调用的 tool，不是你手动执行的命令

# delegate_task 的 Schema（简化版）：
{
    "name": "delegate_task",
    "parameters": {
        "task": "分析这段代码的性能瓶颈并给出优化建议",
        "context": "Python web 应用，FastAPI 框架",
        "tools_allowed": ["read_file", "execute_command", "web_search"],
        "max_iterations": 20
    }
}

# 子 Agent 执行完成后，结果会返回给父 Agent
# 父 Agent 再决定如何整合子 Agent 的输出`;

const parallelExample = `# 多子 Agent 并行执行（ThreadPoolExecutor）
# 父 Agent 可以同时 delegate 多个任务

# 示例场景：代码审查
# 父 Agent 同时 delegate：
# 1. 子 Agent A → 检查代码风格和规范
# 2. 子 Agent B → 分析安全漏洞
# 3. 子 Agent C → 评估性能影响

# 每个子 Agent 独立运行，共享只读上下文
# 默认使用 ThreadPoolExecutor 管理并发
# 所有子 Agent 完成后，父 Agent 汇总结果`;

export function MultiAgent() {
  return (
    <Section id="multi-agent">
      <h3 className="text-xl font-semibold">多 Profile + 多 Agent 协作</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        一个 Hermes 实例可以扮演不同角色——通过 Profile 系统创建隔离的 Agent 实例，
        每个有独立的记忆、配置和 Skill。更进一步，Agent 可以通过 <code>delegate_task</code>
        工具产生子 Agent，实现多 Agent 协作。
      </p>

      {/* Profile system */}
      <h4 className="mt-6 text-lg font-semibold">Profile 系统</h4>
      <p className="mt-2 text-sm text-text-secondary">
        每个 Profile 是一个完全隔离的 Agent 实例——独立的 MEMORY.md、USER.md、Skills 和配置。
        你可以为不同场景创建不同的 Profile：工作助手、代码审查员、写作助手等。
      </p>
      <div className="mt-4">
        <CodeBlock code={profileExample} lang="bash" title="Profile 管理" />
      </div>

      {/* delegate_task */}
      <h4 className="mt-8 text-lg font-semibold">delegate_task：子 Agent 协作</h4>
      <p className="mt-2 text-sm text-text-secondary">
        当一个任务太复杂，Agent 可以"委派"子任务给新的子 Agent。子 Agent 在受限环境中执行，
        完成后将结果返回给父 Agent。
      </p>
      <div className="mt-4">
        <CodeBlock code={delegateExample} lang="python" title="delegate_task 示意" />
      </div>
      <div className="mt-4">
        <CodeBlock code={parallelExample} lang="python" title="并行子 Agent" />
      </div>

      {/* Constraints table */}
      <h4 className="mt-8 text-lg font-semibold">子 Agent 约束</h4>
      <div className="mt-4">
        <HoverTable
          headers={["约束", "值", "原因"]}
          rows={[
            ["最大嵌套深度", "2 层", "防止 Agent 无限递归产生子 Agent"],
            ["默认最大迭代", "50 次", "限制单个子 Agent 的 tool call 次数"],
            ["并行执行器", "ThreadPoolExecutor", "I/O 密集型任务的合理选择"],
            ["禁用 delegate_task", "子 Agent 不能再 delegate", "避免递归 Agent 产生"],
            ["禁用 clarify", "子 Agent 不能向用户提问", "子 Agent 不直接面向用户"],
            ["禁用 memory", "子 Agent 不能修改记忆", "防止子 Agent 污染父 Agent 记忆"],
            ["禁用 send_message", "子 Agent 不能发消息", "所有输出通过父 Agent 中转"],
          ]}
        />
      </div>

      {/* Why box */}
      <div className="mt-6 rounded-lg border border-warning/30 bg-warning/5 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-warning">
          <span>{"💡"}</span> 为什么子 Agent 不能使用 delegate / clarify / memory / send_message？
        </div>
        <p className="text-sm text-text-secondary">
          这四个限制的本质是<strong>防止递归和安全隔离</strong>。
          如果子 Agent 能继续 delegate，会导致 Agent 树无限增长，消耗大量 token 和计算资源。
          如果子 Agent 能修改 memory，多个并行子 Agent 可能产生记忆冲突。
          如果子 Agent 能 clarify 或 send_message，用户会收到来源不明的消息，
          打破了"父 Agent 负责所有用户交互"的架构原则。
        </p>
      </div>
    </Section>
  );
}
