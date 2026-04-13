export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <header className="sticky top-0 z-50 border-b border-border bg-bg-primary/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center px-4">
          <span className="font-mono text-lg font-bold text-accent">Hermes Agent</span>
          <span className="ml-2 text-sm text-text-secondary">交互式教程</span>
          <span className="ml-auto rounded-md border border-border px-2 py-0.5 text-xs text-text-muted">v0.8.x</span>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold">Hermes Agent 工作台</h1>
        <p className="mt-4 text-text-secondary">教程内容加载中...</p>
      </main>
    </div>
  );
}
