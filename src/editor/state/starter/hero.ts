import type { Blueprint } from '../../../core'
import { box, COLORS, GREENS, heading, link, para, section } from './parts'

const BUTTON = {
  padding: '12px 22px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: '600',
}

export const HERO: Blueprint = section(
  'about',
  { padding: '120px 32px 104px', backgroundColor: GREENS.wash },
  [
    box(
      'stack',
      {
        display: 'flex',
        flexDirection: 'column',
        gap: '22px',
        maxWidth: '1000px',
        margin: '0 auto',
      },
      [
        heading('Hi, I’m Fayz Muhammad.', {
          fontSize: '56px',
          lineHeight: '1.1',
          letterSpacing: '-0.03em',
          color: GREENS.forest,
        }),
        para(
          [
            'I’m a software engineer from Manchester, and I graduated from the University of Bolton in 2026 with First Class Honours in Software Engineering.',
            'This whole site runs inside a page builder that I made, so you can click on anything to see how it’s built.',
          ],
          { fontSize: '20px', lineHeight: '1.7', maxWidth: '760px', color: COLORS.muted },
        ),
        box(
          'row',
          {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '12px',
            marginTop: '10px',
          },
          [
            link('See my projects', '#projects', {
              ...BUTTON,
              backgroundColor: GREENS.main,
              color: COLORS.white,
            }),
            link('Download CV', '/cv.pdf', {
              ...BUTTON,
              color: GREENS.deep,
              backgroundColor: COLORS.white,
              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: GREENS.bright,
            }),
            link('GitHub', 'https://github.com/CitrinePanda628', { ...BUTTON, color: GREENS.deep }),
            link('LinkedIn', 'https://linkedin.com/in/fayz-muhammad', {
              ...BUTTON,
              color: GREENS.deep,
            }),
          ],
        ),
      ],
    ),
  ],
)
