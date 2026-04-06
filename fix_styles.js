const fs = require('fs');

const files = [
  'components/stage/scene-sidebar.tsx',
  'components/roundtable/index.tsx',
  'components/stage/stage.tsx',
  'components/stage/canvas.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // 90% width
    content = content.replace(/max-md:!w-\[70%\]/g, 'max-md:!w-[90%]');
    
    // Purple to black/gray
    content = content.replace(/purple-500/g, 'gray-900');
    content = content.replace(/purple-600/g, 'black');
    content = content.replace(/purple-400/g, 'gray-700');
    content = content.replace(/purple-50/g, 'gray-100');
    content = content.replace(/purple-100/g, 'gray-200');
    content = content.replace(/purple-200/g, 'gray-300');
    content = content.replace(/purple-300/g, 'gray-400');
    content = content.replace(/purple-700/g, 'black');
    content = content.replace(/purple-800/g, 'black');
    content = content.replace(/purple-900/g, 'black');
    content = content.replace(/purple-950/g, 'black');
    content = content.replace(/text-purple-/g, 'text-gray-');
    content = content.replace(/bg-purple-/g, 'bg-gray-');
    content = content.replace(/border-purple-/g, 'border-gray-');
    content = content.replace(/ring-purple-/g, 'ring-gray-');
    content = content.replace(/shadow-purple-/g, 'shadow-gray-');

    // Make animations smooth and fast
    content = content.replace(/duration-700/g, 'duration-150');
    content = content.replace(/duration-500/g, 'duration-150');
    content = content.replace(/duration-300/g, 'duration-150');
    content = content.replace(/duration-200/g, 'duration-100');
    content = content.replace(/duration-1000/g, 'duration-200');
    
    // Remove delays
    content = content.replace(/delay-300/g, 'delay-0');
    content = content.replace(/delay-500/g, 'delay-0');
    content = content.replace(/delay-700/g, 'delay-0');
    content = content.replace(/delay-150/g, 'delay-0');
    content = content.replace(/delay-200/g, 'delay-0');
    content = content.replace(/delay-100/g, 'delay-0');

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
