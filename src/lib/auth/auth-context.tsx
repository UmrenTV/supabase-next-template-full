"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User, Session, AuthChangeEvent } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a single Supabase instance
const supabase = createClientComponentClient();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle auth state changes
  const handleAuthStateChange = async (
    event: AuthChangeEvent,
    newSession: Session | null
  ) => {
    console.log("AuthContext - onAuthStateChange - Event:", event);

    // Update state based on the event
    switch (event) {
      case "SIGNED_IN":
        setSession(newSession);
        setUser(newSession?.user ?? null);
        break;
      case "SIGNED_OUT":
        setSession(null);
        setUser(null);
        break;
      case "TOKEN_REFRESHED":
        setSession(newSession);
        setUser(newSession?.user ?? null);
        break;
      case "USER_UPDATED":
        setSession(newSession);
        setUser(newSession?.user ?? null);
        break;
      default:
        // For other events, check the session
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
    }

    setLoading(false);
  };

  // Initialize auth state
  useEffect(() => {
    console.log("AuthContext - useEffect - Starting initial session check");

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log("AuthContext - login - Starting login process");
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setSession(data.session);
      setUser(data.session?.user ?? null);
    } catch (err) {
      console.error("AuthContext - login - Error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred during login";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log("AuthContext - logout - Starting logout process");
      setLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      // We don't need to set user/session here as it will be handled by onAuthStateChange
    } catch (err) {
      console.error("AuthContext - logout - Error:", err);
      setError("Failed to logout");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
