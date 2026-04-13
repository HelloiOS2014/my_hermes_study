interface CheckItem { label: string; description?: string; }
export function CheckList({ items }: { items: CheckItem[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.label} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-success/50 text-xs text-success">✓</span>
          <div><span className="font-medium">{item.label}</span>{item.description && <p className="mt-0.5 text-sm text-text-secondary">{item.description}</p>}</div>
        </li>
      ))}
    </ul>
  );
}
