import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { Terminal } from "../../components/ui/Terminal";
import { FoldPanel } from "../../components/ui/FoldPanel";
import { TryItBox } from "../../components/ui/TryItBox";
import { CodeBlock } from "../../components/ui/CodeBlock";

const doctorLines = [
  { type: "command" as const, text: "hermes doctor" },
  { type: "output" as const, text: "Hermes Doctor v0.9.2" },
  { type: "output" as const, text: "──────────────────────────────" },
  { type: "output" as const, text: "✓  Python 3.11.7 (>=3.10 required)" },
  { type: "output" as const, text: "✓  uv 0.4.2 detected" },
  { type: "output" as const, text: "✓  config.yaml valid" },
  { type: "output" as const, text: "✓  API key: sk-ant-...7xQ (Anthropic)" },
  { type: "output" as const, text: "✓  Model: claude-sonnet-4-20250514 reachable" },
  { type: "output" as const, text: "✗  Tool: browser — Playwright not installed" },
  { type: "output" as const, text: "✓  Tool: shell — available" },
  { type: "output" as const, text: "✓  Tool: memory — ~/.hermes/MEMORY.md exists" },
  { type: "output" as const, text: "✓  Skills: 4 loaded (0 errors)" },
  { type: "output" as const, text: "──────────────────────────────" },
  { type: "output" as const, text: "1 issue found. Run with --fix to auto-repair." },
];

export function Troubleshoot() {
  return (
    <Section id="ops-troubleshoot">
      <TypewriterTitle text="运维手册" subtitle="教你搭也教你养" />

      <h3 className="text-xl font-semibold">故障排查 & hermes doctor</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        遇到问题时，第一步永远是跑 <code className="rounded bg-bg-elevated px-1.5 py-0.5 text-sm">hermes doctor</code>。
        它会自动检查 Python 版本、依赖完整性、API 连通性、工具可用性和配置文件合法性，
        并输出一份清晰的诊断报告。大多数常见问题都能在这里一眼看出来。
      </p>

      <div className="mt-6">
        <Terminal title="hermes doctor" lines={doctorLines} />
      </div>

      <p className="mt-4 text-sm text-text-secondary">
        加上 <code className="rounded bg-bg-elevated px-1.5 py-0.5 text-sm">--fix</code> 参数可以让
        doctor 尝试自动修复它发现的问题（如安装缺失依赖、修复权限等）。
      </p>

      <h4 className="mt-8 text-lg font-semibold">常见问题排查</h4>
      <div className="mt-4 rounded-lg border border-border">
        <FoldPanel title="安装失败" badge="最常见">
          <div className="space-y-3 text-sm text-text-secondary">
            <div>
              <p className="font-medium text-text-primary">Python 版本不匹配</p>
              <p className="mt-1">
                Hermes 要求 Python &ge; 3.10。用 <code className="rounded bg-bg-elevated px-1 text-xs">python3 --version</code> 确认版本。
                如果系统自带的版本太旧，推荐用 pyenv 管理多版本。
              </p>
            </div>
            <div>
              <p className="font-medium text-text-primary">pip 依赖冲突</p>
              <p className="mt-1">
                当你看到 <code className="rounded bg-bg-elevated px-1 text-xs">ResolutionImpossible</code> 错误时，
                说明你的环境中有包版本冲突。最干净的方案是用虚拟环境：
              </p>
              <div className="mt-2">
                <CodeBlock code="python3 -m venv ~/.hermes-venv\nsource ~/.hermes-venv/bin/activate\npip install hermes-agent" lang="bash" />
              </div>
            </div>
            <div>
              <p className="font-medium text-text-primary">uv vs pip</p>
              <p className="mt-1">
                Hermes 优先使用 uv（更快的包管理器）。如果 uv 安装有问题，可以回退到 pip：
                <code className="rounded bg-bg-elevated px-1 text-xs">hermes config set package_manager pip</code>。
                但建议尽量用 uv——它在大型依赖树上快 10-100 倍。
              </p>
            </div>
          </div>
        </FoldPanel>

        <FoldPanel title="API 连接问题" badge="关键">
          <div className="space-y-3 text-sm text-text-secondary">
            <div>
              <p className="font-medium text-text-primary">Key 验证</p>
              <p className="mt-1">
                确保 <code className="rounded bg-bg-elevated px-1 text-xs">.env</code> 中的 API key 格式正确。
                Anthropic key 以 <code className="rounded bg-bg-elevated px-1 text-xs">sk-ant-</code> 开头，
                OpenAI 以 <code className="rounded bg-bg-elevated px-1 text-xs">sk-</code> 开头。
                可以用 <code className="rounded bg-bg-elevated px-1 text-xs">hermes doctor</code> 快速验证 key 是否有效。
              </p>
            </div>
            <div>
              <p className="font-medium text-text-primary">网络代理</p>
              <p className="mt-1">
                如果你在公司网络或中国大陆，可能需要配置 HTTP 代理。在 <code className="rounded bg-bg-elevated px-1 text-xs">.env</code> 中设置：
              </p>
              <div className="mt-2">
                <CodeBlock code="HTTPS_PROXY=http://your-proxy:7890\nHTTP_PROXY=http://your-proxy:7890" lang="bash" />
              </div>
            </div>
            <div>
              <p className="font-medium text-text-primary">速率限制（Rate Limits）</p>
              <p className="mt-1">
                收到 429 错误表示触发了 API 速率限制。Hermes 有内置的指数退避重试机制，
                但如果频繁触发，考虑降低并发请求数或升级 API 套餐。
              </p>
            </div>
          </div>
        </FoldPanel>

        <FoldPanel title="工具不可用">
          <div className="space-y-3 text-sm text-text-secondary">
            <div>
              <p className="font-medium text-text-primary">缺少环境变量</p>
              <p className="mt-1">
                某些工具（如 browser、web_search）需要额外的环境变量或 API key。
                检查 <code className="rounded bg-bg-elevated px-1 text-xs">hermes doctor</code> 输出中标记为 <code className="rounded bg-bg-elevated px-1 text-xs">✗</code> 的项。
              </p>
            </div>
            <div>
              <p className="font-medium text-text-primary">Toolset 未启用</p>
              <p className="mt-1">
                默认情况下不是所有 toolset 都启用。在 <code className="rounded bg-bg-elevated px-1 text-xs">config.yaml</code> 中检查：
              </p>
              <div className="mt-2">
                <CodeBlock code="# config.yaml\ntoolsets:\n  shell: true\n  browser: true      # 需要 Playwright\n  web_search: true   # 需要 SERP API key\n  memory: true\n  file: true" lang="yaml" />
              </div>
            </div>
            <div>
              <p className="font-medium text-text-primary">hermes tools check</p>
              <p className="mt-1">
                用 <code className="rounded bg-bg-elevated px-1 text-xs">hermes tools check</code> 单独验证工具状态。
                它比 doctor 更详细，会列出每个工具的依赖、版本和配置状态。
              </p>
            </div>
          </div>
        </FoldPanel>

        <FoldPanel title="平台适配">
          <div className="space-y-3 text-sm text-text-secondary">
            <div>
              <p className="font-medium text-text-primary">WSL 路径问题</p>
              <p className="mt-1">
                在 WSL 中，Windows 和 Linux 路径格式不同。确保 config 中使用 Linux 路径
                （<code className="rounded bg-bg-elevated px-1 text-xs">/home/user/</code>），
                而不是 Windows 路径（<code className="rounded bg-bg-elevated px-1 text-xs">C:\Users\</code>）。
                文件权限也可能需要额外处理：
                <code className="rounded bg-bg-elevated px-1 text-xs">chmod 600 ~/.hermes/.env</code>。
              </p>
            </div>
            <div>
              <p className="font-medium text-text-primary">Termux 限制</p>
              <p className="mt-1">
                Termux 上缺少一些系统库。安装前先运行：
                <code className="rounded bg-bg-elevated px-1 text-xs">pkg install python rust binutils</code>。
                部分 Python 包需要在 Termux 上从源码编译，耐心等待。Playwright（browser 工具）在 Termux 上不可用。
              </p>
            </div>
            <div>
              <p className="font-medium text-text-primary">Docker Socket 访问</p>
              <p className="mt-1">
                如果 Hermes 需要操作 Docker（如部署相关 Skill），确保当前用户在 docker 组中：
                <code className="rounded bg-bg-elevated px-1 text-xs">sudo usermod -aG docker $USER</code>，
                然后重新登录。或者通过 <code className="rounded bg-bg-elevated px-1 text-xs">DOCKER_HOST</code> 环境变量指向远程 Docker daemon。
              </p>
            </div>
          </div>
        </FoldPanel>
      </div>

      <TryItBox>
        <p>
          现在就在你的终端运行 <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono">hermes doctor</code>，
          看看你的环境有没有隐藏问题。如果发现红色的 <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono">✗</code>，
          试试 <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono">hermes doctor --fix</code> 自动修复。
        </p>
      </TryItBox>
    </Section>
  );
}
