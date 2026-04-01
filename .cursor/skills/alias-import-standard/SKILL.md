---
name: alias-import-standard
description: Ensure all import paths use Alias Path (@/) instead of Relative Path (../).
---

# Import rules:

1. **Root Alias**: Use `@/` to represent the `src/` directory.
2. **No Relative Path**: Do not use `../` or `./` for files outside the current folder.
   - Wrong: `import Button from '../../components/Button'`
   - Correct: `import Button from '@/components/Button'`
3. **Scope**:
   - Components, hooks, store, services, constants, assets, styles — use `@/` for all of these.
4. **Same-folder SCSS (allowed)**:
   - Co-located modules must use a **relative** import: `import styles from './ComponentName.module.scss'` next to `ComponentName.tsx`. Do not use `@/` for that single file.
5. **Configuration check**: Before writing code, verify `tsconfig.json` / Vite config: alias `@` → `src`.

**Example request**: "Import the UserCard component and useAuth hook into the current file."