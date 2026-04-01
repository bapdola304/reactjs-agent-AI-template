---
name: redux-toolkit-architect
description: Specialized in designing and creating Redux Toolkit slices based on project standards.
---

# Redux Toolkit layout rules

## 1. Separate folders for slices vs thunks
- **Slices** (state + `createSlice` + reducers) live only under **`src/store/slices/`**.
- **Thunks** (`createAsyncThunk` and other async side-effect logic) live only under **`src/store/thunks/`**.
- Do **not** define `createAsyncThunk` inside slice files. Import thunks from `@/store/thunks/...` into the slice’s `extraReducers`, or colocate slice + thunk wiring in the slice file **only** by importing the thunk from the thunks folder.

## 2. Naming & pairing
- One slice file per domain, singular slice name (e.g. `usersSlice.ts`, not `usersSlices.ts`).
- Pair thunks with a slice using a clear prefix (e.g. `usersThunks.ts` ↔ `usersSlice.ts`).
- Export thunks as named exports from the thunks file; export the slice reducer and actions from the slice file.

## 3. Slice file structure (`src/store/slices/`)
- Define an `interface` for initial state.
- Use `createSlice` from `@reduxjs/toolkit`.
- Import async thunks from `@/store/thunks/...` and handle them in `extraReducers` (`pending` / `fulfilled` / `rejected`).
- Export `actions` and `reducer` separately (or named export of reducer).

## 4. Thunk file structure (`src/store/thunks/`)
- Use `createAsyncThunk` from `@reduxjs/toolkit`.
- Keep API calls, delays, and error mapping here; return serializable payloads for reducers.
- Use `rejectWithValue` when you need structured errors in `extraReducers`.

## 5. Code order (slice file)
- Initial state → `createSlice` → `extraReducers` → export actions / reducer.

## 6. Store registration
- Register reducers in `src/store/index.ts` (or root store file) using slice reducers only.

**Example request**: "Create a slice to manage cart information, including products and total price, with fetch/update thunks in a separate thunks folder."
