import { useEffect, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;
function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark-default"],
      langs: ["bash", "yaml", "markdown", "typescript", "python", "json"],
    });
  }
  return highlighterPromise;
}

interface CodeBlockProps { code: string; lang: string; title?: string; }

export function CodeBlock({ code, lang, title }: CodeBlockProps) {
  const [html, setHtml] = useState("");
  useEffect(() => {
    getHighlighter().then((h) => {
      const supported = h.getLoadedLanguages();
      const useLang = supported.includes(lang) ? lang : "text";
      setHtml(h.codeToHtml(code.trim(), { lang: useLang, theme: "github-dark-default" }));
    });
  }, [code, lang]);
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
