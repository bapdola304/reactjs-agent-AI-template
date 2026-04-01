import { axiosInstance } from '@/services/axiosInstance'
import type { Photo } from '@/types/photo'

export type PhotoSortField = 'id' | 'title' | 'albumId'
export type PhotoSortOrder = 'asc' | 'desc'

export interface GetPhotosParams {
  page: number
  limit: number
  search: string
  sortBy: PhotoSortField
  order: PhotoSortOrder
}

export interface GetPhotosResponse {
  items: Photo[]
  total: number
}

export const photoService = {
  getAll: async (params: GetPhotosParams): Promise<GetPhotosResponse> => {
    const response = await axiosInstance.get<Photo[]>('/photos', {
      params: {
        _page: params.page,
        _limit: params.limit,
        q: params.search || undefined,
        _sort: params.sortBy,
        _order: params.order,
      },
    })

    const totalHeader = response.headers['x-total-count']
    const parsedTotal = Number(totalHeader)

    return {
      items: response.data,
      total: Number.isNaN(parsedTotal) ? response.data.length : parsedTotal,
    }
  },
}

