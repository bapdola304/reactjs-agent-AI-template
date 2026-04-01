---
name: error-resilience-manager
description: Skill for handling exceptions, displaying error messages, and keeping the app from crashing.
---

# Error handling rules:
1. **Graceful Degradation**: If a component fails (e.g., missing data), show a fallback UI (Empty state) instead of leaving a blank page.
2. **Standardized Messages**: Use backend error messages when available (`error.response.data.message`); otherwise use a friendly default message.
3. **Form Errors**: Map API errors to the correct fields in Antd Form using `form.setFields()`.
4. **Logging**: Recommend adding `console.error` with error context to simplify debugging in development.

**Example**: "Add error handling for this submit function; if the email is duplicated, show a red error on the email input."