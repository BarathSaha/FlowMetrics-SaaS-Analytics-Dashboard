import { faker } from '@faker-js/faker'

export const mockEventStream = Array.from({ length: 200 }, () => ({
  id: faker.string.uuid(),
  event: faker.helpers.arrayElement([
    'page_view', 'signup', 'login', 'purchase', 'upgrade',
    'downgrade', 'logout', 'trial_started', 'invite_sent',
  ]),
  user: faker.person.fullName(),
  timestamp: faker.date.recent({ days: 7 }),
  value: faker.number.int({ min: 0, max: 500 }),
})).sort((a, b) => b.timestamp - a.timestamp)

export const mockFunnel = [
  { step: 'Visited', users: 10000, color: '#22c55e' },
  { step: 'Signed Up', users: 4200, color: '#16a34a' },
  { step: 'Created Project', users: 2100, color: '#15803d' },
  { step: 'Invited Team', users: 950, color: '#166534' },
  { step: 'Upgraded', users: 380, color: '#14532d' },
]
