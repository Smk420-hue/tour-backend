import db from '../config/db.js';
import Tour from '../models/Tour.js';
import {Itinerary,
 Inclusion,
 Exclusion ,
TourImage} from '../models/associations.js';

const tours = [
  // First 5 tours from previous example...

  {
    title: "Kashmir Paradise Tour",
    slug: "kashmir-paradise-tour",
    state: "Jammu & Kashmir",
    country: "India",
    shortDescription: "Experience the serene beauty of Kashmir's valleys and lakes.",
    overview: "Explore Srinagar's Dal Lake, Gulmarg's meadows, and Pahalgam's valleys in this 6-day getaway.",
    destination: "Srinagar, Gulmarg, Pahalgam",
    duration: 6,
    price: 32000,
    discount: 0,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761263799/travel-website/tours/fakt7elhejwcmth1snzk.jpg",
    isPopular: false,
    seats: 25,
    bookedSeats: 0,
    tourType: "group",
    category: "domestic",
    departureDate: "2025-10-20T00:00:00.000Z",
    capacity: 20,
    returnDate: "2025-10-25T00:00:00.000Z",
    averageRating: 0,
    numReviews: 0,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Srinagar", description: "Shikara ride on Dal Lake.", activities: "Shikara ride on Dal Lake." },
      { dayNumber: 2, title: "Visit Mughal Gardens and Shankaracharya Temple.", description: "Visit Mughal Gardens and Shankaracharya Temple.", activities: "Visit Mughal Gardens and Shankaracharya Temple." },
      { dayNumber: 3, title: "Gulmarg excursion – Gondola ride.", description: "Gulmarg excursion – Gondola ride.", activities: "Gulmarg excursion – Gondola ride." },
      { dayNumber: 4, title: "Pahalgam sightseeing – Betaab Valley, Aru Valley.", description: "Pahalgam sightseeing – Betaab Valley, Aru Valley.", activities: "Pahalgam sightseeing – Betaab Valley, Aru Valley." },
      { dayNumber: 5, title: "Local shopping and leisure day.", description: "Local shopping and leisure day.", activities: "Local shopping and leisure day." },
      { dayNumber: 6, title: "Departure from Srinagar.", description: "Departure from Srinagar.", activities: "Departure from Srinagar." }
    ],
    inclusions: [
      { text: "Hotel accommodation" },
      { text: "Breakfast & Dinner" },
      { text: "Houseboat stay" },
      { text: "Airport transfers" }
    ],
    exclusions: [
      { text: "Airfare" },
      { text: "Entry tickets" },
      { text: "Personal expenses" },
      { text: "Tips and gratuities" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761263799/travel-website/tours/fakt7elhejwcmth1snzk.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761263800/travel-website/tours/tu6z4qvq6w7wtuwfvytm.avif" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761263800/travel-website/tours/k4bmicqxjkp6xoqek4y0.jpg" }
    ]
  },
  {
    title: "Goa Beach Retreat",
    slug: "goa-beach-retreat",
    state: "Goa",
    country: "India",
    shortDescription: "A perfect coastal retreat to relax and party in Goa.",
    overview: "Soak up the sun, enjoy beaches, and discover Goan culture. Explore Baga, Calangute, and Palolem beaches; enjoy water sports and vibrant nightlife.",
    destination: "North & South Goa",
    duration: 4,
    price: 18000,
    discount: 0,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264338/travel-website/tours/wvnfrg6qhte0ftx5twvk.jpg",
    isPopular: true,
    seats: 10,
    bookedSeats: 2,
    tourType: "group",
    category: "domestic",
    departureDate: "2025-11-01T00:00:00.000Z",
    capacity: 20,
    returnDate: "2025-11-25T00:00:00.000Z",
    averageRating: 4.5,
    numReviews: 15,
    itineraries: [
      { dayNumber: 1, title: "Arrival and leisure at Baga Beach.", description: "Arrival and leisure at Baga Beach.", activities: "Arrival and leisure at Baga Beach." },
      { dayNumber: 2, title: "Visit Aguada Fort and Calangute Beach.", description: "Visit Aguada Fort and Calangute Beach.", activities: "Visit Aguada Fort and Calangute Beach." },
      { dayNumber: 3, title: "Explore Old Goa churches and spice plantation.", description: "Explore Old Goa churches and spice plantation.", activities: "Explore Old Goa churches and spice plantation." },
      { dayNumber: 4, title: "Departure after local shopping.", description: "Departure after local shopping.", activities: "Departure after local shopping." }
    ],
    inclusions: [
      { text: "Breakfast" },
      { text: "Hotel stay near beach" },
      { text: "Sightseeing" },
      { text: "Airport pickup/drop" }
    ],
    exclusions: [
      { text: "Lunch/Dinner" },
      { text: "Watersports charges" },
      { text: "Personal shopping" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264338/travel-website/tours/wvnfrg6qhte0ftx5twvk.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264339/travel-website/tours/jegqwpgtvvbgaulywsfs.avif" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264339/travel-website/tours/hnlfnpgq04b567pmmmw9.jpg" }
    ]
  },
  {
    title: "Rajasthan Royal Experience",
    slug: "rajasthan-royal-experience",
    state: "Rajasthan",
    country: "India",
    shortDescription: "Explore the land of kings and majestic forts.",
    overview: "Visit Jaipur, Udaipur, Jodhpur, and Jaisalmer. Experience royal palaces, desert safaris, and rich cultural heritage.",
    destination: "Golden Triangle & Beyond",
    duration: 7,
    price: 32000,
    discount: 3000,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264341/travel-website/tours/udaipur_palace.jpg",
    isPopular: true,
    seats: 12,
    bookedSeats: 5,
    tourType: "group",
    category: "domestic",
    departureDate: "2025-10-10T00:00:00.000Z",
    capacity: 20,
    returnDate: "2025-10-17T00:00:00.000Z",
    averageRating: 4.6,
    numReviews: 18,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Jaipur", description: "Check-in and local market visit", activities: "Local market exploration" },
      { dayNumber: 2, title: "Jaipur sightseeing", description: "Visit Amber Fort, City Palace", activities: "Fort and palace visits" },
      { dayNumber: 3, title: "Travel to Jodhpur", description: "Visit Mehrangarh Fort", activities: "Fort visit and local cuisine" },
      { dayNumber: 4, title: "Jodhpur to Jaisalmer", description: "Desert camp experience", activities: "Camel safari and cultural show" },
      { dayNumber: 5, title: "Jaisalmer exploration", description: "Golden Fort and havelis", activities: "Fort and architecture tour" },
      { dayNumber: 6, title: "Travel to Udaipur", description: "Lake Pichola and City Palace", activities: "Boat ride and palace visit" },
      { dayNumber: 7, title: "Departure from Udaipur", description: "Airport transfer", activities: "Departure" }
    ],
    inclusions: [
      { text: "All accommodation" },
      { text: "Breakfast and dinner" },
      { text: "All transfers" },
      { text: "Desert safari" }
    ],
    exclusions: [
      { text: "Monument entries" },
      { text: "Lunch" },
      { text: "Personal expenses" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264341/travel-website/tours/udaipur_palace.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264341/travel-website/tours/jaipur_fort.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264341/travel-website/tours/jaisalmer_desert.jpg" }
    ]
  },
  {
    title: "Kerala Backwaters",
    slug: "kerala-backwaters",
    state: "Kerala",
    country: "India",
    shortDescription: "Serene backwaters and lush green landscapes.",
    overview: "Houseboat stay in Alleppey, tea plantations in Munnar, wildlife in Thekkady, and beaches in Kovalam.",
    destination: "Kerala Circuit",
    duration: 5,
    price: 22000,
    discount: 1500,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264342/travel-website/tours/kerala_backwaters.jpg",
    isPopular: true,
    seats: 8,
    bookedSeats: 3,
    tourType: "private",
    category: "domestic",
    departureDate: "2025-08-20T00:00:00.000Z",
    capacity: 15,
    returnDate: "2025-08-25T00:00:00.000Z",
    averageRating: 4.7,
    numReviews: 20,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Cochin", description: "City tour and Chinese nets", activities: "City exploration" },
      { dayNumber: 2, title: "Munnar tea gardens", description: "Visit tea plantations", activities: "Tea estate tour" },
      { dayNumber: 3, title: "Thekkady wildlife", description: "Periyar Lake boat ride", activities: "Wildlife spotting" },
      { dayNumber: 4, title: "Alleppey backwaters", description: "Houseboat stay", activities: "Backwater cruise" },
      { dayNumber: 5, title: "Kovalam beach", description: "Beach relaxation", activities: "Swimming and departure" }
    ],
    inclusions: [
      { text: "Houseboat stay" },
      { text: "All meals in houseboat" },
      { text: "Hotel accommodation" },
      { text: "Sightseeing" }
    ],
    exclusions: [
      { text: "Airfare" },
      { text: "Personal expenses" },
      { text: "Additional activities" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264342/travel-website/tours/kerala_backwaters.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264342/travel-website/tours/munnar_tea.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264342/travel-website/tours/kovalam_beach.jpg" }
    ]
  },
  {
    title: "Ladakh Adventure",
    slug: "ladakh-adventure",
    state: "Ladakh",
    country: "India",
    shortDescription: "High-altitude adventure in the land of passes.",
    overview: "Visit Pangong Lake, Nubra Valley, Leh Palace, and Magnetic Hill. Experience breathtaking landscapes and Buddhist culture.",
    destination: "Leh, Nubra, Pangong",
    duration: 8,
    price: 35000,
    discount: 2500,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264343/travel-website/tours/ladakh_pangong.jpg",
    isPopular: true,
    seats: 10,
    bookedSeats: 6,
    tourType: "special",
    category: "domestic",
    departureDate: "2025-06-01T00:00:00.000Z",
    capacity: 15,
    returnDate: "2025-06-09T00:00:00.000Z",
    averageRating: 4.9,
    numReviews: 25,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Leh", description: "Acclimatization day", activities: "Rest and local walk" },
      { dayNumber: 2, title: "Leh sightseeing", description: "Leh Palace and monasteries", activities: "Cultural tour" },
      { dayNumber: 3, title: "Leh to Nubra Valley", description: "Khardung La pass", activities: "Mountain pass crossing" },
      { dayNumber: 4, title: "Nubra Valley", description: "Sand dunes and double humped camels", activities: "Camel safari" },
      { dayNumber: 5, title: "Nubra to Pangong", description: "Pangong Lake arrival", activities: "Lake exploration" },
      { dayNumber: 6, title: "Pangong Lake", description: "Full day at lake", activities: "Photography and hiking" },
      { dayNumber: 7, title: "Return to Leh", description: "Travel back to Leh", activities: "Last minute shopping" },
      { dayNumber: 8, title: "Departure", description: "Airport transfer", activities: "Departure" }
    ],
    inclusions: [
      { text: "All accommodation" },
      { text: "All meals" },
      { text: "Inner line permits" },
      { text: "Transport" }
    ],
    exclusions: [
      { text: "Airfare" },
      { text: "Personal expenses" },
      { text: "Additional activities" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264343/travel-website/tours/ladakh_pangong.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264343/travel-website/tours/nubra_valley.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264343/travel-website/tours/leh_palace.jpg" }
    ]
  },
  
  // Tour 6
  {
    title: "Andaman Island Escape",
    slug: "andaman-island-escape",
    state: "Andaman",
    country: "India",
    shortDescription: "Tropical paradise with pristine beaches and water sports.",
    overview: "Explore Havelock Island, Neil Island, Port Blair. Enjoy snorkeling, scuba diving, and cellular jail light show.",
    destination: "Andaman Islands",
    duration: 5,
    price: 28000,
    discount: 2000,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264344/travel-website/tours/andaman_beach.jpg",
    isPopular: false,
    seats: 12,
    bookedSeats: 4,
    tourType: "group",
    category: "domestic",
    departureDate: "2025-12-10T00:00:00.000Z",
    capacity: 20,
    returnDate: "2025-12-15T00:00:00.000Z",
    averageRating: 4.4,
    numReviews: 12,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Port Blair", description: "Cellular Jail light show", activities: "Light and sound show" },
      { dayNumber: 2, title: "Port Blair to Havelock", description: "Radhanagar Beach visit", activities: "Beach relaxation" },
      { dayNumber: 3, title: "Havelock Island", description: "Scuba diving and snorkeling", activities: "Water sports" },
      { dayNumber: 4, title: "Neil Island", description: "Natural bridge and beaches", activities: "Island exploration" },
      { dayNumber: 5, title: "Return to Port Blair", description: "Shopping and departure", activities: "Departure" }
    ],
    inclusions: [
      { text: "Island accommodation" },
      { text: "Breakfast" },
      { text: "Ferry transfers" },
      { text: "Snorkeling equipment" }
    ],
    exclusions: [
      { text: "Scuba diving" },
      { text: "Lunch and dinner" },
      { text: "Personal expenses" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264344/travel-website/tours/andaman_beach.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264344/travel-website/tours/havelock_island.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264344/travel-website/tours/andaman_scuba.jpg" }
    ]
  },

  // Tour 7
  {
    title: "Himachal Hills",
    slug: "himachal-hills",
    state: "Himachal Pradesh",
    country: "India",
    shortDescription: "Majestic mountains and hill stations.",
    overview: "Visit Shimla, Manali, Dharamshala, and Dalhousie. Experience toy train, snow points, and Tibetan culture.",
    destination: "Himachal Circuit",
    duration: 6,
    price: 19000,
    discount: 1000,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264345/travel-website/tours/manali_hills.jpg",
    isPopular: true,
    seats: 15,
    bookedSeats: 7,
    tourType: "group",
    category: "domestic",
    departureDate: "2025-04-15T00:00:00.000Z",
    capacity: 20,
    returnDate: "2025-04-21T00:00:00.000Z",
    averageRating: 4.5,
    numReviews: 16,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Shimla", description: "Mall Road walk", activities: "Local exploration" },
      { dayNumber: 2, title: "Shimla sightseeing", description: "Kufri and toy train", activities: "Toy train experience" },
      { dayNumber: 3, title: "Shimla to Manali", description: "Travel day", activities: "Scenic drive" },
      { dayNumber: 4, title: "Manali exploration", description: "Solang Valley and temples", activities: "Adventure activities" },
      { dayNumber: 5, title: "Manali to Dharamshala", description: "McLeod Ganj visit", activities: "Tibetan culture" },
      { dayNumber: 6, title: "Departure", description: "Airport transfer", activities: "Departure" }
    ],
    inclusions: [
      { text: "Hotel accommodation" },
      { text: "Breakfast" },
      { text: "All transfers" },
      { text: "Toy train ticket" }
    ],
    exclusions: [
      { text: "Adventure activities" },
      { text: "Lunch and dinner" },
      { text: "Personal expenses" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264345/travel-website/tours/manali_hills.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264345/travel-website/tours/shimla_toytrain.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264345/travel-website/tours/dharamshala_temple.jpg" }
    ]
  },

  // Tour 8
  {
    title: "Varanasi Spiritual Journey",
    slug: "varanasi-spiritual-journey",
    state: "Uttar Pradesh",
    country: "India",
    shortDescription: "Ancient spiritual capital on the banks of Ganges.",
    overview: "Ganga Aarti, boat rides, temple visits, and Sarnath excursion. Experience the spiritual essence of India.",
    destination: "Varanasi, Sarnath",
    duration: 3,
    price: 12000,
    discount: 500,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264346/travel-website/tours/varanasi_ghats.jpg",
    isPopular: false,
    seats: 20,
    bookedSeats: 5,
    tourType: "group",
    category: "domestic",
    departureDate: "2025-09-05T00:00:00.000Z",
    capacity: 25,
    returnDate: "2025-09-08T00:00:00.000Z",
    averageRating: 4.3,
    numReviews: 10,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Varanasi", description: "Evening Ganga Aarti", activities: "Spiritual ceremony" },
      { dayNumber: 2, title: "Morning boat ride", description: "Sunrise at Ganges", activities: "Boat ride and temple visits" },
      { dayNumber: 3, title: "Sarnath excursion", description: "Buddhist site visit", activities: "Historical exploration" }
    ],
    inclusions: [
      { text: "Hotel accommodation" },
      { text: "Breakfast" },
      { text: "Boat ride" },
      { text: "Temple entries" }
    ],
    exclusions: [
      { text: "Lunch and dinner" },
      { text: "Personal expenses" },
      { text: "Additional donations" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264346/travel-website/tours/varanasi_ghats.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264346/travel-website/tours/ganga_aarti.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264346/travel-website/tours/sarnath_temple.jpg" }
    ]
  },

  // Tour 9
  {
    title: "Mumbai to Goa Coastal Drive",
    slug: "mumbai-goa-coastal-drive",
    state: "Maharashtra, Goa",
    country: "India",
    shortDescription: "Scenic coastal road trip from Mumbai to Goa.",
    overview: "Drive through Konkan coast, visit beaches, forts, and enjoy local cuisine. Perfect for road trip enthusiasts.",
    destination: "Mumbai, Ratnagiri, Goa",
    duration: 5,
    price: 21000,
    discount: 1500,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264347/travel-website/tours/coastal_drive.jpg",
    isPopular: false,
    seats: 8,
    bookedSeats: 2,
    tourType: "special",
    category: "domestic",
    departureDate: "2025-11-15T00:00:00.000Z",
    capacity: 12,
    returnDate: "2025-11-20T00:00:00.000Z",
    averageRating: 4.6,
    numReviews: 8,
    itineraries: [
      { dayNumber: 1, title: "Mumbai to Alibaug", description: "Coastal drive start", activities: "Beach visit and fort exploration" },
      { dayNumber: 2, title: "Alibaug to Ganpatipule", description: "Temple and beach stop", activities: "Temple visit and relaxation" },
      { dayNumber: 3, title: "Ganpatipule to Malvan", description: "Sindhudurg Fort", activities: "Fort visit and water sports" },
      { dayNumber: 4, title: "Malvan to Goa", description: "Arrival in South Goa", activities: "Beach relaxation" },
      { dayNumber: 5, title: "Goa exploration", description: "Local sights and departure", activities: "Sightseeing and departure" }
    ],
    inclusions: [
      { text: "AC vehicle" },
      { text: "Fuel and tolls" },
      { text: "Hotel accommodation" },
      { text: "Breakfast" }
    ],
    exclusions: [
      { text: "Lunch and dinner" },
      { text: "Personal expenses" },
      { text: "Additional activities" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264347/travel-website/tours/coastal_drive.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264347/travel-website/tours/konkan_coast.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264347/travel-website/tours/sindhudurg_fort.jpg" }
    ]
  },

  // Tour 10
  {
    title: "Wildlife Safari Madhya Pradesh",
    slug: "wildlife-safari-madhya-pradesh",
    state: "Madhya Pradesh",
    country: "India",
    shortDescription: "Jungle safari and tiger spotting adventure.",
    overview: "Visit Bandhavgarh, Kanha, and Pench national parks. Jeep safaris, bird watching, and nature walks.",
    destination: "MP Wildlife Circuit",
    duration: 6,
    price: 27000,
    discount: 2000,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264348/travel-website/tours/tiger_safari.jpg",
    isPopular: true,
    seats: 10,
    bookedSeats: 4,
    tourType: "special",
    category: "domestic",
    departureDate: "2025-03-10T00:00:00.000Z",
    capacity: 15,
    returnDate: "2025-03-16T00:00:00.000Z",
    averageRating: 4.7,
    numReviews: 14,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Jabalpur", description: "Transfer to Bandhavgarh", activities: "Travel and resort check-in" },
      { dayNumber: 2, title: "Bandhavgarh safari", description: "Morning and evening jeep safari", activities: "Wildlife spotting" },
      { dayNumber: 3, title: "Bandhavgarh to Kanha", description: "Travel and evening safari", activities: "Safari experience" },
      { dayNumber: 4, title: "Kanha National Park", description: "Full day safari", activities: "Tiger tracking" },
      { dayNumber: 5, title: "Kanha to Pench", description: "Travel and relaxation", activities: "Nature walk" },
      { dayNumber: 6, title: "Pench safari and departure", description: "Morning safari and departure", activities: "Final safari and departure" }
    ],
    inclusions: [
      { text: "Jungle resort stay" },
      { text: "All meals" },
      { text: "Jeep safaris" },
      { text: "Naturalist guide" }
    ],
    exclusions: [
      { text: "Camera fees" },
      { text: "Personal expenses" },
      { text: "Additional safaris" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264348/travel-website/tours/tiger_safari.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264348/travel-website/tours/bandhavgarh_fort.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264348/travel-website/tours/kanha_forest.jpg" }
    ]
  },

  // Tour 11
  {
    title: "Bali Tropical Paradise",
    slug: "bali-tropical-paradise",
    state: null,
    country: "Indonesia",
    shortDescription: "Island of gods with beaches, temples and culture.",
    overview: "Visit Ubud, Seminyak, Uluwatu. Experience traditional dances, rice terraces, and beach clubs.",
    destination: "Bali, Indonesia",
    duration: 7,
    price: 45000,
    discount: 4000,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264349/travel-website/tours/bali_temple.jpg",
    isPopular: true,
    seats: 12,
    bookedSeats: 9,
    tourType: "group",
    category: "international",
    departureDate: "2025-07-01T00:00:00.000Z",
    capacity: 20,
    returnDate: "2025-07-08T00:00:00.000Z",
    averageRating: 4.8,
    numReviews: 30,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Denpasar", description: "Transfer to Seminyak", activities: "Beach relaxation" },
      { dayNumber: 2, title: "Uluwatu and Kecak dance", description: "Cliff temple and cultural show", activities: "Temple visit and dance" },
      { dayNumber: 3, title: "Ubud rice terraces", description: "Tegalalang and monkey forest", activities: "Nature and wildlife" },
      { dayNumber: 4, title: "Ubud cultural day", description: "Traditional arts and crafts", activities: "Art village visits" },
      { dayNumber: 5, title: "North Bali tour", description: "Water temples and lakes", activities: "Temple exploration" },
      { dayNumber: 6, title: "Beach club day", description: "Relaxation and sunset", activities: "Beach activities" },
      { dayNumber: 7, title: "Departure", description: "Airport transfer", activities: "Shopping and departure" }
    ],
    inclusions: [
      { text: "Hotel accommodation" },
      { text: "Breakfast" },
      { text: "All transfers" },
      { text: "Cultural show tickets" }
    ],
    exclusions: [
      { text: "Visa fees" },
      { text: "Lunch and dinner" },
      { text: "Personal expenses" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264349/travel-website/tours/bali_temple.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264349/travel-website/tours/ubud_rice.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264349/travel-website/tours/bali_beach.jpg" }
    ]
  },

  // Tour 12
  {
    title: "Thailand Cultural Tour",
    slug: "thailand-cultural-tour",
    state: null,
    country: "Thailand",
    shortDescription: "Temples, beaches, and vibrant street life.",
    overview: "Explore Bangkok, Pattaya, Phuket. Visit grand palace, floating markets, and enjoy Thai massage.",
    destination: "Thailand",
    duration: 6,
    price: 38000,
    discount: 3500,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264350/travel-website/tours/thailand_temple.jpg",
    isPopular: true,
    seats: 15,
    bookedSeats: 11,
    tourType: "group",
    category: "international",
    departureDate: "2025-08-15T00:00:00.000Z",
    capacity: 20,
    returnDate: "2025-08-21T00:00:00.000Z",
    averageRating: 4.6,
    numReviews: 25,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Bangkok", description: "Check-in and local market", activities: "Market exploration" },
      { dayNumber: 2, title: "Bangkok city tour", description: "Grand Palace and temples", activities: "Cultural sightseeing" },
      { dayNumber: 3, title: "Floating markets", description: "Damnoen Saduak market", activities: "Market experience" },
      { dayNumber: 4, title: "Bangkok to Pattaya", description: "Beach and nightlife", activities: "Beach activities" },
      { dayNumber: 5, title: "Pattaya to Phuket", description: "Island transfer", activities: "Travel and relaxation" },
      { dayNumber: 6, title: "Phuket exploration", description: "Island tour and departure", activities: "Island sights and departure" }
    ],
    inclusions: [
      { text: "Hotel accommodation" },
      { text: "Breakfast" },
      { text: "Domestic flights" },
      { text: "Sightseeing" }
    ],
    exclusions: [
      { text: "Visa fees" },
      { text: "Lunch and dinner" },
      { text: "Personal expenses" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264350/travel-website/tours/thailand_temple.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264350/travel-website/tours/floating_market.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264350/travel-website/tours/phuket_beach.jpg" }
    ]
  },

  // Tour 13
  {
    title: "Dubai Luxury Experience",
    slug: "dubai-luxury-experience",
    state: null,
    country: "UAE",
    shortDescription: "Ultimate luxury and modern architecture.",
    overview: "Burj Khalifa, Palm Jumeirah, desert safari, shopping malls, and luxury dining experiences.",
    destination: "Dubai, UAE",
    duration: 5,
    price: 52000,
    discount: 5000,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264351/travel-website/tours/dubai_skyline.jpg",
    isPopular: true,
    seats: 8,
    bookedSeats: 6,
    tourType: "private",
    category: "international",
    departureDate: "2025-11-20T00:00:00.000Z",
    capacity: 12,
    returnDate: "2025-11-25T00:00:00.000Z",
    averageRating: 4.9,
    numReviews: 18,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Dubai", description: "Dhow cruise dinner", activities: "Marina cruise" },
      { dayNumber: 2, title: "City tour", description: "Burj Khalifa and Dubai Mall", activities: "Modern architecture" },
      { dayNumber: 3, title: "Desert safari", description: "Dune bashing and cultural show", activities: "Adventure and culture" },
      { dayNumber: 4, title: "Palm Jumeirah", description: "Atlantis and waterpark", activities: "Luxury experience" },
      { dayNumber: 5, title: "Shopping and departure", description: "Gold souk and departure", activities: "Shopping and departure" }
    ],
    inclusions: [
      { text: "Luxury hotel" },
      { text: "Breakfast" },
      { text: "Burj Khalifa ticket" },
      { text: "Desert safari" }
    ],
    exclusions: [
      { text: "Visa fees" },
      { text: "Lunch and dinner" },
      { text: "Personal shopping" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264351/travel-website/tours/dubai_skyline.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264351/travel-website/tours/burj_khalifa.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264351/travel-website/tours/dubai_desert.jpg" }
    ]
  },

  // Tour 14
  {
    title: "Singapore City Tour",
    slug: "singapore-city-tour",
    state: null,
    country: "Singapore",
    shortDescription: "Garden city with futuristic attractions.",
    overview: "Marina Bay Sands, Sentosa Island, Gardens by the Bay, and Universal Studios.",
    destination: "Singapore",
    duration: 4,
    price: 35000,
    discount: 3000,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264352/travel-website/tours/singapore_gardens.jpg",
    isPopular: false,
    seats: 12,
    bookedSeats: 5,
    tourType: "group",
    category: "international",
    departureDate: "2025-10-05T00:00:00.000Z",
    capacity: 20,
    returnDate: "2025-10-09T00:00:00.000Z",
    averageRating: 4.5,
    numReviews: 15,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Singapore", description: "Gardens by the Bay", activities: "Garden exploration" },
      { dayNumber: 2, title: "Sentosa Island", description: "Universal Studios", activities: "Theme park" },
      { dayNumber: 3, title: "City tour", description: "Marina Bay and Orchard Road", activities: "Shopping and sights" },
      { dayNumber: 4, title: "Jurong Bird Park", description: "Wildlife and departure", activities: "Bird park and departure" }
    ],
    inclusions: [
      { text: "Hotel accommodation" },
      { text: "Breakfast" },
      { text: "Universal Studios ticket" },
      { text: "City tour" }
    ],
    exclusions: [
      { text: "Visa fees" },
      { text: "Lunch and dinner" },
      { text: "Personal expenses" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264352/travel-website/tours/singapore_gardens.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264352/travel-website/tours/marina_bay.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264352/travel-website/tours/sentosa_island.jpg" }
    ]
  },

  // Tour 15
  {
    title: "Maldives Honeymoon Special",
    slug: "maldives-honeymoon-special",
    state: null,
    country: "Maldives",
    shortDescription: "Private overwater bungalows and crystal clear waters.",
    overview: "Luxury resort stay, snorkeling, spa treatments, romantic dinners, and water villas.",
    destination: "Maldives",
    duration: 5,
    price: 68000,
    discount: 6000,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264353/travel-website/tours/maldives_resort.jpg",
    isPopular: true,
    seats: 6,
    bookedSeats: 4,
    tourType: "private",
    category: "international",
    departureDate: "2025-02-14T00:00:00.000Z",
    capacity: 10,
    returnDate: "2025-02-19T00:00:00.000Z",
    averageRating: 4.9,
    numReviews: 20,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Male", description: "Speedboat to resort", activities: "Resort check-in" },
      { dayNumber: 2, title: "Relaxation day", description: "Beach and pool", activities: "Water activities" },
      { dayNumber: 3, title: "Snorkeling adventure", description: "Coral reef exploration", activities: "Marine life" },
      { dayNumber: 4, title: "Spa and romance", description: "Couple spa treatment", activities: "Wellness and relaxation" },
      { dayNumber: 5, title: "Island hopping", description: "Local island visit", activities: "Cultural experience and departure" }
    ],
    inclusions: [
      { text: "Water villa" },
      { text: "All meals" },
      { text: "Speedboat transfer" },
      { text: "Spa treatment" }
    ],
    exclusions: [
      { text: "Airfare" },
      { text: "Additional activities" },
      { text: "Personal expenses" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264353/travel-website/tours/maldives_resort.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264353/travel-website/tours/overwater_villa.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264353/travel-website/tours/maldives_snorkeling.jpg" }
    ]
  },

  // Tour 16
  {
    title: "Europe Grand Tour",
    slug: "europe-grand-tour",
    state: null,
    country: "Multiple",
    shortDescription: "Classic European capitals and scenic countryside.",
    overview: "Visit Paris, Rome, Venice, Swiss Alps, and Amsterdam. Experience diverse cultures and historic sites.",
    destination: "France, Italy, Switzerland, Netherlands",
    duration: 12,
    price: 185000,
    discount: 15000,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264354/travel-website/tours/eiffel_tower.jpg",
    isPopular: true,
    seats: 10,
    bookedSeats: 7,
    tourType: "group",
    category: "international",
    departureDate: "2025-06-15T00:00:00.000Z",
    capacity: 15,
    returnDate: "2025-06-27T00:00:00.000Z",
    averageRating: 4.8,
    numReviews: 28,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Paris", description: "Eiffel Tower and Seine cruise", activities: "City introduction" },
      { dayNumber: 2, title: "Paris exploration", description: "Louvre and Champs-Élysées", activities: "Museum and shopping" },
      { dayNumber: 3, title: "Paris to Swiss Alps", description: "Travel to Switzerland", activities: "Scenic train ride" },
      { dayNumber: 4, title: "Jungfraujoch", description: "Top of Europe", activities: "Mountain experience" },
      { dayNumber: 5, title: "Lucerne and Zurich", description: "Swiss city tour", activities: "City exploration" },
      { dayNumber: 6, title: "Travel to Venice", description: "Italian adventure begins", activities: "Travel day" },
      { dayNumber: 7, title: "Venice canals", description: "Gondola ride and St. Mark's", activities: "Island exploration" },
      { dayNumber: 8, title: "Venice to Rome", description: "Travel to capital", activities: "High-speed train" },
      { dayNumber: 9, title: "Rome ancient sites", description: "Colosseum and Forum", activities: "Historical tour" },
      { dayNumber: 10, title: "Vatican City", description: "St. Peter's Basilica", activities: "Religious sites" },
      { dayNumber: 11, title: "Rome to Amsterdam", description: "Travel to Netherlands", activities: "Flight transfer" },
      { dayNumber: 12, title: "Amsterdam canals", description: "City tour and departure", activities: "Final exploration and departure" }
    ],
    inclusions: [
      { text: "4-star hotels" },
      { text: "Breakfast" },
      { text: "Intercity transport" },
      { text: "Sightseeing tours" }
    ],
    exclusions: [
      { text: "International airfare" },
      { text: "Lunch and dinner" },
      { text: "Visa fees" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264354/travel-website/tours/eiffel_tower.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264354/travel-website/tours/colosseum_rome.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264354/travel-website/tours/swiss_alps.jpg" }
    ]
  },

  // Tour 17
  {
    title: "Japan Cherry Blossom",
    slug: "japan-cherry-blossom",
    state: null,
    country: "Japan",
    shortDescription: "Spring cherry blossoms and traditional culture.",
    overview: "Tokyo, Kyoto, Osaka, Mount Fuji. Experience tea ceremonies, bullet trains, and ancient temples.",
    destination: "Japan",
    duration: 8,
    price: 125000,
    discount: 10000,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264355/travel-website/tours/japan_cherry.jpg",
    isPopular: true,
    seats: 8,
    bookedSeats: 5,
    tourType: "special",
    category: "international",
    departureDate: "2025-04-01T00:00:00.000Z",
    capacity: 12,
    returnDate: "2025-04-09T00:00:00.000Z",
    averageRating: 4.9,
    numReviews: 16,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Tokyo", description: "Shibuya and Shinjuku", activities: "Modern city exploration" },
      { dayNumber: 2, title: "Tokyo temples", description: "Sensoji and Meiji Shrine", activities: "Traditional culture" },
      { dayNumber: 3, title: "Mount Fuji day trip", description: "Five Lakes region", activities: "Natural beauty" },
      { dayNumber: 4, title: "Bullet train to Kyoto", description: "Travel experience", activities: "High-speed rail" },
      { dayNumber: 5, title: "Kyoto temples", description: "Kinkakuji and Fushimi Inari", activities: "Golden Pavilion and gates" },
      { dayNumber: 6, title: "Kyoto cultural day", description: "Tea ceremony and geisha district", activities: "Traditional arts" },
      { dayNumber: 7, title: "Osaka exploration", description: "Castle and street food", activities: "Historical and culinary" },
      { dayNumber: 8, title: "Departure from Osaka", description: "Airport transfer", activities: "Shopping and departure" }
    ],
    inclusions: [
      { text: "Hotel accommodation" },
      { text: "Breakfast" },
      { text: "Bullet train tickets" },
      { text: "Temple entries" }
    ],
    exclusions: [
      { text: "International airfare" },
      { text: "Lunch and dinner" },
      { text: "Visa fees" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264355/travel-website/tours/japan_cherry.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264355/travel-website/tours/mount_fuji.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264355/travel-website/tours/kyoto_temple.jpg" }
    ]
  },

  // Tour 18
  {
    title: "Australia Adventure",
    slug: "australia-adventure",
    state: null,
    country: "Australia",
    shortDescription: "Great Barrier Reef and Outback adventure.",
    overview: "Sydney Opera House, Great Barrier Reef, Blue Mountains, and wildlife encounters.",
    destination: "Australia",
    duration: 10,
    price: 195000,
    discount: 18000,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264356/travel-website/tours/sydney_opera.jpg",
    isPopular: false,
    seats: 10,
    bookedSeats: 3,
    tourType: "group",
    category: "international",
    departureDate: "2025-09-10T00:00:00.000Z",
    capacity: 15,
    returnDate: "2025-09-20T00:00:00.000Z",
    averageRating: 4.7,
    numReviews: 12,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Sydney", description: "Harbor cruise", activities: "Opera House views" },
      { dayNumber: 2, title: "Sydney city tour", description: "Bondi Beach and zoo", activities: "Beach and wildlife" },
      { dayNumber: 3, title: "Blue Mountains", description: "Three Sisters and scenic world", activities: "Mountain exploration" },
      { dayNumber: 4, title: "Fly to Cairns", description: "Great Barrier Reef base", activities: "Travel day" },
      { dayNumber: 5, title: "Great Barrier Reef", description: "Snorkeling and glass boat", activities: "Marine adventure" },
      { dayNumber: 6, title: "Daintree Rainforest", description: "Ancient rainforest", activities: "Eco tour" },
      { dayNumber: 7, title: "Fly to Melbourne", description: "Cultural capital", activities: "City transfer" },
      { dayNumber: 8, title: "Melbourne city", description: "Laneways and gardens", activities: "Urban exploration" },
      { dayNumber: 9, title: "Great Ocean Road", description: "Twelve Apostles", activities: "Coastal drive" },
      { dayNumber: 10, title: "Departure", description: "Airport transfer", activities: "Final shopping and departure" }
    ],
    inclusions: [
      { text: "Hotel accommodation" },
      { text: "Breakfast" },
      { text: "Domestic flights" },
      { text: "Reef tour" }
    ],
    exclusions: [
      { text: "International airfare" },
      { text: "Lunch and dinner" },
      { text: "Visa fees" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264356/travel-website/tours/sydney_opera.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264356/travel-website/tours/great_barrier_reef.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264356/travel-website/tours/twelve_apostles.jpg" }
    ]
  },

  // Tour 19
  {
    title: "Sri Lanka Pearl",
    slug: "sri-lanka-pearl",
    state: null,
    country: "Sri Lanka",
    shortDescription: "Tea plantations, ancient cities, and beaches.",
    overview: "Sigiriya Rock, Kandy, Nuwara Eliya tea estates, and Bentota beaches.",
    destination: "Sri Lanka",
    duration: 6,
    price: 32000,
    discount: 2500,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264357/travel-website/tours/sigiriya_rock.jpg",
    isPopular: false,
    seats: 12,
    bookedSeats: 4,
    tourType: "group",
    category: "international",
    departureDate: "2025-12-05T00:00:00.000Z",
    capacity: 20,
    returnDate: "2025-12-11T00:00:00.000Z",
    averageRating: 4.4,
    numReviews: 10,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Colombo", description: "Transfer to Negombo", activities: "Beach relaxation" },
      { dayNumber: 2, title: "Sigiriya Rock Fortress", description: "Ancient palace climb", activities: "Historical exploration" },
      { dayNumber: 3, title: "Kandy city", description: "Temple of Tooth", activities: "Cultural experience" },
      { dayNumber: 4, title: "Nuwara Eliya", description: "Tea plantations", activities: "Tea estate tour" },
      { dayNumber: 5, title: "Bentota beaches", description: "Coastal relaxation", activities: "Beach activities" },
      { dayNumber: 6, title: "Colombo and departure", description: "City tour and airport", activities: "Shopping and departure" }
    ],
    inclusions: [
      { text: "Hotel accommodation" },
      { text: "Breakfast" },
      { text: "All transfers" },
      { text: "Entrance fees" }
    ],
    exclusions: [
      { text: "Visa fees" },
      { text: "Lunch and dinner" },
      { text: "Personal expenses" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264357/travel-website/tours/sigiriya_rock.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264357/travel-website/tours/tea_plantations.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264357/travel-website/tours/bentota_beach.jpg" }
    ]
  },

  // Tour 20
  {
    title: "Vietnam Cultural Journey",
    slug: "vietnam-cultural-journey",
    state: null,
    country: "Vietnam",
    shortDescription: "Ancient towns, rice fields, and bustling cities.",
    overview: "Halong Bay cruise, Hoi An ancient town, Hanoi, and Ho Chi Minh City.",
    destination: "Vietnam",
    duration: 7,
    price: 42000,
    discount: 3500,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264358/travel-website/tours/halong_bay.jpg",
    isPopular: true,
    seats: 10,
    bookedSeats: 6,
    tourType: "group",
    category: "international",
    departureDate: "2025-03-20T00:00:00.000Z",
    capacity: 15,
    returnDate: "2025-03-27T00:00:00.000Z",
    averageRating: 4.6,
    numReviews: 14,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Hanoi", description: "Old Quarter exploration", activities: "City introduction" },
      { dayNumber: 2, title: "Hanoi city tour", description: "Temples and museums", activities: "Cultural sightseeing" },
      { dayNumber: 3, title: "Halong Bay cruise", description: "Overnight on junk boat", activities: "Bay exploration" },
      { dayNumber: 4, title: "Halong to Hoi An", description: "Travel day", activities: "Flight to central Vietnam" },
      { dayNumber: 5, title: "Hoi An ancient town", description: "Japanese bridge and lanterns", activities: "Historical tour" },
      { dayNumber: 6, title: "Ho Chi Minh City", description: "War remnants and markets", activities: "Modern history" },
      { dayNumber: 7, title: "Mekong Delta", description: "River life and departure", activities: "Delta tour and departure" }
    ],
    inclusions: [
      { text: "Hotel accommodation" },
      { text: "Breakfast" },
      { text: "Halong Bay cruise" },
      { text: "Domestic flights" }
    ],
    exclusions: [
      { text: "Visa fees" },
      { text: "Lunch and dinner" },
      { text: "Personal expenses" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264358/travel-website/tours/halong_bay.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264358/travel-website/tours/hoi_an_town.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264358/travel-website/tours/mekong_delta.jpg" }
    ]
  },

  // Tour 21
  {
    title: "Bhutan Happiness Tour",
    slug: "bhutan-happiness-tour",
    state: null,
    country: "Bhutan",
    shortDescription: "Last Himalayan kingdom with pristine nature.",
    overview: "Paro Taktsang, Thimphu, Punakha Dzong. Experience Buddhist culture and mountain landscapes.",
    destination: "Bhutan",
    duration: 5,
    price: 38000,
    discount: 3000,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264359/travel-website/tours/tigers_nest.jpg",
    isPopular: false,
    seats: 8,
    bookedSeats: 2,
    tourType: "special",
    category: "international",
    departureDate: "2025-05-10T00:00:00.000Z",
    capacity: 12,
    returnDate: "2025-05-15T00:00:00.000Z",
    averageRating: 4.7,
    numReviews: 9,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Paro", description: "Transfer to Thimphu", activities: "Capital city exploration" },
      { dayNumber: 2, title: "Thimphu sights", description: "Buddha Dordenma and dzong", activities: "Cultural tour" },
      { dayNumber: 3, title: "Thimphu to Punakha", description: "Dochula Pass and dzong", activities: "Mountain pass and fortress" },
      { dayNumber: 4, title: "Tiger's Nest hike", description: "Paro Taktsang monastery", activities: "Mountain hike" },
      { dayNumber: 5, title: "Departure from Paro", description: "Airport transfer", activities: "Final shopping and departure" }
    ],
    inclusions: [
      { text: "Hotel accommodation" },
      { text: "All meals" },
      { text: "Tourist visa" },
      { text: "Guide and transport" }
    ],
    exclusions: [
      { text: "Airfare" },
      { text: "Personal expenses" },
      { text: "Additional activities" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264359/travel-website/tours/tigers_nest.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264359/travel-website/tours/punakha_dzong.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264359/travel-website/tours/bhutan_valley.jpg" }
    ]
  },

  // Tour 22
  {
    title: "Nepal Himalayan Trek",
    slug: "nepal-himalayan-trek",
    state: null,
    country: "Nepal",
    shortDescription: "Trekking in the lap of Himalayas.",
    overview: "Kathmandu, Pokhara, Annapurna base camp trek. Experience mountain views and local culture.",
    destination: "Nepal",
    duration: 8,
    price: 28000,
    discount: 2000,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264360/travel-website/tours/annapurna_trek.jpg",
    isPopular: true,
    seats: 12,
    bookedSeats: 8,
    tourType: "special",
    category: "international",
    departureDate: "2025-10-01T00:00:00.000Z",
    capacity: 15,
    returnDate: "2025-10-09T00:00:00.000Z",
    averageRating: 4.8,
    numReviews: 22,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Kathmandu", description: "City orientation", activities: "Temple visits" },
      { dayNumber: 2, title: "Kathmandu to Pokhara", description: "Travel to trek start", activities: "Scenic drive" },
      { dayNumber: 3, title: "Trek to Ghandruk", description: "First day of trekking", activities: "Mountain village" },
      { dayNumber: 4, title: "Trek to Chhomrong", description: "River crossings", activities: "Mountain trails" },
      { dayNumber: 5, title: "Trek to Deurali", description: "Alpine forests", activities: "High altitude" },
      { dayNumber: 6, title: "Annapurna Base Camp", description: "Summit views", activities: "Base camp achievement" },
      { dayNumber: 7, title: "Return to Pokhara", description: "Trek completion", activities: "Celebration and rest" },
      { dayNumber: 8, title: "Departure from Kathmandu", description: "Airport transfer", activities: "Final day and departure" }
    ],
    inclusions: [
      { text: "Trekking permits" },
      { text: "Guide and porter" },
      { text: "Teahouse accommodation" },
      { text: "All meals during trek" }
    ],
    exclusions: [
      { text: "International airfare" },
      { text: "Personal equipment" },
      { text: "Travel insurance" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264360/travel-website/tours/annapurna_trek.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264360/travel-website/tours/kathmandu_temple.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264360/travel-website/tours/pokhara_lake.jpg" }
    ]
  },

  // Tour 23
  {
    title: "Egypt Historical Tour",
    slug: "egypt-historical-tour",
    state: null,
    country: "Egypt",
    shortDescription: "Ancient pyramids and Nile cruise.",
    overview: "Pyramids of Giza, Sphinx, Luxor, Karnak Temple, and Nile river cruise.",
    destination: "Egypt",
    duration: 7,
    price: 65000,
    discount: 5000,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264361/travel-website/tours/egypt_pyramids.jpg",
    isPopular: true,
    seats: 10,
    bookedSeats: 7,
    tourType: "group",
    category: "international",
    departureDate: "2025-11-10T00:00:00.000Z",
    capacity: 15,
    returnDate: "2025-11-17T00:00:00.000Z",
    averageRating: 4.7,
    numReviews: 19,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Cairo", description: "Nile dinner cruise", activities: "River introduction" },
      { dayNumber: 2, title: "Giza Pyramids", description: "Sphinx and solar boat", activities: "Ancient wonders" },
      { dayNumber: 3, title: "Egyptian Museum", description: "Tutankhamun treasures", activities: "Historical artifacts" },
      { dayNumber: 4, title: "Fly to Luxor", description: "East and West Bank", activities: "Valley of Kings" },
      { dayNumber: 5, title: "Nile cruise", description: "Temples along river", activities: "River journey" },
      { dayNumber: 6, title: "Aswan sights", description: "Philae Temple and dam", activities: "Nile exploration" },
      { dayNumber: 7, title: "Return to Cairo", description: "Final shopping and departure", activities: "Khan el-Khalili and departure" }
    ],
    inclusions: [
      { text: "Nile cruise" },
      { text: "All meals on cruise" },
      { text: "Domestic flights" },
      { text: "Entrance fees" }
    ],
    exclusions: [
      { text: "International airfare" },
      { text: "Visa fees" },
      { text: "Personal expenses" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264361/travel-website/tours/egypt_pyramids.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264361/travel-website/tours/nile_cruise.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264361/travel-website/tours/luxor_temple.jpg" }
    ]
  },

  // Tour 24
  {
    title: "Turkey Cultural Fusion",
    slug: "turkey-cultural-fusion",
    state: null,
    country: "Turkey",
    shortDescription: "Where East meets West with rich history.",
    overview: "Istanbul, Cappadocia, Pamukkale, Ephesus. Hot air balloons and ancient ruins.",
    destination: "Turkey",
    duration: 8,
    price: 58000,
    discount: 4500,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264362/travel-website/tours/cappadocia_balloons.jpg",
    isPopular: true,
    seats: 12,
    bookedSeats: 9,
    tourType: "group",
    category: "international",
    departureDate: "2025-07-15T00:00:00.000Z",
    capacity: 20,
    returnDate: "2025-07-23T00:00:00.000Z",
    averageRating: 4.8,
    numReviews: 24,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Istanbul", description: "Bosphorus cruise", activities: "City introduction" },
      { dayNumber: 2, title: "Istanbul old city", description: "Hagia Sophia and Blue Mosque", activities: "Historical tour" },
      { dayNumber: 3, title: "Fly to Cappadocia", description: "Underground city", activities: "Cave exploration" },
      { dayNumber: 4, title: "Cappadocia balloons", description: "Hot air balloon ride", activities: "Sunset experience" },
      { dayNumber: 5, title: "Pamukkale travertines", description: "Cotton castle terraces", activities: "Natural pools" },
      { dayNumber: 6, title: "Ephesus ancient city", description: "Roman ruins", activities: "Archaeological site" },
      { dayNumber: 7, title: "Return to Istanbul", description: "Grand Bazaar", activities: "Shopping and culture" },
      { dayNumber: 8, title: "Departure", description: "Airport transfer", activities: "Final exploration and departure" }
    ],
    inclusions: [
      { text: "Hotel accommodation" },
      { text: "Breakfast" },
      { text: "Domestic flights" },
      { text: "Hot air balloon" }
    ],
    exclusions: [
      { text: "International airfare" },
      { text: "Lunch and dinner" },
      { text: "Visa fees" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264362/travel-website/tours/cappadocia_balloons.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264362/travel-website/tours/hagia_sophia.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264362/travel-website/tours/pamukkale_pools.jpg" }
    ]
  },

  // Tour 25
  {
    title: "South Africa Safari",
    slug: "south-africa-safari",
    state: null,
    country: "South Africa",
    shortDescription: "Big Five wildlife and scenic beauty.",
    overview: "Kruger National Park, Cape Town, Table Mountain, and Garden Route.",
    destination: "South Africa",
    duration: 9,
    price: 89000,
    discount: 8000,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264363/travel-website/tours/kruger_safari.jpg",
    isPopular: false,
    seats: 8,
    bookedSeats: 3,
    tourType: "special",
    category: "international",
    departureDate: "2025-08-01T00:00:00.000Z",
    capacity: 12,
    returnDate: "2025-08-10T00:00:00.000Z",
    averageRating: 4.9,
    numReviews: 11,
    itineraries: [
      { dayNumber: 1, title: "Arrival in Johannesburg", description: "City orientation", activities: "Urban exploration" },
      { dayNumber: 2, title: "Kruger National Park", description: "Safari lodge check-in", activities: "Evening game drive" },
      { dayNumber: 3, title: "Kruger safari", description: "Big Five tracking", activities: "Full day safari" },
      { dayNumber: 4, title: "Fly to Cape Town", description: "Table Mountain", activities: "Cable car and views" },
      { dayNumber: 5, title: "Cape Peninsula", description: "Cape of Good Hope", activities: "Coastal drive" },
      { dayNumber: 6, title: "Winelands tour", description: "Stellenbosch vineyards", activities: "Wine tasting" },
      { dayNumber: 7, title: "Garden Route start", description: "Tsitsikamma Forest", activities: "Nature walks" },
      { dayNumber: 8, title: "Garden Route", description: "Knysna and Plettenberg", activities: "Coastal exploration" },
      { dayNumber: 9, title: "Departure from Cape Town", description: "Airport transfer", activities: "Final safari memories and departure" }
    ],
    inclusions: [
      { text: "Safari lodge" },
      { text: "All game drives" },
      { text: "Domestic flights" },
      { text: "Wine tasting" }
    ],
    exclusions: [
      { text: "International airfare" },
      { text: "Visa fees" },
      { text: "Personal expenses" }
    ],
    images: [
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264363/travel-website/tours/kruger_safari.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264363/travel-website/tours/table_mountain.jpg" },
      { imageUrl: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264363/travel-website/tours/garden_route.jpg" }
    ]
  }
];



const seedTours = async () => {
  try {
    console.log('🔗 Connecting to database...');
    await db.authenticate();
    console.log('✅ Database connected successfully!');

    console.log('🔄 Syncing models...');
    await Tour.sync({ force: false });
    await Itinerary.sync({ force: false });
    await Inclusion.sync({ force: false });
    await Exclusion.sync({ force: false });
    await TourImage.sync({ force: false });
    console.log('✅ All models synced!');

    console.log('🌱 Starting to seed tours with related data...');
    
    let createdCount = 0;
    let skippedCount = 0;

    for (const tourData of tours) {
      try {
        // Check if tour already exists
        const existingTour = await Tour.findOne({
          where: { slug: tourData.slug }
        });

        if (!existingTour) {
          // Create tour
          const tour = await Tour.create(tourData);
          
          // Create related data
          if (tourData.itineraries && tourData.itineraries.length > 0) {
            await Itinerary.bulkCreate(
              tourData.itineraries.map(itinerary => ({ ...itinerary, tourId: tour.id }))
            );
          }
          
          if (tourData.inclusions && tourData.inclusions.length > 0) {
            await Inclusion.bulkCreate(
              tourData.inclusions.map(inclusion => ({ ...inclusion, tourId: tour.id }))
            );
          }
          
          if (tourData.exclusions && tourData.exclusions.length > 0) {
            await Exclusion.bulkCreate(
              tourData.exclusions.map(exclusion => ({ ...exclusion, tourId: tour.id }))
            );
          }
          
          if (tourData.images && tourData.images.length > 0) {
            await TourImage.bulkCreate(
              tourData.images.map(image => ({ ...image, tourId: tour.id }))
            );
          }
          
          createdCount++;
          console.log(`✅ Created: ${tourData.title} with all related data`);
        } else {
          skippedCount++;
          console.log(`⏭️ Skipped (already exists): ${tourData.title}`);
        }
      } catch (tourError) {
        console.error(`❌ Error creating tour ${tourData.title}:`, tourError.message);
      }
    }

    console.log(`\n🎉 Seeding completed!`);
    console.log(`📊 Created: ${createdCount} new tours with related data`);
    console.log(`⏭️ Skipped: ${skippedCount} existing tours`);
    console.log(`📈 Total in database: ${createdCount + skippedCount} tours`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run the seeder
seedTours();