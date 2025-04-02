import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Session } from "@supabase/supabase-js";

export interface SessionCheckResult {
  session: Session | null;
  isValid: boolean;
  error: Error | null;
}

export async function checkSessionClient(): Promise<SessionCheckResult> {
  const supabase = createClientComponentClient();

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

export async function checkSessionServer(): Promise<SessionCheckResult> {
  const supabase = createServerComponentClient({ cookies });

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
