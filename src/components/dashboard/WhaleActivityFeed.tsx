import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react";
import { useWhaleActivity } from "@/hooks/useWhaleActivity";
import { formatDistanceToNow } from "date-fns";

export function WhaleActivityFeed() {
  const { data: activities, isLoading } = useWhaleActivity();

  return (
    <div className="glass-card p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Whale Activity Feed</h3>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse-glow" />
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>
      
      <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin">
        {isLoading && (
          <div className="text-center py-8 text-muted-foreground">
            Loading activity...
          </div>
        )}
        {!isLoading && (!activities || activities.length === 0) && (
          <div className="text-center py-8 text-muted-foreground">
            No whale activity yet. Waiting for transactions...
          </div>
        )}
        {activities?.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-4 flex-1">
              <div
                className={cn(
                  "p-2 rounded-lg",
                  activity.direction === "BUY" ? "bg-success/20" : "bg-destructive/20"
                )}
              >
                {activity.direction === "BUY" ? (
                  <ArrowUpRight className="w-5 h-5 text-success" />
                ) : (
                  <ArrowDownRight className="w-5 h-5 text-destructive" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-medium uppercase",
                      activity.direction === "BUY" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                    )}
                  >
                    {activity.direction}
                  </span>
                  <span className="font-semibold">{activity.asset_name}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.shares.toLocaleString()} shares @ {activity.price_qubic} QUBIC
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1 font-mono truncate">
                  {activity.issuer.slice(0, 12)}...{activity.issuer.slice(-8)}
                </p>
              </div>
            </div>
            
            <div className="text-right flex items-center gap-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                </p>
                <p className="text-xs text-muted-foreground/60 font-mono">
                  Tick: {activity.tick_number}
                </p>
              </div>
              <a
                href={`https://explorer.qubic.org/network/tx/${activity.tx_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
