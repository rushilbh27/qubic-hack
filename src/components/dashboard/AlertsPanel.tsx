import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTrendSignals } from "@/hooks/useTrendSignals";
import { formatDistanceToNow } from "date-fns";

export function AlertsPanel() {
  const { data: signals, isLoading } = useTrendSignals();

  const getTrendIcon = (trend: string) => {
    if (trend === "UP") return TrendingUp;
    if (trend === "DOWN") return TrendingDown;
    return Minus;
  };

  const getTrendColor = (trend: string) => {
    if (trend === "UP") return "text-success bg-success/20";
    if (trend === "DOWN") return "text-destructive bg-destructive/20";
    return "text-muted-foreground bg-secondary";
  };

  return (
    <div className="glass-card p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Market Signals</h3>
        <span className="text-sm text-muted-foreground">
          {signals?.filter((s) => s.confidence > 70).length ?? 0} high confidence
        </span>
      </div>

      <div className="space-y-3 max-h-[350px] overflow-y-auto scrollbar-thin">
        {isLoading && (
          <div className="text-center py-8 text-muted-foreground">
            Loading signals...
          </div>
        )}
        {signals?.map((signal, index) => {
          const Icon = getTrendIcon(signal.trend);
          const isHighConfidence = signal.confidence > 70;
          
          return (
            <div
              key={signal.id}
              className={cn(
                "p-4 rounded-xl border transition-all hover:scale-[1.02] cursor-pointer",
                isHighConfidence
                  ? "border-primary/50 bg-primary/5"
                  : "border-border bg-secondary/30"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className={cn("p-2 rounded-lg", getTrendColor(signal.trend))}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-medium text-sm">
                      {signal.trend} Signal
                    </h4>
                    {isHighConfidence && (
                      <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      Confidence: {signal.confidence.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {signal.reason}
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    {formatDistanceToNow(new Date(signal.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
