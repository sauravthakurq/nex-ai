const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

const regex = /{/\* ═══ Top-right pill \(unchanged\) ═══ \*/}[\s\S]*?className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500 ease-out" \/>\s*<\/button>\s*<\/div>\s*<\/div>/;

const newString = `{/* ═══ Top-right pill ═══ */}
      <div
        ref={toolbarRef}
        className="fixed top-4 right-4 z-50 flex items-center"
      >
        <button
          onClick={() => setSettingsOpen(true)}
          className="p-2 rounded-full text-white hover:text-white/80 transition-all group active:scale-[0.95]"
        >
          <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500 ease-out" />
        </button>
      </div>`;

content = content.replace(regex, newString);
fs.writeFileSync('app/page.tsx', content);
console.log('replaced');
