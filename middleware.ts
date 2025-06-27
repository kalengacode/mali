import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes qui nécessitent une authentification
const protectedRoutes = ["/student", "/teacher", "/admin"];

// Routes d'authentification (redirection si déjà connecté)
const authRoutes = ["/auth/login", "/auth/register", "/auth/register-school"];

// Routes publiques qui ne nécessitent pas d'authentification
const publicRoutes = ["/", "/api"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permettre l'accès aux fichiers statiques et API
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Vérifier si l'utilisateur a un token de session
  const token = request.cookies.get("auth-token")?.value;

  // Vérifier si la route actuelle est protégée
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Vérifier si la route actuelle est une route d'auth
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Si c'est une route protégée et qu'il n'y a pas de token
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Si c'est une route d'auth et que l'utilisateur a un token
  if (isAuthRoute && token) {
    // Rediriger vers la page d'accueil, le client s'occupera de la redirection selon le rôle
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
