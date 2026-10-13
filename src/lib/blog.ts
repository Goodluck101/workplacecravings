import { siteConfig } from "@/lib/site";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  paragraphs: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "planning-office-lunch",
    title: `How ${siteConfig.city} offices can plan a lunch that actually arrives on time`,
    description: `A practical order checklist for HR and office administrators placing bulk meals with ${siteConfig.name}.`,
    date: siteConfig.contentUpdated,
    readingMinutes: 4,
    paragraphs: [
      `${siteConfig.name} prepares shawarma, burgers, small chops, and related meals for teams that need food at a set time, not whenever a courier happens to be nearby.`,
      "Start with three facts: how many people are eating, whether anyone needs a lighter option such as parfait, and the exact handover point. A reception desk, a floor number, and a name at security save more orders than a longer menu does.",
      "Give at least a working day’s notice for trays and staff lunches. Same-day orders are possible when the kitchen and a courier partner can cover the route, and we confirm that before you pay.",
      "Ask for packaging that matches the meeting. Cut shawarma platters suit a shared table. Boxed burgers suit people who will eat at their desks. Cold items such as ice cream and parfait need to be called out so we pack them separately.",
      "Payment and the delivery fee are confirmed before dispatch. If the headcount changes, message us on WhatsApp with the same details you used for the original order so the kitchen is not working from two versions.",
    ],
  },
  {
    slug: "ordering-small-chops-for-an-event",
    title: "Ordering small chops for a workplace event",
    description:
      "What to decide before you request trays for a launch, training, or end-of-month gathering.",
    date: siteConfig.contentUpdated,
    readingMinutes: 3,
    paragraphs: [
      "Small chops are the easiest item to under-order. People take more than one piece, and a tray that looks full in the kitchen looks modest once it reaches a crowded room.",
      "Tell us the occasion, the start time, and whether the food is the main offering or a side to drinks. A training break needs a different quantity from a product launch where guests arrive over two hours.",
      "We recommend pre-order for event trays. That gives the kitchen time to fry and pack in batches so the food is not sitting from mid-morning.",
      `Delivery across ${siteConfig.location} is arranged with courier partners. For venues with loading rules, include the gate instructions in the order message.`,
    ],
  },
  {
    slug: "wholesale-supply-for-retailers",
    title: "What retailers should expect from a wholesale food supply",
    description:
      `How shops, canteens, and kiosks can stock ${siteConfig.name} products without guessing at minimums.`,
    date: siteConfig.contentUpdated,
    readingMinutes: 3,
    paragraphs: [
      "Wholesale is a different order from a staff lunch. You are buying to resell, so consistency and a clear minimum matter more than a one-off tray.",
      "We agree the lines you want — often ice cream, parfait, snacks, and other fast-moving items — and the quantity that makes sense for your shelf or freezer. Minimums depend on the product and are confirmed before you commit.",
      "Cold lines need a receiving plan. If your freezer space is limited, say so. We would rather schedule a smaller, more frequent drop than send stock you cannot hold safely.",
      `Write to ${siteConfig.email} or message ${siteConfig.phoneDisplay} with your shop location in ${siteConfig.city}, the products you want, and how often you expect to reorder.`,
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
