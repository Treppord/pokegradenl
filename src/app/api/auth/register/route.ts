import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { RegisterForm } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as RegisterForm
    const { firstName, lastName, email, password } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'All fields are required',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email format',
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

    // Register user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    })

    if (authError) {
      return NextResponse.json(
        {
          success: false,
          message: authError.message,
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to create user',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    // Create profile in public.profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: authData.user.email!,
        first_name: firstName,
        last_name: lastName,
      })

    if (profileError) {
      console.error('Error creating profile:', profileError)
      // Continue even if profile creation fails initially
    }

    // Prepare response data
    const userData = {
      id: authData.user.id,
      email: authData.user.email!,
      firstName,
      lastName,
      phone: body.phone || '',
      createdAt: authData.user.created_at,
      updatedAt: authData.user.updated_at || authData.user.created_at,
    }

    return NextResponse.json(
      {
        success: true,
        message: 'User registered successfully. Please check your email to verify your account.',
        data: {
          user: userData,
          token: authData.session?.access_token || '',
          refreshToken: authData.session?.refresh_token || '',
        },
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
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
