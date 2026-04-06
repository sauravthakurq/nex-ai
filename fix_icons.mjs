import fs from 'fs';
const PAGE_PATH = 'app/page.tsx';
let content = fs.readFileSync(PAGE_PATH, 'utf-8');

if (!content.includes('Plus,')) {
    content = content.replace("} from 'lucide-react';", "  Plus,\n  Box,\n} from 'lucide-react';");
}
fs.writeFileSync(PAGE_PATH, content);
