import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()

    // Sign out user from Supabase Auth
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Logout error:', error)
      return NextResponse.json(
        {
          success: false,
          message: 'Error during logout',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Logout successful',
        data: null,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Logout error:', error)
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
