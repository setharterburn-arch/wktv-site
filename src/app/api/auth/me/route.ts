import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SESSION_COOKIE_NAME = 'wktv_session'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value
    
    if (!token) {
      return NextResponse.json({ user: null, reason: 'no_token' })
    }
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { db: { schema: 'wktv' } }
    )
    
    // Find session
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .select('id, user_id, expires_at')
      .eq('token', token)
      .single()
    
    if (sessionError || !session) {
      return NextResponse.json({ user: null, reason: 'no_session', error: sessionError?.message })
    }
    
    // Check if expired
    if (new Date(session.expires_at) < new Date()) {
      await supabase.from('sessions').delete().eq('token', token)
      return NextResponse.json({ user: null, reason: 'expired' })
    }
    
    // Get user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, name, phone, role, created_at')
      .eq('id', session.user_id)
      .single()
    
    if (userError || !user) {
      return NextResponse.json({ user: null, reason: 'no_user', error: userError?.message })
    }
    
    return NextResponse.json({ user })
  } catch (error: any) {
    return NextResponse.json({ user: null, reason: 'exception', error: error.message })
  }
}
