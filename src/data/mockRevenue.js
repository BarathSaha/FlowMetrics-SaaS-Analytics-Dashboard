import { faker } from '@faker-js/faker'

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

export const mockRevenue = months.map((month) => ({
  month,
  mrr: faker.number.int({ min: 30000, max: 80000 }),
  starter: faker.number.int({ min: 10000, max: 25000 }),
  pro: faker.number.int({ min: 15000, max: 35000 }),
  enterprise: faker.number.int({ min: 5000, max: 20000 }),
}))

export const mockGeography = [
  { country: 'United States', revenue: 125000 },
  { country: 'United Kingdom', revenue: 68000 },
  { country: 'Germany', revenue: 54000 },
  { country: 'Canada', revenue: 42000 },
  { country: 'France', revenue: 31000 },
  { country: 'Australia', revenue: 28000 },
  { country: 'India', revenue: 22000 },
  { country: 'Japan', revenue: 18000 },
]
