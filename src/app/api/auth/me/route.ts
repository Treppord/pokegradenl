import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()

    // Get current user from Supabase Auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Not authenticated',
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
      .eq('id', user.id)
      .single()

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error fetching profile:', profileError)
    }

    // Prepare response data
    const userData = {
      id: user.id,
      email: user.email!,
      firstName: profile?.first_name || user.user_metadata?.first_name || '',
      lastName: profile?.last_name || user.user_metadata?.last_name || '',
      phone: profile?.phone || '',
      createdAt: user.created_at,
      updatedAt: profile?.updated_at || user.updated_at || user.created_at,
    }

    return NextResponse.json(
      {
        success: true,
        message: 'User data retrieved successfully',
        data: userData,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get user error:', error)
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
