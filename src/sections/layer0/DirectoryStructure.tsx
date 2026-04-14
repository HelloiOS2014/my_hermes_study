import { Section } from "../../components/layout/Section";
import { TypewriterTitle } from "../../components/ui/TypewriterTitle";
import { FoldPanel } from "../../components/ui/FoldPanel";
import { ExtendedReading } from "../../components/ui/ExtendedReading";

interface FileEntry {
  name: string;
  description: string;
  category: "user" | "agent" | "system";
  children?: FileEntry[];
}

const categoryStyles = {
  user: { badge: "🟢 你编辑", color: "text-success" },
  agent: { badge: "🔵 自动管理", color: "text-accent" },
  system: { badge: "⚙️ 系统管理", color: "text-text-muted" },
};

const fileTree: FileEntry[] = [
  { name: "config.yaml", description: "所有配置的总入口（下一节详细讲）", category: "user" },
  { name: ".env", description: "API 密钥，安装时从 .env.example 复制而来", category: "user" },
  { name: "SOUL.md", description: "Agent 人格定义（0.9 节详细讲）", category: "user" },
  { name: "MEMORY.md", description: "Agent 观察到的你的偏好和习惯，它会自己更新。你可以看、可以改、可以删", category: "agent" },
  { name: "USER.md", description: "Agent 对你的理解（职业、技能、喜好），自动维护", category: "agent" },
  { name: "AGENTS.md", description: "项目级指令（可选，类似 .cursorrules）", category: "user" },
  {
    name: "hermes-agent/",
    description: "程序本体（安装脚本管理）",
    category: "system",
    children: [
      { name: "venv/", description: "Python 虚拟环境", category: "system" },
      { name: "...", description: "源代码", category: "system" },
    ],
  },
  { name: "skills/", description: "已学习的技能文件。有些自动创建，你也可以手写", category: "agent" },
  { name: "memories/", description: "SQLite FTS5 记忆数据库，用于跨会话搜索相关上下文", category: "agent" },
  { name: "sessions/", description: "对话历史记录", category: "agent" },
  { name: "logs/", description: "运行日志", category: "agent" },
  { name: "cron/", description: "定时任务配置", category: "user" },
  { name: "hooks/", description: "Hook 脚本", category: "user" },
  { name: "image_cache/", description: "图片缓存", category: "agent" },
  { name: "audio_cache/", description: "音频缓存", category: "agent" },
  { name: "pairing/", description: "设备配对信息", category: "agent" },
];

function FileTreeItem({ entry }: { entry: FileEntry }) {
  const style = categoryStyles[entry.category];
  if (entry.children) {
    return (
      <FoldPanel title={entry.name} badge={style.badge}>
        <p className="mb-3 text-sm text-text-secondary">{entry.description}</p>
        <div className="space-y-0">
          {entry.children.map((child) => (
            <FileTreeItem key={child.name} entry={child} />
          ))}
        </div>
      </FoldPanel>
    );
  }
  return (
    <div className="flex items-start gap-3 border-b border-border/50 py-2.5 last:border-0">
      <code className={`shrink-0 font-mono text-sm ${style.color}`}>
        {entry.name}
      </code>
      <span className="text-sm text-text-secondary">{entry.description}</span>
      <span className="ml-auto shrink-0 rounded-full bg-bg-elevated px-2 py-0.5 text-xs text-text-muted">
        {style.badge}
      </span>
    </div>
  );
}

export function DirectoryStructure() {
  return (
    <Section id="directory-structure">
      <TypewriterTitle
        text="0.8 目录结构一览"
        subtitle="了解 ~/.hermes/ 里的每个文件"
      />

      <div className="flex flex-wrap gap-4 text-sm">
        {Object.values(categoryStyles).map((s) => (
          <span key={s.badge} className="flex items-center gap-1.5">
            <span>{s.badge}</span>
          </span>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-border">
        <div className="border-b border-border bg-bg-card px-4 py-2">
          <code className="text-sm text-text-muted">~/.hermes/</code>
        </div>
        <div className="p-4">
          {fileTree.map((entry) => (
            <FileTreeItem key={entry.name} entry={entry} />
          ))}
        </div>
      </div>

      {/* Backup advice */}
      <div className="mt-8 rounded-lg border border-warning/30 bg-warning/5 p-4">
        <h4 className="mb-2 text-sm font-semibold text-warning">
          备份建议
        </h4>
        <p className="text-sm text-text-secondary">
          <strong>更新前务必备份：</strong> config.yaml, .env, SOUL.md,
          skills/, memories/ — 这些是你的数据。
        </p>
        <p className="mt-1 text-sm text-text-secondary">
          <strong>可以安全删除：</strong> sessions/（对话历史，可再生）、logs/、image_cache/、audio_cache/
        </p>
      </div>

      <ExtendedReading
        links={[
          {
            title: "Layer 1: 记忆系统详解",
            url: "#memory-system",
            source: "本教程",
          },
          {
            title: "Layer 1: Skills 系统详解",
            url: "#skills-system",
            source: "本教程",
          },
        ]}
      />
    </Section>
  );
}
