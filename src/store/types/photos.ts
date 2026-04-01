import type { PhotoSortField, PhotoSortOrder } from '@/services/photoService'
import type { Photo } from '@/types/photo'

export interface PhotosQueryParams {
  page: number
  pageSize: number
  search: string
  sortBy: PhotoSortField
  sortOrder: PhotoSortOrder
}

export interface PhotosState {
  items: Photo[]
  total: number
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  query: PhotosQueryParams
}

