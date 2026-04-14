import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { CodeBlock } from "../../components/ui/CodeBlock";

interface DepItem {
  name: string;
  version: string;
  why: string;
  check: string;
  install: string;
  required: boolean;
}

const deps: DepItem[] = [
  {
    name: "Python",
    version: "≥ 3.11",
    why: "Agent 核心运行时，使用了 match 语句、TaskGroup 等 3.11 新特性",
    check: "python3 --version",
    install: "pyenv install 3.11 / brew install python@3.11 / apt install python3.11",
    required: true,
  },
  {
    name: "Node.js",
    version: "v22",
    why: "浏览器工具需要（网页浏览、截图、Playwright）。不用浏览器功能可跳过",
    check: "node --version",
    install: "nvm install 22 / brew install node@22",
    required: false,
  },
  {
    name: "Git",
    version: "任意",
    why: "安装脚本通过 git clone 拉取代码",
    check: "git --version",
    install: "一般已预装",
    required: true,
  },
  {
    name: "ripgrep",
    version: "任意",
    why: "search_files 工具的后端，没有它 fallback 到较慢的 Python 实现",
    check: "rg --version",
    install: "brew install ripgrep / apt install ripgrep",
    required: false,
  },
  {
    name: "ffmpeg",
    version: "任意",
    why: "语音消息的 TTS/STT 编解码，不用语音可跳过",
    check: "ffmpeg -version",
    install: "brew install ffmpeg / apt install ffmpeg",
    required: false,
  },
];

const platforms = [
  { name: "macOS", status: "✅", note: "" },
  { name: "Linux", status: "✅", note: "" },
  { name: "WSL2", status: "✅", note: "" },
  { name: "Termux (Android)", status: "⚠️", note: "部分功能受限（无浏览器工具、无 WhatsApp）" },
  { name: "Windows 原生", status: "❌", note: "必须使用 WSL2" },
];

export function Prerequisites() {
  return (
    <Section id="prerequisites">
      <TypewriterTitle text="0.3 前置要求" subtitle="安装前确认环境就绪" />

      <div className="space-y-3">
        {deps.map((dep) => (
          <div
            key={dep.name}
            className="rounded-lg border border-border bg-bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  dep.required
                    ? "bg-accent/10 text-accent"
                    : "bg-bg-elevated text-text-muted"
                }`}
              >
                {dep.required ? "必需" : "可选"}
              </span>
              <h4 className="font-semibold">{dep.name}</h4>
              <span className="text-sm text-text-muted">{dep.version}</span>
            </div>
            <p className="mt-2 text-sm text-text-secondary">{dep.why}</p>
            <div className="mt-3">
              <CodeBlock code={dep.check} lang="bash" title="检查命令" />
            </div>
            <p className="mt-2 text-xs text-text-muted">
              安装: {dep.install}
            </p>
          </div>
        ))}
      </div>

      {/* Platform compatibility */}
      <h3 className="mt-10 text-lg font-semibold">平台兼容性</h3>
      <div className="mt-3 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-card">
              <th className="px-4 py-3 text-left font-medium text-text-secondary">
                平台
              </th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">
                支持
              </th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">
                备注
              </th>
            </tr>
          </thead>
          <tbody>
            {platforms.map((p) => (
              <tr
                key={p.name}
                className="border-b border-border last:border-0 hover:bg-bg-card"
              >
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3">{p.status}</td>
                <td className="px-4 py-3 text-text-secondary">{p.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Common pitfalls */}
      <div className="mt-8 rounded-lg border border-warning/30 bg-warning/5 p-4">
        <h4 className="mb-2 text-sm font-semibold text-warning">
          常见坑提醒
        </h4>
        <ul className="space-y-1 text-sm text-text-secondary">
          <li>
            macOS 自带 Python 通常是 3.9（太旧），需要额外安装 3.11+
          </li>
          <li>
            Ubuntu 22.04 自带 3.10，差一个小版本，同样需要额外装
          </li>
          <li>
            安装脚本会自动用{" "}
            <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono text-xs">
              uv python install 3.11
            </code>{" "}
            尝试安装，但手动准备更稳
          </li>
        </ul>
      </div>
    </Section>
  );
}
