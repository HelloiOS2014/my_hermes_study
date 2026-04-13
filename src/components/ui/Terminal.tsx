import { useEffect, useState } from "react";

interface TerminalLine {
  type: "command" | "output" | "comment";
  text: string;
  delay?: number;
}

interface TerminalProps {
  title?: string;
  lines: TerminalLine[];
  inView?: boolean;
  reducedMotion?: boolean;
}

export function Terminal({ title = "Terminal", lines, inView = true, reducedMotion = false }: TerminalProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) { setVisibleCount(lines.length); return; }
    setVisibleCount(0);
    let i = 0;
    const showNext = () => {
      if (i >= lines.length) return;
      const delay = lines[i]?.delay ?? (lines[i]?.type === "command" ? 800 : 200);
      setTimeout(() => { i++; setVisibleCount(i); showNext(); }, delay);
    };
    showNext();
  }, [inView, lines, reducedMotion]);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-bg-primary">
      <div className="flex items-center gap-2 border-b border-border bg-bg-card px-4 py-2">
        <span className="h-3 w-3 rounded-full bg-error/60" />
        <span className="h-3 w-3 rounded-full bg-warning/60" />
        <span className="h-3 w-3 rounded-full bg-success/60" />
        <span className="ml-2 text-xs text-text-muted">{title}</span>
      </div>
      <div className="p-4 font-mono text-sm leading-relaxed">
        {lines.slice(0, visibleCount).map((line, i) => (
          <div key={i} className="animate-fade-in-up">
            {line.type === "command" && <div><span className="text-success">$</span> <span className="text-text-primary">{line.text}</span></div>}
            {line.type === "output" && <div className="text-text-secondary">{line.text}</div>}
            {line.type === "comment" && <div className="text-text-muted"># {line.text}</div>}
          </div>
        ))}
        {visibleCount < lines.length && visibleCount > 0 && <span className="inline-block h-4 w-2 animate-blink bg-text-primary" />}
      </div>
    </div>
  );
}
