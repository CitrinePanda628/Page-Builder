import type { Blueprint } from '../../../core'
import {
  box,
  column,
  COLORS,
  GREENS,
  heading,
  intro,
  list,
  para,
  section,
  text,
  title,
} from './parts'

interface Project {
  label: string
  summary: string[]
  tech: string[]
  does: string[]
  built: string[]
}

function half(name: string, points: string[]): Blueprint {
  return box('stack', { display: 'flex', flexDirection: 'column', gap: '8px' }, [
    heading(name, { fontSize: '16px', color: GREENS.deep }),
    list(points, { lineHeight: '1.7', color: COLORS.muted }),
  ])
}

function project({ label, summary, tech, does, built }: Project): Blueprint {
  return box(
    'tab',
    { display: 'flex', flexDirection: 'column', gap: '18px' },
    [
      heading(label, { fontSize: '26px', color: GREENS.forest }),
      para(summary, { color: COLORS.muted, fontSize: '18px', lineHeight: '1.6' }),
      box(
        'row',
        { display: 'flex', flexWrap: 'wrap', gap: '8px' },
        tech.map((name) =>
          text(name, {
            padding: '5px 12px',
            borderRadius: '9999px',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: GREENS.edge,
            backgroundColor: GREENS.soft,
            color: GREENS.forest,
            fontSize: '14px',
            fontWeight: '700',
          }),
        ),
      ),
      { type: 'divider', styles: { borderColor: GREENS.edge } },
      box(
        'columns',
        {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '28px',
        },
        [half('What it does', does), half('How I built it', built)],
      ),
    ],
    { label },
  )
}

const PAGE_BUILDER = project({
  label: 'Page Builder',
  summary: [
    'A visual page builder in the style of the **WordPress block editor**, where you put a web page together from blocks and style it without writing any code.',
    'This website is a page made with it, so everything you see here can be selected and changed.',
  ],
  tech: ['React', 'TypeScript', 'Zustand', 'Tailwind CSS', 'dnd-kit', 'Vite', 'Vitest'],
  does: [
    'System allow user to create a page from blocks such as sections, rows, grids, headings, lists, buttons, forms, accordions, tabs and pop ups, adding each one from the inserter with a click or by **dragging it onto the page**.',
    'When you select a block a toolbar appears above it allowing  user to move it either up or down, jump to the block around it or delete it while the list view shows the whole page as a tree you can click through.',
    'The **settings panel** only shows the options that make sense for the selected block and each option shows the **CSS** it writes.',
    'Every change can be undone and redone and user can preview the page at **phone, tablet and desktop** widths and click through it the way a visitor would.',
  ],
  built: [
    'The page is stored as a flat list of blocks where each block knows its type, its content, its styles and the blocks inside it which keeps finding, moving and deleting blocks quick and simple.',
    'The core functions never change a page in place but always return a new copy which is what makes the **undo and redo history** reliable.',
    'A **Zustand store** holds the page, its history and the current selection and every click, drag and edit goes through a **store action** so that the canvas, **settings panel** and list view always stay in step.',
    'The canvas is a **React component** that draws each block as its real HTML tag and then draws itself again for every block inside it, while **dnd-kit** handles the dragging and shows where a block will land.',
  ],
})

const PLURA = project({
  label: 'Plura',
  summary: [
    'A website builder for **agencies**, where an agency signs up, adds its clients and builds each of them a website that goes live on its own **subdomain**.',
  ],
  tech: ['TypeScript', 'Next.js', 'Prisma', 'MySQL', 'Clerk', 'Stripe', 'UploadThing'],
  does: [
    'Each client gets a **private workspace** with its own websites, media library, team and sales pipeline, and no client can see another client’s data.',
    'Websites are built page by page in a **drag and drop** editor and can be checked in **desktop, tablet and mobile** views before they are published.',
    'The agency pays for its plan through **Stripe**, and each client can connect their own Stripe account through **Stripe Connect** to take payments on their site.',
  ],
  built: [
    'I used the **Next.js App Router** and wrote most of the backend as **server actions**, which kept the logic for each feature in one place without a separate API.',
    'Agencies, workspaces, users, sites, pages, pipelines, lanes and tickets are modelled with **Prisma** on **MySQL**, and **Clerk** looks after sign-up and **log-in**.',
    'Middleware reads the host of every request and sends a client’s **subdomain** to that client’s site, while the dashboard pages stay behind a log-in.',
    'File uploads go through **UploadThing**, the checkout flows have **tests** around them, and the **README** covers the setup and every environment variable.',
  ],
})

const FINANCE = project({
  label: 'Finance Dashboard',
  summary: [
    'A personal money dashboard that brings your **income and expenses** together and shows them as **graphs and tables**, so you can see where your money goes in one clear view.',
  ],
  tech: ['TypeScript', 'Next.js', 'React'],
  does: [
    'It shows your income and spending side by side, so you can see at a glance how much is coming in, how much is going out and what is left over.',
    'Graphs show how your spending changes over time, which makes it easy to spot the months where money went out faster than usual.',
    'Expenses are grouped into **categories**, so you can see which parts of everyday life take up the biggest share of your money.',
  ],
  built: [
    'I built it as a **front-end application** with **Next.js, React and TypeScript**, splitting the screen into small **reusable components** for the **graphs**, tables and summaries.',
    '**TypeScript types** describe every transaction and category, so the **graphs and tables** always work with data in the same shape.',
    'I kept the layout clean and easy to read, so the numbers that matter most are the first thing you notice.',
  ],
})

const SIMULATOR = project({
  label: 'Driving Simulation',
  summary: [
    'A **virtual driving environment** in the browser, where new drivers can practise driving properly and see the **rules of the road** explained visually, on roads shared with cars driven by **AI**.',
  ],
  tech: ['JavaScript', 'HTML5 Canvas', 'Node.js', 'MongoDB'],
  does: [
    'You drive a car through a road network with junctions, lanes and other traffic, so you can practise in a safe place before you ever get on a real road.',
    'The **rules of the road** are shown on screen as you drive, so you can see what you should do in each situation, such as who has priority at a junction, instead of only reading about it.',
    'The other cars are driven by AI that follows the same rules, so you have to watch the traffic around you and react to it just as you would on a real road.',
    'Scenarios can be saved and loaded again, so a learner can repeat the same situation as many times as they need until they get it right.',
  ],
  built: [
    'The roads, junctions and cars are drawn with **HTML5 Canvas** and redrawn many times a second, so the traffic moves smoothly.',
    'Each **AI** car decides what to do from its own position and speed and from the cars around it, which makes the traffic behave in a believable way.',
    'Saved scenarios are stored in **MongoDB** through a small **Node.js** server, and I kept them as documents because each scenario has a different shape.',
  ],
})

const CLINIC = project({
  label: 'Digital Clinic',
  summary: [
    'A system for an **electronics repair clinic**, built in **C# and .NET** as a university team project, which helps the clinic keep track of its repair work and run its services from one place.',
  ],
  tech: ['C#', '.NET', 'MySQL', 'Entity Framework', 'XML and XSLT'],
  does: [
    'It keeps the clinic’s information in one system, so the people running the clinic can look up and update their work without searching through separate records.',
    'Users log in with their own account and only see the parts of the system that are meant for them.',
    'Data is handled with **XML and XSLT**, so the same information can be turned into the format that each part of the system needs.',
  ],
  built: [
    'I designed and built the **MySQL** database and connected it to the application through **Entity Framework**, so that each table became a **C# class** the rest of the code could work with.',
    'Communicated with the clinic’s **stakeholders and customers** regularly to show them our progress, and every issue they raised was written down, fixed and then checked with them again.',
    'Continued to refine the system as we went along so the final version was shaped by the people who would actually use it.',
    'Wrote comprehensive **documentation** that explains how the system works and how to set it up so that other people could run it and keep it going.',
  ],
})

export const PROJECTS: Blueprint = section('projects', {}, [
  column([
    title('Projects'),
    intro('Five projects i’ve built, starting with the page builder that you’re already inside.'),
    box(
      'tabs',
      {
        color: COLORS.ink,
        padding: '20px',
        backgroundColor: COLORS.white,
        borderRadius: '12px',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: GREENS.edge,
        boxShadow: '0 8px 24px rgb(22 101 52 / 0.08)',
      },
      [PAGE_BUILDER, PLURA, FINANCE, SIMULATOR, CLINIC],
      { name: 'project-tabs' },
    ),
  ]),
])
