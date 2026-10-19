// General site content: your name, the Home photo and the footer.
// Edit the text here and the whole site updates.

export const site = {
  hero: {
    greeting: "Hi, I'm Aditya Sairam",   // big heading on the Home section
    photo: {
      src: '/images/aditya.png',          // file inside the public/ folder
      alt: 'Portrait of Aditya Sairam',   // read aloud by screen readers
    },
  },

  footer: {
    owner: 'Aditya Sairam',               // shown after "© <year>"
    madeWith: 'Made with',
    symbol: '♥',
    symbolLabel: 'love',                  // what screen readers say for the symbol
    extra: 'and lots of tea',
  },
}
