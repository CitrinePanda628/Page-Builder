import { HIGHLIGHT_CSS } from '../elements/highlights'

/**
 * The look an element has before you style it. In the editor this comes from
 * Tailwind classes in element-tag.tsx; in the exported code it is plain CSS.
 */

/** Undoes the browser's own margins and sizes, like Tailwind does in the editor. */
export const RESET_CSS = `*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; }
h1, p, ul, blockquote { margin: 0; }
h1 { font-size: inherit; }
button, input { font: inherit; }
a { color: inherit; }
[hidden] { display: none !important; }
${HIGHLIGHT_CSS}`

/** One rule per type, shown only for the types the page uses. Class: pb-<type>. */
export const BASE_CSS: Record<string, string> = {
  heading: `.pb-heading { font-weight: 700; }`,

  button: `.pb-button {
  padding: 10px 20px;
  border: 0;
  border-radius: 6px;
  background-color: #18181b;
  color: #ffffff;
  cursor: pointer;
}`,

  link: `.pb-link { text-decoration: underline; }`,

  list: `.pb-list { padding-left: 24px; list-style: disc; }`,

  quote: `.pb-quote {
  padding-left: 16px;
  border-left: 4px solid #d4d4d8;
  font-style: italic;
}
.pb-quote footer { margin-top: 8px; font-size: 14px; font-style: normal; }`,

  divider: `.pb-divider { height: 0; border: 0; border-top: 1px solid; }`,

  form: `.pb-form { display: flex; flex-direction: column; gap: 12px; }
.pb-form input { padding: 8px 12px; border: 1px solid #d4d4d8; border-radius: 6px; }
.pb-form button { align-self: flex-start; }`,

  accordion: `.pb-accordion summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  font-weight: 600;
  list-style: none;
  cursor: pointer;
}
.pb-accordion summary::-webkit-details-marker { display: none; }
.pb-accordion-icon { font-size: 20px; transition: transform 0.2s; }
.pb-accordion[open] .pb-accordion-icon { transform: rotate(45deg); }
.pb-accordion-body { padding-top: 12px; }`,

  tabs: `.pb-tablist { display: flex; gap: 4px; margin-bottom: 16px; border-bottom: 1px solid #e4e4e7; }
.pb-tablist button {
  margin-bottom: -1px;
  padding: 8px 16px;
  border: 0;
  border-bottom: 2px solid transparent;
  background: none;
  color: inherit;
  opacity: 0.6;
  cursor: pointer;
}
.pb-tablist button[aria-selected='true'] {
  border-bottom-color: currentColor;
  font-weight: 600;
  opacity: 1;
}`,

  popup: `.pb-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: rgb(0 0 0 / 0.5);
}
.pb-popup { position: relative; max-height: 100%; overflow: auto; }
.pb-close {
  position: absolute;
  top: 12px;
  right: 12px;
  border: 0;
  background: none;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}`,
}
