// The page sections, in order.
// `id`    → the link target (#about) — change only if you also want a different URL hash
// `label` → the text in the side nav AND the section's heading
// To reorder the side nav, reorder the `navLinks` list at the bottom.

export const sections = {
  home: { id: 'home', label: 'Home' },
  about: { id: 'about', label: 'About Me' },
  work: { id: 'work', label: 'My Work' },
  contact: { id: 'contact', label: 'Contact' },
}

export const navLinks = [sections.home, sections.about, sections.work, sections.contact]
