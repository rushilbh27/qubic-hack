import { createContext, useContext, useEffect, useState } from "react";
import { User, getCurrentUser, onAuthStateChange } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false); // Changed to false to avoid blocking

  useEffect(() => {
    // Don't block rendering - run auth check in background
    getCurrentUser()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.error("Auth check failed (non-blocking):", err);
        setUser(null);
      });

    // Setup auth listener
    try {
      const authData = onAuthStateChange((user) => {
        setUser(user);
      });

      return () => {
        try {
          authData?.subscription?.unsubscribe();
        } catch (e) {
          // Ignore cleanup errors
        }
      };
    } catch (e) {
      console.error("Auth listener setup failed:", e);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
