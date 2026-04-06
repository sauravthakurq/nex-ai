import re

with open('components/chat/chat-area.tsx', 'r') as f:
    content = f.read()

# Replace imports
if 'ChevronLeft' not in content:
    content = content.replace("from 'lucide-react';", "from 'lucide-react';\nimport { ChevronLeft } from 'lucide-react';")

# Find the return ( ... ) block of ChatArea
pattern = r"const displayWidth = collapsed \? 0 : width;\s*return \(\s*<div\s*style=\{\{\s*width: displayWidth,[^}]+\}\}[^>]*>.*?(?=</Tabs>).*?</Tabs>\s*</div>\s*</div>\s*\);"
# We will use string manipulation to safely replace the wrapper div.
