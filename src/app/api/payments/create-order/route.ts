import { NextRequest, NextResponse } from 'next/server'
import paypal from '@paypal/checkout-server-sdk'
import client from '@/lib/paypal/client'
import { createClient } from '@/lib/supabase/server'
import { PaymentItem } from '@/lib/paypal/types'

export async function POST(request: NextRequest) {
  try {
    const body: {
      email: string
      items: PaymentItem[]
      customer_info?: any
    } = await request.json()
    const { email, items, customer_info } = body

    if (!email || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email and items are required',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum: number, item: PaymentItem) => {
      return sum + (parseFloat(item.unit_amount.value) * item.quantity)
    }, 0)

    // Create PayPal order
    const orderRequest = new paypal.orders.OrdersCreateRequest()
    orderRequest.prefer('return=representation')
    orderRequest.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: 'default',
          amount: {
            currency_code: process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || 'EUR',
            value: totalAmount.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || 'EUR',
                value: totalAmount.toFixed(2),
              },
            },
          },
          items: items.map((item: PaymentItem) => ({
            name: item.name,
            description: item.description,
            quantity: item.quantity.toString(),
            unit_amount: {
              currency_code: item.unit_amount.currency_code,
              value: item.unit_amount.value,
            },
          })),
        },
      ],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel`,
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        brand_name: 'PokeGrade Nederland',
      },
    })

    const response = await client.execute(orderRequest)
    const order = response.result
    
    if (!order.id) {
      throw new Error('Failed to create PayPal order')
    }

    // Store order in database
    const supabase = createClient()
    const { error: dbError } = await supabase
      .from('payment_orders')
      .insert({
        email,
        paypal_order_id: order.id,
        amount: totalAmount,
        currency: process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || 'EUR',
        status: 'created',
        items: items,
        payment_details: {
          customer_info,
          paypal_order: order,
        },
      })

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to store order information',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      )
    }

    // Find approval URL
    const approvalUrl = order.links?.find((link: any) => link.rel === 'approve')?.href

    return NextResponse.json(
      {
        success: true,
        message: 'Order created successfully',
        data: {
          orderId: order.id,
          approvalUrl,
          amount: totalAmount,
          currency: process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || 'EUR',
        },
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create payment order',
        data: null,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
