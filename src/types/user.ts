/** Nested shape from APIs such as JSONPlaceholder `/users`. */
export interface UserAddress {
  street?: string
  suite?: string
  city?: string
  zipcode?: string
  geo?: { lat?: string; lng?: string }
}

export interface UserCompany {
  name?: string
  catchPhrase?: string
  bs?: string
}

/** User row returned by typical REST `/users` APIs (e.g. JSONPlaceholder). */
export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address?: UserAddress
  company?: UserCompany
}

/** Body POST `/users` (không gửi `id`). */
export type CreateUserDto = Omit<User, 'id'>
