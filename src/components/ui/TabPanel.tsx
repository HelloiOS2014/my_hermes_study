import { useState, type ReactNode } from "react";
interface Tab { label: string; content: ReactNode; }
export function TabPanel({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab, i) => (
          <button key={tab.label} onClick={() => setActive(i)} className={`px-4 py-2 text-sm transition-colors ${active === i ? "border-b-2 border-accent text-accent" : "text-text-muted hover:text-text-secondary"}`}>{tab.label}</button>
        ))}
      </div>
      <div className="py-4">{tabs[active]?.content}</div>
    </div>
  );
}
