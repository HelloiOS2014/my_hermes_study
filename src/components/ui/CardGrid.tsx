import { useState, type ReactNode } from "react";
interface Card { title: string; description: string; detail?: ReactNode; icon?: string; }
export function CardGrid({ cards, columns = 3 }: { cards: Card[]; columns?: 2 | 3 | 4 }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const colClass = { 2: "grid-cols-1 sm:grid-cols-2", 3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", 4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <div className={`grid gap-4 ${colClass}`}>
      {cards.map((card, i) => (
        <div key={card.title} onClick={() => setExpandedIndex(expandedIndex === i ? null : i)} className={`cursor-pointer rounded-lg border p-4 transition-all ${expandedIndex === i ? "border-accent bg-accent/5" : "border-border bg-bg-card hover:border-text-muted"}`}>
          <div className="flex items-start gap-2">
            {card.icon && <span className="text-lg">{card.icon}</span>}
            <div><h4 className="font-medium">{card.title}</h4><p className="mt-1 text-sm text-text-secondary">{card.description}</p></div>
          </div>
          {expandedIndex === i && card.detail && <div className="mt-3 border-t border-border pt-3 text-sm text-text-secondary">{card.detail}</div>}
        </div>
      ))}
    </div>
  );
}
