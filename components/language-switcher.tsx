'use client';

import { useState, useRef, useEffect } from 'react';
import { useI18n } from '@/lib/hooks/use-i18n';
import { supportedLocales } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  /** Called when the dropdown opens, so parent can close sibling dropdowns */
  onOpen?: () => void;
}

export function LanguageSwitcher({ onOpen }: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  if (supportedLocales.length <= 1) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) onOpen?.();
        }}
        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-foreground/50 hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground active:scale-[0.95] transition-all"
      >
        {supportedLocales.find((l) => l.code === locale)?.shortLabel ?? locale}
      </button>
      {open && (
        <div className="absolute top-full mt-2 right-0 glass border border-black/5 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden z-50 min-w-[140px] max-w-[calc(100vw-2rem)] p-1 animate-in fade-in zoom-in-95 duration-200">
          {supportedLocales.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLocale(l.code);
                setOpen(false);
              }}
              className={cn(
                'w-full px-3 py-2 text-left text-sm rounded-xl font-medium transition-all flex items-center justify-between',
                locale === l.code
                  ? 'bg-black/5 dark:bg-white/10 text-foreground'
                  : 'text-foreground/70 hover:bg-black/5 dark:hover:bg-white/5',
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
