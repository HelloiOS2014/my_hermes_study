import { useEffect, useState } from "react";

interface TypewriterTitleProps {
  text: string;
  subtitle?: string;
  className?: string;
  inView?: boolean;
  reducedMotion?: boolean;
}

export function TypewriterTitle({ text, subtitle, className = "", inView = true, reducedMotion = false }: TypewriterTitleProps) {
  const [displayedChars, setDisplayedChars] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView || reducedMotion) {
      setDisplayedChars(text.length);
      setDone(true);
      return;
    }
    setDisplayedChars(0);
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedChars(i);
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 300);
      }
    }, 55);
    return () => clearInterval(interval);
  }, [inView, text, reducedMotion]);

  return (
    <div className={`layer-divider mb-10 ${className}`}>
      <h2 className="gradient-text-animated text-4xl font-bold tracking-tight lg:text-5xl">
        <span>{text.slice(0, displayedChars)}</span>
        {!done && <span className="ml-0.5 inline-block h-10 w-0.5 animate-cursor bg-accent" />}
      </h2>
      {subtitle && done && (
        <p className="mt-3 text-lg tracking-wide text-text-secondary animate-fade-in-up">{subtitle}</p>
      )}
    </div>
  );
}
