import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import PublicDashboard from "./pages/PublicDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminWhales from "./pages/admin/AdminWhales";
import AdminSignals from "./pages/admin/AdminSignals";
import AdminAirdrops from "./pages/admin/AdminAirdrops";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicDashboard />} />
            
            {/* Admin Auth */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Admin Routes (protected) */}
            <Route path="/admin" element={<AdminOverview />} />
            <Route path="/admin/whales" element={<AdminWhales />} />
            <Route path="/admin/signals" element={<AdminSignals />} />
            <Route path="/admin/airdrops" element={<AdminAirdrops />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
