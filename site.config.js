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
  // Submissions go straight to Web3Forms (https://web3forms.com), which
  // emails them to whatever address the access key below was created with —
  // check/manage that on web3forms.com, not here.
  contact: {
    web3formsAccessKey: '4a7c18be-cd65-4588-8969-4ccf46996f1a',
    subjectPrefix: 'Portfolio Enquiry: ',
    // NOTE: ccemail is a Web3Forms PRO feature — on the free plan this field
    // is very likely ignored. Verify in your Web3Forms dashboard; if
    // unsupported, forward manually from the primary inbox instead.
    //cc: 'adit_nair@hotmail.com',
  },

  // ---- Social ----
  instagram: 'https://www.instagram.com/itslimulicious/',

  // ---- Profile ----
  profile: {
    name: 'Saanvi',
    age: '1 year',
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
  // Each item renders as a framed portrait card unless orientation: 'landscape'.
  gallery: [
    {
      src: '/images/gallery-saanvi-02.png',
      alt: 'Saanvi wearing a red pom-pom hat',
      index: '01',
      caption: 'Red beanie days',
      orientation: 'landscape',
    },
    {
      src: '/images/hero-saanvi.png',
      alt: 'Saanvi in a brown knit sweater, smiling at the camera',
      index: '02',
      caption: 'Cosy knit',
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
