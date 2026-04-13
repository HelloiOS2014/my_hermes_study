import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { ExtendedReading } from "../../components/ui/ExtendedReading";
import { Terminal } from "../../components/ui/Terminal";

const cronConfigExample = `# cron 配置：每天早 8 点发送新闻简报
cron_jobs:
  - name: daily-briefing
    schedule: "0 8 * * *"
    prompt: |
      请帮我完成今日简报：
      1. 用 web_search 搜索今天的科技新闻头条（3-5 条）
      2. 搜索我关注的领域：AI、开源、前端
      3. 整理为简洁的中文摘要
      4. 通过 Telegram 发送给我
    tools:
      - web_search
      - telegram_send`;

const fullConfigExample = `# config.yaml — 多平台信息管家完整配置

# 模型选择
model: claude-sonnet-4-20250514

# Telegram 接入（参考 Layer 1.9 消息平台配置）
gateway:
  telegram:
    token: \${TELEGRAM_BOT_TOKEN}
    allowed_users:
      - your_telegram_id

# 工具集
toolsets:
  web_search:
    enabled: true
    engine: google
    max_results: 10
  terminal:
    enabled: true
    allowed_commands:
      - curl

# 定时任务
cron_jobs:
  - name: daily-briefing
    schedule: "0 8 * * *"
    prompt: |
      执行每日简报流程：
      1. 搜索今日科技新闻
      2. 搜索 AI/LLM 领域进展
      3. 搜索开源项目热点
      4. 汇总为 5 条中文摘要，附原始链接
      5. 发送到 Telegram
    tools:
      - web_search
      - telegram_send

  - name: weekly-digest
    schedule: "0 9 * * 1"
    prompt: |
      生成本周技术周报，回顾过去 7 天的重要事件。
    tools:
      - web_search
      - telegram_send`;

const soulMdExample = `# SOUL.md — 信息管家人格

## 角色
你是一位高效的信息助理，专注于新闻摘要和信息整理。

## 摘要风格
- 每条新闻一行，不超过 50 字
- 开头用 emoji 标注类别：🤖 AI、💻 开源、🌐 前端、📱 产品
- 附上原始链接
- 末尾加一句轻松的点评

## 输出格式示例
🤖 OpenAI 发布 GPT-5，多模态能力大幅提升 [链接]
💻 Rust 1.80 稳定版发布，新增 async trait [链接]
📱 Arc 浏览器推出 AI 助手功能 [链接]
—— 今天 AI 圈又卷起来了 😄`;

const terminalLines = [
  { type: "command" as const, text: "hermes gateway --daemon" },
  { type: "output" as const, text: "🚀 Gateway 已启动" },
  { type: "output" as const, text: "  ✓ Telegram 已连接 (@your_hermes_bot)" },
  { type: "output" as const, text: "  ✓ Cron 已加载 (2 jobs: daily-briefing, weekly-digest)" },
  { type: "output" as const, text: "  ⏰ 下次触发: daily-briefing @ 明天 08:00" },
  { type: "comment" as const, text: "第二天早 8 点自动触发..." },
  { type: "output" as const, text: "[cron] daily-briefing 触发中..." },
  { type: "output" as const, text: "[tool] web_search: '今日科技新闻 2025'" },
  { type: "output" as const, text: "[tool] web_search: 'AI LLM 最新进展'" },
  { type: "output" as const, text: "[tool] web_search: '开源项目 trending'" },
  { type: "output" as const, text: "[tool] telegram_send: 发送每日简报 (5 条摘要)" },
  { type: "output" as const, text: "✅ daily-briefing 完成" },
];

export function Messenger() {
  return (
    <Section id="recipe-messenger">
      <h3 className="text-xl font-semibold">多平台信息管家</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        结合 Telegram 消息平台、定时任务和 Web 搜索，打造一个每天自动给你推送新闻简报的私人信息管家。
      </p>

      {/* Step 1 */}
      <div className="mt-8">
        <h4 className="flex items-center gap-2 font-medium">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">1</span>
          设置 Telegram Bot
        </h4>
        <p className="mt-2 text-sm text-text-secondary">
          参考 Layer 1.9 消息平台配置章节，通过 @BotFather 创建 Bot 并获取 token。
          在 <code>config.yaml</code> 的 gateway 部分填入你的 token 和 Telegram user ID。
        </p>
      </div>

      {/* Step 2 */}
      <div className="mt-8">
        <h4 className="flex items-center gap-2 font-medium">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">2</span>
          配置 web_search 工具
        </h4>
        <p className="mt-2 text-sm text-text-secondary">
          启用 web_search 工具，让 Agent 能在互联网上搜索最新信息。
        </p>
      </div>

      {/* Step 3 */}
      <div className="mt-8">
        <h4 className="flex items-center gap-2 font-medium">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">3</span>
          创建每日定时任务
        </h4>
        <p className="mt-2 text-sm text-text-secondary">
          通过 cron 配置，每天早上 8 点自动触发简报流程。
        </p>
        <div className="mt-3">
          <CodeBlock code={cronConfigExample} lang="yaml" title="cron 配置片段" />
        </div>
      </div>

      {/* Step 4 */}
      <div className="mt-8">
        <h4 className="flex items-center gap-2 font-medium">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">4</span>
          自定义 SOUL.md 摘要风格
        </h4>
        <p className="mt-2 text-sm text-text-secondary">
          在 SOUL.md 中定义你喜欢的新闻摘要格式和语气。
        </p>
        <div className="mt-3">
          <CodeBlock code={soulMdExample} lang="markdown" title="~/.hermes/SOUL.md (信息管家)" />
        </div>
      </div>

      {/* Complete config */}
      <div className="mt-8">
        <h4 className="font-medium">完整配置参考</h4>
        <div className="mt-3">
          <CodeBlock code={fullConfigExample} lang="yaml" title="~/.hermes/config.yaml — 信息管家完整配置" />
        </div>
      </div>

      {/* Terminal demo */}
      <div className="mt-6">
        <Terminal title="hermes gateway" lines={terminalLines} />
      </div>

      <ExtendedReading
        links={[
          {
            title: "Hermes Gateway 部署完全指南",
            url: "https://medium.com/@hermes-agent/gateway-deployment-guide",
            source: "Medium",
          },
          {
            title: "Telegram Bot API 文档",
            url: "https://core.telegram.org/bots/api",
            source: "Telegram",
          },
        ]}
      />
    </Section>
  );
}
