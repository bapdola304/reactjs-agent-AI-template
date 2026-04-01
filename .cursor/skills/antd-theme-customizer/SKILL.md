---
name: antd-theme-customizer
description: Manage and apply Design Tokens (Theme) for Ant Design components.
---

# Theme customization rules:
1. **Tokens**: Use `theme.useToken()` to access color variables (colorPrimary, colorText) instead of hardcoding Hex colors.
2. **ConfigProvider**: For special components, wrap them in `ConfigProvider` when local overrides are needed.
3. **Dark Mode**: Ensure components support both Light and Dark modes by checking the current context.
4. **Space**: Always use Antd `<Space>` to manage spacing between buttons or elements, instead of manual `margin`.

**Example request**: "Create a Dashboard Header with a background using the theme primary color and icons spaced by 16px."