import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  mapApiUserToAddUserFormValues,
  mapStoredUserToAddUserFormValues,
  type AddUserFormValues,
} from '@/features/Admin/utils/mapAddUserFormToPayload'
import { userService } from '@/services/userService'
import type { RootState } from '@/store'
import type { AddUserPayload, StoredUser } from '@/store/types/users'
import type { CreateUserDto, User } from '@/types/user'
import { getAxiosErrorMessage } from '@/utils/getAxiosErrorMessage'

function addPayloadToCreateDto(payload: AddUserPayload): CreateUserDto {
  return {
    name: payload.name,
    username: payload.username,
    email: payload.email,
    phone: payload.phone,
    website: payload.website,
    address: payload.address,
    company: payload.company,
  }
}

function mapCreatedUserToStored(data: User, payload: AddUserPayload): StoredUser {
  return {
    id: String(data.id),
    createdAt: new Date().toISOString(),
    role: payload.role,
    name: data.name,
    username: data.username,
    email: data.email,
    phone: data.phone || payload.phone,
    website: data.website || payload.website,
    address: data.address ?? payload.address,
    company: data.company ?? payload.company,
  }
}

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const { data } = await userService.getAll()
    return data
  } catch (error) {
    return rejectWithValue(
      getAxiosErrorMessage(error, 'Could not load users. Please try again.'),
    )
  }
})

export const deleteUserByRowKey = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('users/deleteUserByRowKey', async (rowKey, { rejectWithValue }) => {
  try {
    if (rowKey.startsWith('api-')) {
      const rawId = rowKey.slice('api-'.length)
      const id = Number(rawId)
      if (Number.isNaN(id)) {
        return rejectWithValue('Invalid user id.')
      }
      await userService.delete(id)
    }
    return rowKey
  } catch (error) {
    return rejectWithValue(
      getAxiosErrorMessage(error, 'Could not delete user. Please try again.'),
    )
  }
})

export const addUser = createAsyncThunk<
  StoredUser,
  AddUserPayload,
  { rejectValue: string }
>('users/addUser', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await userService.create(addPayloadToCreateDto(payload))
    return mapCreatedUserToStored(data, payload)
  } catch (error) {
    return rejectWithValue(
      getAxiosErrorMessage(error, 'Could not save user. Please try again.'),
    )
  }
})

export const loadUserForEdit = createAsyncThunk<
  { formValues: AddUserFormValues; rowKey: string },
  string,
  { rejectValue: string; state: RootState }
>('users/loadUserForEdit', async (rowKey, { getState, rejectWithValue }) => {
  try {
    if (rowKey.startsWith('api-')) {
      const rawId = rowKey.slice('api-'.length)
      const id = Number(rawId)
      if (Number.isNaN(id)) {
        return rejectWithValue('Invalid user id.')
      }
      // Temporary 1s delay to verify edit loading UI — remove before production.
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 1000)
      })
      const { data } = await userService.getById(id)
      return {
        rowKey,
        formValues: mapApiUserToAddUserFormValues(data),
      }
    }
    if (rowKey.startsWith('local-')) {
      const id = rowKey.slice('local-'.length)
      const stored = getState().users.items.find((u) => u.id === id)
      if (!stored) {
        return rejectWithValue('User not found.')
      }
      return {
        rowKey,
        formValues: mapStoredUserToAddUserFormValues(stored),
      }
    }
    return rejectWithValue('Invalid user reference.')
  } catch (error) {
    return rejectWithValue(
      getAxiosErrorMessage(error, 'Could not load user. Please try again.'),
    )
  }
})

export type UpdateUserFulfilled =
  | { rowKey: string; kind: 'api'; user: User }
  | { rowKey: string; kind: 'local'; stored: StoredUser }

export const updateUser = createAsyncThunk<
  UpdateUserFulfilled,
  { rowKey: string; payload: AddUserPayload },
  { rejectValue: string; state: RootState }
>('users/updateUser', async ({ rowKey, payload }, { getState, rejectWithValue }) => {
  try {
    if (rowKey.startsWith('api-')) {
      const rawId = rowKey.slice('api-'.length)
      const id = Number(rawId)
      if (Number.isNaN(id)) {
        return rejectWithValue('Invalid user id.')
      }
      const { data } = await userService.update(id, addPayloadToCreateDto(payload))
      return { rowKey, kind: 'api' as const, user: data }
    }
    if (rowKey.startsWith('local-')) {
      const id = rowKey.slice('local-'.length)
      const existing = getState().users.items.find((u) => u.id === id)
      if (!existing) {
        return rejectWithValue('User not found.')
      }
      const stored: StoredUser = {
        ...existing,
        ...payload,
        id: existing.id,
        createdAt: existing.createdAt,
      }
      return { rowKey, kind: 'local' as const, stored }
    }
    return rejectWithValue('Invalid user reference.')
  } catch (error) {
    return rejectWithValue(
      getAxiosErrorMessage(error, 'Could not update user. Please try again.'),
    )
  }
})
