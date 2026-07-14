/**
 * SITE CONTENT — edit this file for routine changes, not the components.
 * This is the same "content separate from layout" pattern as before, just
 * imported directly into Astro components instead of loaded as a browser script.
 */
export const siteConfig = {

  // ---- Comp card ----
  // Flip to true once a real comp card PDF is ready. While false, the
  // Comp Card section is skipped entirely when the page renders.
  showCompCard: false,

  // Path under /public. Replace public/files/comp-card-placeholder.pdf with
  // the real file (keep the same filename, or update this path).
  compCardPdfPath: '/files/comp-card-placeholder.pdf',

  // ---- Contact form ----
  // Handled server-side now (see src/pages/api/contact.ts) via SMTP — see
  // .env.example for the credentials this needs.
  contact: {
    to: 'saanvinair216@gmail.com',
    cc: 'adit_nair@hotmail.com',
    subjectPrefix: 'Portfolio Enquiry: ',
  },

  // ---- Social ----
  instagram: 'https://www.instagram.com/itslimulicious/',

  // ---- Profile ----
  profile: {
    name: 'Saanvi',
    ageRange: '12–18 months',
    location: 'Melbourne, Australia',
    stats: {
      height: '73 cm',
      weight: '10 kg',
      clothingSize: '1',
      eyeColour: 'Brown',
      hairColour: 'Dark brown',
    },
    // Pick 2–4 of these, or write your own — keep them specific and true.
    temperamentNotes: [
      'Comfortable with strangers',
      'Adapts well to wardrobe changes',
      'Settles quickly after a short warm-up on set',
      'Happy under studio lighting',
      'Enjoys music playing during shoots',
    ],
  },

  // ---- Gallery ----
  // Rendered top to bottom as full-bleed photo blocks. Add/remove/reorder
  // freely; `placeholder: true` renders the "coming soon" tile instead of
  // an image.
  gallery: [
    {
      src: '/images/hero-saanvi.png',
      alt: 'Saanvi in a brown knit sweater, smiling at the camera',
      index: '01',
      caption: 'Cosy knit',
    },
    {
      src: '/images/gallery-saanvi-01.png',
      alt: 'Saanvi wearing a red pom-pom hat',
      index: '02',
      caption: 'Red beanie days',
    },
    {
      src: '/images/gallery-saanvi-03-puffer.png',
      alt: 'Saanvi in a pink puffer jacket, laughing',
      index: '03',
      caption: 'Full of personality',
    },
    {
      src: '/images/gallery-saanvi-04-overalls.png',
      alt: 'Saanvi in denim overalls at a wooden table',
      index: '04',
      caption: 'Everyday moments',
    },
    {
      placeholder: true,
      index: '05',
      caption: 'Next shoot',
    },
  ],
};
