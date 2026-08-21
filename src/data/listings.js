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
    description:
      'Carved into the volcanic cliffs above the caldera, Amara Cliffside Villa pairs Cycladic architecture with quietly modern comforts. Three suites open onto private terraces, while the main living pavilion frames an uninterrupted view across the water to the island of Nea Kameni. The infinity pool appears to spill directly into the sea, and the villa's western exposure makes it one of the most sought-after sunset vantage points on the island. A dedicated housekeeper and daily breakfast service are included, with a private chef and yacht transfers available on request.',
    amenities: ['Private Infinity Pool', 'Caldera View', 'Daily Housekeeping', 'Chef on Request', 'Air Conditioning', 'Wi-Fi', 'Airport Transfer', 'Sun Terrace'],
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
    description:
      'Occupying the entire 78th floor of one of Dubai's most recognizable towers, The Obsidian Penthouse delivers uninterrupted views over the Gulf and the city skyline through floor-to-ceiling glass. The residence features a private elevator entrance, a marble-clad living hall, and a rooftop plunge pool with a retractable shade pavilion for evening entertaining. A dedicated butler suite and in-house dining service are available around the clock, and the building's private spa and car service are included for the duration of your stay.',
    amenities: ['Rooftop Plunge Pool', 'Private Elevator', 'Butler Service', '24/7 Concierge', 'Smart Home Controls', 'Wi-Fi', 'Valet Parking', 'Spa Access'],
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
    description:
      'Palmeira Beach Estate sits directly on a quiet stretch of sand outside Cabo San Lucas, with seven ocean-facing suites arranged around a central courtyard. The grounds include a private beach cabana, a shaded palapa dining terrace, and an infinity-edge pool that lines up visually with the horizon. Staff on-site include a groundskeeper and housekeeping team, with a private chef, sport-fishing charters, and airport transfers available to arrange ahead of your stay.',
    amenities: ['Private Beach Access', 'Infinity Pool', 'Beach Cabana', 'Chef on Request', 'Air Conditioning', 'Wi-Fi', 'Housekeeping', 'Parking'],
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
    description:
      'Villa des Alpes sits directly on the piste in Courchevel 1850, with ski-in, ski-out access to the Trois Vallées and panoramic mountain views from every level. The interiors combine reclaimed alpine timber with underfloor heating, a double-height fireplace lounge, and a private spa with sauna, hammam, and treatment room. A temperature-controlled wine cellar holds several hundred bottles, and an on-call ski butler can arrange equipment, instructors, and lift access for the full party.',
    amenities: ['Ski-in/Ski-out', 'Private Spa & Sauna', 'Wine Cellar', 'Fireplace Lounge', 'Heated Boot Room', 'Wi-Fi', 'Ski Butler', 'Parking'],
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
    description:
      'Set on Wailea Point with direct beach access, Lanai Oceanfront Retreat brings a barefoot-luxury feel to one of Maui's most protected stretches of coastline. Sliding walls of glass open the main living area onto a lanai and oceanside infinity pool, and the primary suite wakes to unobstructed sunrise views over the water. The property includes a private beach path, outdoor rain shower, and an on-call concierge who can arrange snorkeling excursions, a private chef, or in-villa spa treatments.',
    amenities: ['Direct Beach Access', 'Infinity Pool', 'Outdoor Shower', 'Chef on Request', 'Air Conditioning', 'Wi-Fi', 'Snorkel Gear', 'Parking'],
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
    description:
      'The Medina Riad is a meticulously restored 19th-century home tucked behind an unmarked door in the heart of Marrakech's medina. Hand-carved plasterwork and zellige tile surround a shaded central courtyard and plunge pool, while a rooftop terrace opens to views over the medina's rooftops toward the Atlas Mountains. A live-in housekeeper prepares breakfast daily, and the riad's longstanding relationships with local guides make it easy to arrange a private souk tour, hammam visit, or in-house Moroccan dinner.',
    amenities: ['Courtyard Plunge Pool', 'Rooftop Terrace', 'Daily Breakfast', 'Air Conditioning', 'Wi-Fi', 'Housekeeping', 'Airport Transfer', 'Private Guide on Request'],
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
