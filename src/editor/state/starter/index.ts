import { buildPage, type Page } from '../../../core'
import { EXPERIENCE, SKILLS } from './experience'
import { BACK_TO_TOP, HEADER } from './header'
import { HERO } from './hero'
import { PLAYGROUND } from './playground'
import { PROJECTS } from './projects'

// the page the editor opens with, about me and built with the editor itself
export function createStarterPage(): Page {
  return buildPage([HEADER, HERO, PROJECTS, EXPERIENCE, SKILLS, PLAYGROUND, BACK_TO_TOP], {
    fontFamily: 'Inter, system-ui, sans-serif',
    lineHeight: '1.5',
    color: '#18181b',
    '--highlight': '#166534',
  })
}
