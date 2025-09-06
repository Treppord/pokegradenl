import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()

    // Initiate Google OAuth sign in
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'OAuth redirect URL generated',
        data: { url: data.url },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Google OAuth error:', error)
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
