import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, username, password } = body

    if (!token || !username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Token, username, and password are required',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: 'Password must be at least 8 characters long',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Find the pending account by token
    const { data: pendingAccount, error: fetchError } = await supabase
      .from('pending_accounts')
      .select('*, payment_orders(id, amount, currency)')
      .eq('setup_token', token)
      .eq('is_used', false)
      .single()

    if (fetchError || !pendingAccount) {
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

    // Check if user already exists by querying profiles table
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', pendingAccount.email)
      .single()
    
    if (existingProfile && !checkError) {
      return NextResponse.json(
        {
          success: false,
          message: 'An account with this email already exists',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 409 }
      )
    }

    // Create the Supabase Auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: pendingAccount.email,
      password: password,
      email_confirm: true, // Skip email verification since payment was verified
      user_metadata: {
        first_name: pendingAccount.first_name,
        last_name: pendingAccount.last_name,
        username: username,
        account_source: 'payment',
      },
    })

    if (authError || !authData.user) {
      console.error('Auth user creation error:', authError)
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to create user account',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      )
    }

    // Create profile in database
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: pendingAccount.email,
        first_name: pendingAccount.first_name || '',
        last_name: pendingAccount.last_name || '',
        account_source: 'payment',
        payment_order_id: pendingAccount.payment_order_id,
      })

    if (profileError) {
      console.error('Profile creation error:', profileError)
      // Don't fail the entire process if profile creation fails
    }

    // Mark the pending account as used
    const { error: updateError } = await supabase
      .from('pending_accounts')
      .update({
        is_used: true,
        used_at: new Date().toISOString(),
      })
      .eq('setup_token', token)

    if (updateError) {
      console.error('Failed to mark pending account as used:', updateError)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        data: {
          email: pendingAccount.email,
          userId: authData.user.id,
          accountSource: 'payment',
        },
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Complete setup error:', error)
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
