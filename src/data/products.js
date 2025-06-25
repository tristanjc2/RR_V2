// TODO: Replace with your own product data and images
const products = [
  // Flower
  {
    id: 1,
    name: "Zen OG Kush",
    category: "Flower",
    subcategory: "Indica",
    description: "A relaxing indica-dominant hybrid for ultimate chill.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    price: 39.99,
    thc: 22,
    cbd: 1,
    effects: "Relaxed, Happy, Sleepy",
    usage: "Evening, Stress Relief",
    reviews: ["Smooth and mellow.", "Perfect for winding down."]
  },
  {
    id: 2,
    name: "GreenDream Sativa",
    category: "Flower",
    subcategory: "Sativa",
    description: "Energizing sativa for creativity and focus.",
    image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80",
    price: 42.99,
    thc: 19,
    cbd: 2,
    effects: "Euphoric, Uplifted, Creative",
    usage: "Daytime, Social",
    reviews: ["Great for daytime use!", "Keeps me focused."]
  },
  {
    id: 3,
    name: "Purple Haze Hybrid",
    category: "Flower",
    subcategory: "Hybrid",
    description: "Balanced hybrid for a mellow, creative high.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    price: 41.99,
    thc: 20,
    cbd: 1,
    effects: "Creative, Relaxed, Happy",
    usage: "Anytime, Social",
    reviews: ["Nice balanced effects.", "Great for hanging out."]
  },
  // Concentrates
  {
    id: 4,
    name: "Golden Shatter",
    category: "Concentrate",
    subcategory: "Shatter",
    description: "Potent shatter concentrate for experienced users.",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    price: 54.99,
    thc: 78,
    cbd: 0,
    effects: "Euphoric, Uplifted, Intense",
    usage: "Evening, High Tolerance",
    reviews: ["Super strong!", "Great for dabbing."]
  },
  {
    id: 5,
    name: "Terpene Badder",
    category: "Concentrate",
    subcategory: "Badder",
    description: "Smooth badder with rich terpene profile.",
    image: "https://images.unsplash.com/photo-1524594154908-eddc8b2b8b99?auto=format&fit=crop&w=400&q=80",
    price: 59.99,
    thc: 72,
    cbd: 0,
    effects: "Flavorful, Relaxed, Happy",
    usage: "Anytime, Flavor Chasers",
    reviews: ["Best taste ever!", "Smooth and flavorful."]
  },
  {
    id: 6,
    name: "Live Resin Terps",
    category: "Concentrate",
    subcategory: "Terps",
    description: "Live resin concentrate packed with terpenes.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    price: 62.99,
    thc: 70,
    cbd: 0,
    effects: "Euphoric, Uplifted, Flavorful",
    usage: "Daytime, Terp Lovers",
    reviews: ["Amazing aroma!", "Great for flavor."]
  },
  // Edibles
  {
    id: 7,
    name: "Classic Pot Brownie",
    category: "Edible",
    subcategory: "Brownie",
    description: "Rich chocolate brownie infused with premium cannabis.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    price: 14.99,
    thc: 25,
    cbd: 0,
    effects: "Relaxed, Sleepy, Happy",
    usage: "Evening, Dessert",
    reviews: ["Delicious and effective.", "Perfect for dessert."]
  },
  {
    id: 8,
    name: "Canna Cookies",
    category: "Edible",
    subcategory: "Cookie",
    description: "Fresh baked cookies with a mellow cannabis kick.",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    price: 12.99,
    thc: 15,
    cbd: 0,
    effects: "Relaxed, Happy, Uplifted",
    usage: "Anytime, Snack",
    reviews: ["Yummy!", "Nice buzz."]
  },
  {
    id: 9,
    name: "Infused Lemonade",
    category: "Edible",
    subcategory: "Drink",
    description: "Refreshing lemonade infused with cannabis extract.",
    image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
    price: 9.99,
    thc: 10,
    cbd: 0,
    effects: "Uplifted, Refreshed, Social",
    usage: "Daytime, Refreshment",
    reviews: ["So tasty!", "Perfect for summer."]
  }
];

export default products;
