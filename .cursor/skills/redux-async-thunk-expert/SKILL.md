---
name: redux-async-thunk-expert
description: Specialized in writing createAsyncThunk logic and handling async states in extraReducers.
---

# Async Thunk rules:
1. **Thunk Function**: Use `createAsyncThunk` with a slice-name prefix (e.g., `user/fetchProfile`).
2. **Error Handling**: Always use `rejectWithValue` inside `try-catch`.
3. **State handling**: In `extraReducers`, handle all 3 cases:
   - `pending`: Set `isLoading = true`.
   - `fulfilled`: Update data and set `isLoading = false`.
   - `rejected`: Update the `error` message and set `isLoading = false`.
4. **Type**: Always declare the thunk return type.

**Example request**: "Write a thunk to fetch post lists from an API and handle loading state."