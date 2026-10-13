import { blogPosts } from "@/lib/blog";
import { courierLabelList, couriers, publicReferences, siteConfig, whatsappUrl } from "@/lib/site";

export const legalUpdated = siteConfig.contentUpdated;

const courierLinks: InfoLink[] = couriers
  .filter((courier): courier is { name: string; href: string } => Boolean(courier.href))
  .map((courier) => ({
    href: courier.href,
    label: courier.name,
    note: `Courier platform we use for deliveries in ${siteConfig.city}.`,
    external: true,
  }));

const referenceLinks: InfoLink[] = publicReferences.map((reference) => ({
  href: reference.href,
  label: reference.name,
  note: reference.note,
  external: true,
}));

export type InfoLink = {
  href: string;
  label: string;
  note: string;
  external?: boolean;
};

export type InfoBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "ul"; items: string[] }
  | { type: "links"; items: InfoLink[] }
  | { type: "faq"; items: { q: string; a: string }[] };

export type InfoPage = {
  slug: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  updated: string;
  disclaimer?: boolean;
  blocks: InfoBlock[];
};

const orderLink = whatsappUrl(`Hello ${siteConfig.name}, I would like to place an order.`);

export const noticeText = `These pages describe how ${siteConfig.name} operates its website and orders. They are written in plain language for customers and partners. They are not a substitute for advice from your own lawyer.`;

export const infoPages = {
  about: {
    slug: "about",
    label: "About us",
    eyebrow: "Company",
    title: "About us",
    description: `Who ${siteConfig.name} is, who we cook for, and how orders move across ${siteConfig.city}.`,
    summary: `${siteConfig.name} prepares food people look forward to at work, at home, and on a retail shelf.`,
    updated: legalUpdated,
    blocks: [
      {
        type: "p",
        text: `${siteConfig.name} is a ${siteConfig.city} food business. We make shawarma, burgers, small chops, ice cream, parfait, and related meals for individuals, for corporate teams and institutions, and for retailers who buy at wholesale prices.`,
      },
      {
        type: "p",
        text: "The name is deliberate. The meals have to be good enough for a personal craving and orderly enough for an office administrator who is feeding a floor of staff. Bulk does not mean careless, and a single wrap does not mean we cannot scale.",
      },
      {
        type: "h2",
        text: "Who we serve",
      },
      {
        type: "ul",
        items: [
          "Corporate organisations and institutions that order for staff, trainings, and events.",
          `Individuals and small groups who want food delivered to a door in ${siteConfig.city}.`,
          "Retailers, canteens, and kiosks that restock selected lines at wholesale rates.",
        ],
      },
      {
        type: "h2",
        text: "How an order moves",
      },
      {
        type: "p",
        text: `You tell us what you need, for how many people, and where in ${siteConfig.location} it should arrive. We confirm the menu, the timing, and the fee before the kitchen starts. Delivery is arranged with courier services that already operate in ${siteConfig.city}, including ${courierLabelList()}.`,
      },
      {
        type: "p",
        text: `The fastest way to reach the kitchen is our WhatsApp chat, or the contact form on this site, which opens that same chat. We are open ${siteConfig.hours}.`,
      },
    ],
  },
  faq: {
    slug: "faq",
    label: "FAQ",
    eyebrow: "Help",
    title: "Frequently asked questions",
    description: `Ordering, delivery, wholesale, allergens, and payments for ${siteConfig.name}.`,
    summary: "Short answers to the questions offices, households, and retailers ask before they order.",
    updated: legalUpdated,
    blocks: [
      {
        type: "faq",
        items: [
          {
            q: "How do I place an order?",
            a: `Order on the website, or message us on WhatsApp. On the website, registered members can use their email or phone. Guests add a phone number. Include what you want, the quantity, the delivery area in ${siteConfig.city}, and the time you need it.`,
          },
          {
            q: "Do you take large corporate orders?",
            a: "Yes. Recurring staff lunches, trainings, and one-off events are a core part of the business. Share the headcount and budget and we will propose a menu.",
          },
          {
            q: "Do you sell wholesale?",
            a: "Yes, on selected lines and at quantities we confirm with you. Minimums depend on the product. Tell us your shop or canteen location and how often you expect to reorder.",
          },
          {
            q: "Where do you deliver?",
            a: `Across ${siteConfig.location}. Coverage and timing depend on the address and the courier partner available for that route. We confirm both before dispatch.`,
          },
          {
            q: "Which couriers do you use?",
            a: `${courierLabelList()}, depending on which option fits the order size and the product.`,
          },
          {
            q: "Can you handle ice cream and parfait on a delivery?",
            a: "Yes, when you tell us those items are in the order. We pack cold products with care and choose a courier option that suits them. Say so in the first message.",
          },
          {
            q: "How do allergens and dietary needs work?",
            a: "Tell us before we confirm the order. We will say plainly if a dish can be adjusted and if we cannot separate it from allergens in the kitchen. Do not assume a platter is free of nuts, dairy, or gluten unless we confirm that in writing.",
          },
          {
            q: "When do I pay?",
            a: "We confirm the food total and any delivery fee before dispatch. Payment instructions are sent with that confirmation. We do not store card numbers on this website.",
          },
          {
            q: "Can I cancel?",
            a: "Message us as soon as you can. Orders already in preparation or handed to a courier may not be reversible. We will tell you what can still be stopped.",
          },
          {
            q: "How do I raise a complaint?",
            a: `Write to ${siteConfig.email} or WhatsApp ${siteConfig.phoneDisplay} with the order details and what went wrong. We would rather hear it the same day, while we can still check the kitchen and the courier handoff.`,
          },
        ],
      },
    ],
  },
  links: {
    slug: "links",
    label: "Links of interest",
    eyebrow: "Directory",
    title: "Links of interest",
    description: `Official pages and partners that sit next to a ${siteConfig.name} order.`,
    summary:
      "A short directory of our own pages and of the public services we actually use or point customers to. We do not control the external sites.",
    updated: legalUpdated,
    blocks: [
      { type: "h2", text: "On this website" },
      {
        type: "links",
        items: [
          { href: "/menu", label: "Menu", note: "What the kitchen prepares." },
          { href: "/business", label: "For business", note: "Corporate orders and wholesale." },
          { href: "/delivery", label: "Delivery", note: `How food reaches an address in ${siteConfig.city}.` },
          { href: "/contact", label: "Contact", note: "WhatsApp and email." },
          { href: "/faq", label: "FAQ", note: "Answers before you order." },
          { href: orderLink, label: "Order on WhatsApp", note: "Opens our WhatsApp chat.", external: true },
        ],
      },
      { type: "h2", text: "Delivery partners" },
      {
        type: "links",
        items: courierLinks,
      },
      { type: "h2", text: "Public references" },
      {
        type: "links",
        items: [
          ...referenceLinks,
          { href: "/privacy", label: "Our privacy policy", note: "What this website does with the details you send us." },
          { href: "/cookies/configure", label: "Configure the cookies", note: "Change the choice stored in this browser." },
        ],
      },
    ],
  },
  impact: {
    slug: "impact",
    label: "Impact & Sustainability",
    eyebrow: "Impact & Sustainability",
    title: "Impact & Sustainability",
    description: `How ${siteConfig.name} handles commitments, local trade, the environment, delivery, and inclusion.`,
    summary: `What we will and will not claim about the way ${siteConfig.name} cooks, supplies, and delivers in ${siteConfig.city}.`,
    updated: legalUpdated,
    blocks: [
      {
        type: "p",
        text: `These are operating commitments, not certifications. Where we have not been audited, we say so. The work is still the same: feed people in ${siteConfig.city} without wasting their time or their food.`,
      },
      { type: "h2", id: "commitments", text: "Our Commitments" },
      {
        type: "ul",
        items: [
          "Confirm the items, quantity, price, and timing before the kitchen starts.",
          "Tell you when a dish cannot be made safely for an allergy, and decline the order rather than guess.",
          "Pack cold food and hot food so they are not ruined on the way, which is also how food gets thrown away.",
          "Use the same standard for a single wrap, a staff lunch, and a wholesale drop.",
          `Keep one public phone line, ${siteConfig.phoneDisplay}, and one email, ${siteConfig.email}.`,
        ],
      },
      { type: "h2", id: "local-commerce", text: "Local Commerce" },
      {
        type: "p",
        text: `${siteConfig.name} buys, cooks, and delivers in ${siteConfig.city}. Corporate orders matter, and so do the shops and canteens that restock from us. Wholesale exists so a neighbourhood counter can sell the same products without having to run our kitchen.`,
      },
      {
        type: "ul",
        items: [
          "Retail partners are quoted on quantity and storage, not pushed into a volume they cannot hold.",
          "Offices and households in the same city use the same menu and the same order line.",
          `Courier partners already working in ${siteConfig.city} carry the meals. We do not pretend to run their networks.`,
        ],
      },
      { type: "h2", id: "environment", text: "Environment" },
      {
        type: "p",
        text: "The waste we can actually reduce is food that was cooked for the wrong headcount and fuel spent on trips that could have been one drop. We have not bought a carbon-neutral label, and we will not print one.",
      },
      {
        type: "ul",
        items: [
          "Event trays and staff lunches are sized from the headcount you give us. If the number changes, tell us before we cook.",
          "Standing corporate orders are grouped into fewer deliveries when the site can take them together.",
          "Ice cream and parfait are called out in the order so they are not packed as if they were shawarma, then discarded on arrival.",
          "We will say if a greener packing option is not available, rather than describe ordinary boxes as compostable.",
        ],
      },
      { type: "h2", id: "social-logistics", text: "Social Logistics" },
      {
        type: "p",
        text: `Delivery only works if the person at the gate and the person on the bike have the same instructions. That is a working-conditions issue as much as a customer issue.`,
      },
      {
        type: "ul",
        items: [
          "Every order needs a reachable phone number and a landmark or reception note before we dispatch.",
          "Office security rules belong in the first message, not in a call after the courier is downstairs.",
          "The food total and the delivery fee are confirmed before anyone leaves with the order.",
          "Shift meals and evening events are planned as timed handovers, not as an open-ended wait.",
          "You can order on WhatsApp. You do not need another account on this website.",
        ],
      },
      { type: "h2", id: "diversity", text: "Diversity and Inclusion" },
      {
        type: "p",
        text: "People order from us as staff, as hosts, as shopkeepers, and as individuals. The line does not sort them by the size of the company on the email signature.",
      },
      {
        type: "ul",
        items: [
          "The menu includes heavier meals and lighter ones, including parfait, so a mixed group is not stuck with a single style of plate.",
          "Dietary and allergen requests are taken before confirmation. If the kitchen cannot separate an allergen, we say that.",
          "The website is built with headings, named links, text alternatives on photographs, and a carousel that pauses and respects reduced motion.",
          "If a page blocks you, write to us and we will send the same information in text.",
          "We have not published a diversity audit. Inclusion here means access to the order, the information, and a straight answer.",
        ],
      },
    ],
  },
  security: {
    slug: "security",
    label: "Security",
    eyebrow: "Trust",
    title: "Security",
    description: `How ${siteConfig.name} handles orders, messages, and this website.`,
    summary: "What we protect, what we do not store, and how to report a problem.",
    updated: legalUpdated,
    blocks: [
      {
        type: "p",
        text: "This website is a shopfront. It shows the menu, explains how ordering works, opens a WhatsApp chat, and can take a registration or an order on the site. It is not a payment page. Registrations and website orders are kept so the kitchen can prepare them and send your confirmation.",
      },
      { type: "h2", text: "Orders and payment" },
      {
        type: "ul",
        items: [
          "We confirm the food total and any delivery fee before dispatch.",
          "We do not ask you to type a card number into this website.",
          "If a payment link is used, it is the link of the payment provider or bank we name in the message. Do not pay a different account because someone forwarded a new number.",
          "We will not ask for your password, one-time code, or a remote-access app.",
        ],
      },
      { type: "h2", text: "Messages" },
      {
        type: "p",
        text: `Order details travel over WhatsApp to ${siteConfig.phoneDisplay} or by email to ${siteConfig.email}. WhatsApp is operated by Meta, under Meta’s terms. Treat the phone number on this website as the only kitchen line. If a different number claims to be ${siteConfig.name}, check it against ${siteConfig.phoneDisplay} before you pay.`,
      },
      { type: "h2", text: "The website" },
      {
        type: "ul",
        items: [
          "Pages are served over HTTPS.",
          "We do not run a public comment box or a customer-to-customer marketplace.",
          "Cookie preferences are stored in your browser. See the cookies policy.",
          "We do not sell lists of people who wrote to us.",
        ],
      },
      { type: "h2", text: "Report a concern" },
      {
        type: "p",
        text: `If you think an order message was tampered with, or you received a suspicious payment request using our name, email ${siteConfig.email} and message ${siteConfig.phoneDisplay}. Include the time and a screenshot if you have one. We would rather check a false alarm than miss a real one.`,
      },
    ],
  },
  terms: {
    slug: "terms",
    label: "Terms & Conditions",
    eyebrow: "Legal",
    title: "Terms & Conditions",
    description: `The terms that apply when you order from ${siteConfig.name} or use this website.`,
    summary: `These terms apply to the website and to orders placed with ${siteConfig.name} in ${siteConfig.location}.`,
    updated: legalUpdated,
    disclaimer: true,
    blocks: [
      {
        type: "p",
        text: `The business is ${siteConfig.name}, operating from ${siteConfig.location}. Contact: ${siteConfig.phoneDisplay} and ${siteConfig.email}.`,
      },
      { type: "h2", text: "Orders" },
      {
        type: "p",
        text: "An order is an offer from you. It becomes a confirmed order when we accept it in a reply that states the items, quantity, price, delivery area, and timing. A menu photo or a page on this website is an invitation to ask, not a confirmed booking.",
      },
      {
        type: "p",
        text: "Prices can change with the market and with quantity. The price that binds us is the one in the confirmation, not an older chat or a guess from a similar order.",
      },
      { type: "h2", text: "Delivery" },
      {
        type: "p",
        text: `We prepare the food and hand it to a courier partner or arrange a direct drop. Delivery time is an estimate. Traffic, building access, and courier availability in ${siteConfig.city} affect it. You are responsible for a reachable phone number and for access instructions, including office security.`,
      },
      { type: "h2", text: "Wholesale" },
      {
        type: "p",
        text: "Wholesale supply is agreed per product, with a minimum quantity and a delivery or collection plan. Resale is your responsibility, including storage at a safe temperature after you receive the goods.",
      },
      { type: "h2", text: "Cancellations and problems" },
      {
        type: "p",
        text: "Tell us immediately if you need to cancel or if the food arrives damaged or incomplete. Orders already cooked or already with a courier may still be charged. We will replace or refund where the mistake is ours and the food cannot reasonably be eaten. Take a photo if you can.",
      },
      { type: "h2", text: "Allergens" },
      {
        type: "p",
        text: "Our kitchen handles common allergens. You must tell us about allergies before we confirm. We will say if we can prepare the order safely. If we cannot, we will decline it.",
      },
      { type: "h2", text: "The website" },
      {
        type: "p",
        text: "The text, photographs, and logo on this site belong to the business or are used with permission. Do not copy the logo or the photographs for your own shop. You may share a link.",
      },
      { type: "h2", text: "Liability" },
      {
        type: "p",
        text: `We are responsible for preparing the confirmed order with reasonable care. We are not responsible for delays caused by a courier network, a wrong address, or access we were not given. Nothing in these terms limits liability that the law of ${siteConfig.country} does not allow us to limit.`,
      },
      { type: "h2", text: "Law" },
      {
        type: "p",
        text: `These terms are governed by ${siteConfig.governingLaw}. Disputes should first be raised with us in writing so we can try to resolve them.`,
      },
    ],
  },
  privacy: {
    slug: "privacy",
    label: "Privacy Policy",
    eyebrow: "Legal",
    title: "Privacy Policy",
    description: `How ${siteConfig.name} handles personal information collected through this website and orders.`,
    summary: `This policy explains what ${siteConfig.name} receives when you write to us, and what we do with it.`,
    updated: legalUpdated,
    disclaimer: true,
    blocks: [
      {
        type: "p",
        text: `${siteConfig.name}, ${siteConfig.location}, is responsible for the personal information described here. Email ${siteConfig.email} or call ${siteConfig.phoneDisplay}.`,
      },
      { type: "h2", text: "What we receive" },
      {
        type: "ul",
        items: [
          "The name, phone number, and message you type into the contact form. Submitting copies that message and opens our WhatsApp chat; we receive it when you send it there.",
          "Your name, email or phone number, and whether you are a person or a company, when you register. Your order details when you place an order on the website. A confirmation is sent to that email or phone.",
          "Order details you send: items, quantity, address or area, timing, and any dietary note.",
          "Email if you write to us directly.",
          "The cookie choice stored in your browser. See the cookies policy.",
        ],
      },
      {
        type: "p",
        text: "We do not ask for card numbers, government identity numbers, or account passwords through this website. Do not send those.",
      },
      { type: "h2", text: "Why we use it" },
      {
        type: "ul",
        items: [
          "To confirm, prepare, and deliver the order you asked for.",
          "To send a quote for a corporate or wholesale supply.",
          "To answer a complaint or a security report.",
          `To meet a legal duty if one applies, such as a lawful request from an authority in ${siteConfig.country}.`,
        ],
      },
      { type: "h2", text: "Who else sees it" },
      {
        type: "p",
        text: "Courier partners receive the delivery details they need to complete the drop: typically a name, phone number, and address. WhatsApp (Meta) processes the chat under its own terms once you open it. Google may receive a technical request because this site loads fonts from Google Fonts. We do not sell personal information.",
      },
      { type: "h2", text: "How long we keep it" },
      {
        type: "p",
        text: "We keep order messages for as long as we need them to deliver, to handle a complaint, and to meet tax or accounting duties. We do not build a separate marketing database from this website.",
      },
      { type: "h2", text: "Your rights" },
      {
        type: "p",
        text: `The data protection framework in ${siteConfig.country}, including ${siteConfig.dataLaw}, gives you rights to ask what we hold, to correct it, and to object to use that is not required for the order. Write to ${siteConfig.email}. You may also complain to the ${publicReferences[0].name}.`,
      },
      {
        type: "p",
        text: `If you contact us from outside ${siteConfig.country}, we still handle the message for the purpose you wrote. We do not claim to be established in the European Union, and we have not appointed an EU representative.`,
      },
    ],
  },
  cookies: {
    slug: "cookies",
    label: "Cookies Policy",
    eyebrow: "Legal",
    title: "Cookies Policy",
    description: `What ${siteConfig.name} stores in your browser, and how to change it.`,
    summary: "We store a small preference so the site remembers your cookie choice. We do not run advertising cookies.",
    updated: legalUpdated,
    disclaimer: true,
    blocks: [
      {
        type: "p",
        text: "A cookie is a small file a site can store on your device. This site uses your browser’s local storage for the same kind of choice: whether you have already answered the cookie banner.",
      },
      { type: "h2", text: "What we store" },
      {
        type: "ul",
        items: [
          "Strictly necessary: your cookie decision, so the banner does not return on every page.",
          "Preferences: a category we keep available for a future display setting. It is off unless you enable it, and nothing else reads it today.",
          "Analytics: off unless you enable it. We do not load an analytics product today. If we add one, it will respect this switch.",
        ],
      },
      { type: "h2", text: "Other requests" },
      {
        type: "p",
        text: "The pages load typefaces from Google Fonts. That is a request to Google’s servers and is covered in the privacy policy. It is not an advertising cookie set by us.",
      },
      {
        type: "links",
        items: [
          { href: "/cookies/configure", label: "Configure the cookies", note: "Change or clear the choice in this browser." },
        ],
      },
    ],
  },
  compliance: {
    slug: "compliance",
    label: "Compliance",
    eyebrow: "Legal",
    title: "Compliance",
    description: `The standards ${siteConfig.name} holds itself to on food, advertising, data, and partners.`,
    summary: "How we keep the public promises on this website aligned with the way orders are actually taken.",
    updated: legalUpdated,
    disclaimer: true,
    blocks: [
      {
        type: "p",
        text: `${siteConfig.name} sells food in ${siteConfig.location}. The obligations that matter most are straightforward: prepare food with care, describe it honestly, handle personal details lawfully, and use courier partners without pretending we operate their apps.`,
      },
      { type: "h2", text: "Food" },
      {
        type: "ul",
        items: [
          "Menus describe what we intend to serve. If an item is unavailable, we say so before we confirm.",
          "Allergen questions are answered before confirmation, or the order is declined.",
          "Cold items are packed as cold items. We ask you to tell us when ice cream or parfait is in the order.",
          "Wholesale buyers are told how to receive and hold the goods. Safety after a proper handover is shared with the buyer.",
        ],
      },
      { type: "h2", text: "Advertising" },
      {
        type: "p",
        text: "Photographs on the site show the style of food we sell. A plated photograph is not a guarantee that every tray will be styled identically. Quantities in a confirmation message control the order.",
      },
      { type: "h2", text: "Data and payments" },
      {
        type: "p",
        text: `Personal information is handled as described in the privacy policy, in line with data protection law in ${siteConfig.country}. Card numbers are not collected on this website.`,
      },
      { type: "h2", text: "Partners" },
      {
        type: "p",
        text: `${courierLabelList()} are separate from ${siteConfig.name}. Their fees, memberships, and support teams are their own. We do not speak for them.`,
      },
      {
        type: "p",
        text: `Concerns about our own conduct can be sent to ${siteConfig.email}.`,
      },
    ],
  },
  "digital-services-act": {
    slug: "digital-services-act",
    label: "Digital Services Act",
    eyebrow: "Legal",
    title: "Digital Services Act",
    description: `How the EU Digital Services Act relates to this ${siteConfig.city} food business and its website.`,
    summary: "We publish our own pages. We do not host other people’s listings, and we are not an EU online platform.",
    updated: legalUpdated,
    disclaimer: true,
    blocks: [
      {
        type: "p",
        text: "The Digital Services Act is a European Union law. It mainly regulates intermediary services: companies that host or transmit other people’s content, and online platforms that connect sellers or users. It is aimed at services offered in the Union.",
      },
      {
        type: "p",
        text: `${siteConfig.name} is a food business in ${siteConfig.location}. This website describes our menu and how to order from us. Visitors do not open accounts, post reviews, or sell to each other here. We are the seller of the meals we confirm.`,
      },
      { type: "h2", text: "What that means in practice" },
      {
        type: "ul",
        items: [
          "We are not a hosting intermediary and we do not operate a marketplace.",
          "We are not established in the European Union and we have not appointed an EU legal representative.",
          "The business identity, phone number, and email are published on every page of this site.",
          `If you believe a page we wrote is unlawful, email the URL and the reason to ${siteConfig.email}. We will read notices about our own content. We cannot take down content inside a courier app; those companies moderate their own services.`,
        ],
      },
      {
        type: "p",
        text: `Ordering food from us remains a contract under the terms on this site and under the law of ${siteConfig.country}, including when a courier partner carries the meal.`,
      },
    ],
  },
  "european-accessibility-act": {
    slug: "european-accessibility-act",
    label: "European Accessibility Act",
    eyebrow: "Legal",
    title: "European Accessibility Act",
    description: "How this website is built to be usable, and how to ask for help if a page gets in the way.",
    summary: "The European Accessibility Act sets accessibility duties for certain products and services offered to consumers in the EU. This page states what we actually do on this site.",
    updated: legalUpdated,
    disclaimer: true,
    blocks: [
      {
        type: "p",
        text: `${siteConfig.name} is based in ${siteConfig.location} and sells primarily to customers there. We have not issued an EU declaration of conformity under the European Accessibility Act, and we do not present this page as one.`,
      },
      { type: "h2", text: "How the site is built" },
      {
        type: "ul",
        items: [
          "Pages use headings, links with names, and buttons that can be reached with a keyboard.",
          "Food photographs include text alternatives.",
          "The colour pair is dark green and orange on white, chosen for contrast.",
          "The homepage carousel pauses while you hover or focus it, and it respects a request for reduced motion.",
          "The cookie banner can be accepted, limited to essential storage, or configured.",
          "We do not rely on text baked into photographs for prices or instructions.",
        ],
      },
      { type: "h2", text: "If something blocks you" },
      {
        type: "p",
        text: `Email ${siteConfig.email} or WhatsApp ${siteConfig.phoneDisplay}. Say which page, what you were trying to do, and the assistive technology if you use one. We will reply with the information in text and correct the page when the barrier is ours.`,
      },
      {
        type: "p",
        text: `Courier apps are separate products. A barrier inside one of those apps has to be raised with that company. We can still take the same order directly.`,
      },
    ],
  },
} satisfies Record<string, InfoPage>;

export type InfoSlug = keyof typeof infoPages;

export const infoPageList = Object.values(infoPages);

export const companyFooterLinks = [
  infoPages.about,
  infoPages.faq,
  { slug: "blog", label: "Blog", href: "/blog" },
  infoPages.security,
  infoPages.links,
] as const;

export const impactFooterLinks = [
  { label: "Our Commitments", href: "/impact#commitments" },
  { label: "Local Commerce", href: "/impact#local-commerce" },
  { label: "Environment", href: "/impact#environment" },
  { label: "Social Logistics", href: "/impact#social-logistics" },
  { label: "Diversity and Inclusion", href: "/impact#diversity" },
] as const;

export const legalFooterLinks = [
  infoPages.terms,
  infoPages.privacy,
  infoPages.cookies,
  infoPages.compliance,
  { slug: "configure", label: "Configure the cookies", href: "/cookies/configure" },
  infoPages["digital-services-act"],
  infoPages["european-accessibility-act"],
] as const;

export const cookieBannerCopy = {
  title: "Cookies on this site",
  body: `${siteConfig.name} stores your cookie choice in this browser. We do not run advertising or analytics cookies unless you opt in. Analytics are not in use today.`,
  accept: "Accept all",
  essential: "Essential only",
  configure: "Configure the cookies",
} as const;

export const blogIndex = {
  title: "Blog",
  description: `Notes from ${siteConfig.name} on office lunches, event trays, and wholesale supply in ${siteConfig.city}.`,
  summary: "Practical notes for the people who actually place the order.",
  posts: blogPosts,
};
