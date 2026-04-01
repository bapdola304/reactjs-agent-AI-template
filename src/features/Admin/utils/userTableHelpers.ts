import type { StoredUser } from '@/store/types/users'
import type { User } from '@/types/user'

export type UserTableRow = Record<string, unknown> & { __rowKey: string }

export function mergeUsersToTableRows(
  items: StoredUser[],
  fetchedList: User[],
): UserTableRow[] {
  return [
    ...items.map((u) => ({ ...u, __rowKey: `local-${u.id}` })),
    ...fetchedList.map((u) => ({ ...u, __rowKey: `api-${u.id}` })),
  ]
}

export function collectColumnKeys(rows: UserTableRow[]): string[] {
  const keys = new Set<string>()
  for (const row of rows) {
    for (const k of Object.keys(row)) {
      if (k !== '__rowKey') {
        keys.add(k)
      }
    }
  }
  return Array.from(keys).sort((a, b) => a.localeCompare(b))
}

export function formatColumnTitle(key: string): string {
  return key
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/^./, (c) => c.toUpperCase())
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** One readable line from `address` (street, city, zip, optional geo). */
export function formatAddressForTable(value: unknown): string {
  if (!isPlainObject(value)) {
    return fallbackScalarOrJson(value)
  }
  const { street, suite, city, zipcode, geo } = value as Record<string, unknown>
  const parts: string[] = []
  const line1 = [street, suite].filter(Boolean).join(', ')
  const line2 = [city, zipcode].filter(Boolean).join(', ')
  if (line1) {
    parts.push(line1)
  }
  if (line2) {
    parts.push(line2)
  }
  if (isPlainObject(geo)) {
    const g = geo as { lat?: string; lng?: string }
    if (g.lat != null || g.lng != null) {
      parts.push(`${g.lat ?? ''}, ${g.lng ?? ''}`)
    }
  }
  if (parts.length === 0) {
    return '—'
  }
  return parts.join(' · ')
}

/** Company as readable single line: name · tagline · bs. */
export function formatCompanyForTable(value: unknown): string {
  if (!isPlainObject(value)) {
    return fallbackScalarOrJson(value)
  }
  const { name, catchPhrase, bs } = value as Record<string, unknown>
  const parts = [name, catchPhrase, bs].map((v) => (v == null ? '' : String(v))).filter(Boolean)
  if (parts.length === 0) {
    return '—'
  }
  return parts.join(' · ')
}

function fallbackScalarOrJson(value: unknown): string {
  if (value === null || value === undefined) {
    return '—'
  }
  if (typeof value === 'object') {
    return JSON.stringify(value)
  }
  return String(value)
}

/** Cell text for table + search; formats known nested API fields. */
export function formatTableCellDisplay(columnKey: string, value: unknown): string {
  if (columnKey === 'address') {
    return formatAddressForTable(value)
  }
  if (columnKey === 'company') {
    return formatCompanyForTable(value)
  }
  return fallbackScalarOrJson(value)
}
