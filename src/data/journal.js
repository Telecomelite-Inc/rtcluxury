const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`

export const articles = [
  {
    id: 'inside-verification',
    title: 'Inside the RTC Luxury verification process',
    excerpt:
      'From title checks to in-person inspections — what it actually takes for a residence to join the collection.',
    image: img('photo-1721222204632-bf9abe6f023f'),
    category: 'Trust & Safety',
    date: 'July 2026',
  },
  {
    id: 'best-season-alps',
    title: 'When to book the French Alps for a private chalet week',
    excerpt: 'A season-by-season guide to Courchevel, Megève, and the Trois Vallées.',
    image: img('photo-1728049006252-020dfb896026'),
    category: 'Destinations',
    date: 'June 2026',
  },
  {
    id: 'owner-spotlight-daniel',
    title: 'Owner spotlight: Daniel Reyes on hosting at Palmeira Beach Estate',
    excerpt: 'How one owner turned unused weeks into a thriving, five-star hosting practice.',
    image: img('photo-1694967832949-09984640b143'),
    category: 'Owner Stories',
    date: 'May 2026',
  },
  {
    id: 'concierge-101',
    title: 'What your private concierge can (and will) do',
    excerpt: 'A look at the requests our concierge team fields most — from private chefs to last-minute transfers.',
    image: img('photo-1664876080601-acf03b40c5e3'),
    category: 'Member Guide',
    date: 'April 2026',
  },
]
