import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { CardGrid } from "../../components/ui/CardGrid";
import { TabPanel } from "../../components/ui/TabPanel";
import { HoverTable } from "../../components/ui/HoverTable";
import { ExtendedReading } from "../../components/ui/ExtendedReading";
import { EnvBuilder } from "../../playgrounds/EnvBuilder";

const providerCards = [
  {
    title: "就想快速试试",
    description: "OpenRouter — 一个 key 用 200+ 模型，按量付费，有 $1 免费额度",
    icon: "🚀",
  },
  {
    title: "要最好的质量",
    description: "Anthropic 或 Google 直连 — Claude / Gemini，延迟最低",
    icon: "🧠",
  },
  {
    title: "想免费用",
    description: "Google AI Studio 免费额度 / Ollama 跑本地开源模型",
    icon: "💰",
  },
  {
    title: "国内模型",
    description: "智谱 GLM / Kimi / MiniMax — 国内访问快，中文优化好",
    icon: "🇨🇳",
  },
  {
    title: "注重隐私",
    description: "Ollama + 本地模型 — 数据不出本机，完全离线可用",
    icon: "🔒",
  },
];

export function ApiKeys() {
  return (
    <Section id="api-keys">
      <TypewriterTitle
        text="0.6 手动配置 API Keys"
        subtitle="需要特定 Provider？手动配置 API Key"
      />

      <div className="mb-8 rounded-lg border border-accent/30 bg-accent/5 p-4">
        <p className="text-sm text-text-secondary">
          已经通过 Nous Portal 登录了？可以
          <button
            onClick={() => document.getElementById("first-conversation")?.scrollIntoView({ behavior: "smooth" })}
            className="mx-1 text-accent underline hover:no-underline"
          >
            跳过这一节，直接去「首次启动」
          </button>
          。这一节是给需要手动配置特定 Provider 的用户准备的。
        </p>
      </div>

      {/* Decision tree */}
      <h3 className="text-lg font-semibold">该选哪个 Provider？</h3>
      <div className="mt-3">
        <CardGrid cards={providerCards} columns={3} />
      </div>

      {/* Cost reference */}
      <h3 className="mt-10 text-lg font-semibold">费用参考</h3>
      <div className="mt-3">
        <HoverTable
          headers={["Provider", "模型", "每百万 token", "一次对话约"]}
          rows={[
            ["Anthropic", "Claude Opus", "~$15", "~¥0.5"],
            ["Anthropic", "Claude Haiku", "~$0.25", "~¥0.01"],
            ["Google", "Gemini Flash", "有免费额度", "免费"],
            ["OpenRouter", "取决于模型", "略有加价", "因模型而异"],
            ["Ollama", "本地模型", "免费", "免费（电费除外）"],
          ]}
        />
        <p className="mt-2 text-xs text-text-muted">
          以上为粗略估算，实际费用取决于对话长度和模型定价。开启
          Smart Model Routing 后日常使用可省 70-80%。
        </p>
      </div>

      {/* Get key steps */}
      <h3 className="mt-10 text-lg font-semibold">获取步骤</h3>
      <div className="mt-3">
        <TabPanel
          tabs={[
            {
              label: "OpenRouter",
              content: (
                <ol className="space-y-2 text-sm text-text-secondary">
                  <li>1. 打开 openrouter.ai → 注册账号</li>
                  <li>2. Dashboard → API Keys → Create Key</li>
                  <li>3. 复制 key（以 sk-or-v1- 开头）</li>
                </ol>
              ),
            },
            {
              label: "Anthropic",
              content: (
                <ol className="space-y-2 text-sm text-text-secondary">
                  <li>1. 打开 console.anthropic.com → 注册</li>
                  <li>2. API Keys → Create Key</li>
                  <li>3. 复制 key（以 sk-ant- 开头）</li>
                </ol>
              ),
            },
            {
              label: "Google AI Studio",
              content: (
                <ol className="space-y-2 text-sm text-text-secondary">
                  <li>1. 打开 aistudio.google.com</li>
                  <li>2. 点击 &ldquo;Get API key&rdquo;</li>
                  <li>3. 复制 key（以 AIza 开头）</li>
                </ol>
              ),
            },
          ]}
        />
      </div>

      {/* EnvBuilder playground */}
      <h3 className="mt-10 text-lg font-semibold">配置 .env</h3>
      <p className="mt-2 text-sm text-text-secondary">
        文件位置：
        <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-accent">
          ~/.hermes/.env
        </code>
        （安装脚本已创建）。勾选你有的 Provider，复制生成的内容：
      </p>
      <EnvBuilder />

      <p className="mt-3 text-sm text-text-secondary">
        也可以用{" "}
        <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono">
          hermes login
        </code>{" "}
        通过 Nous Portal OAuth 登录，无需手动配 API key。
      </p>

      {/* Privacy callout */}
      <div className="mt-6 rounded-lg border border-border bg-bg-card p-4">
        <h4 className="mb-2 text-sm font-semibold">数据隐私</h4>
        <ul className="space-y-1 text-sm text-text-secondary">
          <li>OpenRouter：消息经 OpenRouter 服务器中转到模型 provider</li>
          <li>Anthropic / Google 直连：消息直接到 provider 服务器</li>
          <li>Ollama 本地模型：数据完全不出本机</li>
        </ul>
      </div>

      {/* Security callout */}
      <div className="mt-4 rounded-lg border border-error/30 bg-error/5 p-4">
        <h4 className="mb-1 text-sm font-semibold text-error">安全提醒</h4>
        <p className="text-sm text-text-secondary">
          .env 包含你的 API 密钥 = 你的钱。不要分享、不要提交到
          git、不要截图发群里。
        </p>
      </div>

      <ExtendedReading
        links={[
          {
            title: "OpenRouter Pricing",
            url: "https://openrouter.ai/models",
            source: "OpenRouter",
          },
          {
            title: "Anthropic Pricing",
            url: "https://www.anthropic.com/pricing",
            source: "Anthropic",
          },
          {
            title: "Google AI Pricing",
            url: "https://ai.google.dev/pricing",
            source: "Google",
          },
        ]}
      />
    </Section>
  );
}
