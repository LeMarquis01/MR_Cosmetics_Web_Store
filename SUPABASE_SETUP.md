# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to https://supabase.com
2. Click "New Project"
3. Fill in details:
   - Name: `mr-cosmetics`
   - Database Password: Create a strong password (save it!)
   - Region: Select closest to your users
4. Wait for setup to complete (2-3 minutes)

## 2. Get Connection String

1. In Supabase dashboard, go to **Settings** (gear icon) → **Database**
2. Scroll to "Connection string"
3. Copy the **Postgres** connection string
4. Replace `[YOUR-PASSWORD]` with your actual password
5. The URL will look like:
   ```
   postgresql://postgres:yourpassword@db.xxxx.supabase.co:5432/postgres
   ```

## 3. Update Environment Variables

Edit `.env` with your Supabase URL:
```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxx.supabase.co:5432/postgres"
```

## 4. Push Schema to Database

```bash
npx prisma db push
```

## 5. Seed Sample Products

```bash
npm run db:seed
```

## 6. Deploy to Vercel

See `deploy.md` for full Vercel deployment steps.

---

## Quick Test (Local)

To test locally with Supabase:
1. Update `.env` with Supabase DATABASE_URL
2. Run `npx prisma db push`
3. Run `npm run dev`
4. Open http://localhost:3000