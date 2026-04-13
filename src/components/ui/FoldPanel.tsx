import { useState, type ReactNode } from "react";
export function FoldPanel({ title, badge, children, defaultOpen = false }: { title: string; badge?: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-3 py-3 text-left transition-colors hover:text-accent">
        <span className="text-text-muted transition-transform" style={{ transform: open ? "rotate(90deg)" : "none" }}>▶</span>
        <span className="font-medium">{title}</span>
        {badge && <span className="rounded-full bg-bg-elevated px-2 py-0.5 text-xs text-text-muted">{badge}</span>}
      </button>
      {open && <div className="pb-4 pl-7">{children}</div>}
    </div>
  );
}
