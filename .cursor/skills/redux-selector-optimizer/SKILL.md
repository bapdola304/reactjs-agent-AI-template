---
name: redux-selector-optimizer
description: Create optimized selectors to retrieve data from the Redux Store.
---

# Selector rules:
1. **Location**: Write selectors at the end of the slice file or in `src/store/selectors.ts`.
2. **Structure**: Selector names should start with `select...` (e.g., `selectIsLoggedIn`).
3. **Optimization**: Use `createSelector` from `reselect` (available in RTK) for selectors with complex logic to memoize results.
4. **RootState**: Always use the `RootState` type to ensure IntelliSense support.

**Example request**: "Create a selector to get the total quantity of products in the cart from CartSlice."