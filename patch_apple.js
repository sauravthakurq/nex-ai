const fs = require('fs');

// 1. generation-toolbar.tsx
let f1 = 'components/generation/generation-toolbar.tsx';
let c1 = fs.readFileSync(f1, 'utf-8');

c1 = c1.replace(
  /const pillCls =[\s\S]*?;/,
  "const pillCls =\n      'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] tracking-tight font-medium transition-all duration-300 cursor-pointer select-none whitespace-nowrap shadow-sm backdrop-blur-md active:scale-95';"
);
c1 = c1.replace(
  /const pillMuted = `\$\{pillCls\} border-black dark:border-white text-black dark:text-white hover:bg-black\/5 dark:hover:bg-white\/10`;/,
  "const pillMuted = `\${pillCls} border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 text-black/70 dark:text-white/70 hover:bg-black/5 hover:text-black dark:hover:bg-white/10 dark:hover:text-white hover:shadow-md`;"
);
c1 = c1.replace(
  /const pillActive = `\$\{pillCls\} border-white\/15 bg-black text-white dark:border-white\/20 dark:bg-white dark:text-black`;/,
  "const pillActive = `\${pillCls} border border-black/20 dark:border-white/20 bg-black text-white dark:bg-white dark:text-black shadow-md hover:shadow-lg`;"
);

c1 = c1.replace(
  /'inline-flex items-center justify-center size-7 rounded-full transition-all cursor-pointer select-none',/,
  "'inline-flex items-center justify-center size-[34px] rounded-full transition-all duration-300 cursor-pointer select-none shadow-sm backdrop-blur-md active:scale-95',"
);
c1 = c1.replace(
  /'ring-\[1.5px\] ring-black dark:ring-white hover:bg-black\/5 dark:hover:bg-white\/10',/,
  "'border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 hover:bg-black/5 dark:hover:bg-white/10 hover:shadow-md',"
);
c1 = c1.replace(
  /'ring-violet-300 dark:ring-violet-700 bg-violet-50 dark:bg-violet-950\/20',/,
  "'border-violet-500/30 bg-violet-500/10 dark:bg-violet-500/20 shadow-violet-500/20 text-violet-700 dark:text-violet-300',"
);

fs.writeFileSync(f1, c1);
console.log('patched f1');

// 2. media-popover.tsx
let f2 = 'components/generation/media-popover.tsx';
let c2 = fs.readFileSync(f2, 'utf-8');

c2 = c2.replace(
  /'inline-flex items-center gap-1\.5 rounded-full px-2\.5 py-1 text-xs font-medium transition-all cursor-pointer select-none whitespace-nowrap border',/,
  "'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] tracking-tight font-medium transition-all duration-300 cursor-pointer select-none whitespace-nowrap shadow-sm backdrop-blur-md active:scale-95',"
);
c2 = c2.replace(
  /enabledCount > 0[\s\S]*?\? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100 shadow-md hover:shadow-lg hover:scale-\[1.02\]'[\s\S]*?: 'text-muted-foreground\/70 hover:text-foreground hover:bg-muted\/60 border-border\/50',/,
  "enabledCount > 0\n              ? 'border-transparent bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md hover:shadow-lg hover:-translate-y-[1px]'\n              : 'border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 text-black/70 dark:text-white/70 hover:bg-black/5 hover:text-black dark:hover:bg-white/10 dark:hover:text-white hover:shadow-md',"
);

fs.writeFileSync(f2, c2);
console.log('patched f2');

// 3. speech-button.tsx
let f3 = 'components/audio/speech-button.tsx';
let c3 = fs.readFileSync(f3, 'utf-8');

c3 = c3.replace(
  /'relative flex items-center justify-center rounded-lg transition-all duration-200 shrink-0 cursor-pointer',/,
  "'relative flex items-center justify-center rounded-full transition-all duration-300 shrink-0 cursor-pointer shadow-sm backdrop-blur-md active:scale-95',"
);
c3 = c3.replace(
  /'border border-black dark:border-white text-black dark:text-white hover:bg-black\/5 dark:hover:bg-white\/10',/,
  "'border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 text-black/70 dark:text-white/70 hover:bg-black/5 hover:text-black dark:hover:bg-white/10 dark:hover:text-white hover:shadow-md',"
);
c3 = c3.replace(
  /const sizeClasses = isMd \? 'h-8 w-8' : 'h-6 w-6';/,
  "const sizeClasses = isMd ? 'h-[34px] w-[34px]' : 'h-8 w-8';"
);

fs.writeFileSync(f3, c3);
console.log('patched f3');

// 4. app/page.tsx
let f4 = 'app/page.tsx';
let c4 = fs.readFileSync(f4, 'utf-8');

c4 = c4.replace(
  /'shrink-0 h-10 rounded-full w-full sm:w-auto flex items-center justify-center gap-2 transition-all px-5 active:scale-\[0.96\]',/,
  "'shrink-0 h-10 rounded-full w-full sm:w-auto flex items-center justify-center gap-2 transition-all duration-300 px-6 shadow-sm backdrop-blur-md active:scale-[0.98]',"
);
c4 = c4.replace(
  /canGenerate[\s\S]*?\? 'bg-primary text-primary-foreground hover:opacity-90 shadow-sm cursor-pointer'[\s\S]*?: 'bg-muted text-muted-foreground\/50 cursor-not-allowed',/,
  "canGenerate\n                      ? 'bg-zinc-900 border-transparent text-white dark:bg-zinc-100 dark:text-zinc-900 hover:shadow-md hover:-translate-y-[1px] cursor-pointer'\n                      : 'bg-white/60 dark:bg-black/40 border border-black/5 dark:border-white/5 text-black/40 dark:text-white/40 cursor-not-allowed',"
);

fs.writeFileSync(f4, c4);
console.log('patched f4');
