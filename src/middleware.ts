import { updateSession } from './utils/supabase/middleware'
import { authMiddleware } from './middleware/authMiddleware'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    // For API routes that need authentication
    if (request.nextUrl.pathname.startsWith('/api/agent/')) {
        return authMiddleware(request)
    }

    // For regular pages
    return await updateSession(request)
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
        '/api/agent/:path*'
    ],
}


