import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

interface CodeBlockProps { code: string; lang: string; title?: string; }

export function CodeBlock({ code, lang, title }: CodeBlockProps) {
  const [html, setHtml] = useState("");
  useEffect(() => { codeToHtml(code.trim(), { lang, theme: "github-dark-default" }).then(setHtml); }, [code, lang]);
  const copy = () => { navigator.clipboard.writeText(code.trim()); };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border">
      {title && (
        <div className="flex items-center justify-between border-b border-border bg-bg-card px-4 py-2">
          <span className="text-xs text-text-muted">{title}</span>
          <span className="rounded bg-bg-elevated px-1.5 py-0.5 text-xs text-text-muted">{lang}</span>
        </div>
      )}
      <div className="relative">
        <button onClick={copy} className="absolute right-2 top-2 rounded-md border border-border bg-bg-card px-2 py-1 text-xs text-text-muted opacity-0 transition-opacity hover:text-accent group-hover:opacity-100">Copy</button>
        {html ? (
          <div className="overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent" dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <pre className="overflow-x-auto bg-bg-primary p-4 text-sm text-text-secondary"><code>{code.trim()}</code></pre>
        )}
      </div>
    </div>
  );
}
