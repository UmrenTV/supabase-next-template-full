import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";

// Create a single instance
const supabase = createClientComponentClient();

export interface SessionCheckResult {
  session: Session | null;
  isValid: boolean;
  error: Error | null;
}

export async function checkSessionClient(): Promise<SessionCheckResult> {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) throw error;

    return {
      session,
      isValid: !!session,
      error: null,
    };
  } catch (err) {
    return {
      session: null,
      isValid: false,
      error: err instanceof Error ? err : new Error("Failed to check session"),
    };
  }
}
