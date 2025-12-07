import { Bell, Settings, LogOut, User as UserIcon, Home, TrendingUp, Gift, Waves, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { signOut } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";

export function AdminHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-lg">Admin Panel</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
              <Home className="h-4 w-4 mr-2" />
              Overview
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin/whales")}>
              <Waves className="h-4 w-4 mr-2" />
              Whales
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin/signals")}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Signals
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin/airdrops")}>
              <Gift className="h-4 w-4 mr-2" />
              Airdrops
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin/settings")}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center">
            <UserIcon className="h-4 w-4 text-accent" />
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
