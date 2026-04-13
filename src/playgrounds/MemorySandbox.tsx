import { useState } from "react";

type Stage = "idle" | "writing" | "stored" | "loading" | "injected" | "nudge";

const stages: { key: Stage; label: string; description: string }[] = [
  { key: "idle", label: "输入", description: "Agent 决定保存一条记忆" },
  { key: "writing", label: "写入", description: "memory 工具将内容追加到 MEMORY.md" },
  { key: "stored", label: "落盘", description: "内容持久化在 ~/.hermes/MEMORY.md" },
  { key: "loading", label: "加载", description: "下次 session 启动时读取 MEMORY.md" },
  { key: "injected", label: "注入", description: "作为 frozen snapshot 注入 system prompt 第 5 层" },
  { key: "nudge", label: "审视", description: "经过若干轮对话后，Agent 被提醒审视记忆" },
];

export function MemorySandbox() {
  const [memoryText, setMemoryText] = useState("User prefers terminal commands over GUI tools");
  const [currentStage, setCurrentStage] = useState<Stage>("idle");
  const [isPlaying, setIsPlaying] = useState(false);

  const playSequence = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    const stageKeys = stages.map((s) => s.key);
    let i = 0;
    const advance = () => {
      if (i >= stageKeys.length) { setIsPlaying(false); return; }
      setCurrentStage(stageKeys[i]!);
      i++;
      setTimeout(advance, 1200);
    };
    advance();
  };

  const stageIndex = stages.findIndex((s) => s.key === currentStage);
  const currentStageData = stages[stageIndex];

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-border">
      <div className="border-b border-border bg-bg-card px-4 py-2 text-sm font-medium">记忆生命周期沙盒</div>
      <div className="p-4">
        <div className="flex gap-3">
          <input type="text" value={memoryText} onChange={(e) => setMemoryText(e.target.value)} placeholder="输入一条要记住的内容..." className="flex-1 rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm outline-none focus:border-accent" />
          <button onClick={playSequence} disabled={isPlaying || !memoryText.trim()} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg-primary transition-opacity disabled:opacity-50">{isPlaying ? "播放中..." : "▶ 观看流转"}</button>
        </div>
        <div className="mt-6 flex items-center gap-2">
          {stages.map((stage, i) => (
            <div key={stage.key} className="flex items-center">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${i <= stageIndex ? "border-accent bg-accent/10 text-accent" : "border-border text-text-muted"}`}>{i + 1}</div>
              {i < stages.length - 1 && <div className={`mx-1 h-0.5 w-6 transition-colors sm:w-10 ${i < stageIndex ? "bg-accent" : "bg-border"}`} />}
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-bg-card p-4">
          <div className="flex items-center gap-2">
            <span className="font-medium text-accent">{currentStageData?.label}</span>
            <span className="text-sm text-text-secondary">— {currentStageData?.description}</span>
          </div>
          <pre className="mt-3 rounded bg-bg-primary p-3 font-mono text-xs text-text-secondary">
            {currentStage === "idle" && `memory("save", "${memoryText}")`}
            {currentStage === "writing" && `# MEMORY.md\n- ${memoryText}`}
            {currentStage === "stored" && `~/.hermes/MEMORY.md  (${memoryText.length} chars / 2200 limit)`}
            {currentStage === "loading" && `[Session start] Loading MEMORY.md → frozen snapshot`}
            {currentStage === "injected" && `[System Prompt Layer 5]\n## Memory Notes\n- ${memoryText}`}
            {currentStage === "nudge" && `[Turn 15] "Review your memory notes. Is anything outdated?"`}
          </pre>
        </div>
      </div>
    </div>
  );
}
