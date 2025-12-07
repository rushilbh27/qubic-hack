# QUBIC Whale Tracker - Setup Guide

## ✅ Current Status

**Dual Dashboard Architecture Complete:**
- ✅ Public Dashboard (no login) - Live whale tracking, signals, airdrops
- ✅ Admin Dashboard (login required) - Whale management, signal & airdrop control
- ✅ Supabase integration with real-time data
- ✅ React Query for data fetching & caching
- ✅ Auth system with Supabase Auth

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd /Users/rushilbhor/Downloads/qubic-hack-dashboard
npm install
```

### 2. Setup Supabase Database

Go to your Supabase SQL Editor and run the complete schema from `db/schema.sql`:

This will create:
- `whales` table (whale wallet tracking)
- `trend_signals` table (market signals)
- `airdrops` table (airdrop eligibility & claims)
- `whale_activity` table (transaction log)
- Sample seed data for all tables
- Row Level Security policies

### 3. Create Admin User

In Supabase Dashboard → Authentication → Users:
- Click "Add User"
- Email: `admin@qubic.com` (or your choice)
- Password: Create a secure password
- Confirm email: Toggle ON

**Save these credentials!** You'll use them to login at `/admin/login`

### 4. Environment Variables

Your `.env.local` is already configured:
```ini
VITE_SUPABASE_URL=https://kknzjuvffeeiovozfghe.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5. Run the App
```bash
npm run dev
```

Visit:
- **Public Dashboard**: http://localhost:8081/
- **Admin Login**: http://localhost:8081/admin/login
- **Admin Dashboard**: http://localhost:8081/admin (after login)

---

## 📊 Public Dashboard Features

**URL**: `/`

Displays:
- ✅ Live QX Price Chart (TokenChart)
- ✅ Real-time Whale Activity Feed (from `whale_activity` table)
- ✅ Market Trend Signals (from `trend_signals` table)
- ✅ Stats Cards (whales tracked, volume, alerts)
- ✅ Top Whales Table (from `whales` table)
- ✅ Recent Airdrop Winners (from `airdrops` where claimed=true)

**Data Updates:**
- Whale activity: Every 10 seconds
- Trend signals: Every 30 seconds
- Airdrop winners: Every 20 seconds

---

## 🔐 Admin Dashboard Features

**Login**: `/admin/login`
**Dashboard**: `/admin`

Use the admin credentials you created in Supabase.

### Admin Routes:
- `/admin` - Overview with metrics
- `/admin/whales` - Full whale management table
- `/admin/signals` - Signal manager (coming soon)
- `/admin/airdrops` - Airdrop approval & claims (coming soon)
- `/admin/settings` - System settings (coming soon)

**Admin Capabilities (when fully implemented):**
- View all whale transactions with full details
- Manage trend signals (delete low-confidence ones)
- Approve/deny airdrop eligibility
- Mark airdrops as claimed
- Export data to CSV
- Configure system thresholds

---

## 🗂️ Database Tables

### `whales`
Tracks whale wallets and their holdings.
```sql
- address (unique)
- label (e.g., "Jump Trading")
- holdings
- change24h
- lastActivity
```

### `whale_activity`
Transaction log for whale movements.
```sql
- wallet
- action (BUY, SELL, TRANSFER)
- token
- amount
- usd_value
- created_at
```

### `trend_signals`
Market trend indicators.
```sql
- trend (UP, DOWN, FLAT)
- confidence (0-100)
- reason
- created_at
```

### `airdrops`
Airdrop eligibility and claims.
```sql
- wallet_address (unique)
- tx_count
- total_volume
- is_eligible
- amount
- claimed
- claimed_at
```

---

## 🎨 Theme & Components

**Uses existing dark cyberpunk theme from `index.css`:**
- Space Grotesk font
- JetBrains Mono for monospace
- CSS variables: `--primary`, `--accent`, `--success`, etc.
- Glass cards: `className="glass-card"`
- Glowing effects: `glow-primary`, `glow-accent`
- Gradients: `text-gradient-primary`

**Existing Components Used:**
- `Header.tsx` → `PublicHeader.tsx`
- `StatsCard.tsx` ✅
- `TokenChart.tsx` ✅
- `AlertsPanel.tsx` ✅ (now showing trend signals)
- `WhaleActivityFeed.tsx` ✅ (now live from Supabase)
- `TopWhales.tsx` ✅
- **NEW**: `AirdropWinners.tsx` ✅

---

## 🔌 Data Hooks (React Query)

All data is fetched via React Query hooks:

```tsx
import { useWhales } from "@/hooks/useWhales";
import { useWhaleActivity } from "@/hooks/useWhaleActivity";
import { useTrendSignals } from "@/hooks/useTrendSignals";
import { useAirdrops, useAirdropWinners } from "@/hooks/useAirdrops";
```

### Example Usage:
```tsx
const { data: whales, isLoading } = useWhales();
const { data: signals } = useTrendSignals();
const { mutate: markClaimed } = useMarkAsClaimed();
```

---

## 🛠️ Next Steps (For You to Complete)

### Admin Airdrop Manager
Create `/admin/airdrops` page:
- Table showing all wallets from `airdrops` table
- Columns: wallet, tx_count, total_volume, is_eligible, amount, claimed
- Actions: "Approve", "Mark as Claimed", "Deny"
- Search/filter by wallet address

### Admin Signals Manager
Create `/admin/signals` page:
- Table of all signals from `trend_signals`
- Ability to delete low-confidence signals
- Add manual signal form

### Admin Settings
Create `/admin/settings` page:
- Min transaction volume for eligibility
- Toggle whale alerts on/off
- Set airdrop thresholds
- Add new tokens to track

### Export to CSV
Add export button on admin tables:
```tsx
const exportToCSV = (data: any[]) => {
  const csv = /* convert to CSV */;
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'whales.csv';
  a.click();
};
```

---

## ✅ Production Checklist

Before deploying:
1. [ ] Change default admin credentials
2. [ ] Update RLS policies for production security
3. [ ] Add rate limiting to Supabase
4. [ ] Set up monitoring/logging
5. [ ] Test all admin actions
6. [ ] Update meta tags in `index.html`
7. [ ] Add error boundaries
8. [ ] Test on mobile devices

---

## 🐛 Troubleshooting

**Blank dashboard?**
- Check browser console for errors
- Verify Supabase credentials in `.env.local`
- Run database schema from `db/schema.sql`

**Can't login to admin?**
- Verify admin user exists in Supabase Auth
- Check email/password are correct
- Clear browser cache

**No data showing?**
- Check Supabase tables have seed data
- Verify RLS policies allow public read
- Check Network tab for failed requests

**CSS not loading?**
- Restart dev server
- Clear Vite cache: `rm -rf node_modules/.vite`

---

## 📝 Notes

- n8n integration is **intentionally hidden** from public view
- All automation happens in background
- Public only sees final results (signals, airdrops, whale activity)
- Admin can see full system internals

**Dev Server**: http://localhost:8081
**Supabase Project**: kknzjuvffeeiovozfghe.supabase.co
