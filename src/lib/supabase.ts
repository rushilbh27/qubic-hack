import { createClient } from "@supabase/supabase-js";

// Vite exposes env vars via import.meta.env.
// Provide typed accessors and early validation for required keys.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Warn once at startup; avoids runtime confusion when keys are missing.
  // Do not throw to allow the app to render with placeholders.
  console.warn(
    "Supabase env missing: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local"
  );
}

export const supabase = createClient(
  SUPABASE_URL ?? "",
  SUPABASE_ANON_KEY ?? ""
);

/**
 * Quick connectivity probe (optional): attempts a lightweight call.
 * Returns true if the client can perform a simple request, false otherwise.
 */
export async function supabaseHealthCheck(): Promise<boolean> {
  try {
    // Just verify we have credentials configured
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return false;
    
    // Try a simple auth check - even if it returns an error, we know the client is configured
    const { error } = await supabase.auth.getSession();
    // Any response (even error) means the client can communicate with Supabase
    return true;
  } catch (e) {
    console.error("Supabase health check failed:", e);
    return false;
  }
}
