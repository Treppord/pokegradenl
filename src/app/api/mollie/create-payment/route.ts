import { NextRequest, NextResponse } from 'next/server';
import MollieService from '@/services/mollieService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, description, items, customerInfo, submissionData } = body;

    const mollieService = new MollieService();

    const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    
    const paymentData = {
      amount: {
        currency: 'EUR',
        value: amount.toFixed(2),
      },
      description,
      redirectUrl: `${baseUrl}/payment/success`,
      webhookUrl: `${baseUrl}/api/mollie/webhook`,
      metadata: {
        submissionData: JSON.stringify(submissionData),
        items: JSON.stringify(items),
      },
    };

    const payment = await mollieService.createIdealPayment(paymentData, customerInfo);

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        status: payment.status,
        checkoutUrl: payment.getCheckoutUrl(),
      },
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create payment' 
      },
      { status: 500 }
    );
  }
}
