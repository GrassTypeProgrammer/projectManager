// A middleware function directs the user to the login page if they try to access a page that you need to be logged in for

// Middleware function provided by next-auth. 
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    // A token is used to authenticate an app.
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const isAuthenticated = !!token;
    const isLandingPage = req.nextUrl.pathname === "/";
    const isAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");
    // test if path has file extension (.js, .png, etc)
    const isPublicFile = /\.(.*)$/.test(req.nextUrl.pathname);
    const isNextStatic = req.nextUrl.pathname.startsWith("/_next");

    if (
        isAuthenticated ||
        isLandingPage ||
        isAuthRoute ||
        isPublicFile ||
        isNextStatic
    ) {
        return NextResponse.next();
    }

    // Not authenticated and trying to access a protected route
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
}

export const config = {
    // match all routes except these ones.
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}