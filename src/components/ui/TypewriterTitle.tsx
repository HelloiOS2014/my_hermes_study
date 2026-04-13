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
    }, 60);
    return () => clearInterval(interval);
  }, [inView, text, reducedMotion]);

  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-3xl font-bold lg:text-4xl">
        <span>{text.slice(0, displayedChars)}</span>
        {!done && <span className="ml-0.5 inline-block h-8 w-0.5 animate-cursor bg-accent" />}
      </h2>
      {subtitle && done && (
        <p className="mt-2 text-lg text-text-secondary animate-fade-in-up">{subtitle}</p>
      )}
    </div>
  );
}
