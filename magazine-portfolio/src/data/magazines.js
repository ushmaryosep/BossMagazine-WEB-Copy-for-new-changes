const BASE = 'https://github.com/ushmaryosep/BossMagazine-WEB-Copy-for-new-changes/blob/main/magazine-portfolio/src/assets/Magazine%20Issues'

function pages(issue, count, coverName = '1%20Cover%20Page') {
  const arr = [`${BASE}/${issue}/${coverName}.png?raw=true`]
  for (let i = 2; i <= count; i++) arr.push(`${BASE}/${issue}/${i}.png?raw=true`)
  return arr
}

const magazines = [
  {
    id: 4,
    title: 'January 2026',
    issue: 'Issue 04',
    date: 'January 2026',
    cover_image: `${BASE}/JANUARY%202026%20ISSUE/1%20Cover%20Page.png?raw=true`,
    pages: pages('JANUARY%202026%20ISSUE', 30),
  },
  {
    id: 3,
    title: 'September 2025',
    issue: 'Issue 03',
    date: 'September 2025',
    cover_image: `${BASE}/SEPTEMBER%202025%20ISSUE/1%20Cover%20Page.png?raw=true`,
    pages: pages('SEPTEMBER%202025%20ISSUE', 28),
  },
  {
    id: 2,
    title: 'May 2025',
    issue: 'Issue 02',
    date: 'May 2025',
    cover_image: `${BASE}/MAY%202025%20ISSUE/1%20Cover%20Page.png?raw=true`,
    pages: pages('MAY%202025%20ISSUE', 28),
  },
  {
    id: 1,
    title: 'December 2024',
    issue: 'Issue 01',
    date: 'December 2024',
    cover_image: `${BASE}/DECEMBER%202024%20ISSUE/1%20Cover%20Page.png?raw=true`,
    pages: pages('DECEMBER%202024%20ISSUE', 32),
  },
]

export default magazines