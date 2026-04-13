import type { ReactNode } from "react";
export function TryItBox({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 rounded-lg border border-success/30 bg-success/5 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-success"><span>▶</span> 动手试试</div>
      <div className="text-sm text-text-secondary">{children}</div>
    </div>
  );
}
