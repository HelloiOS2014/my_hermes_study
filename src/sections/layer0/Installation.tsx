import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { Terminal } from "../../components/ui/Terminal";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { TabPanel } from "../../components/ui/TabPanel";
import { HoverTable } from "../../components/ui/HoverTable";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const quickInstallLines = [
  {
    type: "command" as const,
    text: "curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash",
  },
  { type: "output" as const, text: "🔍 Detecting OS... macOS (arm64)" },
  {
    type: "output" as const,
    text: "📦 Installing uv package manager...",
    delay: 600,
  },
  {
    type: "output" as const,
    text: "🐍 Python 3.11 found",
    delay: 400,
  },
  {
    type: "output" as const,
    text: "📥 Cloning hermes-agent to ~/.hermes/hermes-agent/...",
    delay: 800,
  },
  {
    type: "output" as const,
    text: "📦 Installing dependencies (uv pip install -e '.[all]')...",
    delay: 1200,
  },
  {
    type: "output" as const,
    text: "🔗 Symlinked hermes → ~/.local/bin/hermes",
    delay: 400,
  },
  {
    type: "output" as const,
    text: "✅ Hermes Agent v0.9.0 installed successfully!",
    delay: 400,
  },
];

const devInstallCode = `git clone https://github.com/NousResearch/hermes-agent.git
cd hermes-agent
curl -LsSf https://astral.sh/uv/install.sh | sh
uv venv venv --python 3.11
source venv/bin/activate
uv pip install -e ".[all,dev]"`;

const termuxInstallCode = `# Termux 使用 .[termux] extra
# 排除不兼容的语音依赖
uv pip install -e ".[termux]"

# 注意限制：
# - 浏览器工具不可用
# - WhatsApp 工具不可用
# - 其他功能正常`;

const verifyLines = [
  { type: "command" as const, text: "source ~/.bashrc" },
  { type: "comment" as const, text: "或 source ~/.zshrc" },
  { type: "command" as const, text: "hermes --version", delay: 400 },
  { type: "output" as const, text: "hermes-agent v0.9.0" },
  { type: "command" as const, text: "which hermes", delay: 400 },
  { type: "output" as const, text: "/home/user/.local/bin/hermes" },
  { type: "command" as const, text: "hermes doctor", delay: 600 },
  { type: "output" as const, text: "✅ Python 3.11.9" },
  { type: "output" as const, text: "✅ Node.js v22.12.0" },
  { type: "output" as const, text: "✅ Git 2.43.0" },
  { type: "output" as const, text: "✅ ripgrep 14.1.0" },
  { type: "output" as const, text: "⚠️  No API key configured — run hermes setup" },
];

const installSteps = [
  "检测操作系统（Linux / macOS / Termux；Windows 重定向到 PowerShell 安装器）",
  "安装 uv（Astral 的快速 Python 包管理器）",
  "确保 Python 3.11 可用",
  "检查/安装 Git、Node.js v22",
  "安装系统包：ripgrep、ffmpeg",
  "克隆仓库到 ~/.hermes/hermes-agent/（先试 SSH，失败回退 HTTPS）",
  "创建 Python 虚拟环境",
  "uv pip install -e \".[all]\"（可编辑安装，含所有 extras）",
  "安装 Node.js 依赖 + Playwright Chromium",
  "符号链接 hermes → ~/.local/bin/",
  "创建 ~/.hermes/ 配置目录 + 复制示例配置文件",
  "创建 ~/.hermes/SOUL.md",
  "同步内置 Skills",
];

export function Installation() {
  return (
    <Section id="installation">
      <TypewriterTitle
        text="0.4 安装 Hermes"
        subtitle="三种安装方式，选适合你的"
      />

      <TabPanel
        tabs={[
          {
            label: "一键安装（推荐）",
            content: (
              <div className="space-y-6">
                <Terminal title="Quick Install" lines={quickInstallLines} />

                <div>
                  <h4 className="mb-3 font-semibold">
                    安装脚本做了什么？
                  </h4>
                  <ol className="space-y-1.5 text-sm text-text-secondary">
                    {installSteps.map((step, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="shrink-0 text-text-muted">
                          {i + 1}.
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">安装脚本选项</h4>
                  <HoverTable
                    headers={["选项", "作用"]}
                    rows={[
                      ["--no-venv", "跳过虚拟环境，使用系统 Python"],
                      ["--skip-setup", "跳过安装后的交互式 setup wizard"],
                      ["--branch NAME", "安装指定分支（默认 main）"],
                      [
                        "--dir PATH",
                        "自定义安装目录（默认 ~/.hermes/hermes-agent/）",
                      ],
                    ]}
                  />
                </div>
              </div>
            ),
          },
          {
            label: "开发者安装",
            content: (
              <div className="space-y-4">
                <p className="text-sm text-text-secondary">
                  适合想看源码、提 PR、调试内部逻辑的开发者。
                </p>
                <CodeBlock
                  code={devInstallCode}
                  lang="bash"
                  title="Developer Install"
                />
                <p className="text-sm text-text-muted">
                  跑测试：
                  <code className="ml-1 rounded bg-bg-elevated px-1.5 py-0.5 font-mono">
                    python -m pytest tests/ -q
                  </code>
                </p>
              </div>
            ),
          },
          {
            label: "Termux (Android)",
            content: (
              <div className="space-y-4">
                <CodeBlock
                  code={termuxInstallCode}
                  lang="bash"
                  title="Termux Install"
                />
              </div>
            ),
          },
        ]}
      />

      {/* Verification */}
      <h3 className="mt-10 text-lg font-semibold">安装后验证</h3>
      <div className="mt-3">
        <Terminal title="Verify Installation" lines={verifyLines} />
      </div>

      {/* Troubleshooting */}
      <h3 className="mt-10 text-lg font-semibold">故障排查</h3>
      <div className="mt-3">
        <HoverTable
          headers={["问题", "原因", "解决"]}
          rows={[
            [
              "command not found: hermes",
              "PATH 没刷新",
              "source ~/.bashrc 或 export PATH=\"$HOME/.local/bin:$PATH\"",
            ],
            [
              "权限错误",
              "~/.local/bin 权限不对",
              "chmod 755 ~/.local/bin/hermes",
            ],
            [
              "Python 版本不匹配",
              "uv 没自动安装 3.11",
              "uv python install 3.11 手动安装",
            ],
            [
              "clone 失败",
              "网络问题或 SSH 未配置",
              "安装脚本会自动回退 HTTPS，或手动设代理",
            ],
          ]}
        />
      </div>

      {/* Update / Uninstall */}
      <h3 className="mt-10 text-lg font-semibold">更新和卸载</h3>
      <div className="mt-3 space-y-2 text-sm text-text-secondary">
        <p>
          <strong>更新：</strong>
          <code className="ml-1 rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-accent">
            hermes update
          </code>
          （拉取最新代码 + 重新安装，保留配置和记忆）
        </p>
        <p>
          <strong>卸载：</strong>
          <code className="ml-1 rounded bg-bg-elevated px-1.5 py-0.5 font-mono">
            rm -rf ~/.hermes ~/.local/bin/hermes
          </code>
        </p>
        <p>
          <strong>OpenClaw 迁移：</strong>
          <code className="ml-1 rounded bg-bg-elevated px-1.5 py-0.5 font-mono">
            hermes claw migrate
          </code>
          （导入设置、记忆、Skills、API Keys）
        </p>
      </div>

      <ExtendedReading
        links={[
          {
            title: "Hermes Agent GitHub 仓库",
            url: "https://github.com/NousResearch/hermes-agent",
            source: "GitHub",
          },
        ]}
      />
    </Section>
  );
}
