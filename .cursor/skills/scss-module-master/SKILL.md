---
name: scss-module-master
description: Specialized in writing SCSS Modules for React components with BEM standards and variable optimization.
---

# SCSS writing rules

1. **Naming convention**
   - File name: **`[ComponentName].module.scss`**, co-located in the same folder as **`[ComponentName].tsx`** (see project folder-per-component rule under `src/components` and `src/features/.../components`).

2. **BEM**
   - Use **BEM** inside modules (e.g. `.card`, `.card__header`, `.card--active`).

3. **Imports**
   - Prefer: `import styles from './ComponentName.module.scss';`
   - Variables: `@use "@/styles/variables" as vars;` (not a bare `src/styles/...` path unless the build requires it).

4. **Reusability**
   - Use design tokens from `vars` for colors and spacing; avoid raw hex in components.

5. **Nesting**
   - Limit nesting depth to a maximum of 3 levels.

6. **Ant Design**
   - Override Ant Design with `:global(.ant-...)` scoped under a local block when needed.

**Example request**: "Create a ProductCard component with SCSS module styles, hover effects, and responsive support." → create `ProductCard/ProductCard.tsx` + `ProductCard/ProductCard.module.scss`.
