'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Add any post-payment processing here
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Processing your payment...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <CardTitle className="text-2xl text-green-600">
            🎉 Payment Successful!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <div>
            <p className="text-gray-600 mb-4">
              Thank you for your purchase! Your payment has been processed successfully.
            </p>
            {orderId && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-1">Order ID:</p>
                <p className="font-mono text-sm font-medium">{orderId}</p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">📧 Check Your Email</h3>
            <p className="text-blue-700 text-sm">
              We've sent you an email with instructions to set up your account. 
              Please check your inbox (and spam folder) for the setup link.
            </p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-900 mb-2">⏰ Important</h3>
            <p className="text-yellow-700 text-sm">
              Your account setup link will expire in 24 hours. 
              If you need a new link, please contact our support team.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">What's Next?</h3>
            <div className="text-left space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <p className="text-sm text-gray-600">Check your email for the account setup link</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <p className="text-sm text-gray-600">Set up your username and password</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <p className="text-sm text-gray-600">Log in to your dashboard to manage your submissions</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <p className="text-sm text-gray-600">Follow our instructions to send in your cards</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline">
                Return to Homepage
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="primary">
                Contact Support
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
