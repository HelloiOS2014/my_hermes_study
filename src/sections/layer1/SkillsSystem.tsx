import { Section } from "../../components/layout/Section";
import { CardGrid } from "../../components/ui/CardGrid";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { SkillLifecycleAnimation } from "../../animations/SkillLifecycleAnimation";
import { ExtendedReading } from "../../components/ui/ExtendedReading";
import { skillCategories } from "../../data/skills";

const skillMdExample = `---
name: git-workflow
version: 1
description: Standard Git workflow for feature branches
tags: [git, development, workflow]
---

# Git Workflow Skill

## Steps
1. Create feature branch from main: \`git checkout -b feat/<name>\`
2. Make changes and commit with conventional commits
3. Push and create PR: \`gh pr create --fill\`
4. After review, squash merge to main

## Rules
- Never force push to main
- Always run tests before pushing
- Commit messages follow: type(scope): description`;

export function SkillsSystem() {
  return (
    <Section id="skills-system">
      <h3 className="text-xl font-semibold">Skills 系统</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        Skills 是 Hermes 的<strong>程序性记忆</strong>——如果 MEMORY.md 记住的是"事实"，
        Skills 记住的是"怎么做"。当 Agent 完成一个复杂任务（通常 5+ tool calls），
        它会被提示将过程总结为一个可复用的 Skill，存储在 <code>~/.hermes/skills/</code> 目录下。
      </p>

      <div className="mt-6">
        <CardGrid
          columns={4}
          cards={skillCategories.map((cat) => ({
            title: cat.name,
            description: `${cat.count} skills`,
            detail: (
              <ul className="list-disc pl-4 text-sm text-text-secondary">
                {cat.examples.map((ex) => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>
            ),
          }))}
        />
      </div>

      <div className="mt-6">
        <CodeBlock code={skillMdExample} lang="markdown" title="~/.hermes/skills/git-workflow.md" />
      </div>

      <SkillLifecycleAnimation />

      {/* Warning */}
      <div className="mt-6 rounded-lg border border-error/30 bg-error/5 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-error">
          <span>⚠</span> 注意：自动覆盖风险
        </div>
        <p className="text-sm text-text-secondary">
          Agent 在发现已有 Skill 过时时会<strong>自动覆盖更新</strong>。如果你手动编辑了某个 Skill，
          Agent 可能会在下次使用时覆盖你的修改。建议用 Git 管理 <code>~/.hermes/skills/</code> 目录，
          这样你可以随时 diff 和回滚。
        </p>
      </div>

      <ExtendedReading
        links={[
          {
            title: "Hermes Skills 系统详解",
            url: "https://docs.bswen.com/blog/2026-04-07-hermes-ai-overwrites-skills/",
            source: "BSWEN",
          },
          {
            title: "Procedural Memory in AI Agents",
            url: "https://arxiv.org/pdf/2408.11857",
            source: "arXiv",
          },
        ]}
      />
    </Section>
  );
}
