import { NextRequest, NextResponse } from 'next/server'
import paypal from '@paypal/checkout-server-sdk'
import client from '@/lib/paypal/client'
import { createClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/gmail/client'
import { createAccountSetupEmailTemplate } from '@/lib/gmail/templates'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const body: { orderId: string } = await request.json()
    const { orderId } = body

    if (!orderId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Order ID is required',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    // Capture the PayPal order
    const captureRequest = new paypal.orders.OrdersCaptureRequest(orderId)
    captureRequest.requestBody({})
    
    const response = await client.execute(captureRequest)
    const captureResponse = response.result

    if (captureResponse.status !== 'COMPLETED') {
      throw new Error('Payment was not completed')
    }

    const supabase = createClient()

    // Get the stored order from database
    const { data: storedOrder, error: fetchError } = await supabase
      .from('payment_orders')
      .select('*')
      .eq('paypal_order_id', orderId)
      .single()

    if (fetchError || !storedOrder) {
      console.error('Failed to fetch stored order:', fetchError)
      return NextResponse.json(
        {
          success: false,
          message: 'Order not found',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      )
    }

    // Extract payer information
    const payer = captureResponse.payer
    const payerEmail = payer?.email_address || storedOrder.email
    const payerName = `${payer?.name?.given_name || ''} ${payer?.name?.surname || ''}`.trim()

    // Update payment order status
    const { error: updateError } = await supabase
      .from('payment_orders')
      .update({
        status: 'completed',
        paypal_payer_id: payer?.payer_id,
        completed_at: new Date().toISOString(),
        payment_details: {
          ...storedOrder.payment_details,
          capture_response: captureResponse,
          payer_info: payer,
        },
      })
      .eq('paypal_order_id', orderId)

    if (updateError) {
      console.error('Failed to update order:', updateError)
    }

    // Generate setup token
    const setupToken = uuidv4() + '-' + Date.now()
    const tokenExpiresAt = new Date()
    tokenExpiresAt.setHours(tokenExpiresAt.getHours() + 24) // 24-hour expiry

    // Create pending account entry
    const { error: pendingError } = await supabase
      .from('pending_accounts')
      .insert({
        email: payerEmail,
        payment_order_id: storedOrder.id,
        setup_token: setupToken,
        token_expires_at: tokenExpiresAt.toISOString(),
        first_name: payer?.name?.given_name || '',
        last_name: payer?.name?.surname || '',
      })

    if (pendingError) {
      console.error('Failed to create pending account:', pendingError)
      return NextResponse.json(
        {
          success: false,
          message: 'Payment processed but account setup failed',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      )
    }

    // Send setup email
    try {
      const setupLink = `${process.env.NEXT_PUBLIC_SITE_URL}/setup-account?token=${setupToken}`
      const { html, text } = createAccountSetupEmailTemplate(
        payerName || 'Klant',
        setupLink,
        {
          orderId: orderId,
          amount: storedOrder.amount,
          currency: storedOrder.currency,
        }
      )

      await sendEmail({
        to: payerEmail,
        subject: 'Welkom bij PokeGrade Nederland - Activeer je account',
        html,
        text,
      })
    } catch (emailError) {
      console.error('Failed to send setup email:', emailError)
      // Don't fail the entire process if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Payment completed and account setup email sent',
        data: {
          orderId,
          payerEmail,
          amount: storedOrder.amount,
          currency: storedOrder.currency,
          setupEmailSent: true,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Capture order error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to capture payment',
        data: null,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
