import fs from 'fs';
const FILE = 'components/slide-renderer/components/ThumbnailSlide/index.tsx';
let content = fs.readFileSync(FILE, 'utf-8');

// I will just use string replacement on my last change
const target = `          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zoom: \`calc(max(100cqw / \${viewportSize}, 100cqh / \${viewportSize * viewportRatio}))\`,
          } as React.CSSProperties}
        >
          {/* Background */}
          <div className="background w-[1000px] h-[562.5px] bg-center absolute" style={backgroundStyle} />`;

const replacement = `          style={{
            width: \`\${viewportSize}px\`,
            height: \`\${viewportSize * viewportRatio}px\`,
            transform: \`scale(calc(max(100cqw / \${viewportSize}, 100cqh / \${viewportSize * viewportRatio})))\`,
          }}
        >
          {/* Background */}
          <div className="background w-full h-full bg-center absolute" style={backgroundStyle} />`;

content = content.replace(target, replacement);
fs.writeFileSync(FILE, content);
