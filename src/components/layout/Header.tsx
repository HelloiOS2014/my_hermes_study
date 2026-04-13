export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-primary/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-3 px-4">
        <span className="font-mono text-lg font-bold text-accent">⚡ Hermes Agent</span>
        <span className="text-sm text-text-secondary">交互式教程</span>
        <div className="ml-auto flex items-center gap-3">
          <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener noreferrer" className="rounded-md border border-border px-3 py-1 text-xs text-text-secondary transition-colors hover:border-accent hover:text-accent">GitHub ★</a>
          <span className="rounded-md bg-bg-card px-2 py-0.5 text-xs text-text-muted">v0.8.x</span>
        </div>
      </div>
    </header>
  );
}
