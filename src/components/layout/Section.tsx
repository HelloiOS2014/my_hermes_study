import type { ReactNode } from "react";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface SectionProps { id: string; children: ReactNode; className?: string; }

export function Section({ id, children, className = "" }: SectionProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.05 });
  const reduced = useReducedMotion();
  return (
    <section ref={ref} id={id} className={`scroll-mt-16 py-16 ${className}`}
      style={{ opacity: reduced || inView ? 1 : 0, transform: reduced || inView ? "none" : "translateY(20px)", transition: reduced ? "none" : "opacity 0.6s ease-out, transform 0.6s ease-out" }}>
      {children}
    </section>
  );
}
