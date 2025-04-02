// Define route types and their protection rules
export const ROUTE_TYPES = {
  PROTECTED: "protected",
  AUTH: "auth",
  PUBLIC: "public",
} as const;

export type RouteType = (typeof ROUTE_TYPES)[keyof typeof ROUTE_TYPES];

// Centralized route protection configuration
export const getRouteType = (path: string): RouteType => {
  // Protected routes
  if (path.startsWith("/dashboard") || path.startsWith("/admin")) {
    return ROUTE_TYPES.PROTECTED;
  }

  // Auth routes
  if (path.startsWith("/auth")) {
    return ROUTE_TYPES.AUTH;
  }

  // All other routes are public
  return ROUTE_TYPES.PUBLIC;
};

// Helper functions for route checks
export const isProtectedRoute = (path: string): boolean => {
  return getRouteType(path) === ROUTE_TYPES.PROTECTED;
};

export const isAuthRoute = (path: string): boolean => {
  return getRouteType(path) === ROUTE_TYPES.AUTH;
};

export const isPublicRoute = (path: string): boolean => {
  return getRouteType(path) === ROUTE_TYPES.PUBLIC;
};
