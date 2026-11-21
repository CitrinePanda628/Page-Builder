import type { Blueprint } from '../../../core'
import {
  box,
  card,
  column,
  COLORS,
  GREENS,
  heading,
  intro,
  list,
  section,
  text,
  title,
} from './parts'

function job(role: string, when: string, points: string[]): Blueprint {
  return box(
    'accordion',
    {
      padding: '22px 26px',
      backgroundColor: COLORS.white,
      borderRadius: '12px',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: GREENS.edge,
      borderLeftWidth: '5px',
      borderLeftColor: GREENS.main,
      color: GREENS.forest,
      fontSize: '19px',
    },
    [
      text(when, { marginBottom: '10px', color: GREENS.leaf, fontSize: '15px', fontWeight: '600' }),
      list(points, { fontSize: '16px', lineHeight: '1.75', color: COLORS.muted }),
    ],
    { title: role, open: 'yes' },
  )
}

export const EXPERIENCE: Blueprint = section('experience', { backgroundColor: GREENS.wash }, [
  column(
    [
      title('Experience'),
      job('Developer placement, University of Bolton', 'Nov 2025 – Apr 2026 · six months', [
        'I worked on the university’s **mobile app** alongside a team of students and an outside company, at a time when the app had become slow and students were sometimes shown data that didn’t match.',
        'Most of my work was on the **database**, where I used **Python and SQL** to time the queries behind the app on **MariaDB**, find the slow and repeated ones and change how the app fetched its data.',
        'I **rebuilt several screens** so that they looked and worked like the rest of the app, and took on other tasks whenever the team needed a hand.',
        'Working in a codebase I hadn’t written, with people I hadn’t worked with before, taught me to measure a problem before changing anything and to **speak up early** when I was stuck.',
      ]),
      job('Pharmacy team manager, PDS Pharmacy, Manchester', 'Sep 2024 – now · part-time', [
        'I **lead a team of three** on the processing and delivery side of the **supply chain**, taking in medicine from other pharmacies, checking and sorting it, planning the driver’s route and handing everything over to the driver.',
        'When our deliveries kept running late I **traced the real cause**, tested a new way of working and only rolled it out once it had proved itself, which now saves us **about two hours a day**.',
        'I brought in **quality checks** at the point where mistakes were starting, so that the same errors stopped coming back.',
        'To get the team on board with the new routine I **explained the reason** behind it first and we tried it out together, and day to day I keep the **drivers, pharmacy staff and managers** talking to each other.',
      ]),
    ],
    '860px',
  ),
])

function skillRow(name: string, items: string): Blueprint {
  return box(
    'row',
    {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px 24px',
      padding: '14px 0',
      borderBottomStyle: 'solid',
      borderBottomWidth: '1px',
      borderBottomColor: GREENS.edge,
    },
    [
      text(name, { width: '180px', fontWeight: '600', color: GREENS.deep }),
      text(items, { flexGrow: '1', flexBasis: '260px', color: COLORS.muted }),
    ],
  )
}

export const SKILLS: Blueprint = section('skills', {}, [
  column(
    [
      title('Skills and education'),
      intro(
        'These are the languages, frameworks and tools I’ve used across my degree, my placement and my own projects.',
      ),
      box('stack', { display: 'flex', flexDirection: 'column' }, [
        skillRow('Languages', 'TypeScript, JavaScript, Python, C#, SQL, HTML, CSS'),
        skillRow('Front end', 'React, Next.js, Tailwind CSS, Zustand, React Query'),
        skillRow('Back end', 'Node.js, Hono, Django, Flask, .NET, REST APIs'),
        skillRow(
          'Databases',
          'PostgreSQL, MySQL, MariaDB, MongoDB, Prisma, Drizzle, Entity Framework',
        ),
        skillRow('Tools', 'Git, Docker, CI/CD, Vitest, Agile'),
        skillRow('Services', 'Stripe and Stripe Connect, Clerk, UploadThing'),
      ]),
      card(
        [
          heading('BEng (Hons) Software Engineering', { fontSize: '22px', color: GREENS.forest }),
          text('First Class Honours', { color: GREENS.main, fontWeight: '700' }),
          text('University of Bolton, 2023 – 2026', { color: GREENS.deep }),
        ],
        {
          marginTop: '16px',
          gap: '6px',
          backgroundColor: GREENS.soft,
          borderColor: GREENS.edge,
          borderLeftWidth: '5px',
          borderLeftColor: GREENS.main,
        },
      ),
    ],
    '860px',
  ),
])
