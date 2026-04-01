---
name: performance-audit-expert
description: Skill for optimizing rendering, reducing unnecessary re-renders, and handling large data in React.
---

# Performance optimization rules:
1. **Render Analysis**: When editing code, check whether state changes trigger re-renders in unrelated components.
2. **Debouncing/Throttling**: Use `lodash/debounce` for search input events or window resize handlers.
3. **Skeleton Loading**: Use Antd `Skeleton` while waiting for API data instead of only showing Spin.
4. **Effect Cleanup**: Always include cleanup functions in `useEffect` to avoid memory leaks (unsubscribe, clearTimeout).

**Example**: "Optimize this Filter component so it does not lag when users type quickly."