// ============================================================
// Verge Wellness — content data
// ------------------------------------------------------------
// Each product/post/category may include an optional `image`
// field. When set, put the file in `src/assets/` and import it,
// or reference a file in `public/images/...` with an absolute
// path. See README "Adding real images". When `image` is
// omitted, the themed gradient placeholder (`media`) is used.
// ============================================================

export const NAV = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About Us", to: "/about" },
  { label: "Our Benefits", to: "/benefits" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const PRODUCTS = {
  powders: [
    {
      name: "Moringa Leaf Powder",
      price: 149,
      rating: 5,
      reviews: 24,
      media: "photo--powder",
    },
    {
      name: "Ashwagandha Powder",
      price: 179,
      rating: 4,
      reviews: 18,
      media: "photo--powder",
    },
    {
      name: "Soursop Leaf Powder",
      price: 169,
      rating: 5,
      reviews: 16,
      media: "photo--powder",
    },
    {
      name: "Neem Leaf Powder",
      price: 149,
      rating: 4,
      reviews: 12,
      media: "photo--powder",
    },
    {
      name: "Karela Powder",
      price: 159,
      rating: 4,
      reviews: 10,
      media: "photo--powder",
    },
    {
      name: "Sea Moss Powder",
      price: 199,
      rating: 5,
      reviews: 14,
      media: "photo--powder",
    },
    {
      name: "Herbal Blend (Immunity Boost)",
      price: 189,
      rating: 4,
      reviews: 9,
      media: "photo--powder",
    },
    {
      name: "Spirulina Powder",
      price: 179,
      rating: 5,
      reviews: 11,
      media: "photo--leaves",
    },
    {
      name: "Chlorella Powder",
      price: 169,
      rating: 4,
      reviews: 8,
      media: "photo--leaves",
    },
    {
      name: "Superfood Blend",
      price: 219,
      rating: 5,
      reviews: 7,
      media: "photo--powder",
    },
  ],
  capsules: [
    {
      name: "Ashwagandha Capsules",
      price: 179,
      rating: 5,
      reviews: 15,
      media: "photo--oil",
    },
    {
      name: "Moringa Capsules",
      price: 159,
      rating: 4,
      reviews: 12,
      media: "photo--oil",
    },
    {
      name: "Soursop Leaf Capsules",
      price: 159,
      rating: 5,
      reviews: 9,
      media: "photo--oil",
    },
    {
      name: "Neem Leaf Capsules",
      price: 149,
      rating: 4,
      reviews: 10,
      media: "photo--oil",
    },
    {
      name: "Karela Capsules",
      price: 149,
      rating: 5,
      reviews: 8,
      media: "photo--oil",
    },
  ],
  skincare: [
    {
      name: "Skin Glow Face Oil",
      price: 299,
      rating: 5,
      reviews: 14,
      media: "photo--oil",
    },
    {
      name: "Nourishing Body Butter",
      price: 249,
      rating: 4,
      reviews: 9,
      media: "photo--oil",
    },
    {
      name: "Hair Growth Oil",
      price: 229,
      rating: 5,
      reviews: 11,
      media: "photo--oil",
    },
    {
      name: "Revitalising Face Cream",
      price: 279,
      rating: 4,
      reviews: 7,
      media: "photo--oil",
    },
    {
      name: "Complete Care Bundle",
      price: 799,
      rating: 5,
      reviews: 6,
      media: "photo--oil",
    },
  ],
};

export const CATEGORIES = [
  {
    name: "Organic Powders",
    blurb: "Nutrient-rich superfoods for your daily wellness.",
    link: "Shop Powders",
    media: "photo--powder",
  },
  {
    name: "Capsules",
    blurb: "Targeted support for natural balance.",
    link: "Shop Capsules",
    media: "photo--oil",
  },
  {
    name: "Oils & Butters",
    blurb: "Pure nourishment for hair, skin and body.",
    link: "Shop Oils & Butters",
    media: "photo--oil",
  },
  {
    name: "Skin & Haircare",
    blurb: "Organic care for radiant skin and healthy hair.",
    link: "Shop Skin & Haircare",
    media: "photo--oil",
  },
  {
    name: "Superfood Blends",
    blurb: "Whole food nutrition for lasting vitality.",
    link: "Shop Blends",
    media: "photo--powder",
  },
];

export const INGREDIENTS = [
  { name: "Moringa", desc: "Boosts energy & immune system" },
  { name: "Ashwagandha", desc: "Reduces stress & restores balance" },
  { name: "Sea Moss", desc: "Supports thyroid & gut health" },
  { name: "Neem", desc: "Fights acne & clears skin" },
  { name: "Karela", desc: "Regulates blood sugar levels" },
  { name: "Soursop", desc: "Rich in antioxidants & supports immunity" },
];

export const POSTS = [
  {
    tag: "Nutrition",
    title: "5 Superfoods That Boost Your Immune System",
    date: "Apr 28, 2025",
    read: "5 min read",
    excerpt:
      "Your immune system works hard every day to keep you healthy. Discover 5 powerful superfoods packed with nutrients that help strengthen your body's natural defenses.",
    media: "photo--powder",
  },
  {
    tag: "Skincare",
    title: "Natural Skincare Routines for Glowing Skin",
    date: "Apr 22, 2025",
    read: "6 min read",
    excerpt:
      "Learn how to create a simple, natural skincare routine using organic ingredients that nourish, protect and bring out your skin's natural glow.",
    media: "photo--portrait",
  },
  {
    tag: "Herbal Living",
    title: "The Benefits of Moringa for Overall Wellness",
    date: "Apr 16, 2025",
    read: "6 min read",
    excerpt:
      "From boosting energy to supporting immunity, Moringa is a true superfood. Here's how this powerful plant can support your health and vitality.",
    media: "photo--powder",
  },
  {
    tag: "Haircare",
    title: "Healthy Hair, Naturally: Tips for Stronger, Longer Hair",
    date: "Apr 10, 2025",
    read: "5 min read",
    excerpt:
      "Give your hair the love it deserves with these natural tips and ingredients that nourish your scalp, strengthen your strands and promote healthy growth.",
    media: "photo--portrait",
  },
  {
    tag: "Superfoods",
    title: "Soursop: A Powerful Fruit for Your Health",
    date: "Apr 04, 2025",
    read: "4 min read",
    excerpt:
      "Rich in antioxidants and nutrients, soursop is a delicious way to support your immune system, digestion and overall well-being.",
    media: "photo--leaves",
  },
  {
    tag: "Lifestyle",
    title: "Simple Wellness Habits for a Balanced Life",
    date: "Mar 28, 2025",
    read: "5 min read",
    excerpt:
      "Small daily habits can make a big difference. Discover easy ways to reduce stress, boost your energy and feel more balanced every day.",
    media: "photo--landscape",
  },
  {
    tag: "Natural Beauty",
    title: "The Power of Natural Oils for Healthy Skin & Hair",
    date: "Apr 22, 2025",
    read: "5 min read",
    excerpt:
      "From coconut oil to castor oil, natural oils are packed with nutrients that nourish, repair and protect your skin and hair.",
    media: "photo--oil",
  },
  {
    tag: "Herbal Living",
    title: "Turmeric: The Golden Spice for Better Health",
    date: "Mar 16, 2025",
    read: "4 min read",
    excerpt:
      "Packed with powerful anti-inflammatory properties, turmeric can help support joint health, immunity and digestion.",
    media: "photo--powder",
  },
  {
    tag: "Nutrition",
    title: "Detox Naturally: Foods & Drinks to Reset Your Body",
    date: "Mar 08, 2025",
    read: "4 min read",
    excerpt:
      "Give your body a fresh start with these natural detox foods and drinks that support your liver, digestion and energy levels.",
    media: "photo--leaves",
  },
];

export const CATEGORY_COUNTS = [
  ["Nutrition", 6],
  ["Skincare", 4],
  ["Haircare", 3],
  ["Herbal Living", 2],
  ["Wellness", 3],
  ["Lifestyle", 2],
];
