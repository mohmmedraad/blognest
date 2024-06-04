import { type NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

import { env } from "./env"

const PUBLIC_ROUTES = ["/", "/blogs", "/login", "/sign-up", "/verify"]
const AUTH_ROUTES = ["/dashboard"]

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: env.NEXTAUTH_SECRET })

    const isLoggedIn = token !== null
    const route = req.nextUrl.pathname

    const isApiAuthRoute = route.startsWith("/api/auth")
    const isPublicRoute = PUBLIC_ROUTES.includes(route)
    const isAuthRoute = AUTH_ROUTES.includes(route)

    if (isApiAuthRoute) {
        return null
    }

    if (isAuthRoute && !isLoggedIn) {
        return Response.redirect(new URL("/login", req.nextUrl))
    }

    if ((route === "/login" || route === "/sign-up") && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", req.nextUrl))
    }

    if (!isPublicRoute && !isLoggedIn) {
        return Response.redirect(new URL("/login", req.nextUrl))
    }

    return null
}

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
