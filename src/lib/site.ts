function requiredEnv(name: string, value: string | undefined): string {
  const trimmed = value?.trim();
  if (!trimmed) {
    throw new Error(`Missing ${name}. Copy .env.example to .env and set it.`);
  }
  return trimmed;
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

function formatPhone(raw: string, countryCode: string, groups: number[]): string {
  const digits = digitsOnly(raw);
  if (!digits.startsWith(countryCode)) return raw.trim();
  let rest = digits.slice(countryCode.length);
  const parts = groups.map((size) => {
    const part = rest.slice(0, size);
    rest = rest.slice(size);
    return part;
  });
  if (rest) parts.push(rest);
  return `+${countryCode} ${parts.filter(Boolean).join(" ")}`;
}

function parseCouriers(value: string): { name: string; href?: string }[] {
  return value
    .split(";")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [name, href] = entry.split("|").map((part) => part.trim());
      return href ? { name, href } : { name };
    });
}

function parseList(value: string): string[] {
  return value
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
}

const phoneRaw = requiredEnv("NEXT_PUBLIC_PHONE", process.env.NEXT_PUBLIC_PHONE);
const phoneCountryCode = requiredEnv(
  "NEXT_PUBLIC_PHONE_COUNTRY_CODE",
  process.env.NEXT_PUBLIC_PHONE_COUNTRY_CODE,
);
const phoneGroups = requiredEnv("NEXT_PUBLIC_PHONE_GROUPS", process.env.NEXT_PUBLIC_PHONE_GROUPS)
  .split(",")
  .map((group) => Number(group.trim()))
  .filter((group) => Number.isFinite(group) && group > 0);
const phoneNationalLength = phoneGroups.reduce((sum, group) => sum + group, 0);

export const siteConfig = {
  name: requiredEnv("NEXT_PUBLIC_BUSINESS_NAME", process.env.NEXT_PUBLIC_BUSINESS_NAME),
  tagline: requiredEnv("NEXT_PUBLIC_TAGLINE", process.env.NEXT_PUBLIC_TAGLINE),
  description: requiredEnv("NEXT_PUBLIC_DESCRIPTION", process.env.NEXT_PUBLIC_DESCRIPTION),
  location: requiredEnv("NEXT_PUBLIC_LOCATION", process.env.NEXT_PUBLIC_LOCATION),
  city: requiredEnv("NEXT_PUBLIC_CITY", process.env.NEXT_PUBLIC_CITY),
  country: requiredEnv("NEXT_PUBLIC_COUNTRY", process.env.NEXT_PUBLIC_COUNTRY),
  locale: requiredEnv("NEXT_PUBLIC_LOCALE", process.env.NEXT_PUBLIC_LOCALE),
  contentUpdated: requiredEnv("NEXT_PUBLIC_CONTENT_UPDATED", process.env.NEXT_PUBLIC_CONTENT_UPDATED),
  governingLaw: requiredEnv("NEXT_PUBLIC_GOVERNING_LAW", process.env.NEXT_PUBLIC_GOVERNING_LAW),
  dataLaw: requiredEnv("NEXT_PUBLIC_DATA_LAW", process.env.NEXT_PUBLIC_DATA_LAW),
  phoneRaw,
  phoneCountryCode,
  phoneDisplay: formatPhone(phoneRaw, phoneCountryCode, phoneGroups),
  phoneTel: `+${digitsOnly(phoneRaw)}`,
  phoneNationalLength,
  whatsappUrl: requiredEnv("NEXT_PUBLIC_WHATSAPP_URL", process.env.NEXT_PUBLIC_WHATSAPP_URL),
  email: requiredEnv("NEXT_PUBLIC_EMAIL", process.env.NEXT_PUBLIC_EMAIL),
  hours: requiredEnv("NEXT_PUBLIC_HOURS", process.env.NEXT_PUBLIC_HOURS),
  seoKeywords: parseList(requiredEnv("NEXT_PUBLIC_SEO_KEYWORDS", process.env.NEXT_PUBLIC_SEO_KEYWORDS)),
} as const;

export const couriers = parseCouriers(
  requiredEnv("NEXT_PUBLIC_COURIERS", process.env.NEXT_PUBLIC_COURIERS),
);

export const publicReferences = [
  {
    name: requiredEnv("NEXT_PUBLIC_DATA_REGULATOR_NAME", process.env.NEXT_PUBLIC_DATA_REGULATOR_NAME),
    href: requiredEnv("NEXT_PUBLIC_DATA_REGULATOR_URL", process.env.NEXT_PUBLIC_DATA_REGULATOR_URL),
    note: "The regulator for personal data where we operate.",
  },
  {
    name: requiredEnv("NEXT_PUBLIC_FOOD_REGULATOR_NAME", process.env.NEXT_PUBLIC_FOOD_REGULATOR_NAME),
    href: requiredEnv("NEXT_PUBLIC_FOOD_REGULATOR_URL", process.env.NEXT_PUBLIC_FOOD_REGULATOR_URL),
    note: "The national regulator for food safety standards.",
  },
] as const;

export function courierLabelList(): string {
  const names = couriers.map((courier) => courier.name);
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

export const brandAssets = {
  logo: {
    src: "/images/logo.png",
    width: 720,
    height: 691,
  },
} as const;

export const motion = {
  heroIntervalMs: 5500,
  heroTransitionMs: 700,
} as const;

export function whatsappUrl(_message?: string): string {
  return siteConfig.whatsappUrl;
}

const additionalEmails = parseList(process.env.NEXT_PUBLIC_ADDITIONAL_EMAILS ?? "").filter(
  (email) => email.toLowerCase() !== siteConfig.email.toLowerCase(),
);

export const contactEmails = [siteConfig.email, ...additionalEmails];

export function displayPhone(digits: string): string {
  return formatPhone(digits, phoneCountryCode, phoneGroups);
}

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/business", label: "For Business" },
  { href: "/delivery", label: "Delivery" },
  { href: "/order", label: "Order" },
  { href: "/register", label: "Register" },
  { href: "/contact", label: "Contact" },
] as const;

export type MenuItem = {
  name: string;
  description: string;
  note?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "shawarma",
    name: "Shawarma",
    description: "Wrapped fresh for lunch breaks and team orders.",
    image: "/images/shawarma.jpg",
    imageAlt: "Chicken shawarma wraps cut open to show the filling",
    items: [
      {
        name: "Classic Chicken Shawarma",
        description: "Soft wrap, seasoned chicken, crisp veggies, signature sauce.",
      },
      {
        name: "Beef Shawarma",
        description: "Savory beef strips with house spice blend.",
      },
      {
        name: "Mixed Shawarma Platter",
        description: "Ideal for office meetings — cut and ready to share.",
        note: "Bulk pricing available",
      },
    ],
  },
  {
    id: "burgers",
    name: "Burgers",
    description: "Hearty options for individual meals or catered spreads.",
    image: "/images/burger.jpg",
    imageAlt: "Beef and chicken burgers with melted cheese",
    items: [
      {
        name: "Cravings Classic Burger",
        description: "Juicy patty, melted cheese, fresh fixings.",
      },
      {
        name: "Chicken Burger",
        description: "Crispy or grilled chicken with creamy slaw.",
      },
      {
        name: "Mini Burger Box",
        description: "Bite-sized burgers for events and conferences.",
        note: "Corporate favorite",
      },
    ],
  },
  {
    id: "small-chops",
    name: "Small Chops",
    description: "Party trays and office snack packs.",
    image: "/images/small-chops.jpg",
    imageAlt: "Catering tray of spring rolls, puff-puff, and samosas",
    items: [
      {
        name: "Assorted Small Chops Tray",
        description: "Spring rolls, puff-puff, samosa-style bites, and more.",
      },
      {
        name: "Office Snack Pack",
        description: "Portioned packs for desks and breakout rooms.",
      },
      {
        name: "Event Catering Tray",
        description: "Large-format trays for launches, AGMs, and celebrations.",
        note: "Pre-order recommended",
      },
    ],
  },
  {
    id: "ice-cream",
    name: "Ice Cream",
    description: "Cool treats for teams, retail shelves, and celebrations.",
    image: "/images/ice-cream.jpg",
    imageAlt: "Scoops of chocolate, vanilla, and strawberry ice cream",
    items: [
      {
        name: "Cup & Cone Selection",
        description: "Popular flavors for walk-in and delivery orders.",
      },
      {
        name: "Office Treat Tub",
        description: "Shareable tubs for team morale days.",
      },
      {
        name: "Retail / Wholesale Cartons",
        description: "Stock your shop or canteen at wholesale rates.",
        note: "MOQ applies",
      },
    ],
  },
  {
    id: "parfait",
    name: "Parfait & Desserts",
    description: "Layered parfaits and sweet finishes.",
    image: "/images/parfait.jpg",
    imageAlt: "Yogurt parfaits layered with fruit and granola",
    items: [
      {
        name: "Fruit & Granola Parfait",
        description: "Layers of yogurt, fruit, and crunch.",
      },
      {
        name: "Chocolate Parfait",
        description: "Rich, indulgent layers for dessert lovers.",
      },
      {
        name: "Parfait Party Pack",
        description: "Individual cups boxed for corporate gifting.",
      },
    ],
  },
  {
    id: "combos",
    name: "Combos & More",
    description: "Mix-and-match for budgets and headcount.",
    image: "/images/catering.jpg",
    imageAlt: "Office lunch boxes and catering trays ready for delivery",
    items: [
      {
        name: "Lunch Combo",
        description: "Shawarma or burger with a drink — perfect for one-off orders.",
      },
      {
        name: "Team Lunch Box",
        description: "Balanced meal boxes for departments and shifts.",
      },
      {
        name: "Custom Corporate Menu",
        description: "We build menus around your budget, dietary needs, and schedule.",
        note: "Speak to our team",
      },
    ],
  },
];

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  cta: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "shawarma",
    eyebrow: "Shawarma",
    title: "Wrapped fresh for the lunch rush",
    description:
      "Chicken and beef shawarma, cut for sharing or boxed for the desk — ordered by the piece or by the hundred.",
    image: "/images/shawarma.jpg",
    imageAlt: "Fresh chicken shawarma",
    href: "/menu#shawarma",
    cta: "View shawarma",
  },
  {
    id: "small-chops",
    eyebrow: "Small chops",
    title: "Trays that disappear at every meeting",
    description:
      "Spring rolls, puff-puff, and the rest of the chop lineup, packed for offices, campuses, and celebrations.",
    image: "/images/small-chops.jpg",
    imageAlt: "Assorted small chops on a catering tray",
    href: "/menu#small-chops",
    cta: "View small chops",
  },
  {
    id: "burgers",
    eyebrow: "Burgers",
    title: "A proper bite between meetings",
    description:
      "Classic and chicken burgers, plus mini boxes when the whole department is in the room.",
    image: "/images/burger.jpg",
    imageAlt: "Stacked gourmet burgers",
    href: "/menu#burgers",
    cta: "View burgers",
  },
  {
    id: "ice-cream",
    eyebrow: "Ice cream",
    title: "Cool treats for teams and retail shelves",
    description:
      "Cups, cones, shareable tubs, and wholesale cartons for shops that want the same quality we serve offices.",
    image: "/images/ice-cream.jpg",
    imageAlt: "Scoops of ice cream",
    href: "/menu#ice-cream",
    cta: "View ice cream",
  },
  {
    id: "parfait",
    eyebrow: "Parfait",
    title: "Layered desserts, ready to gift",
    description:
      "Fruit, chocolate, and party packs of individual cups — a lighter finish after lunch or a branded treat for guests.",
    image: "/images/parfait.jpg",
    imageAlt: "Fruit and granola parfaits in glass cups",
    href: "/menu#parfait",
    cta: "View parfaits",
  },
  {
    id: "catering",
    eyebrow: "Corporate & wholesale",
    title: "Large orders, delivered to the door",
    description:
      `Staff lunches, events, and retailer restocks across ${siteConfig.city}, coordinated with couriers such as ${courierLabelList()}.`,
    image: "/images/catering.jpg",
    imageAlt: "Catering boxes prepared for an office delivery",
    href: "/business",
    cta: "Plan a bulk order",
  },
];

export const audiences = [
  {
    title: "Corporate & institutions",
    description:
      "Recurring lunch programs, town halls, training days, and staff appreciation — scaled to your headcount and budget.",
    href: "/business#corporate",
    image: "/images/catering.jpg",
    imageAlt: "Meal boxes lined up for a corporate order",
  },
  {
    title: "Individuals & teams",
    description:
      `One-off cravings or small group orders — shawarma, parfait, ice cream, and more delivered to your door in ${siteConfig.city}.`,
    href: "/menu",
    image: "/images/shawarma.jpg",
    imageAlt: "Shawarma ready for an individual order",
  },
  {
    title: "Retailers & wholesale",
    description:
      "Stock your shop, kiosk, or canteen with competitive wholesale pricing and reliable supply coordination.",
    href: "/business#wholesale",
    image: "/images/ice-cream.jpg",
    imageAlt: "Ice cream prepared for retail and wholesale",
  },
] as const;

export const orderSteps = [
  {
    step: "01",
    title: "Tell us what you need",
    text: "Share headcount, menu preferences, delivery address, and timing via WhatsApp or our contact form.",
  },
  {
    step: "02",
    title: "We prepare fresh",
    text: "Kitchen-prepared orders for individuals, bulk trays for events, or wholesale batches for retail partners.",
  },
  {
    step: "03",
    title: `Delivered across ${siteConfig.city}`,
    text: "We coordinate trusted courier partners so your order arrives hot, chilled, or event-ready.",
  },
] as const;

export const highlights = [
  { label: "Based in", value: siteConfig.location },
  { label: "We serve", value: "Teams, events & retail" },
  { label: "Delivery", value: `Doorstep in ${siteConfig.city}` },
] as const;

export const corporateBenefits = [
  "Dedicated account coordination for recurring orders",
  "Flexible menus for dietary preferences and budgets",
  "Bulk packaging for meetings, trainings, and staff events",
  "Invoicing support for finance and procurement teams",
  `Reliable delivery scheduling across ${siteConfig.city}`,
] as const;

export const wholesaleBenefits = [
  "Competitive wholesale pricing on select product lines",
  "Ice cream, parfait, snacks, and fast-moving items for retail",
  "Consistent quality for your customers and shelves",
  "Order volumes tailored to your store or distribution needs",
  "Partnership mindset — grow with us as demand grows",
] as const;

export const orderTypes = [
  { value: "individual", label: "Individual / small group" },
  { value: "corporate", label: "Corporate / institution (bulk)" },
  { value: "wholesale", label: "Wholesale / retail" },
  { value: "other", label: "Other" },
] as const;

export const courierPartners = couriers.map((courier) => courier.name);

export const deliveryFaqs = [
  {
    q: "Where do you deliver?",
    a: `We serve customers across ${siteConfig.location}. Share your address when ordering so we can confirm coverage and timing.`,
  },
  {
    q: "How are orders delivered?",
    a: `We prepare your order fresh, then coordinate delivery through established courier platforms and logistics partners familiar with ${siteConfig.city} routes.`,
  },
  {
    q: "Can corporate orders arrive at a specific time?",
    a: "Yes — for bulk and institutional orders, schedule windows are agreed in advance so food aligns with your meeting or break times.",
  },
  {
    q: "Do you deliver ice cream and parfait safely?",
    a: "Cold items are packed with care. Mention temperature-sensitive products when ordering so we plan packaging and courier selection accordingly.",
  },
] as const;

export const deliveryTips = [
  `Provide a reachable phone number and clear landmark for ${siteConfig.city} addresses.`,
  "For offices, include reception or security instructions if required.",
  "Bulk orders benefit from 24–48 hours notice when possible.",
  "Payment and delivery fees are confirmed before dispatch.",
] as const;
