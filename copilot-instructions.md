# Portfolio Editing Rules

## Protected Hero Section

The hero section is locked and must remain unchanged during work on any other section.

Protected files and surfaces:
- `src/components/Hero.jsx`
- `src/components/WorkflowSequence.jsx` (the active hero rendered by `src/App.jsx`)
- Hero-related selectors in `src/styles.css`, including `.hero`, `.hero-copy`, `.hero-sequence-wrap`, `.hero-meta`, `.workflow-sequence`, and their responsive rules
- Hero frame assets under `public/sequences/hero/` and `public/sequences/workflow-dark-webp/`

Do not edit, reformat, rename, delete, replace assets, or change behavior in these protected surfaces when responding to a request about another section. Before any requested hero change, explicitly ask for confirmation and identify the exact hero files or selectors that would change. Preserve the existing hero layout, copy, frame count, frame timing, scroll behavior, responsive behavior, and visual styling unless the user directly requests a hero change.
