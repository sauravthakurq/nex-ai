import re

with open('components/roundtable/index.tsx', 'r') as f:
    orig = f.read()

# I need to see the exact structure where BottomSheet is used
# I'll replace <BottomSheet visible=...> ... </BottomSheet> with the old dock logic plus the drag handle.

