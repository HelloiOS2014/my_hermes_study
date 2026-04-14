import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { Terminal } from "../../components/ui/Terminal";
import { HoverTable } from "../../components/ui/HoverTable";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

const loginLines = [
  { type: "command" as const, text: "hermes login" },
  {
    type: "output" as const,
    text: "🔗 Opening browser for authentication...",
    delay: 800,
  },
  {
    type: "output" as const,
    text: "   Verification URL: https://portal.nousresearch.com/device?code=ABCD-1234",
    delay: 400,
  },
  { type: "output" as const, text: "" },
  {
    type: "output" as const,
    text: "   If browser doesn't open, visit the URL above and enter code: ABCD-1234",
    delay: 600,
  },
  { type: "output" as const, text: "", delay: 1500 },
  {
    type: "output" as const,
    text: "✔ Authentication successful!",
    delay: 600,
  },
  {
    type: "output" as const,
    text: "✔ Agent key minted — valid for 30 minutes (auto-refreshes)",
    delay: 400,
  },
  {
    type: "output" as const,
    text: "🎉 You're ready! Run `hermes` to start chatting.",
    delay: 400,
  },
];

export function NousPortal() {
  return (
    <Section id="nous-portal">
      <TypewriterTitle
        text="0.5 Nous Portal 快速登录"
        subtitle="一步登录，免费模型立即可用"
      />

      <p className="text-text-secondary">
        <strong>Nous Portal</strong> 是 Hermes Agent
        官方的模型推理平台。通过它，你不需要到处找 API key —
        一个账号就能访问模型和工具。
      </p>
      <p className="mt-2 text-text-secondary">
        免费档可以直接使用 Xiaomi MiMo-V2 Pro（1M
        长上下文、强工具调用）和 MiMo-V2 Omni（全模态理解）。
        免费模型列表可能随时间变化，以 Nous Portal 实际显示为准。
      </p>

      {/* Part 1: Login flow */}
      <h3 className="mt-8 text-lg font-semibold">3 步登录</h3>
      <div className="mt-3">
        <Terminal title="hermes login" lines={loginLines} />
      </div>

      <div className="mt-4 space-y-2 text-sm text-text-secondary">
        <p>
          使用 OAuth Device Code 流程（RFC 8628），在浏览器中授权，安全可靠。
        </p>
        <p>
          凭证保存在{" "}
          <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-accent">
            ~/.hermes/auth.json
          </code>
          （不是 .env），自动刷新，不需要手动管理。
        </p>
      </div>

      {/* Auth management commands */}
      <h4 className="mt-6 font-semibold">凭证管理</h4>
      <div className="mt-2">
        <HoverTable
          headers={["命令", "作用"]}
          rows={[
            ["hermes auth list", "查看当前已登录的凭证"],
            ["hermes auth remove nous", "登出 Nous Portal"],
            ["hermes auth", "进入交互式凭证管理菜单"],
          ]}
        />
      </div>

      {/* Part 2: Free models */}
      <h3 className="mt-10 text-lg font-semibold">免费可用的模型</h3>
      <div className="mt-3">
        <HoverTable
          headers={["模型", "能力", "特点"]}
          rows={[
            [
              "MiMo-V2 Pro",
              "文本对话、工具调用、代码生成",
              "1M 长上下文，Agent 专项优化，工具调用能力强",
            ],
            [
              "MiMo-V2 Omni",
              "图片/视频/音频理解 + 文本",
              "全模态，看得见听得懂能动手",
            ],
          ]}
        />
      </div>

      <div className="mt-4 rounded-lg border border-success/30 bg-success/5 p-4">
        <p className="text-sm text-text-secondary">
          <strong className="text-success">免费档</strong>
          不需要绑卡、不需要付费，登录即用。MiMo-V2 Pro
          是专门为 Agent 场景优化的模型 —
          工具调用、多步推理、长上下文任务上表现特别好，非常适合
          Hermes Agent。
        </p>
      </div>

      {/* Part 3: Paid tier overview */}
      <h3 className="mt-10 text-lg font-semibold">
        付费档：一个订阅搞定一切
      </h3>
      <p className="mt-2 text-sm text-text-secondary">
        Nous Portal 订阅（Plus 及以上）还提供所有模型解锁 +
        托管工具网关 — 不需要单独配各个工具的 API key：
      </p>
      <div className="mt-3">
        <HoverTable
          headers={["工具", "能力", "替代的独立 API Key"]}
          rows={[
            ["Firecrawl 网关", "网页搜索、抓取、内容提取", "FIRECRAWL_API_KEY"],
            ["fal.ai 网关", "AI 图片生成", "FAL_KEY"],
            ["OpenAI Audio 网关", "语音合成 (TTS)", "VOICE_TOOLS_OPENAI_KEY"],
            [
              "Browser Use 网关",
              "浏览器自动化",
              "BROWSERBASE_API_KEY",
            ],
            ["Modal 网关", "云端代码执行", "需自行注册 Modal"],
          ]}
        />
      </div>
      <p className="mt-3 text-sm text-text-muted">
        开启方式：在{" "}
        <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
          ~/.hermes/.env
        </code>{" "}
        中添加{" "}
        <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono">
          HERMES_ENABLE_NOUS_MANAGED_TOOLS=true
        </code>
        。详细配置见 Layer 1。
      </p>

      {/* Part 4: Comparison table */}
      <h3 className="mt-10 text-lg font-semibold">
        Nous Portal vs 手动 API Keys
      </h3>
      <div className="mt-3">
        <HoverTable
          headers={["维度", "Nous Portal", "手动 API Keys"]}
          rows={[
            [
              "上手难度",
              "hermes login 一步搞定",
              "逐个注册 provider、复制 key、编辑 .env",
            ],
            [
              "免费选项",
              "MiMo-V2 Pro/Omni 免费",
              "Google AI Studio 免费额度、Ollama 本地",
            ],
            [
              "模型选择",
              "Portal 上可用的模型",
              "200+ 模型（通过 OpenRouter 或直连）",
            ],
            [
              "工具访问",
              "付费档一站式（无需额外 key）",
              "每个工具单独配 API key",
            ],
            [
              "凭证管理",
              "自动刷新，存 auth.json",
              "手动管理，存 .env",
            ],
            [
              "适合",
              "新手入门、想省事",
              "想用特定 provider、已有 key、注重选择自由",
            ],
          ]}
        />
      </div>

      <div className="mt-4 rounded-lg border border-accent/30 bg-accent/5 p-4">
        <p className="text-sm text-text-secondary">
          <strong className="text-accent">两种方式可以共存。</strong>
          你可以先用 Nous Portal 免费档跑起来，后续需要特定模型时再配手动
          API key。
        </p>
      </div>

      <ExtendedReading
        links={[
          {
            title: "Nous Portal 官网",
            url: "https://portal.nousresearch.com",
            source: "Nous Research",
          },
          {
            title: "Xiaomi MiMo 开放平台",
            url: "https://platform.xiaomimimo.com",
            source: "Xiaomi",
          },
        ]}
      />
    </Section>
  );
}
