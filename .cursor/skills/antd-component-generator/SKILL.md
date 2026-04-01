---
name: antd-component-generator
description: Specialized in creating UI components using the Ant Design (Antd) library.
---

# Ant Design usage rules

1. **Import**: Always import directly from `antd` (e.g., `import { Button, Table } from 'antd'`).
2. **Placement**: Page-level compositions using Ant Design belong in `src/features/<Feature>/components/<PageName>/<PageName>.tsx` with co-located `*.module.scss` per project structure.
3. **Icons**: Use `@ant-design/icons` for all icons.
4. **Table Standard**:
   - Always define `ColumnsType<T>` for tables.
   - Use `rowKey="id"` or `rowKey={(record) => record.id}`.
   - Add default `pagination={{ pageSize: 10 }}`.
5. **Modal/Drawer**:
   - Always use the `open` prop (instead of legacy `visible`).
   - Add `destroyOnClose` to reset state when closed.

**Example request**: "Create a Table to display a user list with columns: Name, Email, Role, and Action."