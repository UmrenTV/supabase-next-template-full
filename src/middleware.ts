import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSessionServer } from "@/lib/auth/server-session";
import { getRouteType, ROUTE_TYPES } from "@/lib/auth/route-protection";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  // Get current path and referer
  const path = request.nextUrl.pathname;
  const referer = request.headers.get("referer") || "direct";
  console.log("Middleware - Route Check:", {
    from: referer,
    to: path,
    method: request.method,
  });

  // Check session validity
  const { session, isValid, error } = await checkSessionServer();

  // Log session state
  console.log("Middleware - Session State:", {
    hasSession: isValid,
    error: error?.message,
  });

  // Get route type
  const routeType = getRouteType(path);

  // Handle session errors
  if (error) {
    console.log("Middleware - Session Error:", {
      error: error.message,
      action: "Clearing invalid session",
    });
    await supabase.auth.signOut();

    if (routeType === ROUTE_TYPES.PROTECTED) {
      const redirectUrl = new URL("/auth/login", request.url);
      redirectUrl.searchParams.set("redirectTo", path);
      console.log("Middleware - Redirecting:", {
        from: path,
        to: redirectUrl.toString(),
        reason: "Invalid session",
      });
      return NextResponse.redirect(redirectUrl);
    }
    return res;
  }

  // If user is not signed in and trying to access a protected route
  if (!isValid && routeType === ROUTE_TYPES.PROTECTED) {
    const redirectUrl = new URL("/auth/login", request.url);
    redirectUrl.searchParams.set("redirectTo", path);
    console.log("Middleware - Redirecting:", {
      from: path,
      to: redirectUrl.toString(),
      reason: "No session on protected route",
    });
    return NextResponse.redirect(redirectUrl);
  }

  // If user is signed in and trying to access auth routes
  if (isValid && routeType === ROUTE_TYPES.AUTH) {
    const redirectTo =
      request.nextUrl.searchParams.get("redirectTo") || "/dashboard";
    console.log("Middleware - Redirecting:", {
      from: path,
      to: redirectTo,
      reason: "Authenticated user on auth route",
    });
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  // Allow access to public routes and other valid cases
  return res;
}

// Handle all routes except static files and API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (they handle their own auth)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
  ],
};
