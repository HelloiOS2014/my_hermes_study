import { navigation, allSectionIds } from "../../data/navigation";
import { useActiveSection } from "../../hooks/useActiveSection";

export function Sidebar() {
  const activeId = useActiveSection(allSectionIds);
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <nav className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-border p-4 lg:block">
      {navigation.map((group) => (
        <div key={group.label} className="mb-6">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">{group.emoji} {group.label}</h3>
          <ul className="space-y-1">
            {group.items.map((item) => (
              <li key={item.id}>
                <button onClick={() => scrollTo(item.id)} className={`w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${activeId === item.id ? "bg-accent/10 text-accent" : "text-text-secondary hover:bg-bg-card hover:text-text-primary"}`}>{item.label}</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
