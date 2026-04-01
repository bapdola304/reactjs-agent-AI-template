/** Mock analytics data for user dashboards (replace with API responses later). */

export interface UserSignupByDay {
  date: string
  newUsers: number
}

export interface UserByRegion {
  region: string
  users: number
}

export interface UserRoleShare {
  role: string
  value: number
}

export interface DailyActiveUsers {
  date: string
  dau: number
}

export interface UserRetentionCohort {
  week: string
  retainedPercent: number
}

export const MOCK_USER_SIGNUPS_BY_DAY: UserSignupByDay[] = [
  { date: '2026-03-18', newUsers: 42 },
  { date: '2026-03-19', newUsers: 55 },
  { date: '2026-03-20', newUsers: 38 },
  { date: '2026-03-21', newUsers: 61 },
  { date: '2026-03-22', newUsers: 47 },
  { date: '2026-03-23', newUsers: 72 },
  { date: '2026-03-24', newUsers: 58 },
  { date: '2026-03-25', newUsers: 64 },
  { date: '2026-03-26', newUsers: 51 },
  { date: '2026-03-27', newUsers: 69 },
  { date: '2026-03-28', newUsers: 44 },
  { date: '2026-03-29', newUsers: 76 },
  { date: '2026-03-30', newUsers: 63 },
  { date: '2026-03-31', newUsers: 81 },
]

export const MOCK_USERS_BY_REGION: UserByRegion[] = [
  { region: 'North America', users: 1840 },
  { region: 'Europe', users: 1520 },
  { region: 'Asia Pacific', users: 2310 },
  { region: 'Latin America', users: 640 },
  { region: 'Middle East', users: 420 },
  { region: 'Africa', users: 310 },
]

export const MOCK_USERS_BY_ROLE: UserRoleShare[] = [
  { role: 'Viewer', value: 8420 },
  { role: 'Editor', value: 1240 },
  { role: 'Admin', value: 380 },
  { role: 'Support', value: 160 },
]

export const MOCK_DAILY_ACTIVE_USERS: DailyActiveUsers[] = [
  { date: 'Mar 18', dau: 3200 },
  { date: 'Mar 19', dau: 3350 },
  { date: 'Mar 20', dau: 3180 },
  { date: 'Mar 21', dau: 3420 },
  { date: 'Mar 22', dau: 3290 },
  { date: 'Mar 23', dau: 3510 },
  { date: 'Mar 24', dau: 3380 },
  { date: 'Mar 25', dau: 3620 },
  { date: 'Mar 26', dau: 3440 },
  { date: 'Mar 27', dau: 3710 },
  { date: 'Mar 28', dau: 3280 },
  { date: 'Mar 29', dau: 3820 },
  { date: 'Mar 30', dau: 3650 },
  { date: 'Mar 31', dau: 3910 },
]

export const MOCK_RETENTION_BY_WEEK: UserRetentionCohort[] = [
  { week: 'W1', retainedPercent: 100 },
  { week: 'W2', retainedPercent: 68 },
  { week: 'W3', retainedPercent: 54 },
  { week: 'W4', retainedPercent: 47 },
  { week: 'W5', retainedPercent: 41 },
  { week: 'W6', retainedPercent: 38 },
]

export const MOCK_SUMMARY_STATS = {
  totalUsers: 10_200,
  newUsersThisWeek: 486,
  activeToday: 3_910,
  avgSessionMinutes: 14.2,
} as const
