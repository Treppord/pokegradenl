'use client'

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useState } from 'react'
import { PaymentItem } from '@/lib/paypal/types'

interface PayPalButtonProps {
  email: string
  items: PaymentItem[]
  customerInfo?: {
    firstName?: string
    lastName?: string
    phone?: string
  }
  onSuccess?: (orderId: string) => void
  onError?: (error: any) => void
  onCancel?: () => void
}

export function PayPalButton({
  email,
  items,
  customerInfo,
  onSuccess,
  onError,
  onCancel,
}: PayPalButtonProps) {
  const [loading, setLoading] = useState(false)

  const createOrder = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          items,
          customer_info: customerInfo,
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        return result.data.orderId
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error('Create order error:', error)
      onError?.(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const onApprove = async (data: any) => {
    setLoading(true)
    try {
      const response = await fetch('/api/payments/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: data.orderID }),
      })

      const result = await response.json()
      
      if (result.success) {
        onSuccess?.(data.orderID)
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error('Capture order error:', error)
      onError?.(error)
    } finally {
      setLoading(false)
    }
  }

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || 'EUR',
    intent: 'capture' as const,
    locale: 'nl_NL',
  }

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
              <span className="text-sm text-gray-600">Processing...</span>
            </div>
          </div>
        )}
        
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={(error) => {
            console.error('PayPal error:', error)
            onError?.(error)
          }}
          onCancel={() => {
            onCancel?.()
          }}
          style={{
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'paypal',
            height: 45,
          }}
          disabled={loading}
        />
      </div>
    </PayPalScriptProvider>
  )
}
