interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-primary/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-3 px-4">
        <button
          onClick={onMenuToggle}
          className="mr-1 rounded-md p-1.5 text-text-secondary transition-colors hover:bg-bg-card hover:text-text-primary lg:hidden"
          aria-label="Toggle navigation"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 5h14M3 10h14M3 15h14" />
          </svg>
        </button>
        <span className="font-mono text-lg font-bold text-accent">⚡ Hermes Agent</span>
        <span className="hidden text-sm text-text-secondary sm:inline">交互式教程</span>
        <div className="ml-auto flex items-center gap-3">
          <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener noreferrer" className="hidden rounded-md border border-border px-3 py-1 text-xs text-text-secondary transition-colors hover:border-accent hover:text-accent sm:inline-block">GitHub ★</a>
          <span className="rounded-md bg-bg-card px-2 py-0.5 text-xs text-text-muted">v0.8.x</span>
        </div>
      </div>
    </header>
  );
}
