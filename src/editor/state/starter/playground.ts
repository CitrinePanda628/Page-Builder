import type { Blueprint, Styles } from '../../../core'
import { box, card, column, COLORS, GREENS, heading, intro, section, text, title } from './parts'

const DASHED: Styles = {
  borderStyle: 'dashed',
  borderWidth: '2px',
  borderColor: GREENS.leaf,
  borderRadius: '8px',
}

function tile(letter: string, color: string, styles: Styles = {}): Blueprint {
  return box(
    'box',
    {
      padding: '10px 16px',
      backgroundColor: color,
      color: '#ffffff',
      borderRadius: '8px',
      fontWeight: '700',
      ...styles,
    },
    [text(letter)],
  )
}

function named(name: string, blueprint: Blueprint): Blueprint {
  return { ...blueprint, props: { ...blueprint.props, name } }
}

// one experiment: what to do, the block to do it on, and why it works
function experiment(name: string, tryThis: string, why: string, demo: Blueprint): Blueprint {
  return card([
    heading(name, { fontSize: '19px', color: GREENS.forest }),
    text(tryThis, { color: COLORS.ink, fontSize: '15px', lineHeight: '1.55' }),
    demo,
    text(why, { color: COLORS.muted, fontSize: '14px', fontStyle: 'italic', lineHeight: '1.55' }),
  ])
}

// bright colours that are easy to tell apart
const ABC = [tile('A', '#15803d'), tile('B', '#0d9488'), tile('C', '#65a30d')]
const MIX = ['#16a34a', '#0d9488', '#65a30d', '#059669']

const FLEX = named(
  'flex-demo',
  box(
    'row',
    {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
      minHeight: '140px',
      padding: '12px',
      ...DASHED,
    },
    ABC,
  ),
)

const WRAP = named(
  'wrap-demo',
  box(
    'row',
    { display: 'flex', flexWrap: 'nowrap', gap: '6px', padding: '10px', ...DASHED },
    ['1', '2', '3', '4', '5', '6', '7', '8'].map((n) =>
      tile(n, MIX[Number(n) % 4] ?? '#16a34a', {
        width: '52px',
        flexShrink: '0',
        textAlign: 'center',
        padding: '10px 0',
      }),
    ),
  ),
)

const GRID = named(
  'grid-demo',
  box(
    'grid',
    {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '8px',
      padding: '12px',
      ...DASHED,
    },
    [...ABC, tile('D', '#059669'), tile('E', '#ca8a04'), tile('F', '#7c3aed')],
  ),
)

const SPACING = box('box', { ...DASHED, padding: '8px' }, [
  named(
    'spacing-demo',
    box(
      'box',
      { padding: '16px', margin: '8px', backgroundColor: '#bae6fd', borderRadius: '8px' },
      [text('Blue box', { backgroundColor: '#ffffff', padding: '4px 8px' })],
    ),
  ),
])

const CENTER = box('box', { ...DASHED, padding: '12px' }, [
  named(
    'center-demo',
    box('box', { width: '50%', padding: '14px', backgroundColor: '#fde68a', borderRadius: '8px' }, [
      text('Centre me', { fontWeight: '700' }),
    ]),
  ),
])

const OVERFLOW = named(
  'overflow-demo',
  box(
    'box',
    {
      height: '90px',
      overflow: 'auto',
      padding: '10px',
      marginBottom: '72px',
      backgroundColor: '#ecfccb',
      ...DASHED,
    },
    [
      text(
        'This box is 90px tall and this text is longer than that, so with Scroll a scrollbar lets you read the rest, with Cut off the rest is hidden, and with Spill out it runs over the edge into the space below the box.',
      ),
    ],
  ),
)

const BADGE: Styles = {
  position: 'absolute',
  top: '-10px',
  right: '-10px',
  padding: '4px 10px',
  backgroundColor: '#e11d48',
  color: '#ffffff',
  borderRadius: '9999px',
  fontSize: '12px',
  fontWeight: '700',
}

const POSITION = box(
  'box',
  { position: 'relative', padding: '24px', backgroundColor: '#f4f4f5', borderRadius: '12px' },
  [text('A card with a badge'), named('badge', text('NEW', BADGE))],
)

const STICKY = named(
  'sticky-box',
  box('box', { height: '170px', overflow: 'auto', ...DASHED }, [
    named(
      'sticky-title',
      heading('I stick to the top', {
        position: 'sticky',
        top: '0',
        padding: '10px 12px',
        fontSize: '16px',
        backgroundColor: GREENS.forest,
        color: '#ffffff',
      }),
    ),
    ...['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'].map((n) =>
      text(`Line ${n}: scroll inside this box`, { padding: '6px 12px' }),
    ),
  ]),
)

const STACKING = box('box', { position: 'relative', height: '140px' }, [
  named(
    'back-box',
    box(
      'box',
      {
        position: 'absolute',
        top: '10px',
        left: '10px',
        width: '150px',
        height: '90px',
        padding: '10px',
        backgroundColor: '#7c3aed',
        color: '#ffffff',
        borderRadius: '10px',
      },
      [text('Back (purple)', { fontWeight: '700' })],
    ),
  ),
  named(
    'front-box',
    box(
      'box',
      {
        position: 'absolute',
        top: '40px',
        left: '80px',
        width: '150px',
        height: '90px',
        padding: '10px',
        backgroundColor: '#f97316',
        color: '#ffffff',
        borderRadius: '10px',
      },
      [text('Front (orange)', { fontWeight: '700' })],
    ),
  ),
])

const TRANSFORM = named(
  'turn-demo',
  box(
    'box',
    {
      width: 'fit-content',
      padding: '24px 32px',
      backgroundColor: '#a7f3d0',
      borderRadius: '12px',
      transform: 'rotate(-4deg)',
    },
    [text('Turn me', { fontWeight: '700' })],
  ),
)

const CORNERS: Blueprint = {
  type: 'button',
  props: { text: 'Round my corners', name: 'corner-demo' },
  styles: {
    width: 'fit-content',
    padding: '14px 24px',
    backgroundColor: '#0d9488',
    color: '#ffffff',
  },
}

const TYPE: Blueprint = {
  type: 'quote',
  props: {
    text: 'Style this quote with a different font, capital letters and wider spacing.',
    name: 'text-demo',
  },
  styles: { fontSize: '22px', color: COLORS.ink, borderColor: GREENS.bright },
}

export const PLAYGROUND: Blueprint = section('playground', { backgroundColor: GREENS.wash }, [
  column([
    title('Playground'),
    intro(
      'There are twelve small CSS experiments below, and each one names a block for you to select, either by clicking it on the page or by finding its #name in the List view.',
      'If your click lands on the text inside a block, press ⤴ in the toolbar to select the block around it, and remember that Ctrl+Z undoes any change.',
    ),
    box(
      'grid',
      { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' },
      [
        experiment(
          '1 · Line them up (flex)',
          'Select #flex-demo, the dashed box, and in Layout of the children change Justify, Align and Direction to see the tiles move.',
          'Justify spreads the blocks along the main line and Align places them across it, while Direction swaps which way counts as the main line.',
          FLEX,
        ),
        experiment(
          '2 · Wrap and gap',
          'Select #wrap-demo, whose tiles run out of the box, then set Wrap to Wrap and drag Gap to space them out.',
          'A flex line never breaks by itself, so Wrap lets blocks move to a new line when they don’t fit and Gap sets the space between them.',
          WRAP,
        ),
        experiment(
          '3 · Rows and columns (grid)',
          'Select #grid-demo and change Columns to 1fr 1fr and then to 2fr 1fr, then drag Gap to change the space between the cells.',
          'An fr is a share of the free space, so 2fr 1fr makes the first column twice as wide as the second.',
          GRID,
        ),
        experiment(
          '4 · Padding and margin',
          'Select #spacing-demo, the blue box, and make its Padding bigger before doing the same with its Margin.',
          'Padding sits inside the edge so the blue grows, while margin sits outside it so the box moves away from the dashed line.',
          SPACING,
        ),
        experiment(
          '5 · Centre a block',
          'Select #center-demo, the yellow box, and click Centre in Place in its parent, or set its left and right Margin to auto.',
          'Auto margins share the free space equally on both sides, which centres any block that is narrower than its parent.',
          CENTER,
        ),
        experiment(
          '6 · Overflow',
          'Select #overflow-demo, the lime box, by clicking its dashed edge or its text and then ⤴, and in Size set Overflow to Spill out, then Cut off and then Scroll.',
          'Overflow only matters when the content is bigger than the box, which is why this box has a fixed height of 90px, while a box without a height simply grows to fit.',
          OVERFLOW,
        ),
        experiment(
          '7 · Position',
          'Select the red NEW badge and change Top and Right in Position and scrolling, or set its Position to Normal to see where it would sit without it.',
          'Absolute takes a block out of the normal flow and places it inside the nearest parent that has a position, which here is the grey card.',
          POSITION,
        ),
        experiment(
          '8 · Sticky',
          'Scroll inside the dashed box to watch the title stay at the top, then select #sticky-title, set Position to Normal and scroll again.',
          'Sticky scrolls with the content until it reaches its Top value and then stays put inside the nearest box that scrolls, which here is this small box.',
          STICKY,
        ),
        experiment(
          '9 · Which one is on top (z-index)',
          'Select #back-box, the purple box, and in Position and scrolling set On top to 10 before setting it back to auto.',
          'Positioned blocks are drawn in page order so the later one sits on top, but a higher z-index wins as long as the block has a position.',
          STACKING,
        ),
        experiment(
          '10 · Turn and grow',
          'Select #turn-demo, the mint card, by clicking its words and then ⤴, and in Move try rotate(10deg) and then scale(1.2).',
          'Transform changes how a block is drawn without moving anything around it, so the space it takes up stays exactly the same.',
          TRANSFORM,
        ),
        experiment(
          '11 · Corners and shadow',
          'Select #corner-demo, the teal button, then drag Round corners in Border and corners and pick a Shadow in Effects.',
          'A radius of 9999px turns a box into a pill and 50% turns a square into a circle, while a shadow is made of an x offset, a y offset, a blur and a colour.',
          CORNERS,
        ),
        experiment(
          '12 · Type',
          'Select #text-demo, the quote, and in the Text settings try a serif font, UPPERCASE letters, a letter spacing of 0.1em and a text shadow.',
          'Text settings are inherited, so setting them on a section changes every block inside it unless a block sets its own.',
          TYPE,
        ),
      ],
    ),
  ]),
])
