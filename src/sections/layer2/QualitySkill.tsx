import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { CheckList } from "../../components/ui/CheckList";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const skillTemplate = `---
name: deploy-to-staging
version: 2
description: "安全部署应用到 staging 环境"
tags: [devops, deploy, staging]
author: your-name
created: 2025-01-15
min_hermes_version: "0.9.0"
# agentskills.io 兼容格式
category: devops
difficulty: intermediate
estimated_tokens: 3000
---

# Deploy to Staging

## 前置条件
- 当前分支已通过 CI（绿色 pipeline）
- .env.staging 文件存在
- Docker daemon 正在运行

## 步骤
1. 确认当前分支状态：\`git status\` 确保无未提交更改
2. 运行测试套件：\`npm test\` 或 \`pytest\`
3. 构建 Docker 镜像：\`docker build -t app:staging .\`
4. 推送到 registry：\`docker push registry.example.com/app:staging\`
5. 部署到 staging：\`kubectl apply -f k8s/staging/\`
6. 验证部署：\`curl -f https://staging.example.com/health\`
7. 通知团队：在 Slack #deploys 频道发送部署通知

## 回滚方案
如果步骤 6 健康检查失败：
\`kubectl rollout undo deployment/app -n staging\`

## 注意事项
- 永远不要跳过测试步骤
- staging 环境使用独立数据库，不影响生产`;

const antiOverwriteExample = `# 方法 1：version lock（在 frontmatter 中锁定版本）
---
name: my-custom-skill
version: 99          # 极高版本号，Agent 不会覆盖
_locked: true        # 自定义标记（需要 pre_tool_call hook 配合）
---

# 方法 2：manual edit marker（在内容中添加标记）
# 在 Skill 文件顶部添加：
<!-- MANUAL_EDIT: DO NOT AUTO-UPDATE -->

# 方法 3：Git 管理（推荐）
cd ~/.hermes/skills/
git init
git add -A && git commit -m "snapshot: before agent update"
# Agent 覆盖后可以随时 diff 和回滚
git diff
git checkout -- deploy-to-staging.md`;

export function QualitySkill() {
  return (
    <Section id="quality-skill">
      <h3 className="text-xl font-semibold">写高质量 Skill + 防覆盖策略</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        Skill 是 Hermes 的程序性记忆——写得好的 Skill 能让 Agent 稳定复现复杂操作。
        但 Agent 也会在它认为 Skill 过时时自动覆盖你的修改。这一节教你如何写出高质量 Skill，
        以及如何保护你的手动编辑不被覆盖。
      </p>

      <h4 className="mt-6 text-lg font-semibold">完整 Skill 模板</h4>
      <div className="mt-3">
        <CodeBlock code={skillTemplate} lang="markdown" title="~/.hermes/skills/deploy-to-staging.md" />
      </div>

      {/* Good Skill traits */}
      <h4 className="mt-8 text-lg font-semibold">好 Skill 的三个特征</h4>
      <div className="mt-4">
        <CheckList
          items={[
            {
              label: "单一职责",
              description: "一个 Skill 只做一件事。'部署到 staging' 而不是 '部署到任意环境'——后者应该拆成多个 Skill",
            },
            {
              label: "清晰步骤",
              description: "每步都是可执行的具体命令或检查，而不是模糊的描述。Agent 会逐步执行，含糊的步骤会导致幻觉",
            },
            {
              label: "明确前置条件",
              description: "在步骤之前列出所有前提。Agent 在执行前会检查这些条件，避免中途失败后状态不一致",
            },
          ]}
        />
      </div>

      {/* Anti-overwrite */}
      <h4 className="mt-8 text-lg font-semibold">防覆盖策略</h4>
      <p className="mt-2 text-sm text-text-secondary">
        Agent 会在执行 Skill 后评估结果，如果它认为 Skill 内容"可以改进"就会自动覆盖。
        以下是保护你手动编辑的三种策略：
      </p>
      <div className="mt-4">
        <CodeBlock code={antiOverwriteExample} lang="bash" title="防覆盖方案" />
      </div>

      {/* Warning */}
      <div className="mt-6 rounded-lg border border-error/30 bg-error/5 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-error">
          <span>{"⚠"}</span> 社区反馈：自动覆盖是最常被抱怨的"特性"
        </div>
        <p className="text-sm text-text-secondary">
          在 GitHub Issues 和社区论坛中，Skill 被自动覆盖是用户反馈最多的痛点之一。
          特别是当你花了时间手动优化一个 Skill，却在下次使用时发现 Agent 用它自己的版本替换了你的修改。
          <strong> Git 管理是目前最可靠的防御</strong>——它不依赖 Agent 的行为，而是从文件系统层面提供保护。
        </p>
      </div>

      <ExtendedReading
        links={[
          {
            title: "Hermes Skill 自动覆盖问题分析与应对",
            url: "https://docs.bswen.com/blog/2026-04-07-hermes-ai-overwrites-skills/",
            source: "BSWEN",
          },
          {
            title: "AgentSkills.io — Skill 分享平台",
            url: "https://agentskills.io",
            source: "Community",
          },
        ]}
      />
    </Section>
  );
}
