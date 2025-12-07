import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface WhaleActivity {
  id: number;
  tx_id: string;
  tick_number: number;
  timestamp: number;
  direction: "BUY" | "SELL";
  asset_name: string;
  shares: number;
  price_qubic: number;
  issuer: string;
  created_at: string;
}

async function fetchWhaleActivity(): Promise<WhaleActivity[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select("id, tx_id, tick_number, timestamp, direction, asset_name, shares, price_qubic, issuer, created_at")
    .gte("shares", 100000) // Whale threshold
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) throw error;
  return data ?? [];
}

export function useWhaleActivity() {
  return useQuery({
    queryKey: ["whale_activity"],
    queryFn: fetchWhaleActivity,
    retry: 1,
    refetchInterval: 10000, // Refresh every 10s for live feed
  });
}
