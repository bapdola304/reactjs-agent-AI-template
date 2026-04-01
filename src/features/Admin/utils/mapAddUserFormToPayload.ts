import type { AddUserPayload } from '@/store/types/users'
import type { UserAddress, UserCompany } from '@/types/user'

export interface AddUserFormValues {
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: {
    street?: string
    suite?: string
    city?: string
    zipcode?: string
  }
  company: {
    name?: string
    catchPhrase?: string
    bs?: string
  }
  role: AddUserPayload['role']
}

function normalizeAddress(
  v: AddUserFormValues['address'] | undefined,
): UserAddress | undefined {
  if (!v) {
    return undefined
  }
  const street = v.street?.trim()
  const suite = v.suite?.trim()
  const city = v.city?.trim()
  const zipcode = v.zipcode?.trim()
  if (!street && !suite && !city && !zipcode) {
    return undefined
  }
  return {
    ...(street ? { street } : {}),
    ...(suite ? { suite } : {}),
    ...(city ? { city } : {}),
    ...(zipcode ? { zipcode } : {}),
  }
}

function normalizeCompany(
  v: AddUserFormValues['company'] | undefined,
): UserCompany | undefined {
  if (!v) {
    return undefined
  }
  const name = v.name?.trim()
  const catchPhrase = v.catchPhrase?.trim()
  const bs = v.bs?.trim()
  if (!name && !catchPhrase && !bs) {
    return undefined
  }
  return {
    ...(name ? { name } : {}),
    ...(catchPhrase ? { catchPhrase } : {}),
    ...(bs ? { bs } : {}),
  }
}

export const mapAddUserFormToPayload = (values: AddUserFormValues): AddUserPayload => ({
  name: values.name.trim(),
  username: values.username.trim(),
  email: values.email.trim(),
  phone: values.phone?.trim() ?? '',
  website: values.website?.trim() ?? '',
  address: normalizeAddress(values.address),
  company: normalizeCompany(values.company),
  role: values.role,
})
