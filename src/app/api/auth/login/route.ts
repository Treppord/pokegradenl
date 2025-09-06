import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { LoginForm } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as LoginForm
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email and password are required',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Authenticate user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 401 }
      )
    }

    if (!authData.user || !authData.session) {
      return NextResponse.json(
        {
          success: false,
          message: 'Authentication failed',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 401 }
      )
    }

    // Get user profile from database
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error fetching profile:', profileError)
    }

    // Prepare response data
    const userData = {
      id: authData.user.id,
      email: authData.user.email!,
      firstName: profile?.first_name || authData.user.user_metadata?.first_name || '',
      lastName: profile?.last_name || authData.user.user_metadata?.last_name || '',
      phone: profile?.phone || '',
      createdAt: authData.user.created_at,
      updatedAt: profile?.updated_at || authData.user.updated_at || authData.user.created_at,
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        data: {
          user: userData,
          token: authData.session.access_token,
          refreshToken: authData.session.refresh_token,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
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
