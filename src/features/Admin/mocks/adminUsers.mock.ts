export type AdminUserRole = 'Admin' | 'Editor' | 'Viewer' | 'Support'

export interface AdminUserRow {
  id: string
  name: string
  email: string
  role: AdminUserRole
}

const firstNames = [
  'James',
  'Mary',
  'Robert',
  'Patricia',
  'John',
  'Jennifer',
  'Michael',
  'Linda',
  'David',
  'Elizabeth',
  'William',
  'Barbara',
  'Richard',
  'Susan',
  'Joseph',
  'Jessica',
  'Thomas',
  'Sarah',
  'Charles',
  'Karen',
  'Christopher',
  'Lisa',
  'Daniel',
  'Nancy',
  'Matthew',
  'Betty',
  'Anthony',
  'Margaret',
  'Mark',
  'Sandra',
  'Donald',
  'Ashley',
  'Steven',
  'Kimberly',
  'Paul',
  'Emily',
  'Andrew',
  'Donna',
  'Joshua',
  'Michelle',
  'Kenneth',
  'Carol',
  'Kevin',
  'Amanda',
  'Brian',
  'Melissa',
  'George',
  'Deborah',
  'Edward',
  'Stephanie',
] as const

const lastNames = [
  'Smith',
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
  'Rodriguez',
  'Martinez',
  'Hernandez',
  'Lopez',
  'Gonzalez',
  'Wilson',
  'Anderson',
  'Thomas',
  'Taylor',
  'Moore',
  'Jackson',
  'Martin',
  'Lee',
  'Perez',
  'Thompson',
  'White',
  'Harris',
  'Sanchez',
  'Clark',
  'Ramirez',
  'Lewis',
  'Robinson',
  'Walker',
  'Young',
  'Allen',
  'King',
  'Wright',
  'Scott',
  'Torres',
  'Nguyen',
  'Hill',
  'Flores',
  'Green',
  'Adams',
  'Nelson',
  'Baker',
  'Hall',
  'Rivera',
  'Campbell',
  'Mitchell',
  'Carter',
  'Roberts',
] as const

const roles: AdminUserRole[] = ['Viewer', 'Editor', 'Admin', 'Support']

function buildEmail(index: number, first: string, last: string): string {
  const local = `${first}.${last}`.toLowerCase().replace(/[^a-z.]/g, '')
  return `${local}.${index}@demo.internal`
}

export const MOCK_ADMIN_USERS: AdminUserRow[] = Array.from(
  { length: 50 },
  (_, index) => {
    const i = index + 1
    const first = firstNames[index % firstNames.length]
    const last = lastNames[Math.floor(index / 2) % lastNames.length]
    return {
      id: `user-${String(i).padStart(3, '0')}`,
      name: `${first} ${last}`,
      email: buildEmail(i, first, last),
      role: roles[index % roles.length],
    }
  },
)
