import re

with open('lib/ai/providers.ts', 'r') as f:
    text = f.read()

def remove_provider(content, key):
    start = content.find(f"{key}: {{")
    if start == -1: return content
    open_b = 0
    end = -1
    for i in range(start, len(content)):
        if content[i] == '{': open_b += 1
        elif content[i] == '}':
            open_b -= 1
            if open_b == 0:
                end = i
                break
    if end != -1:
        suffix = content[end+1:]
        m = re.match(r'\s*,\s*', suffix)
        length = len(m.group(0)) if m else 0
        return content[:start] + content[end+1+length:]
    return content

text = remove_provider(text, '  siliconflow')
text = remove_provider(text, '  doubao')

text = re.sub(r"case\s+'siliconflow':\s*", "", text)
text = re.sub(r"case\s+'doubao':\s*", "", text)

with open('lib/ai/providers.ts', 'w') as f:
    f.write(text)
