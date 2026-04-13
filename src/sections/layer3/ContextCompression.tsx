import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { CompressionAnimation } from "../../animations/CompressionAnimation";
import { SessionLifecycleAnimation } from "../../animations/SessionLifecycleAnimation";

const pseudocode = [
  "class ContextCompressor:",
  "    threshold = 0.50  # 50% of context length",
  "",
  "    def maybe_compress(self, messages, max_tokens):",
  "        used = count_tokens(messages)",
  "        if used < max_tokens * self.threshold:",
  "            return messages  # no compression needed",
  "",
  "        # Step 1: Identify compressible segments",
  "        segments = self.find_segments(messages)",
  "",
  "        # Step 2: Summarize old segments",
  "        summaries = []",
  "        for seg in segments[:-KEEP_RECENT]:",
  "            summary = llm.summarize(",
  "                seg,",
  '                instruction="Preserve tool calls,',
  '                    key decisions, and user preferences"',
  "            )",
  "            summaries.append(summary)",
  "",
  "        # Step 3: Rebuild message list",
  "        compressed = [",
  "            self.make_summary_prefix(summaries),",
  "            *messages[-KEEP_RECENT:]  # keep recent",
  "        ]",
  "        return compressed",
  "",
  "    def make_summary_prefix(self, summaries):",
  '        """Inject summary as a system message',
  '        at the start of conversation"""',
  "        return {",
  '            "role": "system",',
  '            "content": (',
  '                "[Compressed Context]\\n"',
  '                + "\\n".join(summaries)',
  "            )",
  "        }",
].join("\n");

export function ContextCompression() {
  return (
    <Section id="context-compression">
      <h3 className="text-xl font-semibold">Context Compression 算法</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        长对话的核心挑战：context window 有限，但对话历史不断增长。
        <code>context_compressor.py</code> 实现了一套
        <strong>自适应压缩算法</strong>，在保留关键信息的同时控制 token 用量。
      </p>

      {/* Trigger threshold */}
      <div className="mt-6 flex items-center gap-4 rounded-lg border border-border bg-bg-card p-5">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-warning/10 text-2xl font-bold text-warning">
          50%
        </div>
        <div>
          <h4 className="font-medium">触发阈值</h4>
          <p className="mt-1 text-sm text-text-secondary">
            当已用 token 超过 context window 的 <strong>50%</strong> 时，
            压缩器自动启动。这个阈值确保有足够空间进行压缩摘要的生成，
            同时保留最近的对话上下文。
          </p>
        </div>
      </div>

      {/* Algorithm steps */}
      <h4 className="mt-8 text-lg font-semibold">算法流程</h4>
      <div className="mt-4 space-y-3">
        {[
          {
            step: "1. 检测",
            desc: "计算当前 messages 的 token 总量，与 max_tokens * 0.5 比较",
          },
          {
            step: "2. 分段",
            desc: "将历史消息按对话轮次分段，识别可压缩的旧段落",
          },
          {
            step: "3. 摘要",
            desc: "对旧段落调用 LLM 生成摘要，指令要求保留工具调用记录、关键决策和用户偏好",
          },
          {
            step: "4. 重组",
            desc: "将摘要作为 summary prefix 注入对话开头，保留最近几轮的原始消息",
          },
        ].map((item) => (
          <div
            key={item.step}
            className="flex gap-4 rounded-lg border border-border p-4"
          >
            <code className="flex-shrink-0 text-sm font-bold text-accent">
              {item.step}
            </code>
            <p className="text-sm text-text-secondary">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <CodeBlock
          code={pseudocode}
          lang="python"
          title="context_compressor.py -- 伪代码"
        />
      </div>

      <CompressionAnimation />

      {/* Summary prefix explanation */}
      <h4 className="mt-10 text-lg font-semibold">Summary Prefix 注入</h4>
      <p className="mt-3 leading-relaxed text-text-secondary">
        压缩后的摘要以 <code>[Compressed Context]</code> 前缀注入为 system message，
        放在对话最前面。这让模型知道它正在阅读的是压缩后的上下文，而非完整的对话记录。
        摘要会特别保留：
      </p>
      <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-text-secondary">
        <li>工具调用的结果和关键发现</li>
        <li>用户做出的决策和偏好表达</li>
        <li>尚未完成的任务和待办事项</li>
        <li>重要的代码片段或文件路径</li>
      </ul>

      <SessionLifecycleAnimation />
    </Section>
  );
}
