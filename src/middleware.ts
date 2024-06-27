import { NextResponse, type NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

import { env } from "./env"
import { getValidSubdomain } from "./lib/utils"

const PUBLIC_ROUTES = ["/", "/blogs", "/login", "/sign-up", "/verify"]
const AUTH_ROUTES = ["/dashboard"]

export async function middleware(req: NextRequest) {
    const host = req.headers.get("host")
    const url = req.nextUrl.clone()

    const subdomain = getValidSubdomain(host)
    if (subdomain) {
        url.pathname = `/${subdomain}${url.pathname}`

        return NextResponse.rewrite(url)
    }

    let token
    try {
        token = await getToken({ req, secret: env.NEXTAUTH_SECRET })
    } catch (err) {
        token = null
    }
    const isLoggedIn = token !== null
    const route = url.pathname

    const isApiAuthRoute = route.startsWith("/api")
    const isPublicRoute = PUBLIC_ROUTES.some((_route) =>
        _route.startsWith(route)
    )
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
