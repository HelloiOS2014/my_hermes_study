import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { HoverTable } from "../../components/ui/HoverTable";

const gatewayFlow = [
  { label: "Platform", sub: "Discord / Telegram / Slack / ..." },
  { label: "Adapter", sub: "gateway/platforms/<platform>.py" },
  { label: "AIAgent", sub: "per-message creation + SQLite session" },
  { label: "Response", sub: "text / media / voice memo" },
  { label: "Platform", sub: "deliver back to user" },
];

const platformFeatures = [
  ["Discord", "DM + 频道", "语音备忘、图片、文件上传"],
  ["Telegram", "私聊 + 群组", "语音转文字、内联键盘"],
  ["Slack", "DM + 频道", "线程回复、Blocks 格式"],
  ["Matrix", "E2E 加密", "加密房间支持"],
  ["WhatsApp", "Cloud API", "模板消息、媒体"],
  ["SMS/MMS", "Twilio", "短信 + 彩信"],
];

const gatewayRunnerCode = [
  "# gateway/run.py (simplified)",
  "class GatewayRunner:",
  "    def __init__(self, platform: str):",
  "        self.adapter = load_adapter(platform)",
  "        self.db = SQLiteSessionStore()",
  "",
  "    async def handle_message(self, msg: IncomingMessage):",
  "        # 1. DM pairing security check",
  "        if not self.verify_dm_pair(msg):",
  "            return",
  "",
  "        # 2. Load or create session",
  "        session = self.db.get_or_create(",
  "            user_id=msg.user_id,",
  "            platform=msg.platform",
  "        )",
  "",
  "        # 3. Voice memo? Transcribe first",
  "        if msg.has_voice:",
  "            msg.text = await transcribe(",
  "                msg.voice_data,",
  "                engine=config.whisper_engine",
  "                # faster-whisper (local)",
  "                # or Whisper API (cloud)",
  "            )",
  "",
  "        # 4. Create per-message AIAgent",
  "        agent = AIAgent(",
  "            session=session,",
  "            system_prompt=self.adapter.system_prompt",
  "        )",
  "        response = await agent.run(msg.text)",
  "",
  "        # 5. Handle media delivery",
  "        for part in response.parts:",
  '            if part.startswith("MEDIA:"):',"" +
  "                await self.adapter.send_media(",
  "                    msg.channel, part[6:]",
  "                )",
  "            else:",
  "                await self.adapter.send_text(",
  "                    msg.channel, part",
  "                )",
].join("\n");

export function GatewayArchitecture() {
  return (
    <Section id="gateway-architecture">
      <h3 className="text-xl font-semibold">Gateway 架构</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        <code>gateway/run.py</code> 是 Hermes Agent 的消息平台入口。
        通过 <strong>Platform Adapter 模式</strong>，同一套 agent 逻辑可以运行在
        Discord、Telegram、Slack 等 20+ 平台上。
      </p>

      {/* Architecture diagram */}
      <div className="mt-8 overflow-x-auto">
        <div className="mx-auto flex min-w-[600px] items-center justify-center gap-2 py-4">
          {gatewayFlow.map((node, i) => (
            <div key={`${node.label}-${i}`} className="flex items-center gap-2">
              <div className="rounded-lg border border-border bg-bg-card px-4 py-3 text-center">
                <div className="text-sm font-semibold">{node.label}</div>
                <div className="mt-1 text-xs text-text-muted">{node.sub}</div>
              </div>
              {i < gatewayFlow.length - 1 && (
                <div className="text-text-muted">{"\u2192"}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <CodeBlock
          code={gatewayRunnerCode}
          lang="python"
          title="gateway/run.py -- Gateway Runner 核心逻辑"
        />
      </div>

      {/* Key concepts */}
      <h4 className="mt-10 text-lg font-semibold">核心机制</h4>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-bg-card p-5">
          <h5 className="font-medium">Per-message AIAgent 创建</h5>
          <p className="mt-2 text-sm text-text-secondary">
            每条消息创建一个新的 AIAgent 实例，但通过 <strong>SQLite session</strong>{" "}
            保持对话连续性。这样既能隔离单次请求的状态，又能跨消息维持上下文。
            Session 按 user_id + platform 组合索引。
          </p>
        </div>
        <div className="rounded-lg border border-border bg-bg-card p-5">
          <h5 className="font-medium">语音备忘转录</h5>
          <p className="mt-2 text-sm text-text-secondary">
            用户发送语音消息时，Gateway 先将其转录为文字再交给 Agent。
            支持两种引擎：<strong>faster-whisper</strong>（本地部署，低延迟）
            和 <strong>Whisper API</strong>（云端，无需 GPU）。
          </p>
        </div>
        <div className="rounded-lg border border-border bg-bg-card p-5">
          <h5 className="font-medium">
            媒体文件投递 (<code>MEDIA:</code> 语法)
          </h5>
          <p className="mt-2 text-sm text-text-secondary">
            Agent 可以在响应中使用 <code>MEDIA:/path/to/file</code> 语法。
            Gateway 识别这个前缀后，通过 platform adapter 的{" "}
            <code>send_media()</code> 方法发送图片、文件或音频。
          </p>
        </div>
        <div className="rounded-lg border border-border bg-bg-card p-5">
          <h5 className="font-medium">DM Pairing 安全</h5>
          <p className="mt-2 text-sm text-text-secondary">
            Gateway 验证消息来源的合法性：确保 DM 消息来自已配对的用户，
            防止未授权用户通过平台 API 直接给 bot 发消息。
            每个 platform adapter 实现自己的验证逻辑。
          </p>
        </div>
      </div>

      {/* Platform support table */}
      <h4 className="mt-10 text-lg font-semibold">支持平台</h4>
      <div className="mt-4">
        <HoverTable
          headers={["平台", "支持模式", "特色功能"]}
          rows={platformFeatures}
        />
      </div>
    </Section>
  );
}
