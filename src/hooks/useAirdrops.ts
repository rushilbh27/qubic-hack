import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface Airdrop {
  id: number;
  wallet_address: string;
  tx_count: number;
  total_volume: number;
  is_eligible: boolean;
  amount: number;
  claimed: boolean;
  approved_by?: string;
  claimed_at?: string;
  created_at: string;
}

async function fetchAirdrops(): Promise<Airdrop[]> {
  const { data, error } = await supabase
    .from("airdrops")
    .select("*")
    .order("total_volume", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

async function fetchAirdropWinners(): Promise<Airdrop[]> {
  const { data, error } = await supabase
    .from("airdrops")
    .select("*")
    .eq("claimed", true)
    .order("claimed_at", { ascending: false })
    .limit(10);
  if (error) throw error;
  return data ?? [];
}

async function markAsClaimed(id: number): Promise<void> {
  const { error } = await supabase
    .from("airdrops")
    .update({ claimed: true, claimed_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export function useAirdrops() {
  return useQuery({
    queryKey: ["airdrops"],
    queryFn: fetchAirdrops,
    retry: 1,
  });
}

export function useAirdropWinners() {
  return useQuery({
    queryKey: ["airdrop_winners"],
    queryFn: fetchAirdropWinners,
    retry: 1,
    refetchInterval: 20000,
  });
}

export function useMarkAsClaimed() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: markAsClaimed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["airdrops"] });
      queryClient.invalidateQueries({ queryKey: ["airdrop_winners"] });
    },
  });
}
