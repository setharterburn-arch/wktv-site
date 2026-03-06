import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getSession, getSessionCookieName } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// Admin client for database operations
const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    db: { schema: 'wktv' },
    auth: { autoRefreshToken: false, persistSession: false }
  }
)

// Send Pushover notification
async function sendPushover(title: string, message: string) {
  const PUSHOVER_APP_TOKEN = process.env.PUSHOVER_APP_TOKEN
  const PUSHOVER_USER_KEY = process.env.WKTV_PUSHOVER_USER_KEY
  
  if (!PUSHOVER_APP_TOKEN || !PUSHOVER_USER_KEY) {
    console.log('Pushover not configured, skipping notification')
    return
  }
  
  try {
    await fetch('https://api.pushover.net/1/messages.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: PUSHOVER_APP_TOKEN,
        user: PUSHOVER_USER_KEY,
        title,
        message,
        sound: 'cashregister',
      }),
    })
  } catch (err) {
    console.error('Pushover notification failed:', err)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { planId, planName, amountCents, connections, duration, cashAppName, isRenewal } = body

    // Get user from custom auth session
    const token = request.cookies.get(getSessionCookieName())?.value
    const user = token ? await getSession(token) : null
    
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Get user metadata
    const userName = user.name || user.email?.split('@')[0] || 'Unknown'
    const userPhone = user.phone || null
    const userEmail = user.email || ''
    const amount = (amountCents / 100).toFixed(0)

    // Create pending signup record
    const { data: signup, error: signupError } = await adminSupabase
      .from('pending_signups')
      .insert({
        user_id: user.id,
        name: userName,
        email: userEmail,
        phone: userPhone,
        plan_id: planId,
        plan_name: planName,
        amount_cents: amountCents,
        payment_method: 'cashapp',
        cashapp_name: cashAppName,
        status: 'pending',
      })
      .select()
      .single()

    if (signupError) {
      console.error('Failed to create pending signup:', signupError)
      return NextResponse.json({ error: 'Failed to submit payment' }, { status: 500 })
    }

    // Also create a payment record
    const { error: paymentError } = await adminSupabase
      .from('payments')
      .insert({
        user_id: user.id,
        amount_cents: amountCents,
        payment_method: 'cashapp',
        payment_reference: cashAppName,
        status: 'pending',
      })

    if (paymentError) {
      console.error('Failed to create payment record:', paymentError)
    }

    // Send Pushover notification
    await sendPushover(
      `💰 WKTV ${isRenewal ? 'Renewal' : 'Payment'} - $${amount}`,
      `Plan: ${planName}\nCustomer: ${userName}\nEmail: ${userEmail}\nCash App: ${cashAppName}${userPhone ? `\nPhone: ${userPhone}` : ''}`
    )

    return NextResponse.json({
      success: true,
      message: 'Payment submitted for verification',
      signupId: signup.id,
    })

  } catch (error: any) {
    console.error('Cash App payment error:', error)
    return NextResponse.json({ error: error.message || 'Payment failed' }, { status: 500 })
  }
}
