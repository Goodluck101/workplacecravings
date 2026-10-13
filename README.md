# Workplace Cravings — Website

Professional marketing site for **Workplace Cravings** (Lagos, Nigeria): shawarma, ice cream, parfait, small chops, burgers, corporate bulk orders, and wholesale.

## Stack

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS v4

## Getting started

```bash
cd /home/devops/workplace-cravings
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Business details

Business contact details live in `.env` (see `.env.example`). The site reads them at build time — phone, WhatsApp, email, hours, and the public name are not written into page components.

Menu copy, slides, and categories live in `src/lib/site.ts`.

## Pages

| Route        | Purpose                                      |
| ------------ | -------------------------------------------- |
| `/`          | Home                                         |
| `/menu`      | Full menu categories                         |
| `/business`  | Corporate & wholesale                        |
| `/delivery`  | Lagos delivery & couriers (Chowdeck, etc.)   |
| `/contact`   | Contact form → WhatsApp                      |

## Production build

```bash
npm run build
npm start
```

Logo: `public/images/logo.jpg`
