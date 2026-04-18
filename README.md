# MR Cosmetics E-Commerce Store

A Next.js e-commerce store built with TypeScript, Tailwind CSS, Prisma, and PostgreSQL.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database URL
```

3. Set up database:
```bash
npx prisma db push
```

4. Run development server:
```bash
npm run dev
```

5. Open http://localhost:3000

## Project Structure

- `/src/app` - Next.js App Router pages and API routes
- `/src/components` - Reusable React components
- `/src/lib` - Utilities (Prisma client, cart store)
- `/src/types` - TypeScript type definitions
- `/prisma` - Database schema

## Pages

| Route | Description |
|-------|------------|
| `/` | Home page |
| `/products` | Product listing |
| `/products/[slug]` | Product detail |
| `/cart` | Shopping cart |
| `/checkout` | Checkout |
| `/order-confirmation` | Order confirmation |
| `/contact` | Contact form |
| `/policies` | Policies page |
| `/admin` | Admin dashboard |
| `/admin/orders` | Order management |
| `/admin/products` | Product management |

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Zustand (state management)
- Stripe (payments) - placeholder
- M-Pesa (payments) - placeholder
- Resend (emails) - placeholder

## Deployment

See `deploy.md` for Vercel deployment instructions.