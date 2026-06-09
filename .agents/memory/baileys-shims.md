---
name: Baileys compatibility shims
description: How to make Tech-God-Bot's obfuscated code work with @whiskeysockets/baileys v7
---

The obfuscated bot (main.js) requires two packages that don't exist or have incompatible APIs:

1. `@adiwajshing/baileys` — old package name, shim at `node_modules/@adiwajshing/baileys/lib/index.js`
   - Re-exports everything from `@whiskeysockets/baileys`
   - Adds `makeInMemoryStore()` which was removed in v7 (the obfuscated code calls it as `fD({logger})`)

2. `@library/wawebjs` — internal alias, shim at `node_modules/@library/wawebjs/index.js`
   - Simply re-exports `@whiskeysockets/baileys`

**Why:** The bot was built against @adiwajshing/baileys v5-v6. @whiskeysockets/baileys v7 removed makeInMemoryStore. Security policy blocks installing older versions.

**How to apply:** If shims are lost (e.g. after npm install wipes them), recreate both directories and their package.json + index.js files. The shims live directly in node_modules/ and are NOT in package.json dependencies.
