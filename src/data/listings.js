// Placeholder inventory for RTC Luxury. Swap `image` URLs and copy for real,
// verified high-end resort listings once available. Images are sourced from
// Unsplash (free-to-use) as stand-ins only.

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`

export const listings = [
  {
    id: 'amara-cliffside-villa',
    name: 'Amara Cliffside Villa',
    location: 'Santorini, Greece',
    type: 'Private Villa',
    image: img('photo-1561501900-3701fa6a0864'),
    rating: 5.0,
    reviews: 87,
    owner: 'Isabelle Laurent',
    nightly: 1450,
    weekly: 9200,
    minNights: 5,
    blurb:
      'A whitewashed clifftop retreat with a private infinity pool suspended over the caldera and uninterrupted Aegean sunsets.',
  },
  {
    id: 'the-obsidian-penthouse',
    name: 'The Obsidian Penthouse',
    location: 'Dubai, UAE',
    type: 'Sky Penthouse',
    image: img('photo-1613977257592-4871e5fcd7c4'),
    rating: 4.9,
    reviews: 64,
    owner: 'Khalid Al-Farsi',
    nightly: 2100,
    weekly: 13300,
    minNights: 4,
    blurb:
      'Floor-to-ceiling views of the skyline from the 78th floor, with a private butler suite and rooftop plunge pool.',
  },
  {
    id: 'palmeira-beach-estate',
    name: 'Palmeira Beach Estate',
    location: 'Cabo San Lucas, Mexico',
    type: 'Beachfront Estate',
    image: img('photo-1542314831-068cd1dbfeeb'),
    rating: 5.0,
    reviews: 142,
    owner: 'Daniel Reyes',
    nightly: 1875,
    weekly: 11900,
    minNights: 4,
    blurb:
      'Seven-bedroom oceanfront estate with a private beach cabana, infinity edge pool, and dedicated chef on request.',
  },
  {
    id: 'villa-des-alpes',
    name: 'Villa des Alpes',
    location: 'Courchevel, France',
    type: 'Ski Chalet',
    image: img('photo-1622015663319-e97e697503ee'),
    rating: 4.8,
    reviews: 51,
    owner: 'Margaux Dubois',
    nightly: 2600,
    weekly: 16500,
    minNights: 7,
    blurb:
      'Ski-in, ski-out châlet with a private spa, wine cellar, and panoramic views of the Trois Vallées.',
  },
  {
    id: 'lanai-oceanfront-retreat',
    name: 'Lanai Oceanfront Retreat',
    location: "Wailea, Maui, Hawai'i",
    type: 'Beach House',
    image: img('photo-1615722440048-da4ccf6de048'),
    rating: 5.0,
    reviews: 118,
    owner: 'Noelani Kahale',
    nightly: 1620,
    weekly: 10300,
    minNights: 5,
    blurb:
      'Barefoot-luxury beach house on Wailea Point with direct sand access and an oceanside infinity pool.',
  },
  {
    id: 'the-medina-riad',
    name: 'The Medina Riad',
    location: 'Marrakech, Morocco',
    type: 'Private Riad',
    image: img('photo-1571896349842-33c89424de2d'),
    rating: 4.9,
    reviews: 76,
    owner: 'Yasmine Benali',
    nightly: 980,
    weekly: 6200,
    minNights: 3,
    blurb:
      'A restored 19th-century riad in the heart of the medina, with a private courtyard pool and rooftop terrace.',
  },
]

export const featuredListings = listings.slice(0, 5)

export const stats = [
  { label: 'Verified Estates', value: '340+' },
  { label: 'Curated Destinations', value: '52' },
  { label: 'Private Members', value: '6,900+' },
  { label: 'Average Rating', value: '4.9 / 5' },
]

export const testimonials = [
  {
    quote:
      'Every detail was exactly as promised — the verification process gave us total confidence booking a home we’d never seen in person.',
    name: 'Charlotte H.',
    role: 'Member since 2023',
  },
  {
    quote:
      'Listing our estate on RTC Luxury felt effortless, and the caliber of travelers has been exceptional.',
    name: 'Daniel Reyes',
    role: 'Verified Owner',
  },
  {
    quote:
      'The concierge team handled everything from airport transfer to private chef requests. It didn’t feel like a rental — it felt like membership.',
    name: 'James O.',
    role: 'Member since 2022',
  },
]
