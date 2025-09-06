'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { PayPalButton } from '@/components/ui/PayPalButton'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function PaymentPage() {
  const router = useRouter()
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  })
  const [showPayment, setShowPayment] = useState(false)

  const sampleItems = [
    {
      name: 'Premium Card Grading Service',
      description: '10 cards graded with premium service',
      quantity: 1,
      unit_amount: {
        currency_code: 'EUR',
        value: '149.99',
      },
    },
  ]

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customerInfo.email && customerInfo.firstName && customerInfo.lastName) {
      setShowPayment(true)
    }
  }

  const handlePaymentSuccess = (orderId: string) => {
    router.push(`/payment/success?orderId=${orderId}`)
  }

  const handlePaymentError = (error: any) => {
    console.error('Payment error:', error)
    alert('Payment failed. Please try again.')
  }

  const handlePaymentCancel = () => {
    alert('Payment was cancelled.')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Your Order
            </h1>
            <p className="text-gray-600">
              Provide your information and complete payment to receive your account
            </p>
          </div>

          {!showPayment ? (
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCustomerSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <Input
                        type="text"
                        value={customerInfo.firstName}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <Input
                        type="text"
                        value={customerInfo.lastName}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                      required
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number (Optional)
                    </label>
                    <Input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+31 6 12345678"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Continue to Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sampleItems.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">€{parseFloat(item.unit_amount.value).toFixed(2)}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>€{sampleItems.reduce((sum, item) => sum + parseFloat(item.unit_amount.value) * item.quantity, 0).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-4">
                      After successful payment, you'll receive an email with instructions to set up your account.
                    </p>
                  </div>
                  
                  <PayPalButton
                    email={customerInfo.email}
                    items={sampleItems}
                    customerInfo={customerInfo}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    onCancel={handlePaymentCancel}
                  />
                  
                  <div className="mt-4 text-center">
                    <Button
                      variant="ghost"
                      onClick={() => setShowPayment(false)}
                    >
                      ← Back to Customer Info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
