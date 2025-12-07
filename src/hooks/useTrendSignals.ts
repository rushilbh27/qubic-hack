import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface TrendSignal {
  id: number;
  trend: "UP" | "DOWN" | "FLAT";
  confidence: number;
  reason?: string;
  created_at: string;
}

async function fetchTrendSignals(): Promise<TrendSignal[]> {
  const { data, error } = await supabase
    .from("trend_signals")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);
  if (error) throw error;
  return data ?? [];
}

export function useTrendSignals() {
  return useQuery({
    queryKey: ["trend_signals"],
    queryFn: fetchTrendSignals,
    retry: 1,
    refetchInterval: 30000, // Refresh every 30s
  });
}
