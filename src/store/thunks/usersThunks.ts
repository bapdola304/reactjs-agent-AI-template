import { createAsyncThunk } from '@reduxjs/toolkit'

import { userService } from '@/services/userService'
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
