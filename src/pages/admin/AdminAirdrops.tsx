import { AdminLayout } from "@/components/layout/AdminLayout";

export default function AdminAirdrops() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Airdrop Manager</h1>
        <p className="text-muted-foreground">Approve and manage airdrop claims</p>
      </div>

      <div className="glass-card p-6">
        <p className="text-muted-foreground">Airdrop management coming soon...</p>
      </div>
    </AdminLayout>
  );
}
