import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { FoldPanel } from "../../components/ui/FoldPanel";
import { toolCategories } from "../../data/tools";

export function ToolExplorer() {
  return (
    <Section id="tool-explorer">
      <h3 className="text-xl font-semibold">工具箱导览：自助探索 47+ 工具</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        Hermes 内置 47+ 工具，覆盖终端、文件、浏览器、搜索、视觉、记忆、协作等场景。
        与其逐个介绍，不如教你<strong>如何自己探索</strong>——因为工具列表会随版本更新而变化。
      </p>

      <div className="mt-6">
        <CodeBlock
          code={`# 查看所有可用工具和 Toolset
hermes tools

# 查看某个工具的详细说明
hermes tools --info terminal

# 启用/禁用特定 Toolset
hermes tools --enable browser
hermes tools --disable home-assistant`}
          lang="bash"
          title="自助探索命令"
        />
      </div>

      <div className="mt-6 rounded-lg border border-border">
        <div className="border-b border-border bg-bg-card px-4 py-2 text-sm font-medium">
          工具分类一览（点击展开）
        </div>
        <div className="divide-y divide-border">
          {toolCategories.map((cat) => (
            <FoldPanel
              key={cat.name}
              title={`${cat.icon} ${cat.name}`}
              badge={`${cat.tools.length}`}
            >
              <ul className="space-y-2">
                {cat.tools.map((tool) => (
                  <li key={tool.name} className="flex items-start gap-2 text-sm">
                    <code className="shrink-0 rounded bg-bg-elevated px-1.5 py-0.5 text-xs text-accent">
                      {tool.name}
                    </code>
                    <span className="text-text-secondary">{tool.description}</span>
                  </li>
                ))}
              </ul>
            </FoldPanel>
          ))}
        </div>
      </div>
    </Section>
  );
}
