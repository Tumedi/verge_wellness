// ============================================================
// Verge Wellness — content data
// ------------------------------------------------------------
// Products mirror the real Verge Wellness range. Each item has an
// `image` field pointing at /images/<slug>.jpg in the `public/`
// folder. Until a real photo is uploaded there, the themed gradient
// placeholder (`media`) renders instead — nothing breaks.
//
// Image paths are ROOT-RELATIVE ("/images/...") so Vite rewrites
// them for the GitHub Pages base path automatically.
// See public/images/README.md for the full filename checklist.
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
  // --- Powders, Superfoods, Seeds & Dried Herbs (pouches) ---
  powders: [
    {
      name: "Moringa Leaf Powder",
      subtitle: "Moringa Oleifera",
      size: "100g",
      price: 149,
      rating: 5,
      reviews: 24,
      media: "photo--powder",
      image: "/images/moringa-powder.jpg",
      benefits:
        "Antioxidant-rich, anti-inflammatory, supports energy, gut health & immunity.",
      description:
        "Pure dried Moringa Oleifera leaf powder — one of nature's most complete superfoods. Rich in antioxidants and anti-inflammatory, it may help regulate blood sugar, boost energy and reduce fatigue, support gut health and immunity, and nourish skin, hair, liver, heart and brain. Add 1 teaspoon into any liquid of your choice and consume in the morning.",
    },
    {
      name: "Ashwagandha Powder",
      subtitle: "Organic Root Powder",
      size: "100g",
      price: 179,
      rating: 4,
      reviews: 18,
      media: "photo--powder",
      image: "/images/ashwagandha-powder.jpg",
      benefits:
        "Helps reduce stress & anxiety, improves sleep, boosts energy & immunity.",
      description:
        "Organic ashwagandha root powder, a time-honoured adaptogen. It may help reduce stress and anxiety, improve sleep quality, boost brain, memory and heart health, lift energy and immunity, balance hormones and libido, aid blood sugar regulation, support physical performance and recovery, and help lower cholesterol. Take ¼ teaspoon with water mornings and evenings.",
    },
    {
      name: "Karela Powder",
      subtitle: "Bitter Gourd",
      size: "100g",
      price: 159,
      rating: 4,
      reviews: 10,
      media: "photo--powder",
      image: "/images/karela-powder.jpg",
      benefits:
        "Rich in vitamins & antioxidants, aids blood sugar, digestion & detox.",
      description:
        "Organic karela (bitter gourd) powder, rich in vitamins and antioxidants. It may help regulate blood sugar, aid digestion and constipation relief, support weight management, detoxify and purify the blood, support liver wellness, boost skin and hair health and help lower cholesterol. Take ½ teaspoon with warm water on an empty stomach in the morning.",
    },
    {
      name: "Neem Powder",
      subtitle: "Organic Leaf Powder",
      size: "100g",
      price: 149,
      rating: 4,
      reviews: 12,
      media: "photo--powder",
      image: "/images/neem-powder.jpg",
      benefits:
        "Aids acne & skin health, boosts immunity, digestion & blood cleansing.",
      description:
        "Pure dried neem leaf powder, prized for its purifying properties. It may help with acne and pimples, reduce hyperpigmentation and scarring, ease eczema, psoriasis and skin infections, act as an anti-ageing agent, combat dandruff and itchy scalp, strengthen hair and promote growth, freshen breath and support gum health, boost immunity and digestion, aid blood sugar regulation, and purify and cleanse the blood. Take ½ teaspoon with water, yogurt or a smoothie, or use as a face mask.",
    },
    {
      name: "Chia Seeds",
      subtitle: "Pure Chia Seeds",
      size: "100g",
      price: 129,
      rating: 5,
      reviews: 15,
      media: "photo--powder",
      image: "/images/chia-seeds.jpg",
      benefits:
        "Fibre & protein powerhouse; supports heart, digestion & brain function.",
      description:
        "Pure chia seeds — a nutritional powerhouse of fibre and protein and a great source of antioxidants and minerals. They may boost brain function and memory, support digestive and heart health, aid blood sugar regulation and weight management, help strengthen teeth and bones, support detoxification, improve sleep and help regulate appetite. Add 1–2 teaspoons into yogurt, a smoothie, water or any liquid of your choice and allow time to soak before consuming.",
    },
    {
      name: "Raw Sea Moss",
      subtitle: "Organic Sea Moss",
      size: "100g",
      price: 199,
      rating: 5,
      reviews: 14,
      media: "photo--powder",
      image: "/images/raw-sea-moss.jpg",
      benefits:
        "92 essential minerals; supports immunity, thyroid, gut, skin & energy.",
      description:
        "Organic raw sea moss, said to contain 92 of the body's essential minerals. It boosts the immune system, helps with digestion and weight management, supports heart, gut and thyroid health, nourishes skin, hair and nails, may help regulate blood sugar, supports joint, bone and muscle health, may boost energy, acts as an anti-ageing supplement and is anti-inflammatory. Wash thoroughly, soak in spring water, blend and store — take a tablespoon every morning.",
    },
    {
      name: "Dried Hibiscus Flower",
      subtitle: "Hibiscus Rosa-Sinensis",
      size: "50g",
      price: 119,
      rating: 4,
      reviews: 9,
      media: "photo--powder",
      image: "/images/hibiscus-flower.jpg",
      benefits:
        "Antioxidant-rich; supports liver, cholesterol, digestion & immunity.",
      description:
        "Pure dried hibiscus flowers (Hibiscus Rosa-Sinensis), rich in antioxidants. They support liver health, help lower cholesterol and triglycerides, aid weight management, support digestion and overall immunity, may lower blood pressure, may ease stress and low mood, are anti-inflammatory and may help ease menstrual pain. Steep flowers in hot water or boil for 5–10 minutes; serve hot or chilled.",
    },
    {
      name: "Dried Soursop Leaves",
      subtitle: "Graviola",
      size: "50g",
      price: 139,
      rating: 5,
      reviews: 11,
      media: "photo--leaves",
      image: "/images/soursop-leaves.jpg",
      benefits:
        "Antioxidant-rich; supports relaxation, digestion, immunity & wellness.",
      description:
        "Dried soursop (graviola) leaves, rich in antioxidants. They may reduce inflammation, support blood pressure management, help manage blood sugar, promote relaxation and sleep, support digestive and gastric health, aid immune support and support general wellness. Boil 3–4 leaves in 1 cup of water for 5 minutes, strain and enjoy after meals — no more than 3 cups daily.",
    },
  ],

  // --- Capsules & Supplements (amber jars, 60 capsules) ---
  capsules: [
    {
      name: "Ashwagandha Capsules",
      subtitle: "Supports Stress Management*",
      size: "60 Capsules",
      price: 179,
      rating: 5,
      reviews: 15,
      media: "photo--oil",
      image: "/images/ashwagandha-capsules.jpg",
      benefits: "Stress • Sleep • Memory • Immunity support.",
      description:
        "Ashwagandha capsules formulated to support stress management. Each convenient capsule delivers this classic adaptogen to help support a calm mind, restful sleep, memory and focus, and everyday immunity. 60 capsules, 1000mg active ingredient. Dietary supplement — vegan friendly, made with natural ingredients.",
    },
    {
      name: "Karela Capsules",
      subtitle: "Blood Sugar Support*",
      size: "60 Capsules",
      price: 149,
      rating: 5,
      reviews: 8,
      media: "photo--oil",
      image: "/images/karela-capsules.jpg",
      benefits: "Blood sugar • Metabolic • Digestive • Antioxidant support.",
      description:
        "Karela (bitter gourd) capsules for everyday blood sugar support. A convenient way to enjoy karela's traditional benefits — supporting healthy blood sugar and metabolism, aiding digestion and providing antioxidant support. 60 capsules, 1000mg active ingredient. Dietary supplement — vegan friendly, made with natural ingredients.",
    },
    {
      name: "Moringa Leaf Capsules",
      subtitle: "Nutrition and Energy Support*",
      size: "60 Capsules",
      price: 159,
      rating: 4,
      reviews: 12,
      media: "photo--oil",
      image: "/images/Moringa%20Capsules%20.png",
      benefits: "Nutrition • Energy • Immune • Antioxidant support.",
      description:
        "Moringa leaf capsules for nutrition and energy support. Packed with the goodness of moringa to nourish the body, support natural energy, everyday immunity and antioxidant protection — all in a convenient capsule. 60 capsules, 1000mg active ingredient. Dietary supplement — vegan friendly, made with natural ingredients.",
    },
    {
      name: "Neem Leaf Capsules",
      subtitle: "Purification and Immune Support*",
      size: "60 Capsules",
      price: 149,
      rating: 4,
      reviews: 10,
      media: "photo--oil",
      image: "/images/Neem%20Capsules.png",
      benefits: "Detoxification • Immune • Skin health • Antioxidant support.",
      description:
        "Neem leaf capsules for purification and immune support. Neem's traditional purifying properties in an easy daily capsule — supporting detoxification, immunity, clear healthy skin and antioxidant protection. 60 capsules, 1000mg active ingredient. Dietary supplement — vegan friendly, made with natural ingredients.",
    },
    {
      name: "Sea Moss Capsules",
      subtitle: "Immune and Cellular Support*",
      size: "60 Capsules",
      price: 189,
      rating: 5,
      reviews: 9,
      media: "photo--oil",
      image: "/images/Sea%20Moss%20Capsules%20.png",
      benefits: "Immune • Mineral-rich • Digestive • Energy & vitality.",
      description:
        "Sea moss capsules for immune and cellular support. A mineral-rich sea superfood in convenient capsule form — supporting immunity, digestive health, and everyday energy and vitality. 60 capsules, 1000mg active ingredient. Dietary supplement — vegan friendly.",
    },
    {
      name: "Soursop Leaf Capsules",
      subtitle: "Immune and Cellular Support*",
      size: "60 Capsules",
      price: 159,
      rating: 5,
      reviews: 9,
      media: "photo--oil",
      image: "/images/Soursop%20Capsules.png",
      benefits: "Immune • Antioxidant • Digestive • Inflammation support.",
      description:
        "Soursop (graviola) leaf capsules for immune and cellular support. Soursop's antioxidant-rich leaves in a daily capsule — supporting immunity, digestion and a healthy inflammatory response. 60 capsules, 1000mg active ingredient. Dietary supplement — vegan friendly, made with natural ingredients.",
    },
  ],

  // --- Skin & Hair Care (oils, butters, liquids) ---
  skincare: [
    {
      name: "Organic Hair Growth Oil",
      subtitle: "Botanical Oil Blend",
      size: "100ml",
      price: 229,
      rating: 5,
      reviews: 11,
      media: "photo--oil",
      image: "/images/hair-growth-oil.jpg",
      benefits:
        "Deeply moisturises, soothes scalp & supports stronger, longer hair.",
      description:
        "A nutrient-rich botanical hair oil infused with herbs and nourishing oils traditionally used to support healthy-looking hair and scalp. Deeply moisturises and nourishes, softens and soothes hair and scalp, supports stronger, longer-looking hair and helps reduce dryness and breakage. Perfect for natural hair, protective styles, dry scalp and damaged hair. Ingredients include Jamaican Black Castor Oil, Olive, Avocado and Grapeseed Oils, Ashwagandha, Neem and Amla Powders, Hibiscus, Cloves, Rosemary, Fenugreek, Black Cumin, Cinnamon, Vitamin E and botanical extracts. Apply a small amount to scalp and hair, massage 2–5 minutes, use 2–4 times weekly.",
    },
    {
      name: "Unrefined Shea Butter",
      subtitle: "For all skin & hair types",
      size: "250ml",
      price: 179,
      rating: 4,
      reviews: 9,
      media: "photo--oil",
      image: "/images/shea-butter.jpg",
      benefits:
        "Deeply moisturises & softens; rich in Vitamins A & E, chemical-free.",
      description:
        "Raw organic unrefined shea butter for all skin and hair types. Deeply moisturises, softens and soothes skin and hair, and is rich in Vitamins A and E. Chemical-free and hexane-free — pure nourishment, nothing else. Ingredient: Raw Organic Unrefined Shea Butter.",
    },
    {
      name: "Liquid Chlorophyll",
      subtitle: "Chlorophyllin",
      size: "100ml",
      price: 199,
      rating: 5,
      reviews: 7,
      media: "photo--oil",
      image: "/images/liquid-chlorophyll.jpg",
      benefits:
        "Natural deodoriser & antioxidant; supports skin & general wellness.",
      description:
        "Pure liquid chlorophyll (chlorophyllin) — a refreshing daily wellness drop. Acts as a natural internal deodoriser, provides antioxidant and anti-inflammatory support, may aid skin health and general wellness. Add 15–30 drops into a glass of water and enjoy 1–3 times daily. Shake well before use and store in a cool, dry place away from direct sunlight.",
    },
  ],
};

export const CATEGORIES = [
  {
    name: "Organic Powders",
    blurb: "Nutrient-rich superfoods for your daily wellness.",
    link: "Shop Powders",
    media: "photo--powder",
    image: "/images/moringa-powder.jpg",
  },
  {
    name: "Capsules",
    blurb: "Targeted support for natural balance.",
    link: "Shop Capsules",
    media: "photo--oil",
    image: "/images/ashwagandha-capsules.jpg",
  },
  {
    name: "Oils & Butters",
    blurb: "Pure nourishment for hair, skin and body.",
    link: "Shop Oils & Butters",
    media: "photo--oil",
    image: "/images/hair-growth-oil.jpg",
  },
  {
    name: "Skin & Haircare",
    blurb: "Organic care for radiant skin and healthy hair.",
    link: "Shop Skin & Haircare",
    media: "photo--oil",
    image: "/images/shea-butter.jpg",
  },
  {
    name: "Superfood Blends",
    blurb: "Whole food nutrition for lasting vitality.",
    link: "Shop Blends",
    media: "photo--powder",
    image: "/images/chia-seeds.jpg",
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
