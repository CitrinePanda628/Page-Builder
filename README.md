# Page Builder

A block-based page builder, in the style of the WordPress block editor, built with React and
TypeScript. It opens on a page about me and my work, and that page was itself made with the
builder, so every section, tab and button on it can be selected, inspected and changed.

**Fayz Muhammad** · BEng (Hons) Software Engineering, First Class · [GitHub](https://github.com/CitrinePanda628) · [LinkedIn](https://linkedin.com/in/fayz-muhammad)

## What it does

- **Build pages from blocks.** Sections, rows, grids, headings, lists, buttons, forms,
  accordions, tabs and popups. Add them from the inserter (the blue **+**), by clicking or
  dragging.
- **Edit visually.** Select a block to get a floating toolbar (move up, move down, select the
  parent, delete) and a settings sidebar with only the options that fit that block.
- **See the CSS as you go.** Every setting shows the line of CSS it writes. A **Set** mark means
  the block has its own value; **Default** means it uses the value shown in grey, read from what
  the browser is really using.
- **Undo everything.** Every change is one step in the history (Ctrl+Z, Ctrl+Shift+Z).
- **Preview** at desktop, tablet and phone widths, and use the page like a visitor.
- **Export** the page as HTML + CSS, or as a React component.
- **Learn CSS** in the playground at the bottom of the page: twelve small experiments, each saying
  what to select, what to change, and why it works.

## Run it

You need Node.js 20 or newer.

```bash
npm install
npm run dev      # http://localhost:5173
```

| Command         | Does                                              |
| --------------- | ------------------------------------------------- |
| `npm run dev`   | starts the editor with live reload                |
| `npm test`      | runs the tests (Vitest)                           |
| `npm run check` | formatting, lint, types, tests and a build in one |
| `npm run build` | builds the site into `dist/`                      |

## How it works

```
page data ──▶ store ──▶ canvas ──▶ the page on screen
   ▲            │                        │
   └── core ◀── action ◀── click, drag, type in the sidebar
```

1. **Page data** (`src/core`) is a flat map of blocks, each with a type, content, styles and the
   ids of its children. Core functions never change a page; they return a new one.
2. **The store** (`src/editor/state/editor-store.ts`, zustand) holds the page and its history.
   Every interaction calls one action, which builds the next page with the core functions.
3. **The canvas** (`src/editor/canvas`) draws the page by walking the tree from the body down,
   turning each block into its real HTML tag (`src/editor/elements/element-tag.tsx`).
4. **The sidebar** (`src/editor/panels/settings`) is driven by data: each style setting is one
   object in `style-groups/`, and the panel draws the right control for it.
5. **Export** (`src/editor/export`) walks the same tree into HTML or JSX.

## Where things are

```text
src/
├── core/                 page data and the functions that change it (no React)
├── editor/
│   ├── editor.tsx            the layout: top bar, left panel, canvas, sidebar
│   ├── state/                the store, keyboard shortcuts, the starting page (about me)
│   ├── elements/             block types and how each one is drawn
│   ├── canvas/               the page in the middle: selecting, dragging, dropping
│   ├── panels/               top bar, block inserter, list view, sidebar, export
│   ├── export/               HTML, CSS and React output
│   └── ui/                   the setting controls
├── page-builder.test.ts  the tests
└── index.css             the editor's colours (light and dark) and scrollbars
public/cv.pdf             my CV, linked from the page
```

## Adding to it

- **A block type:** add it to `src/editor/elements/element-types/`, then a `case` in
  `element-tag.tsx` (how it looks in the editor) and in `export/page-tree.ts` (how it exports).
- **A style setting:** add one object to a file in
  `src/editor/panels/settings/style-groups/`. The sidebar picks it up.

## Built with

React 19, TypeScript, zustand, Tailwind CSS 4, @dnd-kit, lucide icons, Vite and Vitest.
