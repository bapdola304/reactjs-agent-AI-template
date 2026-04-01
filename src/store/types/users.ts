import type { AdminUserRole } from '@/features/Admin/mocks/adminUsers.mock'
import type { User } from '@/types/user'

/** Bản ghi user lưu trong Redux; cùng shape với API `User` + id chuỗi, role, thời điểm tạo. */
export type StoredUser = Omit<User, 'id'> & {
  id: string
  createdAt: string
  role: AdminUserRole
}

export type AddUserPayload = Omit<StoredUser, 'id' | 'createdAt'>

export type UsersListStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface UsersState {
  items: StoredUser[]
  fetchedList: User[]
  listStatus: UsersListStatus
  listError: string | null
  isSubmitting: boolean
}
