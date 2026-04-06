import re

with open('lib/firebase/auth-hook.ts', 'r') as f:
    content = f.read()

content = content.replace(
    'await setDoc(docRef, serializableStore, { merge: true });',
    'await setDoc(docRef, JSON.parse(JSON.stringify(serializableStore)), { merge: true });'
)

with open('lib/firebase/auth-hook.ts', 'w') as f:
    f.write(content)
