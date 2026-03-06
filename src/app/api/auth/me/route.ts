import { NextRequest, NextResponse } from 'next/server'
import { getSession, getSessionCookieName } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(getSessionCookieName())?.value
    
    if (!token) {
      return NextResponse.json({ user: null })
    }
    
    const user = await getSession(token)
    return NextResponse.json({ user })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json({ user: null })
  }
}
