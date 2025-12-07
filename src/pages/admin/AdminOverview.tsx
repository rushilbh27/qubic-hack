import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Wallet, TrendingUp, Gift, Activity, Users, BarChart3 } from "lucide-react";

export default function AdminOverview() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Overview</h1>
        <p className="text-muted-foreground">System metrics and real-time stats</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatsCard
          title="Tracked Whales"
          value="1,247"
          change="+23 this week"
          changeType="positive"
          icon={Wallet}
        />
        <StatsCard
          title="Total Volume"
          value="$18.7B"
          change="+12.3%"
          changeType="positive"
          icon={BarChart3}
        />
        <StatsCard
          title="Eligible Wallets"
          value="342"
          change="87 pending"
          changeType="neutral"
          icon={Users}
        />
        <StatsCard
          title="Pending Airdrops"
          value="124"
          change="18 approved"
          changeType="neutral"
          icon={Gift}
        />
        <StatsCard
          title="Completed Airdrops"
          value="218"
          change="+45 this week"
          changeType="positive"
          icon={Activity}
        />
        <StatsCard
          title="Active Signals"
          value="47"
          change="8 high confidence"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors text-left">
            <Wallet className="w-6 h-6 text-primary mb-2" />
            <h4 className="font-medium">View All Whales</h4>
            <p className="text-sm text-muted-foreground mt-1">Manage whale tracking</p>
          </button>
          <button className="p-4 rounded-xl bg-accent/10 hover:bg-accent/20 transition-colors text-left">
            <Gift className="w-6 h-6 text-accent mb-2" />
            <h4 className="font-medium">Approve Airdrops</h4>
            <p className="text-sm text-muted-foreground mt-1">Process pending claims</p>
          </button>
          <button className="p-4 rounded-xl bg-success/10 hover:bg-success/20 transition-colors text-left">
            <TrendingUp className="w-6 h-6 text-success mb-2" />
            <h4 className="font-medium">Review Signals</h4>
            <p className="text-sm text-muted-foreground mt-1">Check market trends</p>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
