'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

interface TokenValidation {
  isValid: boolean
  email?: string
  firstName?: string
  lastName?: string
  expired?: boolean
}

export default function SetupAccountPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [tokenValidation, setTokenValidation] = useState<TokenValidation | null>(null)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      setError('Invalid setup link')
      return
    }

    validateToken(token)
  }, [token])

  const validateToken = async (setupToken: string) => {
    try {
      const response = await fetch('/api/auth/validate-setup-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: setupToken }),
      })

      const result = await response.json()
      
      if (result.success) {
        setTokenValidation({
          isValid: true,
          email: result.data.email,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
        })
        setFormData(prev => ({
          ...prev,
          username: result.data.email, // Pre-fill username with email
        }))
      } else {
        setTokenValidation({
          isValid: false,
          expired: result.message.includes('expired'),
        })
        setError(result.message)
      }
    } catch (err) {
      setError('Failed to validate setup token')
      setTokenValidation({ isValid: false })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/complete-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          username: formData.username,
          password: formData.password,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Redirect to login with success message
        router.push('/login?message=Account created successfully! You can now log in.')
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Invalid Link</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">
              This account setup link is invalid or malformed.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!tokenValidation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Validating setup link...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!tokenValidation.isValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">
              {tokenValidation.expired ? 'Link Expired' : 'Invalid Link'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              {tokenValidation.expired 
                ? 'This account setup link has expired. Please contact support to get a new link.'
                : 'This account setup link is invalid or has already been used.'
              }
            </p>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/contact'}
            >
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            🎉 Complete Your Account Setup
          </CardTitle>
          <p className="text-center text-gray-600">
            Welcome {tokenValidation.firstName}! Set up your account credentials below.
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={tokenValidation.email || ''}
                disabled
                className="bg-gray-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                This email cannot be changed
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <Input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                required
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                placeholder="Choose a secure password"
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum 8 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
                placeholder="Confirm your password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
            >
              Complete Setup
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
