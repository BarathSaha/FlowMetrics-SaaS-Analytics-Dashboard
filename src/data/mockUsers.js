import { faker } from '@faker-js/faker'

export const mockUsers = Array.from({ length: 500 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  plan: faker.helpers.arrayElement(['starter', 'pro', 'enterprise']),
  country: faker.location.country(),
  status: faker.helpers.arrayElement(['active', 'churned', 'trial']),
  mrr: faker.number.int({ min: 0, max: 999 }),
  joinedAt: faker.date.past({ years: 2 }),
}))
