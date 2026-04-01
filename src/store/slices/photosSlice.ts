import { createSlice } from '@reduxjs/toolkit'

import type { PhotoSortField, PhotoSortOrder } from '@/services/photoService'
import type { RootState } from '@/store'
import { fetchPhotos } from '@/store/thunks/photosThunks'
import type { PhotosState } from '@/store/types/photos'

const initialState: PhotosState = {
  items: [],
  total: 0,
  status: 'idle',
  error: null,
  query: {
    page: 1,
    pageSize: 10,
    search: '',
    sortBy: 'id',
    sortOrder: 'asc',
  },
}

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setPhotosPage: (state, action: { payload: number }) => {
      state.query.page = action.payload
    },
    setPhotosPageSize: (state, action: { payload: number }) => {
      state.query.pageSize = action.payload
      state.query.page = 1
    },
    setPhotosSearch: (state, action: { payload: string }) => {
      state.query.search = action.payload
      state.query.page = 1
    },
    setPhotosSort: (
      state,
      action: { payload: { sortBy: PhotoSortField; sortOrder: PhotoSortOrder } },
    ) => {
      state.query.sortBy = action.payload.sortBy
      state.query.sortOrder = action.payload.sortOrder
      state.query.page = 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.items
        state.total = action.payload.total
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          action.payload ??
          action.error.message ??
          'Could not load photos. Please try again.'
      })
  },
})

export const { setPhotosPage, setPhotosPageSize, setPhotosSearch, setPhotosSort } =
  photosSlice.actions

export const selectPhotosItems = (state: RootState) => state.photos.items
export const selectPhotosTotal = (state: RootState) => state.photos.total
export const selectPhotosStatus = (state: RootState) => state.photos.status
export const selectPhotosError = (state: RootState) => state.photos.error
export const selectPhotosQuery = (state: RootState) => state.photos.query

