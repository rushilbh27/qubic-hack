import { AdminLayout } from "@/components/layout/AdminLayout";

export default function AdminSignals() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Signal Manager</h1>
        <p className="text-muted-foreground">View and manage all market trend signals</p>
      </div>

      <div className="glass-card p-6">
        <p className="text-muted-foreground">Signal management coming soon...</p>
      </div>
    </AdminLayout>
  );
}
