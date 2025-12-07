import { ExternalLink, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWhaleTransactions } from "@/hooks/useWhales";
import { formatDistanceToNow } from "date-fns";

export function TopWhales() {
  const { data: transactions, isLoading, isError } = useWhaleTransactions();

  return (
    <div className="glass-card p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Whale Transactions</h3>
        <span className="text-xs text-muted-foreground">Shares ≥ 100k</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-muted-foreground border-b border-border">
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Asset</th>
              <th className="pb-3 font-medium text-right">Shares</th>
              <th className="pb-3 font-medium text-right">Price</th>
              <th className="pb-3 font-medium">Issuer</th>
              <th className="pb-3 font-medium text-right">Time</th>
              <th className="pb-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={7} className="py-6 text-center text-sm text-muted-foreground">
                  Loading whale transactions...
                </td>
              </tr>
            )}
            {isError && (
              <tr>
                <td colSpan={7} className="py-6 text-center text-sm text-warning">
                  Could not load transaction data.
                </td>
              </tr>
            )}
            {!isLoading && !isError && (!transactions || transactions.length === 0) && (
              <tr>
                <td colSpan={7} className="py-6 text-center text-sm text-muted-foreground">
                  No whale transactions found. Run db/schema.sql in Supabase.
                </td>
              </tr>
            )}
            {!isLoading && !isError && transactions?.map((tx, index) => (
              <tr
                key={tx.tx_id}
                className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="py-4">
                  <span
                    className={cn(
                      "text-xs px-2 py-1 rounded-full font-medium uppercase",
                      tx.direction === "BUY" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                    )}
                  >
                    {tx.direction === "BUY" ? "🟢 BUY" : "🔴 SELL"}
                  </span>
                </td>
                <td className="py-4 font-mono font-semibold">{tx.asset_name}</td>
                <td className="py-4 text-right font-mono">
                  {tx.shares.toLocaleString()}
                </td>
                <td className="py-4 text-right font-mono text-sm">
                  {tx.price_qubic} QUBIC
                </td>
                <td className="py-4">
                  <span className="font-mono text-sm">
                    {tx.issuer.slice(0, 8)}...{tx.issuer.slice(-6)}
                  </span>
                </td>
                <td className="py-4 text-right text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(tx.created_at), { addSuffix: true })}
                </td>
                <td className="py-4 text-right">
                  <a
                    href={`https://explorer.qubic.org/network/tx/${tx.tx_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
