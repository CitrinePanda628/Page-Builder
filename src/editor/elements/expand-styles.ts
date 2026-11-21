import type { Styles } from '../../core'

const SIDES = ['Top', 'Right', 'Bottom', 'Left']

// '16px 32px' → ['16px', '32px', '16px', '32px'], the way CSS reads it.
export function expandBox(value: string): [string, string, string, string] {
  const [top = '', right = top, bottom = top, left = right] = value.trim().split(/\s+/)
  return [top, right, bottom, left]
}

// React warns when a tag mixes `padding` and `paddingTop`, so hand it the four sides only.
export function expandStyles(styles: Styles): Styles {
  const result: Styles = { ...styles }

  for (const box of ['padding', 'margin']) {
    const shorthand = result[box]
    if (shorthand === undefined) continue
    delete result[box]

    expandBox(shorthand).forEach((value, index) => {
      const key = `${box}${SIDES[index]}`
      result[key] = styles[key] ?? value
    })
  }
  return result
}
