import { NextRequest, NextResponse } from 'next/server';
import MollieService from '@/services/mollieService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const params = new URLSearchParams(body);
    const paymentId = params.get('id');

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Missing payment ID' },
        { status: 400 }
      );
    }

    const mollieService = new MollieService();
    const payment = await mollieService.getPayment(paymentId);

    console.log('Webhook received for payment:', paymentId, 'Status:', payment.status);

    // Here you would typically:
    // 1. Update your database with the payment status
    // 2. Send confirmation emails
    // 3. Update order status
    // 4. Process the submission data

    if (payment.status === 'paid') {
      console.log('Payment successful for:', paymentId);
      
      // Parse submission data from metadata
      if (payment.metadata && typeof payment.metadata === 'object' && payment.metadata !== null) {
        const metadata = payment.metadata as Record<string, string>;
        if (metadata.submissionData) {
          const submissionData = JSON.parse(metadata.submissionData);
          console.log('Processing submission:', submissionData);
          
          // TODO: Save submission to database
          // TODO: Send confirmation email
          // TODO: Create user account if needed
        }
      }
    } else if (payment.status === 'canceled' || payment.status === 'expired' || payment.status === 'failed') {
      console.log('Payment failed/cancelled for:', paymentId, 'Status:', payment.status);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
