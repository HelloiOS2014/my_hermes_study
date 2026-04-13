import { navigation, allSectionIds } from "../../data/navigation";
import { useActiveSection } from "../../hooks/useActiveSection";

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const activeId = useActiveSection(allSectionIds);
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    onClose?.();
  };

  const navContent = (
    <>
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
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-border/30 bg-bg-primary/50 p-4 lg:block">
        {navContent}
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
          <nav className="fixed left-0 top-14 z-50 h-[calc(100vh-3.5rem)] w-64 overflow-y-auto border-r border-border bg-bg-primary p-4 lg:hidden">
            {navContent}
          </nav>
        </>
      )}
    </>
  );
}
