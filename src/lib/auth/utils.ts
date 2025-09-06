import { createClient } from '@/lib/supabase/server'
import { NextRequest } from 'next/server'

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  createdAt: string
  updatedAt: string
}

export async function validateUser(request: NextRequest): Promise<AuthUser | null> {
  try {
    const supabase = createClient()
    
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error fetching profile:', profileError)
      return null
    }

    return {
      id: user.id,
      email: user.email!,
      firstName: profile?.first_name || user.user_metadata?.first_name || '',
      lastName: profile?.last_name || user.user_metadata?.last_name || '',
      phone: profile?.phone || '',
      createdAt: user.created_at,
      updatedAt: profile?.updated_at || user.updated_at || user.created_at,
    }
  } catch (error) {
    console.error('User validation error:', error)
    return null
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>\"'&]/g, '')
}

export function generateSecureId(): string {
  return crypto.randomUUID()
}
