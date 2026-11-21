/** One box in the Content group, for one prop of the element. */
export interface ContentField {
  key: string
  label: string
  /** The HTML name, like 'href'. Empty for none. */
  code: string
  help: string
  placeholder: string
  /** The HTML this value makes: html('Hello') → '<h1>Hello</h1>'. */
  html: (value: string) => string
  /** text: one line. lines: several lines. yesno: a Yes / No choice. */
  kind?: 'text' | 'lines' | 'yesno'
}

function words(tag: string, placeholder: string): ContentField {
  return {
    key: 'text',
    label: 'Text',
    code: '',
    help: 'The words shown on the page.',
    placeholder,
    html: (value) => `<${tag}>${value}</${tag}>`,
  }
}

/** The Content boxes of each type. Types not listed have only a Name. */
export const CONTENT_FIELDS: Record<string, ContentField[]> = {
  heading: [words('h1', 'e.g. Fresh bread every morning')],
  text: [
    {
      ...words('p', 'e.g. Baked before sunrise.'),
      kind: 'lines',
      help: 'The words shown on the page. Each new line starts a new line on the page.\nPut **two stars** around words to highlight them.',
    },
  ],
  button: [
    {
      ...words('button', 'e.g. Book a table'),
      label: 'Label',
      help: 'Short and active: "Book a table", not "Click here".',
    },
  ],
  link: [
    words('a', 'e.g. See our menu'),
    {
      key: 'href',
      label: 'Goes to',
      code: 'href',
      help: 'A web address, or #name to jump to the element with that name on this page.',
      placeholder: 'e.g. #menu or https://example.com',
      html: (value) => `<a href="${value}">`,
    },
  ],
  list: [
    {
      key: 'items',
      label: 'Items',
      code: '<li>',
      help: 'One item per line.\nPut **two stars** around words to highlight them.',
      placeholder: 'One item per line',
      html: (value) =>
        value
          .split('\n')
          .map((item) => `<li>${item}</li>`)
          .join(' '),
      kind: 'lines',
    },
  ],
  quote: [
    { ...words('blockquote', 'e.g. The best bread in town.'), kind: 'lines' },
    {
      key: 'author',
      label: 'Who said it',
      code: '<footer>',
      help: 'Shown under the quote. Leave empty for none.',
      placeholder: 'e.g. A happy customer',
      html: (value) => `<footer>— ${value}</footer>`,
    },
  ],
  form: [
    {
      key: 'buttonText',
      label: 'Button text',
      code: '',
      help: 'The words on the send button.',
      placeholder: 'e.g. Send message',
      html: (value) => `<button type="submit">${value}</button>`,
    },
  ],
  accordion: [
    {
      key: 'title',
      label: 'Title',
      code: '<summary>',
      help: 'What you click to open it. Its content is the elements inside.',
      placeholder: 'e.g. Do you deliver?',
      html: (value) => `<summary>${value}</summary>`,
    },
    {
      key: 'open',
      label: 'Starts open',
      code: 'open',
      help: 'Open when the page loads. While editing it is always open.',
      placeholder: '',
      html: (value) => (value === 'yes' ? '<details open>' : '<details>'),
      kind: 'yesno',
    },
  ],
  tab: [
    {
      key: 'label',
      label: 'Tab name',
      code: '',
      help: "The words on this tab's button.",
      placeholder: 'e.g. Breads',
      html: (value) => `<button role="tab">${value}</button>`,
    },
  ],
  popup: [
    {
      key: 'buttonText',
      label: 'Button text',
      code: '',
      help: 'The button that opens the popup. Select the popup to edit what is inside.',
      placeholder: 'e.g. Book a table',
      html: (value) => `<button>${value}</button>`,
    },
  ],
}

/** Every element but the body can have a name. */
export const NAME_FIELD: ContentField = {
  key: 'name',
  label: 'Name',
  code: 'id',
  help: 'A name for this element. Links can jump to it with #name, and Layers shows it.',
  placeholder: 'No name yet, e.g. menu',
  html: (value) => `id="${value}"`,
}
