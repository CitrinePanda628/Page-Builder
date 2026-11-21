import type { Blueprint } from '../../../core'
import { box, COLORS, GREENS, heading, link, text } from './parts'

const NAV = { color: COLORS.ink, textDecoration: 'none', fontWeight: '500', fontSize: '15px' }

const CONTACT_POPUP: Blueprint = box(
  'popup',
  {
    width: '100%',
    maxWidth: '460px',
    padding: '32px',
    borderRadius: '12px',
    backgroundColor: COLORS.white,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  [
    heading('Get in touch', { fontSize: '28px', color: GREENS.forest }),
    text(
      'I’m always happy to talk about roles and projects, and email is the quickest way to reach me, although LinkedIn works too.',
      {
        color: COLORS.muted,
        lineHeight: '1.6',
      },
    ),
    link('fayzmuhammad0987@gmail.com', 'mailto:fayzmuhammad0987@gmail.com', {
      color: GREENS.main,
      fontWeight: '600',
    }),
    link('linkedin.com/in/fayz-muhammad', 'https://linkedin.com/in/fayz-muhammad', {
      color: GREENS.main,
    }),
    link('github.com/CitrinePanda628', 'https://github.com/CitrinePanda628', {
      color: GREENS.main,
    }),
    { type: 'form', props: { buttonText: 'Send' } },
  ],
  { buttonText: 'Get in touch', name: 'contact' },
)

/** Sticks to the top while you scroll. */
export const HEADER: Blueprint = box(
  'row',
  {
    position: 'sticky',
    top: '0',
    zIndex: '10',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 32px',
    backgroundColor: 'rgb(255 255 255 / 0.9)',
    backdropFilter: 'blur(10px)',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    borderBottomColor: GREENS.edge,
  },
  [
    heading('Fayz Muhammad', { fontSize: '18px', color: GREENS.forest, letterSpacing: '-0.01em' }),
    box('row', { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '18px' }, [
      link('About', '#about', NAV),
      link('Projects', '#projects', NAV),
      link('Experience', '#experience', NAV),
      link('Skills', '#skills', NAV),
      link('Playground', '#playground', NAV),
      CONTACT_POPUP,
    ]),
  ],
  { name: 'header' },
)

/** Pinned to the corner of the screen. */
export const BACK_TO_TOP: Blueprint = link('↑ Top', '#about', {
  position: 'fixed',
  right: '24px',
  bottom: '24px',
  zIndex: '20',
  padding: '10px 16px',
  backgroundColor: GREENS.forest,
  color: '#ffffff',
  borderRadius: '9999px',
  textDecoration: 'none',
  fontWeight: '600',
  boxShadow: '0 4px 12px rgb(0 0 0 / 0.25)',
})
