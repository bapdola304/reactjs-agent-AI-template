import { createSlice } from '@reduxjs/toolkit'

import {
  addUser,
  deleteUserByRowKey,
  fetchUsers,
  updateUser,
} from '@/store/thunks/usersThunks'
import type { UsersState } from '@/store/types/users'

const initialState: UsersState = {
  items: [],
  fetchedList: [],
  listStatus: 'idle',
  listError: null,
  isSubmitting: false,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.listStatus = 'loading'
        state.listError = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.listStatus = 'succeeded'
        state.fetchedList = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.listStatus = 'failed'
        state.listError =
          action.payload ??
          action.error.message ??
          'Could not load users. Please try again.'
      })
      .addCase(addUser.pending, (state) => {
        state.isSubmitting = true
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isSubmitting = false
        state.items.unshift(action.payload)
      })
      .addCase(addUser.rejected, (state) => {
        state.isSubmitting = false
      })
      .addCase(updateUser.pending, (state) => {
        state.isSubmitting = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isSubmitting = false
        const p = action.payload
        if (p.kind === 'api') {
          const id = p.user.id
          state.fetchedList = state.fetchedList.map((u) =>
            u.id === id ? p.user : u,
          )
        } else {
          state.items = state.items.map((u) =>
            u.id === p.stored.id ? p.stored : u,
          )
        }
      })
      .addCase(updateUser.rejected, (state) => {
        state.isSubmitting = false
      })
      .addCase(deleteUserByRowKey.fulfilled, (state, action) => {
        const rowKey = action.payload
        if (rowKey.startsWith('local-')) {
          const id = rowKey.slice('local-'.length)
          state.items = state.items.filter((u) => u.id !== id)
        } else if (rowKey.startsWith('api-')) {
          const rawId = rowKey.slice('api-'.length)
          const id = Number(rawId)
          state.fetchedList = state.fetchedList.filter((u) => u.id !== id)
        }
      })
  },
})

export const selectUsers = (state: { users: UsersState }) => state.users.items
export const selectFetchedUsersList = (state: { users: UsersState }) =>
  state.users.fetchedList
export const selectUsersListStatus = (state: { users: UsersState }) =>
  state.users.listStatus
export const selectUsersListError = (state: { users: UsersState }) =>
  state.users.listError
export const selectUsersSubmitting = (state: { users: UsersState }) =>
  state.users.isSubmitting
