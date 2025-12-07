import { PublicHeader } from "./PublicHeader";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="container px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-border mt-12">
        <div className="container px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Powered by QUBIC blockchain • Real-time whale tracking & airdrops</p>
        </div>
      </footer>
    </div>
  );
}
