// 'fontSize' → 'font-size'
export function toCssName(key: string): string {
  return key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
}

// 'Start / flex-start', or just 'bold' when label and value are the same word.
export function withCode(label: string, value: string): string {
  return label.toLowerCase() === value.toLowerCase() ? value : `${label} / ${value}`
}

// 'justify-content: center;' when set; otherwise what the browser uses, marked as default.
export function toCssLine(name: string, value: string, current: string): string {
  if (value !== '') return `${name}: ${value};`
  if (current !== '') return `${name}: ${current};  /* default */`
  return `/* ${name}: not set */`
}
