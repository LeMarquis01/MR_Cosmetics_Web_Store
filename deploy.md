# Deployment to Vercel

## Quick Deploy (Option 1 - CLI)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

## Option 2 - GitHub Integration

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Go to https://vercel.com and click "Add New Project"

3. Import from GitHub

4. Add environment variables in Vercel dashboard:
   - DATABASE_URL (when you have PostgreSQL)
   - STRIPE_SECRET_KEY
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   - RESEND_API_KEY
   - NEXT_PUBLIC_GA_MEASUREMENT_ID

## Database Setup

For Vercel, use Vercel Postgres or Neon:
- Vercel Postgres: Create in Vercel Dashboard > Storage
- Neon: neon.tech (free tier)
- Supabase: supabase.com (free tier with PostgreSQL)

Then update DATABASE_URL in Vercel project settings.