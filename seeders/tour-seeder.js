import { QueryTypes } from 'sequelize';
import db from '../config/db.js';


const tours = [
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
    numReviews: 15
  },
  {
    title: "Kashmir Paradise",
    slug: "kashmir-paradise",
    state: "Jammu & Kashmir",
    country: "India",
    shortDescription: "Experience the heaven on earth with stunning landscapes.",
    overview: "Visit Dal Lake, Gulmarg, Pahalgam, and Sonamarg. Enjoy shikara rides, gondola rides, and beautiful Mughal gardens.",
    destination: "Srinagar, Gulmarg, Pahalgam",
    duration: 6,
    price: 25000,
    discount: 2000,
    coverImage: "https://res.cloudinary.com/dng4mdlgp/image/upload/v1761264340/travel-website/tours/kashmir_dal_lake.jpg",
    isPopular: true,
    seats: 15,
    bookedSeats: 8,
    tourType: "group",
    category: "domestic",
    departureDate: "2025-05-15T00:00:00.000Z",
    capacity: 20,
    returnDate: "2025-05-21T00:00:00.000Z",
    averageRating: 4.8,
    numReviews: 22
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
    numReviews: 18
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
    numReviews: 20
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
    numReviews: 25
  },
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
    numReviews: 12
  },
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
    numReviews: 16
  },
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
    numReviews: 10
  },
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
    numReviews: 8
  },
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
    numReviews: 14
  },
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
    numReviews: 30
  },
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
    numReviews: 25
  },
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
    numReviews: 18
  },
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
    numReviews: 15
  },
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
    numReviews: 20
  },
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
    numReviews: 28
  },
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
    numReviews: 16
  },
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
    numReviews: 12
  },
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
    numReviews: 10
  },
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
    numReviews: 14
  },
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
    numReviews: 9
  },
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
    numReviews: 22
  },
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
    numReviews: 19
  },
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
    numReviews: 24
  },
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
    numReviews: 11
  }
];

const TourSeeder = {
  up: async () => {
    try {
      console.log('Starting tour seeder...');
      
      for (const tourData of tours) {
        // Check if tour already exists
        const existingTour = await db.query(
          'SELECT id FROM Tours WHERE slug = ?',
          {
            replacements: [tourData.slug],
            type: QueryTypes.SELECT
          }
        );

        if (existingTour.length === 0) {
          await db.query(
            `INSERT INTO Tours (
              title, slug, state, country, shortDescription, overview, destination,
              duration, price, discount, coverImage, isPopular, seats, bookedSeats,
              tourType, category, departureDate, capacity, returnDate, averageRating,
              numReviews, createdAt, updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            {
              replacements: [
                tourData.title,
                tourData.slug,
                tourData.state,
                tourData.country,
                tourData.shortDescription,
                tourData.overview,
                tourData.destination,
                tourData.duration,
                tourData.price,
                tourData.discount,
                tourData.coverImage,
                tourData.isPopular,
                tourData.seats,
                tourData.bookedSeats,
                tourData.tourType,
                tourData.category,
                tourData.departureDate,
                tourData.capacity,
                tourData.returnDate,
                tourData.averageRating,
                tourData.numReviews
              ]
            }
          );
          console.log(`✓ Added tour: ${tourData.title}`);
        } else {
          console.log(`⏭️  Skipped existing tour: ${tourData.title}`);
        }
      }
      
      console.log('✅ Tour seeder completed successfully!');
    } catch (error) {
      console.error('❌ Error in tour seeder:', error);
      throw error;
    }
  },

  down: async () => {
    try {
      console.log('Rolling back tour data...');
      await db.query('DELETE FROM Tours');
      console.log('✅ Tour data rolled back successfully!');
    } catch (error) {
      console.error('❌ Error rolling back tour data:', error);
      throw error;
    }
  }
};

const seedTours = async () => {
  try {
    console.log('🔗 Connecting to database...');
    await db.authenticate();
    console.log('✅ Database connected successfully!');

    // Sync the Tour model with database
    console.log('🔄 Syncing Tour model...');
    await Tour.sync({ force: false });
    console.log('✅ Tour model synced!');

    console.log('🌱 Starting to seed tours...');
    
    let createdCount = 0;
    let skippedCount = 0;

    for (const tourData of tours) {
      try {
        // Check if tour already exists
        const existingTour = await Tour.findOne({
          where: { slug: tourData.slug }
        });

        if (!existingTour) {
          await Tour.create(tourData);
          createdCount++;
          console.log(`✅ Created: ${tourData.title}`);
        } else {
          skippedCount++;
          console.log(`⏭️ Skipped (already exists): ${tourData.title}`);
        }
      } catch (tourError) {
        console.error(`❌ Error creating tour ${tourData.title}:`, tourError.message);
      }
    }

    console.log(`\n🎉 Seeding completed!`);
    console.log(`📊 Created: ${createdCount} new tours`);
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

export default TourSeeder;
