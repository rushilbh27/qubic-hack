import { PublicLayout } from "@/components/layout/PublicLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { WhaleActivityFeed } from "@/components/dashboard/WhaleActivityFeed";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { TokenChart } from "@/components/dashboard/TokenChart";
import { AirdropWinners } from "@/components/dashboard/AirdropWinners";
import { Wallet, TrendingUp, Gift, DollarSign } from "lucide-react";
import { useWhaleTransactions } from "@/hooks/useWhales";
import { useAirdrops } from "@/hooks/useAirdrops";
import { useTrendSignals } from "@/hooks/useTrendSignals";

export default function PublicDashboard() {
  const { data: whaleTransactions, isLoading: whalesLoading } = useWhaleTransactions();
  const { data: airdrops, isLoading: airdropsLoading } = useAirdrops();
  const { data: signals, isLoading: signalsLoading } = useTrendSignals();

  // Show real data if available, otherwise show placeholder with warning
  const totalWhaleTransactions = whaleTransactions?.length ?? 0;
  const eligibleAirdrops = airdrops?.filter(a => a.is_eligible).length ?? 0;
  const claimedAirdrops = airdrops?.filter(a => a.claimed).length ?? 0;
  const highConfidenceSignals = signals?.filter(s => s.confidence > 70).length ?? 0;
  
  const hasData = totalWhaleTransactions > 0 || eligibleAirdrops > 0 || (signals?.length ?? 0) > 0;

  return (
    <PublicLayout>
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Q-WATCH <span className="text-gradient-primary">QUBIC Tracker</span>
        </h1>
        <p className="text-muted-foreground">
          Real-time QUBIC whale activity, market signals, and airdrop tracking
        </p>
        
        {!hasData && !whalesLoading && (
          <div className="mt-4 p-4 rounded-lg bg-warning/10 border border-warning/50">
            <p className="text-sm text-warning font-medium">
              ⚠️ Database not configured. Run the SQL schema in Supabase to see live data.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Go to Supabase → SQL Editor → Run <code className="px-1 py-0.5 bg-secondary rounded">db/schema.sql</code>
            </p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard 
          title="Whale Transactions" 
          value={totalWhaleTransactions.toString()} 
          change="Shares ≥ 100k" 
          changeType="neutral" 
          icon={Wallet} 
        />
        <StatsCard 
          title="Market Signals" 
          value={signals?.length.toString() ?? "0"} 
          change={`${highConfidenceSignals} high confidence`} 
          changeType="positive" 
          icon={TrendingUp} 
        />
        <StatsCard 
          title="Eligible Airdrops" 
          value={eligibleAirdrops.toString()} 
          change={`${claimedAirdrops} claimed`} 
          changeType="positive" 
          icon={Gift} 
        />
        <StatsCard 
          title="Total Claimed" 
          value={`${claimedAirdrops}/${eligibleAirdrops}`} 
          change="Airdrop status" 
          changeType="neutral" 
          icon={DollarSign} 
        />
      </div>

      {/* Chart + Signals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <TokenChart />
        </div>
        <div>
          <AlertsPanel />
        </div>
      </div>

      {/* Whale Activity Feed - Full Width */}
      <div className="mb-8">
        <WhaleActivityFeed />
      </div>

      {/* Airdrop Winners */}
      <div className="mb-8">
        <AirdropWinners />
      </div>
    </PublicLayout>
  );
}
