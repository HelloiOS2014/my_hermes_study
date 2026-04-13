import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";

const agentsMdExample = `# AGENTS.md — 项目级 Agent 指令

## Project
hermes-tutorial — Hermes Agent 深度学习站点

## Tech Stack
- React 18 + TypeScript 5
- Tailwind CSS v4
- Vite 6
- pnpm

## Conventions
- Use functional components with hooks
- File naming: PascalCase for components, camelCase for utils
- All state management via React hooks (no Redux)
- Prefer composition over inheritance

## Forbidden
- Do NOT install new CSS frameworks
- Do NOT modify vite.config.ts without asking
- Do NOT use \`any\` type — always provide proper types`;

export function ProjectContext() {
  return (
    <Section id="project-context">
      <h3 className="text-xl font-semibold">项目上下文 — AGENTS.md / .cursorrules</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        如果 SOUL.md 定义了 Agent 的"性格"，那么 AGENTS.md 就定义了 Agent 在<strong>特定项目中的行为规范</strong>。
        它放在项目根目录下（类似 .cursorrules），告诉 Agent：技术栈是什么、代码规范有哪些、哪些操作被禁止。
      </p>
      <p className="mt-2 leading-relaxed text-text-secondary">
        Hermes 在启动时会自动扫描当前目录和父目录的 AGENTS.md 文件，并将内容注入 System Prompt 的第 8 层。
      </p>

      <div className="mt-6">
        <CodeBlock code={agentsMdExample} lang="markdown" title="./AGENTS.md" />
      </div>

      {/* Why box */}
      <div className="mt-6 rounded-lg border border-warning/30 bg-warning/5 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-warning">
          <span>💡</span> 为什么要扫描 Prompt Injection？
        </div>
        <p className="text-sm text-text-secondary">
          AGENTS.md 存储在项目仓库中，任何协作者都能修改。Hermes 在加载前会进行基础的 prompt injection 检测，
          防止恶意指令通过项目文件注入到 Agent 的行为中。例如，试图覆盖 SOUL.md 规则或绕过安全限制的内容会被标记警告。
        </p>
      </div>
    </Section>
  );
}
