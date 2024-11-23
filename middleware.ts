import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory store for rate limiting
const rateLimit = new Map()

export function middleware(request: NextRequest) {
  // Get IP
  const ip = request.ip ?? 'anonymous'
  
  // Rate limiting logic
  if (request.nextUrl.pathname.startsWith('/api')) {
    const tokenCount = rateLimit.get(ip) ?? 0
    
    if (tokenCount > 10) { // Max 10 requests
      return new NextResponse(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    
    rateLimit.set(ip, tokenCount + 1)
    
    // Reset after 1 minute
    setTimeout(() => rateLimit.delete(ip), 60 * 1000)
  }

  // Add custom header
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-custom-header', 'hello')

  // Continue with modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*'
  ]
} 