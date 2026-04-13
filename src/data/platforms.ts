export interface PlatformGuide { name: string; icon: string; steps: { title: string; code?: string; note?: string }[]; }

export const platformGuides: PlatformGuide[] = [
  { name: "Telegram", icon: "✈️", steps: [{ title: "创建 Bot", note: "在 Telegram 找 @BotFather，发送 /newbot，获取 token" }, { title: "配置 .env", code: "TELEGRAM_BOT_TOKEN=your_token_here" }, { title: "启动网关", code: "hermes gateway" }, { title: "发消息测试", note: "在 Telegram 找到你的 bot，发任何消息" }] },
  { name: "Discord", icon: "🎮", steps: [{ title: "创建应用", note: "在 Discord Developer Portal 创建 Application，添加 Bot" }, { title: "获取 Token", note: "Bot → Reset Token → 复制" }, { title: "配置 .env", code: "DISCORD_BOT_TOKEN=your_token_here" }, { title: "邀请 Bot", note: "OAuth2 → URL Generator → bot scope → 邀请到服务器" }, { title: "启动网关", code: "hermes gateway" }] },
  { name: "微信", icon: "💚", steps: [{ title: "准备", note: "需要企业微信或 WeCom 接口" }, { title: "配置 .env", code: "WEIXIN_APP_ID=your_app_id\nWEIXIN_APP_SECRET=your_secret" }, { title: "启动网关", code: "hermes gateway" }, { title: "注意", note: "个人号接入限制较多，推荐企业微信" }] },
  { name: "飞书", icon: "🐦", steps: [{ title: "创建应用", note: "在飞书开放平台创建企业自建应用" }, { title: "配置权限", note: "添加机器人能力，配置消息事件订阅" }, { title: "配置 .env", code: "FEISHU_APP_ID=your_app_id\nFEISHU_APP_SECRET=your_secret" }, { title: "启动网关", code: "hermes gateway" }] },
];

export const backendHeaders = ["后端", "适用场景", "安全边界", "成本", "配置"];

export const backendRows = [
  ["local", "开发/个人", "无隔离", "免费", "TERMINAL_BACKEND=local"],
  ["Docker", "生产推荐", "容器隔离", "低", "TERMINAL_BACKEND=docker"],
  ["SSH", "远程服务器", "网络隔离", "服务器费用", "TERMINAL_BACKEND=ssh"],
  ["Modal", "Serverless", "函数级隔离", "按用量", "TERMINAL_BACKEND=modal"],
  ["Daytona", "云开发环境", "Workspace 隔离", "按用量", "TERMINAL_BACKEND=daytona"],
  ["Singularity", "HPC 场景", "用户级隔离", "集群费用", "TERMINAL_BACKEND=singularity"],
];
