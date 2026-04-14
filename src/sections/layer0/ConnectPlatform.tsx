import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { TabPanel } from "../../components/ui/TabPanel";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { Terminal } from "../../components/ui/Terminal";
import { TryItBox } from "../../components/ui/TryItBox";
import { HoverTable } from "../../components/ui/HoverTable";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const telegramLines = [
  { type: "command" as const, text: "hermes gateway setup" },
  { type: "output" as const, text: "? Select platform to configure:", delay: 600 },
  { type: "output" as const, text: "  ❯ Telegram" },
  { type: "output" as const, text: "    Discord" },
  { type: "output" as const, text: "    Slack" },
  { type: "output" as const, text: "    ...", delay: 800 },
  { type: "output" as const, text: "✔ Telegram configured!", delay: 600 },
  { type: "command" as const, text: "hermes gateway run", delay: 400 },
  { type: "output" as const, text: "🚀 Starting gateway...", delay: 600 },
  { type: "output" as const, text: "✅ Telegram bot online — @YourBot", delay: 800 },
  { type: "output" as const, text: "📡 Listening for messages..." },
];

const telegramEnv = `TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_ALLOWED_USERS=你的数字ID`;

const discordEnv = `DISCORD_BOT_TOKEN=你的bot_token
DISCORD_ALLOWED_USERS=你的Discord用户ID或用户名`;

const feishuEnv = `FEISHU_APP_ID=cli_xxxxxxxx
FEISHU_APP_SECRET=xxxxxxxx
FEISHU_CONNECTION_MODE=websocket
FEISHU_ALLOWED_USERS=你的飞书用户ID`;

const wecomEnv = `WECOM_CORP_ID=你的企业ID
WECOM_BOT_SECRET=你的bot_secret
WECOM_ALLOWED_USERS=用户ID`;

const serviceCode = `# 安装为系统服务（推荐）
hermes gateway install
hermes gateway start
hermes gateway status

# 或用 tmux 临时运行
tmux new -s hermes
hermes gateway run
# Ctrl+B D 断开（Agent 继续运行）
# tmux attach -t hermes 重新连接`;

export function ConnectPlatform() {
  return (
    <Section id="connect-platform">
      <TypewriterTitle
        text="0.10 连接消息平台"
        subtitle="让 Agent 上手机"
      />

      <p className="text-text-secondary">
        Hermes 支持 18+ 消息平台。选你最常用的一个，接上去：
      </p>
      <p className="mt-2 text-sm text-text-muted">
        关键概念：用{" "}
        <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono">
          hermes gateway setup
        </code>{" "}
        配置平台，用{" "}
        <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono">
          hermes gateway run
        </code>{" "}
        启动。所有已配置的平台会同时运行。
      </p>

      <div className="mt-6">
        <TabPanel
          tabs={[
            {
              label: "Telegram",
              content: (
                <div className="space-y-4">
                  <ol className="space-y-2 text-sm text-text-secondary">
                    <li>
                      1. 打开 Telegram → 搜索{" "}
                      <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
                        @BotFather
                      </code>{" "}
                      → 发送{" "}
                      <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
                        /newbot
                      </code>
                    </li>
                    <li>
                      2. 按提示起名 → 拿到 Bot Token（格式{" "}
                      <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
                        123456:ABC-DEF...
                      </code>
                      ）
                    </li>
                    <li>
                      3. 获取你的 User ID：搜索{" "}
                      <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
                        @userinfobot
                      </code>{" "}
                      → 发送任意消息 → 它回复你的数字 ID
                    </li>
                    <li>4. 编辑 ~/.hermes/.env：</li>
                  </ol>
                  <CodeBlock
                    code={telegramEnv}
                    lang="bash"
                    title="~/.hermes/.env"
                  />
                  <ol
                    start={5}
                    className="space-y-2 text-sm text-text-secondary"
                  >
                    <li>5. 运行配置向导并启动：</li>
                  </ol>
                  <Terminal
                    title="Telegram Setup"
                    lines={telegramLines}
                  />
                  <p className="text-sm text-text-secondary">
                    6. 手机上找到你的 bot → 发消息 → 验证收到回复
                  </p>
                </div>
              ),
            },
            {
              label: "Discord",
              content: (
                <div className="space-y-4">
                  <ol className="space-y-2 text-sm text-text-secondary">
                    <li>
                      1. 打开 Discord Developer Portal
                      (discord.com/developers) → New Application
                    </li>
                    <li>2. 左侧 Bot → Add Bot → Copy Token</li>
                    <li>
                      3. 左侧 Bot → 打开 Privileged Gateway Intents
                      下的 <strong>Message Content Intent</strong>
                    </li>
                    <li>
                      4. 左侧 OAuth2 → URL Generator → 勾选 bot scope
                      + Send/Read Messages → 复制邀请链接 →
                      邀请到你的服务器
                    </li>
                    <li>5. 编辑 ~/.hermes/.env：</li>
                  </ol>
                  <CodeBlock
                    code={discordEnv}
                    lang="bash"
                    title="~/.hermes/.env"
                  />
                  <ol
                    start={6}
                    className="space-y-2 text-sm text-text-secondary"
                  >
                    <li>
                      6.{" "}
                      <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
                        hermes gateway setup
                      </code>{" "}
                      → 选 Discord
                    </li>
                    <li>
                      7.{" "}
                      <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
                        hermes gateway run
                      </code>
                    </li>
                  </ol>
                </div>
              ),
            },
            {
              label: "飞书 (Lark)",
              content: (
                <div className="space-y-4">
                  <ol className="space-y-2 text-sm text-text-secondary">
                    <li>
                      1. 打开飞书开放平台 (open.feishu.cn) →
                      创建企业自建应用
                    </li>
                    <li>2. 获取 App ID 和 App Secret</li>
                    <li>3. 配置应用能力 → 添加机器人</li>
                    <li>
                      4. 选择连接模式（WebSocket 推荐，无需公网 IP）
                    </li>
                    <li>5. 编辑 ~/.hermes/.env：</li>
                  </ol>
                  <CodeBlock
                    code={feishuEnv}
                    lang="bash"
                    title="~/.hermes/.env"
                  />
                  <ol
                    start={6}
                    className="space-y-2 text-sm text-text-secondary"
                  >
                    <li>
                      6.{" "}
                      <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
                        hermes gateway setup
                      </code>{" "}
                      → 选 Feishu
                    </li>
                    <li>
                      7.{" "}
                      <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
                        hermes gateway run
                      </code>
                    </li>
                  </ol>
                </div>
              ),
            },
            {
              label: "微信",
              content: (
                <div className="space-y-4">
                  <p className="text-sm text-text-secondary">
                    hermes-agent 支持三种微信接入方式：
                  </p>
                  <HoverTable
                    headers={["方式", "适合", "限制"]}
                    rows={[
                      [
                        "企业微信 AI Bot",
                        "企业内部使用",
                        "需要企业微信管理员权限",
                      ],
                      [
                        "企业微信自建应用",
                        "企业正式部署",
                        "需要配置回调地址（公网 IP）",
                      ],
                      [
                        "个人微信（iLink Bot）",
                        "个人使用",
                        "依赖第三方 API，稳定性受限",
                      ],
                    ]}
                  />
                  <p className="text-sm text-text-secondary">
                    推荐从企业微信 AI Bot 开始（最简单）：
                  </p>
                  <CodeBlock
                    code={wecomEnv}
                    lang="bash"
                    title="~/.hermes/.env"
                  />
                  <p className="text-sm text-text-muted">
                    个人微信方式另有社区项目 HermesClaw
                    提供桥接。
                  </p>
                </div>
              ),
            },
          ]}
        />
      </div>

      {/* Security warning */}
      <div className="mt-8 rounded-lg border border-error/30 bg-error/5 p-4">
        <h4 className="mb-2 text-sm font-semibold text-error">
          ⚠️ ALLOWED_USERS 必须配置！
        </h4>
        <p className="text-sm text-text-secondary">不配 = 任何人都能：</p>
        <ul className="mt-1 space-y-1 text-sm text-text-secondary">
          <li>- 跟你的 Agent 聊天</li>
          <li>- 消耗你的 API 额度（= 花你的钱）</li>
          <li>
            - 让 Agent 在你的机器上执行命令（如果 terminal backend 是
            local）
          </li>
        </ul>
      </div>

      {/* Background running */}
      <h3 className="mt-8 text-lg font-semibold">后台运行</h3>
      <p className="mt-2 text-sm text-text-secondary">
        Agent 需要持续运行才能接收消息：
      </p>
      <div className="mt-3">
        <CodeBlock code={serviceCode} lang="bash" title="Service Management" />
      </div>

      {/* Multi-platform */}
      <h3 className="mt-8 text-lg font-semibold">多平台同时运行</h3>
      <p className="mt-2 text-sm text-text-secondary">
        不需要特殊命令。配置好多个平台的 env 变量后，
        <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono">
          hermes gateway run
        </code>{" "}
        自动检测并同时启动所有已配置的平台。
      </p>

      <TryItBox>
        <p>
          选一个你常用的平台，按上面的步骤接上去。从 Telegram 开始最简单。
        </p>
      </TryItBox>

      <ExtendedReading
        links={[
          {
            title: "Layer 1: 消息平台完整列表",
            url: "#messaging-platforms",
            source: "本教程",
          },
        ]}
      />
    </Section>
  );
}
