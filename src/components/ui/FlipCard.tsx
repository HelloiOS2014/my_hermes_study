import { useState, type ReactNode } from "react";
export function FlipCard({ front, back, className = "" }: { front: ReactNode; back: ReactNode; className?: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={`cursor-pointer [perspective:1000px] ${className}`} onClick={() => setFlipped(!flipped)}>
      <div className="relative transition-transform duration-500 [transform-style:preserve-3d]" style={{ transform: flipped ? "rotateY(180deg)" : "none" }}>
        <div className="rounded-lg border border-border bg-bg-card p-6 [backface-visibility:hidden]">{front}<p className="mt-3 text-xs text-text-muted">点击翻转 →</p></div>
        <div className="absolute inset-0 rounded-lg border border-accent/30 bg-bg-card p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">{back}</div>
      </div>
    </div>
  );
}
