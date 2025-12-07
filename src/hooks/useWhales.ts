import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface WhaleTransaction {
  id: number;
  tx_id: string;
  tick_number: number;
  timestamp: number;
  direction: "BUY" | "SELL";
  asset_name: string;
  shares: number;
  price_qubic: number;
  price_usdt?: number;
  total_value_usdt?: number;
  issuer: string;
  source: string;
  dest: string;
  raw?: any;
  created_at: string;
}

async function fetchWhaleTransactions(): Promise<WhaleTransaction[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .gte("shares", 100000) // Only whale transactions (>= 100k shares)
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) throw error;
  return data ?? [];
}

export function useWhaleTransactions() {
  return useQuery({
    queryKey: ["whale_transactions"],
    queryFn: fetchWhaleTransactions,
    retry: 1,
    refetchInterval: 10000, // Refresh every 10s
  });
}
