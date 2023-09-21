import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useEffect } from 'react'


export function middleware(request: NextRequest) {


}
export const config = {
    matcher: '/home/:path*',
}