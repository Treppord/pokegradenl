import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'Token is required',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Find the pending account by token
    const { data: pendingAccount, error } = await supabase
      .from('pending_accounts')
      .select('*')
      .eq('setup_token', token)
      .eq('is_used', false)
      .single()

    if (error || !pendingAccount) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid or expired setup token',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      )
    }

    // Check if token has expired
    const now = new Date()
    const expiresAt = new Date(pendingAccount.token_expires_at)
    
    if (now > expiresAt) {
      return NextResponse.json(
        {
          success: false,
          message: 'Setup token has expired',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 410 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Token is valid',
        data: {
          email: pendingAccount.email,
          firstName: pendingAccount.first_name,
          lastName: pendingAccount.last_name,
          tokenExpiresAt: pendingAccount.token_expires_at,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Validate token error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        data: null,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
