import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { Terminal } from "../../components/ui/Terminal";
import { TryItBox } from "../../components/ui/TryItBox";

const soulMdExample = `# SOUL.md — 编程助手人格

## 角色
你是一位资深全栈工程师，擅长代码重构和性能优化。

## 行为准则
- Terminal-first：优先通过命令行验证，而非猜测
- 质量至上：每次修改都要运行 lint + test
- 最小改动原则：只改必要的部分，不做无关重构
- 解释清楚"为什么"而不仅仅是"改了什么"

## 偏好
- TypeScript > JavaScript
- 函数式风格 > 面向对象
- 小函数 > 大函数（单一职责）
- 有意义的变量名 > 简写`;

const configYamlExample = `# config.yaml — 编程助手工具集
toolsets:
  terminal:
    enabled: true
    allowed_commands:
      - git
      - npm
      - npx
      - node
      - cargo
      - python
  file:
    enabled: true
    allowed_paths:
      - ~/projects/**
  web:
    enabled: true
    purpose: "查阅文档和 API 参考"`;

const terminalLines = [
  { type: "command" as const, text: "hermes chat" },
  { type: "output" as const, text: "🤖 Hermes Agent 已就绪。有什么可以帮你的？" },
  { type: "command" as const, text: '> 帮我重构 src/utils/parser.ts，提取重复逻辑为独立函数' },
  { type: "output" as const, text: "好的，让我先阅读这个文件..." },
  { type: "output" as const, text: "[tool] file_read: src/utils/parser.ts (248 lines)" },
  { type: "output" as const, text: "[tool] terminal: npx tsc --noEmit (checking types...)" },
  { type: "output" as const, text: "分析完成。发现 3 处重复模式，我来逐一重构：" },
  { type: "output" as const, text: "[tool] file_write: 提取 parseHeader() 函数" },
  { type: "output" as const, text: "[tool] file_write: 提取 validateSchema() 函数" },
  { type: "output" as const, text: "[tool] file_write: 提取 normalizeOutput() 函数" },
  { type: "output" as const, text: "[tool] terminal: npm test (12 passed, 0 failed)" },
  { type: "comment" as const, text: "5+ tool calls 后，Agent 自动提示创建 Skill ↓" },
  { type: "output" as const, text: "[skill] 已保存 refactor-extract-functions.md 到 ~/.hermes/skills/" },
  { type: "output" as const, text: "✅ 重构完成！代码行数从 248 行降至 186 行，所有测试通过。" },
];

export function CodingAssistant() {
  return (
    <Section id="recipe-coding">
      <TypewriterTitle text="实战菜谱" subtitle="端到端项目实战" />

      <h3 className="text-xl font-semibold">个人编程助手</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        将 Hermes 配置为你的专属编程搭档——它能操作终端、读写文件、搜索文档，
        并且会在反复使用中自动积累 Skills，越用越顺手。
      </p>

      {/* Step 1 */}
      <div className="mt-8">
        <h4 className="flex items-center gap-2 font-medium">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">1</span>
          配置 SOUL.md：定义编程助手人格
        </h4>
        <p className="mt-2 text-sm text-text-secondary">
          重点是 terminal-first 工作方式和代码质量准则。
        </p>
        <div className="mt-3">
          <CodeBlock code={soulMdExample} lang="markdown" title="~/.hermes/SOUL.md" />
        </div>
      </div>

      {/* Step 2 */}
      <div className="mt-8">
        <h4 className="flex items-center gap-2 font-medium">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">2</span>
          启用工具集：terminal + file + web
        </h4>
        <p className="mt-2 text-sm text-text-secondary">
          三个工具集覆盖日常编程场景——执行命令、读写文件、查阅在线文档。
        </p>
        <div className="mt-3">
          <CodeBlock code={configYamlExample} lang="yaml" title="~/.hermes/config.yaml" />
        </div>
      </div>

      {/* Step 3 */}
      <div className="mt-8">
        <h4 className="flex items-center gap-2 font-medium">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">3</span>
          第一次编程会话：让 Agent 重构文件
        </h4>
        <p className="mt-2 text-sm text-text-secondary">
          观察 Agent 如何阅读代码、执行测试、逐步重构。
        </p>
        <div className="mt-3">
          <Terminal title="hermes chat" lines={terminalLines} />
        </div>
      </div>

      {/* Step 4 */}
      <div className="mt-8">
        <h4 className="flex items-center gap-2 font-medium">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">4</span>
          Skills 自动积累
        </h4>
        <p className="mt-2 text-sm text-text-secondary">
          当一次会话超过 5 次 tool calls 时，Agent 会被提示将工作流程总结为 Skill。
          下次遇到类似任务时，它会自动调用已有的 Skill，大大提高效率。
        </p>
      </div>

      <TryItBox>
        <p>
          打开你自己的项目，让 Hermes 重构一个真实的文件——比如一个过长的工具函数或重复的模板代码。
          观察它是否在完成后自动创建了 Skill。
        </p>
      </TryItBox>

      {/* Key Insight */}
      <div className="mt-6 rounded-lg border border-accent/30 bg-accent/5 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-accent">
          <span>💡</span> 核心洞察
        </div>
        <p className="text-sm text-text-secondary">
          经过几次会话后，Agent 会积累出专属于<strong>你的工作流</strong>的 Skills——
          你偏好的 Git 分支策略、你项目的测试命令、你常用的重构模式。
          这就是"越用越懂你"的秘密。
        </p>
      </div>
    </Section>
  );
}
