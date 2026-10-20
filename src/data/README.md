# Site content

All the text and images on the site come from the files in this folder.
To change something, edit the file below — no component code needs touching.

| File          | What it controls                                      |
| ------------- | ----------------------------------------------------- |
| `site.ts`     | Home heading, Home photo, footer text                 |
| `sections.ts` | Section names (side nav + headings) and nav order     |
| `about.ts`    | About Me intro, paragraphs and closing line           |
| `work.ts`     | Projects (cards) in the My Work section               |
| `contact.ts`  | Email and social links in the Contact section         |
| `assistant.ts`| "Ask my AI" chat text, extra facts for the AI, model settings |
| `resume.ts`   | Your résumé — read ONLY by the AI chat, never shown on the site |

Colours, fonts and spacing live in `src/styles/theme.css`.
Images go in the `public/images/` folder and are referenced as `/images/<file>`.
