const fs = require('fs');

let pageContent = fs.readFileSync('app/page.tsx', 'utf-8');
const originalBackup = fs.readFileSync('/Users/sauravthakur/Library/Application Support/Code/User/History/-538583b1/3GKZ.tsx', 'utf-8');

// Extract missing chunk from original backup
const missingChunkMatch = originalBackup.match(/const canGenerate = !!form\.requirement\.trim\(\);[\s\S]*?disabled={!canGenerate}\n\s*className={cn\([\s\S]*?canGenerate/);

if (missingChunkMatch) {
  const missingText = missingChunkMatch[0].replace(
    /'shrink-0 h-10 rounded-full w-full sm:w-auto flex items-center justify-center gap-2 transition-all px-5 active:scale-\[0.96\]',/,
    "'shrink-0 h-10 rounded-full w-full sm:w-auto flex items-center justify-center gap-2 transition-all duration-300 px-6 shadow-sm backdrop-blur-md active:scale-[0.98]',"
  );
  
  // Now we find the damaged part in app/page.tsx
  const damagedRegex = /const canGenerate[\s\S]*?\?\s*'bg-zinc-900 border-transparent text-white dark:bg-zinc-100 dark:text-zinc-900 hover:shadow-md hover:-translate-y-\[1px\] cursor-pointer'[\s\S]*?:\s*'bg-white\/60 dark:bg-black\/40 border border-black\/5 dark:border-white\/5 text-black\/40 dark:text-white\/40 cursor-not-allowed',/;
  
  let replacement = missingText + "\n                      ? 'bg-zinc-900 border-transparent text-white dark:bg-zinc-100 dark:text-zinc-900 hover:shadow-md hover:-translate-y-[1px] cursor-pointer'\n                      : 'bg-white/60 dark:bg-black/40 border border-black/5 dark:border-white/5 text-black/40 dark:text-white/40 cursor-not-allowed',";
  
  if (pageContent.match(damagedRegex)) {
    let newPageContent = pageContent.replace(damagedRegex, replacement);
    fs.writeFileSync('app/page.tsx', newPageContent);
    console.log("Successfully restored missing content!");
  } else {
    console.log("Failed to match damaged content in app/page.tsx");
  }
} else {
  console.log("Missing chunk could not be matched");
}