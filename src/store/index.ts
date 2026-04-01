import { configureStore } from '@reduxjs/toolkit'

import { photosSlice } from '@/store/slices/photosSlice'
import { usersSlice } from '@/store/slices/usersSlice'

export const store = configureStore({
  reducer: {
    photos: photosSlice.reducer,
    users: usersSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
