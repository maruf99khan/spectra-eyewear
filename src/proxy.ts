import { createClient } from "@/lib/supabase/middleware"
import { NextResponse, type NextRequest } from "next/server"

const protectedRoutes = ["/account", "/checkout", "/admin"]
const authRoutes = ["/auth/login", "/auth/signup", "/auth/forgot-password"]

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })

  try {
    const { supabase, supabaseResponse } = await createClient(request)
    response = supabaseResponse

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const pathname = request.nextUrl.pathname

    if (user && authRoutes.some((route) => pathname.startsWith(route))) {
      const url = request.nextUrl.clone()
      url.pathname = "/account"
      return NextResponse.redirect(url)
    }

    if (!user && protectedRoutes.some((route) => pathname.startsWith(route))) {
      const url = request.nextUrl.clone()
      url.pathname = "/auth/login"
      url.searchParams.set("next", pathname)
      return NextResponse.redirect(url)
    }
  } catch {
    // Supabase not configured — allow all requests through
  }

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
