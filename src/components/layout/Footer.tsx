export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-8 text-center text-sm text-text-muted">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4">
        <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">GitHub</a>
        <span className="text-border">·</span>
        <a href="https://hermes-agent.nousresearch.com/docs/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">官方文档</a>
        <span className="text-border">·</span>
        <a href="https://github.com/0xNyk/awesome-hermes-agent" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">awesome-hermes-agent</a>
      </div>
      <p className="mt-4">本教程为社区贡献，非 NousResearch 官方出品</p>
    </footer>
  );
}
