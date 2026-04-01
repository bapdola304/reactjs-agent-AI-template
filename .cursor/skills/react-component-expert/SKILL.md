---
name: react-component-expert
description: Skill for creating and refactoring React components based on project standards.
---

# React Component Creation Skill

Use this skill when the user asks to create or modify a UI component.

## Required rules

1. **Language**: TypeScript only (`.tsx`). Strict mode; do not use `any`.
2. **Structure (folder per component)**:
   - **Shared components** live under `src/components/<ComponentName>/` with:
     - `<ComponentName>.tsx` — main export (`export const ComponentName: FC<Props> = …`).
     - `<ComponentName>.module.scss` — styles when the component needs them.
   - **Layouts** live under `src/components/layouts/<LayoutName>/` with the same pairing (e.g. `MainLayout/MainLayout.tsx` + `MainLayout.module.scss`).
   - **Feature pages / screens** live under `src/features/<Feature>/components/<PageName>/` with the same pairing: `<PageName>.tsx` + `<PageName>.module.scss`.
   - Do **not** place loose `.tsx` files next to unrelated `.scss` at the `components/` level without a dedicated folder.
3. **Styling**: SCSS Modules, BEM inside the module, `@use "@/styles/variables" as vars;` for tokens.
4. **Imports**: Use the `@/` alias; import styles with `import styles from './ComponentName.module.scss'`.
5. **Icons**: `@ant-design/icons` (not lucide) for this project.
6. **Tests**: Add Vitest tests only if the user asks or the repo already uses them for that area.

## Example layout

Shared button:

- `src/components/AppButton/AppButton.tsx`
- `src/components/AppButton/AppButton.module.scss`

Feature page:

- `src/features/Admin/components/AdminUsersPage/AdminUsersPage.tsx`
- `src/features/Admin/components/AdminUsersPage/AdminUsersPage.module.scss`

Shared layout:

- `src/components/layouts/MainLayout/MainLayout.tsx`
- `src/components/layouts/MainLayout/MainLayout.module.scss`
