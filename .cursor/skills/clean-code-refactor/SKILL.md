---
name: clean-code-refactor
description: Skill for refactoring code, applying SOLID principles, and removing redundant code.
---

# Clean Code rules:
1. **Early Returns**: Prefer "if-guard" early exits instead of deeply nested `if-else` blocks.
2. **Destructuring**: Always destructure props and objects for cleaner code.
3. **Magic Numbers**: Replace hardcoded numbers or strings with `CONSTANTS`.
4. **Prop Drilling**: If props are passed through more than 3 levels, suggest using `Context API` or `Redux`.

**Example**: "Refactor this nested code by using early returns and splitting it into smaller functions."