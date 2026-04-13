import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { CheckList } from "../../components/ui/CheckList";
import { Terminal } from "../../components/ui/Terminal";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const updateCommand = `# 标准升级
hermes update

# 如果用 pip 安装的
pip install --upgrade hermes-agent

# 如果用 uv 安装的
uv pip install --upgrade hermes-agent`;

const rollbackCommand = `# 回滚到指定版本
pip install hermes-agent==0.8.5

# 或用 uv
uv pip install hermes-agent==0.8.5

# 确认当前版本
hermes --version`;

const changelogCheck = `# 查看 changelog
hermes changelog

# 查看特定版本的 breaking changes
hermes changelog --breaking

# 或直接查看 GitHub releases
open https://github.com/hermes-agent/hermes/releases`;

const updateTerminalLines = [
  { type: "command" as const, text: "hermes update" },
  { type: "output" as const, text: "Checking for updates..." },
  { type: "output" as const, text: "Current version: 0.8.5" },
  { type: "output" as const, text: "Latest version:  0.9.2" },
  { type: "output" as const, text: "Downloading hermes-agent 0.9.2..." },
  { type: "output" as const, text: "Installing dependencies..." },
  { type: "output" as const, text: "✓ Updated successfully to 0.9.2" },
  { type: "output" as const, text: "" },
  { type: "command" as const, text: "hermes doctor" },
  { type: "output" as const, text: "✓ All checks passed. You're good to go!" },
];

const migrationChecklist = [
  {
    label: "备份 config.yaml 和 .env",
    description: "cp ~/.hermes/config.yaml ~/.hermes/config.yaml.bak && cp ~/.hermes/.env ~/.hermes/.env.bak",
  },
  {
    label: "备份 skills 目录",
    description: "cp -r ~/.hermes/skills/ ~/.hermes/skills.bak/ 或确保 Git 已 commit 最新状态",
  },
  {
    label: "备份 memory 文件",
    description: "cp ~/.hermes/MEMORY.md ~/.hermes/MEMORY.md.bak && cp ~/.hermes/USER.md ~/.hermes/USER.md.bak",
  },
  {
    label: "运行 hermes update",
    description: "执行升级命令，等待依赖安装完成",
  },
  {
    label: "运行 hermes doctor 验证",
    description: "升级后立刻跑 doctor，确保所有组件正常工作",
  },
  {
    label: "检查 changelog 中的 breaking changes",
    description: "用 hermes changelog --breaking 查看是否有不兼容变更，特别关注 config 格式和工具接口变化",
  },
];

export function Upgrade() {
  return (
    <Section id="ops-upgrade">
      <h3 className="text-xl font-semibold">升级与迁移</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        Hermes 迭代很快，新版本经常带来重要的功能改进和 bug 修复。
        但升级前做好备份、升级后验证环境是保持稳定运行的关键。
      </p>

      {/* Update command */}
      <h4 className="mt-8 text-lg font-semibold">升级命令</h4>
      <div className="mt-3">
        <CodeBlock code={updateCommand} lang="bash" title="hermes update" />
      </div>

      <div className="mt-4">
        <Terminal title="升级示例" lines={updateTerminalLines} />
      </div>

      {/* Migration checklist */}
      <h4 className="mt-8 text-lg font-semibold">版本迁移清单</h4>
      <p className="mt-2 text-sm text-text-secondary">
        每次升级前按这个清单操作，确保万无一失。顺序很重要——先备份，再升级，最后验证。
      </p>
      <div className="mt-4">
        <CheckList items={migrationChecklist} />
      </div>

      {/* Breaking changes */}
      <h4 className="mt-8 text-lg font-semibold">处理 Breaking Changes</h4>
      <p className="mt-2 text-sm text-text-secondary">
        大版本升级（如 0.8 → 0.9）可能包含不兼容变更：config 格式改变、工具接口调整、
        默认行为变化等。升级前务必查看 release notes。
      </p>
      <div className="mt-3">
        <CodeBlock code={changelogCheck} lang="bash" title="查看 breaking changes" />
      </div>

      <div className="mt-4 rounded-lg border border-warning/30 bg-warning/5 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-warning">
          <span>{"⚠"}</span> 常见 breaking changes 类型
        </div>
        <ul className="space-y-1 text-sm text-text-secondary">
          <li>config.yaml 字段重命名或废弃（doctor 通常会提示）</li>
          <li>Skill frontmatter 格式变化（需要手动迁移）</li>
          <li>工具名称或参数调整（已有 Skill 中的工具调用可能失效）</li>
          <li>默认模型或 Smart Routing 策略变化（费用可能波动）</li>
        </ul>
      </div>

      {/* Rollback */}
      <h4 className="mt-8 text-lg font-semibold">回滚策略</h4>
      <p className="mt-2 text-sm text-text-secondary">
        如果升级后遇到严重问题，可以快速回滚到之前的版本。
        这也是为什么升级前一定要备份 config 和 skills 的原因。
      </p>
      <div className="mt-3">
        <CodeBlock code={rollbackCommand} lang="bash" title="版本回滚" />
      </div>

      <div className="mt-4 rounded-lg border border-border bg-bg-card p-4">
        <p className="text-sm text-text-secondary">
          <strong>回滚后别忘了</strong>恢复备份的配置文件：如果新版本修改了 config 格式，
          回滚后需要用 <code className="rounded bg-bg-elevated px-1 text-xs">.bak</code> 文件覆盖回来。
          同样，如果 Skills 被新版本的 Agent 修改过，也需要从备份或 Git 恢复。
        </p>
      </div>

      <ExtendedReading
        links={[
          {
            title: "Hermes Releases & Changelog",
            url: "https://github.com/hermes-agent/hermes/releases",
            source: "GitHub",
          },
          {
            title: "Migration Guide: 0.8 → 0.9",
            url: "https://hermes-agent.substack.com/p/migration-guide-09",
            source: "Substack",
          },
        ]}
      />
    </Section>
  );
}
