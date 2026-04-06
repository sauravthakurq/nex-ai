const fs = require('fs');
const file = 'components/roundtable/index.tsx';
if (fs.existsSync(file)) {
  let code = fs.readFileSync(file, 'utf8');

  // Replace remaining purple-* variants with gray variants
  code = code.replace(/from-purple-400/g, 'from-gray-400');
  code = code.replace(/to-indigo-500/g, 'to-gray-600');
  code = code.replace(/dark:to-indigo-600/g, 'dark:to-gray-700');
  
  code = code.replace(/shadow-purple-/g, 'shadow-gray-');
  
  code = code.replace(/hover:bg-purple-/g, 'hover:bg-gray-');
  code = code.replace(/group-hover\/bubble:bg-purple-/g, 'group-hover/bubble:bg-gray-');
  code = code.replace(/hover:text-purple-/g, 'hover:text-gray-');
  code = code.replace(/group-hover\/bubble:text-purple-/g, 'group-hover/bubble:text-gray-');

  // any remaining occurrences
  code = code.replace(/purple-/g, 'gray-');
  
  fs.writeFileSync(file, code);
  console.log('Final colors replaced updated');
}
