-- QUBIC Whale Tracker - Complete Database Schema
-- Run this in Supabase SQL Editor

-- 1. TRANSACTIONS TABLE (whale activity from n8n)
create table if not exists public.transactions (
  id bigint generated always as identity primary key,
  tx_id text not null unique,
  tick_number bigint,
  timestamp bigint,
  direction text, -- 'BUY' or 'SELL'
  asset_name text,
  shares bigint,
  price_qubic integer,
  price_usdt numeric,
  total_value_usdt numeric,
  issuer text,
  source text,
  dest text,
  raw jsonb,
  created_at timestamptz default now()
);

-- 2. TREND SIGNALS TABLE
create table if not exists public.trend_signals (
  id bigint generated always as identity primary key,
  trend text not null, -- 'UP', 'DOWN', 'FLAT'
  confidence numeric not null, -- 0-100
  reason text,
  created_at timestamptz default now()
);

-- 3. AIRDROPS TABLE (Main eligibility & claims tracker)
create table if not exists public.airdrops (
  id bigint generated always as identity primary key,
  wallet_address text not null unique,
  tx_count int default 0,
  total_volume numeric default 0,
  is_eligible boolean default false,
  amount numeric default 0,
  claimed boolean default false,
  approved_by text,
  claimed_at timestamptz,
  created_at timestamptz default now()
);



-- Enable Row Level Security
alter table public.transactions enable row level security;
alter table public.trend_signals enable row level security;
alter table public.airdrops enable row level security;

-- Public read policies (anyone can view)
create policy "Allow public read on transactions" on public.transactions for select using (true);
create policy "Allow public read on signals" on public.trend_signals for select using (true);
create policy "Allow public read on airdrops" on public.airdrops for select using (true);

-- Admin write policies (authenticated users only)
create policy "Allow authenticated insert on transactions" on public.transactions for insert to authenticated with check (true);
create policy "Allow authenticated update on transactions" on public.transactions for update to authenticated using (true);
create policy "Allow authenticated delete on transactions" on public.transactions for delete to authenticated using (true);

create policy "Allow authenticated insert on signals" on public.trend_signals for insert to authenticated with check (true);
create policy "Allow authenticated update on signals" on public.trend_signals for update to authenticated using (true);
create policy "Allow authenticated delete on signals" on public.trend_signals for delete to authenticated using (true);

create policy "Allow authenticated insert on airdrops" on public.airdrops for insert to authenticated with check (true);
create policy "Allow authenticated update on airdrops" on public.airdrops for update to authenticated using (true);
create policy "Allow authenticated delete on airdrops" on public.airdrops for delete to authenticated using (true);

-- Allow public insert on transactions (for n8n webhook)
create policy "Allow public insert on transactions" on public.transactions for insert with check (true);

-- SEED DATA (sample whale transactions)
insert into public.transactions (tx_id, tick_number, timestamp, direction, asset_name, shares, price_qubic, issuer, source, dest)
values
  ('sktxtzrairtlvdtaehkzchuvonlcawrmudzibitiadilpgzykgedcthfjugh', 38922114, extract(epoch from now() - interval '2 minutes') * 1000, 'BUY', 'GARTH', 5000000, 43, 'GARTHFANXMPXMDPEZFQPWFPYMHOAWTKILINCTRMVLFFVATKVJRKEDYXGHJBF', 'BGIJDMEMOETGSARQTMMQXWBJKJPCSDAPLDTMQXIYDFDDEPDDZJFQIBDCPONE', 'BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARMID'),
  ('abc123def456ghi789jkl012mno345pqr678stu901vwx234yza567bcd890efg', 38922000, extract(epoch from now() - interval '8 minutes') * 1000, 'SELL', 'QX', 250000, 1200, 'ANOTHERWHALEADDRESSXMPXMDPEZFQPWFPYMHOAWTKILINCTRMVLFFVF', 'SOURCEADDRESSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'DESTADDRESSBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'),
  ('xyz789abc123def456ghi789jkl012mno345pqr678stu901vwx234yza', 38921900, extract(epoch from now() - interval '15 minutes') * 1000, 'BUY', 'QUBIC', 150000, 850, 'THIRDWHALEADDRESSXMPXMDPEZFQPWFPYMHOAWTKILINCTRMVLFFVAT', 'SOURCEADDRESSCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC', 'DESTADDRESSDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD'),
  ('whale4tx5678buygarth901234567890abcdef1234567890abcdef12345', 38922200, extract(epoch from now() - interval '23 minutes') * 1000, 'BUY', 'GARTH', 180000, 44, 'FOURTHWHALEADDRESSXMPXMDPEZFQPWFPYMHOAWTKILINCTRMVLFFV', 'SOURCEADDRESSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', 'DESTADDRESSFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'),
  ('whale5tx9012sellqx345678901234567890abcdef1234567890abcdef', 38922180, extract(epoch from now() - interval '31 minutes') * 1000, 'SELL', 'QX', 320000, 1180, 'FIFTHWHALEADDRESSXMPXMDPEZFQPWFPYMHOAWTKILINCTRMVLFFVA', 'SOURCEADDRESSGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG', 'DESTADDRESSHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH'),
  ('whale6tx3456buyqubic678901234567890abcdef1234567890abcdef1', 38922150, extract(epoch from now() - interval '45 minutes') * 1000, 'BUY', 'QUBIC', 275000, 860, 'SIXTHWHALEADDRESSXMPXMDPEZFQPWFPYMHOAWTKILINCTRMVLFFVB', 'SOURCEADDRESSIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII', 'DESTADDRESSJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ'),
  ('whale7tx7890sellgarth234567890abcdef1234567890abcdef123456', 38922130, extract(epoch from now() - interval '52 minutes') * 1000, 'SELL', 'GARTH', 420000, 42, 'SEVENTHWHALEADDRESSXMPXMDPEZFQPWFPYMHOAWTKILINCTRMVLF', 'SOURCEADDRESSKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK', 'DESTADDRESSLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL'),
  ('whale8tx1234buyqx567890abcdef1234567890abcdef1234567890abc', 38922100, extract(epoch from now() - interval '1 hour 8 minutes') * 1000, 'BUY', 'QX', 195000, 1210, 'EIGHTHWHALEADDRESSXMPXMDPEZFQPWFPYMHOAWTKILINCTRMVLFF', 'SOURCEADDRESSMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM', 'DESTADDRESSNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN'),
  ('whale9tx5678sellqubic901234567890abcdef1234567890abcdef123', 38922080, extract(epoch from now() - interval '1 hour 22 minutes') * 1000, 'SELL', 'QUBIC', 165000, 855, 'NINTHWHALEADDRESSXMPXMDPEZFQPWFPYMHOAWTKILINCTRMVLFFV', 'SOURCEADDRESSOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO', 'DESTADDRESPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP'),
  ('whale10tx9012buygarth345678901234567890abcdef1234567890abc', 38922050, extract(epoch from now() - interval '1 hour 35 minutes') * 1000, 'BUY', 'GARTH', 385000, 45, 'TENTHWHALEADDRESSXMPXMDPEZFQPWFPYMHOAWTKILINCTRMVLFFVA', 'SOURCEADDRESSQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ', 'DESTADDRESSRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR')
on conflict (tx_id) do nothing;

insert into public.trend_signals (trend, confidence, reason, created_at)
values
  ('UP', 89.7, 'Multiple large GARTH buy orders detected - 5M+ shares accumulated in last hour', now() - interval '2 minutes'),
  ('UP', 82.4, 'Strong buying momentum across QX and QUBIC - whale wallets adding positions', now() - interval '11 minutes'),
  ('DOWN', 67.3, 'Profit-taking detected - 420k GARTH shares sold by major holder', now() - interval '18 minutes'),
  ('UP', 91.2, 'Fresh capital inflow - 275k QUBIC shares bought above market price', now() - interval '28 minutes'),
  ('FLAT', 58.6, 'Balanced buy/sell activity - market in consolidation phase', now() - interval '35 minutes'),
  ('DOWN', 72.1, 'QX sell pressure increasing - 320k shares dumped by whale wallet', now() - interval '42 minutes'),
  ('UP', 85.3, 'Accumulation pattern forming - consistent buy orders at support levels', now() - interval '56 minutes'),
  ('UP', 78.9, 'Whale wallet activity spiking - 195k QX shares acquired at premium', now() - interval '1 hour 3 minutes'),
  ('DOWN', 63.8, 'Minor selloff in QUBIC positions - 165k shares moved to exchange', now() - interval '1 hour 15 minutes'),
  ('UP', 87.1, 'Large GARTH accumulation - 385k shares bought in single transaction', now() - interval '1 hour 28 minutes')
on conflict do nothing;



insert into public.airdrops (wallet_address, tx_count, total_volume, is_eligible, amount, claimed)
values
  ('0x7a16ff8270133f063aab6c9977183d9e72f98817', 45, 125000, true, 5000, true),
  ('0x3b82ff8270133f063aab6c9977183d9e72f98817', 32, 98000, true, 3200, false),
  ('0x9f21ff8270133f063aab6c9977183d9e72f98817', 28, 75000, true, 2800, false),
  ('0x5c47ff8270133f063aab6c9977183d9e72f98817', 15, 45000, false, 0, false)
on conflict (wallet_address) do nothing;