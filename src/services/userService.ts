import { axiosInstance } from '@/services/axiosInstance'
import type { CreateUserDto, User } from '@/types/user'

export const userService = {
  getAll: () => axiosInstance.get<User[]>('/users'),

  getById: (id: string | number) =>
    axiosInstance.get<User>(`/users/${id}`),

  create: (data: CreateUserDto) => axiosInstance.post<User>('/users', data),

  update: (id: string | number, data: Partial<CreateUserDto>) =>
    axiosInstance.put<User>(`/users/${id}`, data),

  delete: (id: string | number) =>
    axiosInstance.delete<void>(`/users/${id}`),
}
