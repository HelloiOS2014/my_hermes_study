interface ReadingLink { title: string; url: string; source: string; }
export function ExtendedReading({ links }: { links: ReadingLink[] }) {
  return (
    <div className="mt-8 rounded-lg border border-border bg-bg-card p-4">
      <h4 className="mb-3 text-sm font-semibold text-text-muted">📚 延伸阅读</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.url} className="text-sm">
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{link.title}</a>
            <span className="ml-2 text-text-muted">— {link.source}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
