import { Gift, CheckCircle2 } from "lucide-react";
import { useAirdropWinners } from "@/hooks/useAirdrops";
import { formatDistanceToNow } from "date-fns";

export function AirdropWinners() {
  const { data: winners, isLoading } = useAirdropWinners();

  return (
    <div className="glass-card p-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-success/20 glow-primary">
          <Gift className="w-6 h-6 text-success" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Recent Airdrop Winners</h3>
          <p className="text-sm text-muted-foreground">
            Latest claimed airdrops
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {isLoading && (
          <div className="text-center py-8 text-muted-foreground">
            Loading winners...
          </div>
        )}
        {winners && winners.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No airdrops claimed yet
          </div>
        )}
        {winners?.map((winner, index) => (
          <div
            key={winner.id}
            className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/20">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <span className="font-mono text-sm">
                  {winner.wallet_address.slice(0, 6)}...
                  {winner.wallet_address.slice(-4)}
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  {winner.tx_count} transactions • ${winner.total_volume.toLocaleString()} volume
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-success font-mono">
                +{winner.amount.toLocaleString()} QX
              </p>
              <p className="text-xs text-muted-foreground">
                {winner.claimed_at
                  ? formatDistanceToNow(new Date(winner.claimed_at), { addSuffix: true })
                  : "Recently"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
