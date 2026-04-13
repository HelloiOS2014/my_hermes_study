import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { Terminal } from "../../components/ui/Terminal";
import { ExtendedReading } from "../../components/ui/ExtendedReading";
import { TryItBox } from "../../components/ui/TryItBox";

const configYamlExample = `# config.yaml — 研究助理工具集
toolsets:
  web_search:
    enabled: true
    engine: google
    max_results: 15
  browser:
    enabled: true
    headless: true
    actions:
      - navigate
      - extract_text
      - screenshot
  memory:
    enabled: true
    auto_save: true
    categories:
      - research_notes
      - source_citations
      - key_findings`;

const soulMdExample = `# SOUL.md — 研究助理人格

## 角色
你是一位严谨的研究助理，擅长信息检索、交叉验证和结构化总结。

## 研究方法论
- 系统性：先确定研究问题 → 搜索多个来源 → 交叉验证 → 总结
- 引用来源：每个关键结论都附上原始链接
- 存储发现：将重要发现保存到 memory，方便跨会话查阅
- 区分事实和观点：明确标注哪些是已验证的事实，哪些是推测

## 输出格式
### [研究主题]
**关键发现：**
1. 发现一 [来源链接]
2. 发现二 [来源链接]

**待进一步研究：**
- 未解决的问题

**参考资料：**
- [1] 标题, URL, 日期`;

const terminalLines = [
  { type: "command" as const, text: "hermes chat" },
  { type: "output" as const, text: "🔬 研究助理已就绪。请告诉我你想研究什么？" },
  { type: "command" as const, text: "> 帮我研究 WebAssembly 在服务端的最新进展和应用场景" },
  { type: "output" as const, text: "好的，我来系统地调研这个话题。" },
  { type: "output" as const, text: "[tool] web_search: 'WebAssembly server-side 2025 progress'" },
  { type: "output" as const, text: "[tool] web_search: 'WASI preview 2 status'" },
  { type: "output" as const, text: "[tool] browser: 提取 bytecodealliance.org 最新公告" },
  { type: "output" as const, text: "[tool] web_search: 'WebAssembly edge computing use cases'" },
  { type: "output" as const, text: "[tool] browser: 提取 Fermyon/Spin 最新文档" },
  { type: "output" as const, text: "[tool] memory_save: 保存研究笔记 'wasm-server-side-2025'" },
  { type: "output" as const, text: "" },
  { type: "output" as const, text: "### WebAssembly 服务端最新进展" },
  { type: "output" as const, text: "**关键发现：**" },
  { type: "output" as const, text: "1. WASI Preview 2 已稳定，支持 HTTP/文件系统/时钟等接口" },
  { type: "output" as const, text: "2. Spin 2.x 和 wasmCloud 成为主流运行时" },
  { type: "output" as const, text: "3. 边缘计算是最大应用场景，冷启动 <1ms" },
  { type: "output" as const, text: "" },
  { type: "output" as const, text: "📝 研究笔记已保存到 memory，下次可直接引用。" },
];

export function ResearchAssistant() {
  return (
    <Section id="recipe-research">
      <h3 className="text-xl font-semibold">研究助理 Agent</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        结合 Web 搜索、浏览器自动化和 Memory 持久化，打造一个能跨多个来源深度调研、
        并在多次会话间积累研究成果的 AI 研究助理。
      </p>

      {/* Step 1 */}
      <div className="mt-8">
        <h4 className="flex items-center gap-2 font-medium">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">1</span>
          启用 web + browser + memory 工具集
        </h4>
        <p className="mt-2 text-sm text-text-secondary">
          三件套：web_search 负责搜索，browser 负责提取网页正文，memory 负责跨会话存储发现。
        </p>
        <div className="mt-3">
          <CodeBlock code={configYamlExample} lang="yaml" title="~/.hermes/config.yaml" />
        </div>
      </div>

      {/* Step 2 */}
      <div className="mt-8">
        <h4 className="flex items-center gap-2 font-medium">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">2</span>
          SOUL.md：定义研究方法论
        </h4>
        <p className="mt-2 text-sm text-text-secondary">
          在 SOUL.md 中约定研究流程——系统搜索、引用来源、保存发现到 memory。
        </p>
        <div className="mt-3">
          <CodeBlock code={soulMdExample} lang="markdown" title="~/.hermes/SOUL.md (研究助理)" />
        </div>
      </div>

      {/* Step 3 */}
      <div className="mt-8">
        <h4 className="flex items-center gap-2 font-medium">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">3</span>
          示例：跨多源调研技术话题
        </h4>
        <p className="mt-2 text-sm text-text-secondary">
          Agent 会从搜索引擎出发，逐步深入到具体网站，提取关键信息并整理为结构化报告。
        </p>
        <div className="mt-3">
          <Terminal title="hermes chat — 研究助理" lines={terminalLines} />
        </div>
      </div>

      {/* Step 4 */}
      <div className="mt-8">
        <h4 className="flex items-center gap-2 font-medium">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">4</span>
          Memory 跨会话积累
        </h4>
        <p className="mt-2 text-sm text-text-secondary">
          每次研究的关键发现都会保存到 Memory 中。下次开启新会话时，Agent 可以直接引用之前的研究笔记，
          避免重复搜索，并在已有基础上深入探索。随着时间推移，你会积累一个私人知识库。
        </p>
      </div>

      <TryItBox>
        <p>
          选一个你正在关注的技术话题，让 Hermes 帮你做一次系统调研。
          然后隔天再开新会话，看看它是否记得上次的研究成果。
        </p>
      </TryItBox>

      <ExtendedReading
        links={[
          {
            title: "awesome-hermes-agent: research-agent 项目",
            url: "https://github.com/0xNyk/awesome-hermes-agent",
            source: "GitHub",
          },
          {
            title: "Building AI Research Assistants with Tool Use",
            url: "https://arxiv.org/pdf/2408.11857",
            source: "arXiv",
          },
        ]}
      />
    </Section>
  );
}
