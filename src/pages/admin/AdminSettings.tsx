import { AdminLayout } from "@/components/layout/AdminLayout";

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">System Settings</h1>
        <p className="text-muted-foreground">Configure system parameters and thresholds</p>
      </div>

      <div className="glass-card p-6">
        <p className="text-muted-foreground">Settings management coming soon...</p>
      </div>
    </AdminLayout>
  );
}
