import { AdminLayout } from "@/components/layout/AdminLayout";
import { useWhaleTransactions } from "@/hooks/useWhales";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export default function AdminWhales() {
  const { data: transactions, isLoading } = useWhaleTransactions();

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Whale Transactions Management</h1>
        <p className="text-muted-foreground">
          View and manage whale transactions (shares ≥ 100k)
        </p>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">All Whale Transactions</h2>
          <span className="text-sm text-muted-foreground">
            {transactions?.length ?? 0} transactions
          </span>
        </div>

        {isLoading && (
          <div className="text-center py-12 text-muted-foreground">
            Loading transactions...
          </div>
        )}

        {!isLoading && (!transactions || transactions.length === 0) && (
          <div className="text-center py-12 text-muted-foreground">
            No whale transactions found.
          </div>
        )}

        {!isLoading && transactions && transactions.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground border-b border-border">
                  <th className="pb-3 font-medium">ID</th>
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
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-4 font-mono text-sm text-muted-foreground">
                      #{tx.id}
                    </td>
                    <td className="py-4">
                      <span
                        className={cn(
                          "text-xs px-2 py-1 rounded-full font-medium",
                          tx.direction === "BUY" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                        )}
                      >
                        {tx.direction}
                      </span>
                    </td>
                    <td className="py-4 font-mono font-semibold">
                      {tx.asset_name}
                    </td>
                    <td className="py-4 text-right font-mono">
                      {tx.shares.toLocaleString()}
                    </td>
                    <td className="py-4 text-right font-mono text-sm">
                      {tx.price_qubic}
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
        )}
      </div>
    </AdminLayout>
  );
}
