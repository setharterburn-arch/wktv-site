import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

// Admin client for database operations
const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    db: { schema: 'wktv' },
    auth: { autoRefreshToken: false, persistSession: false }
  }
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { planId, planName, amountCents, connections, duration, cashAppName } = body

    // Get user from session
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Get user metadata
    const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'Unknown'
    const userPhone = user.user_metadata?.phone || null
    const userEmail = user.email || ''

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

    // TODO: Send notification to admin (Pushover, email, etc.)

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
