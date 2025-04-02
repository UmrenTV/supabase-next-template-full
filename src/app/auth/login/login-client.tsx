"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginForm } from "@/components/organisms/login-form/login-form";
import { useAuth } from "@/lib/auth/auth-context";
import { toast } from "react-hot-toast";

export default function LoginClient() {
  const { loading, login, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  useEffect(() => {
    if (user) {
      // If we have a redirectTo parameter, use it, otherwise go to home
      router.push(redirectTo || "/");
    }
  }, [user, router, redirectTo]);

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await login(data.email, data.password);
      toast.success("Login successful");
    } catch (err) {
      console.error("LoginClient - handleLogin - Login error:", err);
      toast.error("Invalid credentials");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-base-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        <LoginForm onSubmit={handleLogin} isLoading={loading} />
      </div>
    </div>
  );
}
