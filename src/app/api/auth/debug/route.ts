import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const debug: any = {
    timestamp: new Date().toISOString(),
    env: {
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
    cookies: {},
    sessionLookup: null,
    userLookup: null,
  }

  // Get cookies
  const cookieName = 'wktv_session'
  const token = request.cookies.get(cookieName)?.value
  debug.cookies = {
    cookieName,
    hasToken: !!token,
    tokenPreview: token ? token.substring(0, 20) + '...' : null,
  }

  if (!token) {
    return NextResponse.json(debug)
  }

  // Create supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { db: { schema: 'wktv' } }
  )

  // Try session lookup
  try {
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .select('id, user_id, expires_at, token')
      .eq('token', token)
      .single()
    
    debug.sessionLookup = {
      success: !sessionError,
      error: sessionError?.message || null,
      errorCode: sessionError?.code || null,
      data: session ? { id: session.id, user_id: session.user_id, expires_at: session.expires_at } : null,
    }

    if (session) {
      // Try user lookup
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id, email, name, role')
        .eq('id', session.user_id)
        .single()
      
      debug.userLookup = {
        success: !userError,
        error: userError?.message || null,
        errorCode: userError?.code || null,
        data: user,
      }
    }
  } catch (e: any) {
    debug.exception = e.message
  }

  return NextResponse.json(debug, { status: 200 })
}
