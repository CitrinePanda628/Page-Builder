# Page Builder

A block based page builder in the style of the WordPress block editor, built with React and TypeScript, which opens on a page about me and my work that was itself made with the builder, so you can click on anything in it to see how it is built.

Fayz Muhammad · BEng (Hons) Software Engineering, First Class · [GitHub](https://github.com/CitrinePanda628) · [LinkedIn](https://linkedin.com/in/fayz-muhammad)

## What it does

You build a page from blocks such as sections, grids, headings, buttons, forms, tabs and pop ups by clicking them in the inserter or dragging them onto the page, and a settings panel shows only the options that fit the block you picked along with the line of CSS each option writes. Every change can be undone and redone, and you can preview the page at desktop, tablet and phone widths.

## Run it

You need Node.js 20 or newer.

```bash
npm install
npm run dev      # http://localhost:5173
```

Use `npm test` to run the tests and `npm run build` to build the site into `dist/`.

## How it works

The page is stored as a flat map of blocks in `src/core`, where each block has a type, content, styles and the ids of its children, and the core functions always return a new page instead of changing the old one. A zustand store in `src/editor/state` holds the page and its history, the canvas in `src/editor/canvas` draws the blocks as real HTML tags, and the settings panel in `src/editor/panels/settings` is built from data so a new style setting is just one new object in `style-groups/`.

## Built with

React 19, TypeScript, zustand, Tailwind CSS 4, dnd-kit, lucide icons, Vite and Vitest.
