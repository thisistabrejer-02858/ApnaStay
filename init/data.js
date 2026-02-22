const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy beach access.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b" },
    price: 1500,
    location: "Malibu",
    country: "United States",
    address: "123 Ocean Drive, Malibu, CA 90265",
    category: "Trending",
    whatsapp: "917307417660"
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    price: 1200,
    location: "New York City",
    country: "United States",
    address: "45 Broadway St, Manhattan, NY 10004",
    category: "Rooms",
    whatsapp: "917307417660"
  },
  {
    title: "Modern Studio in South Delhi",
    description: "A stylish studio apartment near cafes and metro stations.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267" },
    price: 2200,
    location: "New Delhi",
    country: "India",
    address: "Flat 204, Lajpat Nagar II, South Delhi 110024",
    category: "Rooms",
    whatsapp: "917307417660"
  },
  {
    title: "Beachside Apartment in Goa",
    description: "Relax in this cozy apartment minutes away from the beach.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85" },
    price: 3000,
    location: "Goa",
    country: "India",
    address: "House No. 17, Calangute Beach Road, Goa 403516",
    category: "Amazing Pools",
    whatsapp: "917307417660"
  },
  {
    title: "Luxury Flat in Bandra",
    description: "Premium apartment with modern amenities in Mumbai.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae" },
    price: 4500,
    location: "Mumbai",
    country: "India",
    address: "Flat 12B, Linking Road, Bandra West, Mumbai 400050",
    category: "Trending",
    whatsapp: "917307417660"
  },
  {
    title: "Hill View Cottage",
    description: "Peaceful cottage with scenic mountain views.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1" },
    price: 1800,
    location: "Shimla",
    country: "India",
    address: "Mall Road Extension, Shimla 171001",
    category: "Camping",
    whatsapp: "917307417660"
  },
  {
    title: "Riverside Homestay",
    description: "Calm homestay near the river with beautiful surroundings.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2" },
    price: 1500,
    location: "Rishikesh",
    country: "India",
    address: "Ganga View Colony, Tapovan, Rishikesh 249192",
    category: "Farms",
    whatsapp: "917307417660"
  },
  {
    title: "IT Hub Apartment",
    description: "Fully furnished apartment near major IT parks.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb" },
    price: 2600,
    location: "Bengaluru",
    country: "India",
    address: "Tech Park Lane, Whitefield, Bengaluru 560066",
    category: "Rooms",
    whatsapp: "917307417660"
  },
  {
    title: "Heritage Haveli Stay",
    description: "Experience royal living in this Rajasthani haveli.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
    price: 3500,
    location: "Jaipur",
    country: "India",
    address: "Hawa Mahal Road, Pink City, Jaipur 302002",
    category: "Castle",
    whatsapp: "917307417660"
  },
  {
    title: "Lake View Apartment",
    description: "Apartment overlooking a peaceful lake.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" },
    price: 2400,
    location: "Udaipur",
    country: "India",
    address: "Fateh Sagar Lake Road, Udaipur 313001",
    category: "Iconic Cities",
    whatsapp: "917307417660"
  },
  {
    title: "City Center Studio",
    description: "Modern studio ideal for professionals.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1554995207-c18c203602cb" },
    price: 2000,
    location: "Pune",
    country: "India",
    address: "MG Road, Camp Area, Pune 411001",
    category: "Rooms",
    whatsapp: "917307417660"
  },
  {
    title: "Backwater Villa",
    description: "Traditional villa surrounded by Kerala backwaters.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12" },
    price: 3200,
    location: "Alleppey",
    country: "India",
    address: "Near Vembanad Lake, Alleppey 688001",
    category: "Trending",
    whatsapp: "917307417660"
  },
  {
    title: "Desert View Resort",
    description: "Experience desert life with modern comfort.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" },
    price: 2800,
    location: "Jaisalmer",
    country: "India",
    address: "Sam Sand Dunes Road, Jaisalmer 345001",
    category: "Camping",
    whatsapp: "917307417660"
  },
  {
    title: "Premium Apartment Near Airport",
    description: "Comfortable stay near the airport.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae" },
    price: 2900,
    location: "Hyderabad",
    country: "India",
    address: "Rajiv Gandhi Intl Airport Road, Hyderabad 500409",
    category: "Rooms",
    whatsapp: "917307417660"
  },
  {
    title: "Eco-friendly Farm Stay",
    description: "Organic farm stay offering greenery and peace.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6" },
    price: 1400,
    location: "Coorg",
    country: "India",
    address: "Madikeri Road, Coorg 571201",
    category: "Farms",
    whatsapp: "917307417660"
  },
  {
    title: "City Lights Apartment",
    description: "High-rise apartment with stunning city views.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1494526585095-c41746248156" },
    price: 3300,
    location: "Gurugram",
    country: "India",
    address: "DLF Cyber City, Gurugram 122002",
    category: "Trending",
    whatsapp: "917307417660"
  },
  {
    title: "Cultural Stay Near Temple",
    description: "Traditional home near famous temples.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1554995207-c18c203602cb" },
    price: 1600,
    location: "Varanasi",
    country: "India",
    address: "Dashashwamedh Ghat Road, Varanasi 221001",
    category: "Iconic Cities",
    whatsapp: "917307417660"
  },
  {
    title: "Seaside Guest House",
    description: "Relaxing guest house with sea breeze.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85" },
    price: 2100,
    location: "Pondicherry",
    country: "India",
    address: "Beach Promenade, White Town, Pondicherry 605001",
    category: "Boats",
    whatsapp: "917307417660"
  },
  {
    title: "Smart Home Apartment",
    description: "Modern smart apartment with automation.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2" },
    price: 2700,
    location: "Noida",
    country: "India",
    address: "Sector 62, Noida 201309",
    category: "Rooms",
    whatsapp: "917307417660"
  },
  {
    title: "Green Valley Cottage",
    description: "Cottage surrounded by lush greenery.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1" },
    price: 1900,
    location: "Ooty",
    country: "India",
    address: "Nilgiri Hills Road, Ooty 643001",
    category: "Camping",
    whatsapp: "917307417660"
  },
  {
    title: "Urban Comfort Suite",
    description: "Spacious suite offering city comfort.",
    images: { filename: "listingimage", url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267" },
    price: 2500,
    location: "Chandigarh",
    country: "India",
    address: "Sector 17 Plaza, Chandigarh 160017",
    category: "Rooms",
    whatsapp: "917307417660"
  }
];

module.exports = sampleListings;