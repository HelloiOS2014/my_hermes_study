import { Section } from "../../components/layout/Section";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { Terminal } from "../../components/ui/Terminal";
import { TryItBox } from "../../components/ui/TryItBox";

const envConfigExample = `# .env — Home Assistant 连接配置
HA_URL=http://192.168.1.100:8123
HA_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your_long_lived_token`;

const configYamlExample = `# config.yaml — 智能家居 Agent
toolsets:
  home_assistant:
    enabled: true
    tools:
      - ha_list_entities    # 列出所有设备实体
      - ha_get_state        # 获取设备当前状态
      - ha_call_service     # 调用 HA 服务（开灯、调温等）
    connection:
      url: \${HA_URL}
      token: \${HA_TOKEN}

  telegram:
    enabled: true           # 支持远程控制

# 配合 Telegram 实现远程控制
gateway:
  telegram:
    token: \${TELEGRAM_BOT_TOKEN}
    allowed_users:
      - your_telegram_id`;

const soulMdExample = `# SOUL.md — 智能家居管家

## 角色
你是一位贴心的智能家居管家。

## 行为准则
- 收到控制指令时，先用 ha_get_state 确认当前状态
- 执行操作后，反馈操作结果
- 安全第一：涉及门锁、安防的操作需二次确认
- 用自然语言回复，不要暴露技术细节`;

const terminalLines = [
  { type: "command" as const, text: "hermes chat" },
  { type: "output" as const, text: "🏠 智能家居管家已就绪！" },
  { type: "command" as const, text: "> 关掉客厅的灯" },
  { type: "output" as const, text: "[tool] ha_get_state: light.living_room → on (brightness: 80%)" },
  { type: "output" as const, text: "[tool] ha_call_service: light.turn_off (entity: light.living_room)" },
  { type: "output" as const, text: "已帮你关掉客厅的灯。💡→🌙" },
  { type: "command" as const, text: "> 把空调设到 26 度" },
  { type: "output" as const, text: "[tool] ha_get_state: climate.living_room → cool (当前 24°C, 目标 22°C)" },
  { type: "output" as const, text: "[tool] ha_call_service: climate.set_temperature (entity: climate.living_room, temperature: 26)" },
  { type: "output" as const, text: "空调已调到 26°C，当前室温 24°C，预计 10 分钟后达到目标温度。🌡️" },
  { type: "command" as const, text: "> 家里现在什么情况？" },
  { type: "output" as const, text: "[tool] ha_list_entities: 获取所有设备状态..." },
  { type: "output" as const, text: "当前家居状态：" },
  { type: "output" as const, text: "  💡 客厅灯: 已关闭" },
  { type: "output" as const, text: "  ❄️ 客厅空调: 制冷中 → 26°C" },
  { type: "output" as const, text: "  💡 卧室灯: 开启 (50%亮度)" },
  { type: "output" as const, text: "  🔒 大门: 已上锁" },
  { type: "output" as const, text: "  🌡️ 室外温度: 32°C" },
];

export function SmartHome() {
  return (
    <Section id="recipe-smarthome">
      <h3 className="text-xl font-semibold">智能家居中心</h3>
      <p className="mt-3 leading-relaxed text-text-secondary">
        将 Hermes 接入 Home Assistant，用自然语言控制你家的灯光、空调、门锁等设备。
        再结合 Telegram，随时随地远程管理你的智能家居。
      </p>

      {/* Step 1 */}
      <div className="mt-8">
        <h4 className="flex items-center gap-2 font-medium">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">1</span>
          启用 Home Assistant 工具
        </h4>
        <p className="mt-2 text-sm text-text-secondary">
          Hermes 提供三个 HA 相关工具：<code>ha_list_entities</code> 列出设备、
          <code>ha_get_state</code> 查询状态、<code>ha_call_service</code> 执行控制。
        </p>
      </div>

      {/* Step 2 */}
      <div className="mt-8">
        <h4 className="flex items-center gap-2 font-medium">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">2</span>
          配置 HA 连接
        </h4>
        <p className="mt-2 text-sm text-text-secondary">
          在 <code>.env</code> 中设置你的 Home Assistant URL 和长期访问令牌。
        </p>
        <div className="mt-3">
          <CodeBlock code={envConfigExample} lang="bash" title="~/.hermes/.env" />
        </div>
        <div className="mt-3">
          <CodeBlock code={configYamlExample} lang="yaml" title="~/.hermes/config.yaml" />
        </div>
      </div>

      {/* Step 3 */}
      <div className="mt-8">
        <h4 className="flex items-center gap-2 font-medium">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">3</span>
          自然语言对话控制
        </h4>
        <p className="mt-2 text-sm text-text-secondary">
          直接用中文和 Agent 对话即可控制设备，无需记住任何 entity ID。
        </p>
        <div className="mt-3">
          <Terminal title="hermes chat — 智能家居" lines={terminalLines} />
        </div>
      </div>

      {/* Step 4 */}
      <div className="mt-8">
        <h4 className="flex items-center gap-2 font-medium">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">4</span>
          结合 Telegram 远程控制
        </h4>
        <p className="mt-2 text-sm text-text-secondary">
          在 config.yaml 中同时启用 Telegram gateway，你就可以在外出时通过 Telegram
          给 Bot 发消息来控制家居设备——比如下班前发一句"把空调打开"。
        </p>
      </div>

      {/* SOUL.md */}
      <div className="mt-6">
        <CodeBlock code={soulMdExample} lang="markdown" title="~/.hermes/SOUL.md (智能家居)" />
      </div>

      <TryItBox>
        <p>
          如果你有 Home Assistant 实例，试试将 Hermes 接入并用自然语言控制一个设备。
          没有 HA 也没关系——可以先用 HA 的 Docker 镜像搭建一个测试环境。
        </p>
      </TryItBox>
    </Section>
  );
}
