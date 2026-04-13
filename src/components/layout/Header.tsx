interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-bg-primary/70 backdrop-blur-xl">
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
        <span className="gradient-text text-lg font-bold tracking-tight">⚡ Hermes Agent</span>
        <span className="hidden text-sm text-text-muted sm:inline">交互式教程</span>
        <div className="ml-auto flex items-center gap-3">
          <a
            href="https://github.com/NousResearch/hermes-agent"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md border border-border/50 bg-bg-card/50 px-3 py-1 text-xs text-text-secondary transition-all hover:border-accent/40 hover:text-accent sm:inline-block"
          >
            GitHub ★
          </a>
          <span className="rounded-md bg-bg-card/50 px-2 py-0.5 text-xs text-text-muted">
            v0.8.x
          </span>
        </div>
      </div>
      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
    </header>
  );
}
