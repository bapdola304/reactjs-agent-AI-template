import { createAsyncThunk } from '@reduxjs/toolkit'

import { photoService } from '@/services/photoService'
import type { RootState } from '@/store'
import type { Photo } from '@/types/photo'
import { getAxiosErrorMessage } from '@/utils/getAxiosErrorMessage'

interface FetchPhotosFulfilled {
  items: Photo[]
  total: number
}

export const fetchPhotos = createAsyncThunk<
  FetchPhotosFulfilled,
  void,
  { rejectValue: string; state: RootState }
>('photos/fetchPhotos', async (_, { getState, rejectWithValue }) => {
  try {
    const { query } = getState().photos
    const response = await photoService.getAll({
      page: query.page,
      limit: query.pageSize,
      search: query.search,
      sortBy: query.sortBy,
      order: query.sortOrder,
    })
    return response
  } catch (error) {
    return rejectWithValue(
      getAxiosErrorMessage(error, 'Could not load photos. Please try again.'),
    )
  }
})

